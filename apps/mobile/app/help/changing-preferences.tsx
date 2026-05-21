import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const ChangingPreferences = () => {
  return (
    <HelpArticle title="How to change your preferences">
      <Paragraph>
        You can personalise BreatheWell to match your needs and comfort level.
      </Paragraph>

      <Step>1. Open the Profile tab</Step>
      <Step>2. Tap “Breathing preferences”</Step>
      <Step>3. Adjust your settings</Step>
      <Step>4. Save your changes</Step>

      <Paragraph>
        Your preferences help tailor the app to your breathing style and energy
        levels.
      </Paragraph>
    </HelpArticle>
  );
};

export default ChangingPreferences;
