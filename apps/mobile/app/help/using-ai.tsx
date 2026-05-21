import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const UsingAI = () => {
  return (
    <HelpArticle title="Using the AI companion">
      <Paragraph>
        The AI companion is here to help you understand your symptoms,
        medication, and wellbeing. It can explain things in simple language and
        offer gentle guidance.
      </Paragraph>

      <Step>• Ask questions about symptoms</Step>
      <Step>• Get explanations of inhalers and treatments</Step>
      <Step>• Learn how to use the app more effectively</Step>
      <Step>• Get emotional support and reassurance</Step>

      <Paragraph>
        The AI companion is not a medical professional, but it can help you feel
        more confident and informed.
      </Paragraph>
    </HelpArticle>
  );
};

export default UsingAI;
