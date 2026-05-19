import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "eu-west-2" });

export const handler = async (event) => {
  try {
    // --- 1. NORMALISE BODY INPUT -----------------------------------------
    // API Gateway v2 → event.body (string)
    // API Gateway v1 → event.body (string)
    // Direct Lambda invoke → event (object)
    // Some integrations → event.rawBody
    const raw =
      event?.body ??
      event?.rawBody ??
      (typeof event === "string" ? event : null);

    if (!raw) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing request body" }),
      };
    }

    const body = typeof raw === "string" ? JSON.parse(raw) : raw;
    const { messages = [], patient = {} } = body;

    // --- 2. BUILD SYSTEM PROMPT ------------------------------------------
    const system = [
      "You are a friendly COPD support companion.",
      `Patient: ${patient?.name ?? "Unknown"}, COPD stage ${
        patient?.copdStage ?? "Unknown"
      }.`,
      "Keep answers ≤ 2 sentences. Never diagnose or change meds.",
    ].join(" ");

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 150,
      system,
      messages,
      temperature: 0.7,
    };

    // --- 3. CALL BEDROCK --------------------------------------------------
    const res = await client.send(
      new InvokeModelCommand({
        // Replace your modelId line with:
        modelId: "anthropic.claude-3-5-haiku-20241022-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
      })
    );

    // Node.js 20: res.body is a ReadableStream
    const bytes = await res.body.transformToByteArray();
    const json = JSON.parse(new TextDecoder().decode(bytes));

    const reply = json?.content?.[0]?.text ?? "I'm here if you want to talk.";

    // --- 4. RETURN SUCCESS ------------------------------------------------
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    // --- 5. RETURN SAFE ERROR --------------------------------------------
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: "Server error",
        detail: err?.message,
      }),
    };
  }
};
