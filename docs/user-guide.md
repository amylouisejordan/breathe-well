# 📖 BreatheWell Client User Guide

Welcome to the BreatheWell user guide. This document provides an operational overview of the mobile application interface, detailing how patients navigate features, log health metrics, and interact with the AI companion safely. 

The user interface has been explicitly designed to meet **WCAG 2.2 AA accessibility standards**, prioritising high-contrast typography, predictable navigation structures, and large, low-friction tap targets (minimum $48 \times 48$ dp) optimised for older adults or users experiencing acute physical fatigue.

---

## 🗺️ Interface Navigation Architecture

BreatheWell utilises a persistent bottom tab bar configured via `Expo Router`. This ensures that no matter where a user is within the application, they can return to core features in a single tap, drastically reducing cognitive offloading pathways.

[💬 AI Chat](#-interacting-with-the-ai-companion) | [📊 Dashboard](#-reviewing-longitudinal-trends) | [👥 Forum](#-utilising-the-peer-community-forum) | [📚 Resources](#-accessing-the-curated-resource-hub)

---

## 💬 Interacting with the AI Companion

The AI Companion is engineered as an active emotional anchor and behavioral coach, rather than a diagnostic tool. 

### Standard Conversational Support
1. Tap the **AI Chat** icon in the tab bar.
2. Type an entry or query into the input field at the bottom of the screen.
3. Tap **Send**. The response is processed safely and securely (streamed with optimised edge latency via Amazon Bedrock).

### 🚨 Crisis Pacing Protocol (Acute Breathlessness)
If you are experiencing sudden breathlessness or heightening anxiety, the system is trained to deliver immediate, structured linguistic de-escalation:
*   **Action:** Type a panic-indicative phrase (e.g., *"I can't breathe"* or *"I am panicking"*).
*   **System Behavior:** The AI will immediately isolate its responses into bite-sized, visually spaced cues designed for low-cognition reading.
*   **Coaching Sequence:** Follow the step-by-step **Pursed-Lip Breathing** guidance displayed on the screen (Inhale slowly through the nose, exhale twice as long through pursed lips) to stabilise respiration.

> ⚠️ **Safety Notice & Emergency Overrides:** The AI companion cannot alter your medication scripts or diagnose an exacerbation. If your symptoms are severe and unresponsive, or if you input indicators of a critical emergency (e.g., severe cyanosis), the interface will immediately lock standard chat and display explicit red-alert shortcuts to dial **999** or contact **NHS 111**.

---

## 📊 Cross-Dimensional Health Logging

To minimise data friction, logging physical and psychological metrics is consolidated into a simplified, step-by-step modal view.

### How to Log a Daily Entry:
1. Navigate to the **Dashboard** tab and tap the **"+" (Log Metrics)** floating action button.
2. Select which health vector you wish to log from the menu option:
    *   **Symptoms:** Track physical trends such as breathlessness, coughing intensity, or fatigue levels.
    *   **Medication:** Log daily prescription compliance or rescue inhaler usage.
    *   **Wellbeing:** Record psychological wellness, stress scales, or anxiety indicators.
3. Complete the three responsive input boxes or sliders to enter your quantitative data values.
4. Tap **Save Entry**. Your details are instantly saved to the device's offline local cache and securely backed up to our protected database servers when your internet connection is active (backed up to a secure UK-based Firestore instance via encrypted payloads).

---

## 📅 Reviewing Longitudinal Trends

Visualising your historic health patterns allows you to identify environmental or psychological triggers over time and share them easily during clinical reviews.

*   **Switching Views:** At the top of the Dashboard, toggle between **Day**, **Week**, and **Month** viewing matrices to shift your chronological charting windows.
*   **Pattern Matching:** Use these graphs to note patterns where high physical symptom logging directly aligns with low psychological wellbeing ratings, helping you visually track the impact of the psychosomatic feedback loop.

---

## 👥 Utilising the Peer Community Forum

The Community Forum provides a safe, ring-fenced space to exchange peer-to-peer validation without exposing your identity to commercial social media networks.

### Reading and Posting Threads:
1. Tap the **Forum** tab in the main navigation bar.
2. **Browsing:** Scroll through the reverse-chronological feed of peer discussions, which updates instantly as users interact (managed via live database snapshot synchronisation).
3. **Creating a Thread:** Tap **New Post**, input a title and your main message body, and select an anonymous display alias if desired.
4. Tap **Publish**. 

### Engaging with Existing Posts:
1. Tap directly on any post card from the main feed to open up its expanded thread view.
2. Scroll to the bottom of the active conversation and press the **+ Comment** button.
3. Fill in your comment text inside the provided text area field and tap the **Submit** button to instantly add your reply to the thread.

> 🔒 **Privacy & Moderation Guardrails:** All data passed through the forum is strictly isolated from unauthorised external access (governed via path-evaluated database security rules). Please refrain from sharing personally identifiable information (PII) such as home addresses or specific clinical clinic locations to maintain absolute data sovereignty compliance.

---

## 📚 Accessing the Curated Resource Hub

The Resource Hub serves as a lightweight, text-scalable repository of educational material aimed at boosting lifestyle self-efficacy.
