import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const HowToLogSymptoms = () => {
  return (
    <HelpArticle title="How to log symptoms">
      <Paragraph>
        Logging symptoms helps you spot patterns and understand how your COPD
        changes day‑to‑day.
      </Paragraph>

      <Step>1. Open the Symptoms tab</Step>
      <Step>2. Tap “Add symptom”</Step>
      <Step>3. Choose your symptoms from the list</Step>
      <Step>4. Add any notes that feel important</Step>
      <Step>5. Save your entry</Step>

      <Paragraph>
        You can view your full history anytime in the Symptom History screen.
      </Paragraph>
    </HelpArticle>
  );
};

export default HowToLogSymptoms;
