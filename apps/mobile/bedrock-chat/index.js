// -----------  top of file  -----------
import {
  BedrockRuntimeClient,
  ConverseCommand, // ① new API
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "eu-west-2" });

export const handler = async (event) => {
  try {
    /* ===== 1. body normalisation (your code) ===== */
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

    /* ===== 2. build system prompt ===== */
    const system = [
      "You are a friendly COPD support companion.",
      `Patient: ${patient?.name ?? "Unknown"}, COPD stage ${
        patient?.copdStage ?? "Unknown"
      }.`,
      "Keep answers ≤ 2 sentences. Never diagnose or change meds.",
    ].join(" ");

    /* ===== 3. map to Converse format ===== */
    // 1.  user/assistant only
    const converseMessages = messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: [{ text: m.content }],
    }));

    // 2.  system prompt goes top-level
    const systemPrompt = [{ text: system }];

    /* ===== 4. call Bedrock ===== */
    const res = await client.send(
      new ConverseCommand({
        modelId: "meta.llama3-8b-instruct-v1:0",
        messages: converseMessages,
        system: systemPrompt, // ✅
        inferenceConfig: { maxTokens: 150, temperature: 0.7, topP: 0.9 },
      })
    );

    /* ===== 5. extract reply ===== */
    const reply =
      res.output?.message?.content?.[0]?.text ??
      "I'm here if you want to talk.";

    /* ===== 6. return success ===== */
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
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
