# 🫁 BreatheWell

![Progress](https://img.shields.io/badge/status-in--progress-blue)
![Module](https://img.shields.io/badge/Module-Dissertation-purple)

> **Breathe better. Feel connected.**  
> A mobile intervention uniting clinical self-management with empathetic digital companionship for individuals living with Chronic Obstructive Pulmonary Disease (COPD).

---

## 🎓 Academic Overview

This repository houses the software prototype for my final-year dissertation project submitted in partial fulfilment of the requirements for the degree of **BSc (Hons) Digital & Technology Solutions (Software Engineering)** at the **University of Suffolk**.

The study explores how cross-platform mobile frameworks and serverless generative AI infrastructures can mitigate the unaddressed psychosomatic feedback loops of chronic illness — specifically targeting the clinical drivers of breathlessness alongside the psychosocial challenges of social isolation and low self-efficacy.

> ### 🤍 Project Dedication
> This project is affectionately dedicated to the memory of my **Uncle Jay** and my **Nan**, who both passed away from COPD. Their lived experiences profoundly illuminated the critical gaps in emotional and physical support for vulnerable patients. This software is built to honor their memory by proving that technology can - and should - be engineered with compassion.

---

## 📖 Operational Documentation

To explore the user interface mechanics, system workflows, and interactive components of the prototype application, please refer to the comprehensive **[BreatheWell Client User Guide](./docs/user-guide.md)**. This guide highlights feature navigation and operational workflows mapped to core engineering requirements.

---

## 📆 Development History & Tracking

To trace the iterative growth of this MVP, please review the project's **[Changelog](./CHANGELOG.md)**. This log captures specific technical achievements made over the development lifecycle.

---

## 🛠️ Core Features

The BreatheWell MVP integrates five primary operational tabs engineered specifically to optimise cognitive load and match older-adult accessibility paradigms:

*   **💬 AI Conversational Companion:** Powered by Amazon Bedrock, providing real-time, low-intensity emotional reassurance, active linguistic de-escalation, and non-invasive behavioral pacing (e.g., Pursed-Lip Breathing coaching) during panic windows. For a comprehensive breakdown of prompt safety, system guardrails, and cloud architecture, see the dedicated [AI Companion Deep Dive](./docs/companion.md)
*   **👥 Real-Time Community Forum:** A secure, digital forum to foster peer-to-peer validation without the vulnerability of external social web portals.
*   **📊 Cross-Dimensional Logging:** A unified, simple tracking layout allowing swift entry recording for physical symptom severity, medication compliance schedules, and daily psychological wellbeing parameters.
*   **📅 Longitudinal Trend Dashboards:** Interactive chronological data visualisations configured across day, week, and month matrices to assist patients in tracking trigger distributions and sharing patterns during clinical reviews.
*   **📚 Curated Resource Hub:** An extensible library of bite-sized, accessible educational content targeting stress management, environmental trigger awareness, and respiratory health literacy.

---

## 🏗️ Technical Stack Architectural Matrix

| Architectural Layer | Chosen Technology | Engineering Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | `React Native` + `TypeScript` | Shared JavaScript codebases to achieve high-performance native rendering across iOS 14+ and Android 10+. |
| **App Tooling / Build** | `Expo SDK 51` | Managed workflow, over-the-air updates, and local device-agnostic builds via VS Code. |
| **Navigation & Routing** | `Expo Router` | Lightweight, file-system-based routing layer optimising modular component design patterns. |
| **Backend & Cloud BaaS** | `Google Firebase` | Serverless data tier managing user profiles, cloud compute steps, and real-time network states. |
| **Database Engines** | `Cloud Firestore` | NoSQL path evaluation utilising offline-first localised state caching for intermittent mobile coverage. |
| **Generative AI Gateway**| `Amazon Bedrock` | Enterprise managed LLM API eliminating GPU container DevOps infrastructure requirements. |
| **Foundation Language Model**| `Claude 3 Haiku` | Highly scalable, low-latency performance profile ideal for cellular-edge mobile execution speeds. |

---

## 🛡️ Security, Governance & AI Safety Guardrails

Because this application processes Special Category Health Data, defensive engineering was prioritised at every step:
*   **Strict Data Isolation:** Governed at the database level via path-evaluated Firebase Security Rules, blocking wildcard access and forcing authorisation checks tied strictly to individual token handshakes.
*   **Regional Residency Compliance:** The database instance is provisioned exclusively within the GCP `europe-west2` (London) region to enforce absolute data sovereignty under the UK Data Protection Act 2018 / UK GDPR.
*   **Hardware-Backed Storage:** Highly sensitive credential objects and session parameters utilise `Expo SecureStore` for sandbox isolation via iOS Keychain and Android KeyStore using AES-256 encryption keys.
*   **Prompt Injection Insulation:** Isolation vectors and strict XML wrappers protect the Amazon Bedrock foundational pre-amble, preventing jailbreaking attempts and strictly locking the agent's context boundaries to non-diagnostic, low-intensity companion boundaries.

---

## 🧪 Active Research Themes

1. **Human-Computer Interaction in Chronic Illness:** Mitigating physical and cognitive barriers during acute respiratory duress.
2. **Digital Inclusion & Accessibility:** Achieving absolute compliance with WCAG 2.2 AA target scaling, high-contrast color balances, and minimum 48x48 dp touch maps.
3. **Automated Behavioral Coaching:** Validating the efficacy of low-intensity LLM interactions to safely break panic feedback cycles outside of standard clinical settings.