import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const HowToLogMedication = () => {
  return (
    <HelpArticle title="How to log medication">
      <Paragraph>
        Logging your medication helps you keep track of how often you use your
        inhalers, tablets, or capsules. It can also help you notice patterns and
        share accurate information with your healthcare team.
      </Paragraph>

      <Step>1. Open the Medication tab</Step>
      <Step>2. Tap “Add medication entry”</Step>
      <Step>
        3. Choose a saved medication from your list, or type one manually
      </Step>
      <Step>4. Adjust the dosage if it’s different from your usual amount</Step>
      <Step>5. Add any notes you want to remember</Step>
      <Step>6. Save your entry</Step>

      <Paragraph>
        You can view all your medication logs in the Medication History screen.
        This helps you understand your routine and spot changes over time.
      </Paragraph>
    </HelpArticle>
  );
};

export default HowToLogMedication;
