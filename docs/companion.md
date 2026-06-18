# 🧠 AI Companion Architectural Specification

The BreatheWell AI Companion subsystem is designed as an interactive, low-intensity conversational interface engineered to mitigate the psychosomatic feedback loops inherent to chronic respiratory illness.The companion provides real-time emotional reassurance, active linguistic de-escalation, and non-invasive behavioral reinforcement - safely operating as a zero-cost social presence without overstepping into clinical diagnostic boundaries.

---

## 🏗️ Technical Architecture & Runtime Workflow

The system is decoupled to maximise client-side responsiveness on mobile data networks while ensuring strict prompt isolation:

1. **Context Ingestion (`useAIChat.ts`):** The client hook securely packages a minimised, anonymous user context bundle (e.g., age bracket, generic COPD severity tier, and localised symptom timeline vectors) alongside the raw text entry.
2. **Serverless Sanitation Layer:** The payload is routed via TLS 1.3 to a secure Firebase Cloud Function that sanitises inputs and blocks known prompt-injection vectors.
3. **Managed LLM Gateway (Amazon Bedrock):** The processed context is injected into a strict system-level preamble and parsed by the **Claude 3 Haiku** foundation engine.
4. **Token-Optimised Output:** The model generates low-latency, highly structured conversational responses optimised for immediate cognitive offloading on mobile viewports.

---

## 💬 Operational Feature Matrix

### 1. Linguistic De-Escalation & Crisis Grounding
When physical breathlessness induces immediate psychological panic, cognitive processing drops. The companion bypasses dense paragraph rendering to execute immediate, step-by-step behavioral coping sequences:
*   **Validation Preamble:** Directly acknowledges the user's emotional vulnerability to actively down-regulate sympathetic nervous system arousal.
*   **Pursed-Lip Breathing Coaching:** Delivers structured, visually separated pacing cues (e.g., *"Take a slow, deep breath in through your nose... out through your mouth"*), providing a path to stabilise respiration.

### 2. Proactive Metric Check-Ins (Scheduled Roadmap)
To reduce data friction and minimise the cognitive load of historical tracking, the companion drives engagement through smart prompts:
*   **Adaptive Reminders:** Seamlessly prompts users to log symptom fluctuations or verify medication adherence routines based on historical daily trends.
*   **Intuitive Logging Hooks:** Interfaces directly with the backend database collections, allowing swift conversational entries to translate effortlessly into structured numerical tracking trends.

---

## 🛡️ Privacy, Guardrails & Defensive AI Safety

Because the companion engages with a highly vulnerable user demographic, explicit safety firewalls are hardcoded into the runtime prompt configuration:

*   **Absolute Non-Clinical Boundaries:** The model is structurally forbidden from issuing diagnostic assertions, calculating lung capacities, suggesting medication routine alterations, or overriding professional clinical care paths.
*   **Emergency Escalation Protocols:** If chat inputs trigger severe safety thresholds (e.g., descriptions of acute cyanosis or unresponsive severe flare-ups), the model instantly overrides conversational flow to output explicit, localised emergency service directions (e.g., instructing the user to immediately contact NHS 111 or dial 999/A&E).
*   **Strict Data Sovereignty (UK GDPR):** Chat interactions passed through the Bedrock API gateway are anchored strictly to European regional availability zones governed by absolute data opt-out policies. No conversation text or user tokens are retained or utilised by downstream vendors for foundation model retraining.