import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const CommunitySafety = () => {
  return (
    <HelpArticle title="Staying safe in the community">
      <Paragraph>
        Living with COPD can make busy environments feel overwhelming. These
        tips can help you stay safe and confident when you`re out and about.
      </Paragraph>

      <Step>• Carry your reliever inhaler with you</Step>
      <Step>• Avoid smoky or polluted areas when possible</Step>
      <Step>• Take breaks if you feel breathless</Step>
      <Step>• Let someone know if you`re feeling unwell</Step>
      <Step>• Keep your phone charged in case you need help</Step>

      <Paragraph>
        If you ever feel very unwell or unsafe, reach out to someone you trust
        or contact local services who can help you right away.
      </Paragraph>
    </HelpArticle>
  );
};

export default CommunitySafety;
