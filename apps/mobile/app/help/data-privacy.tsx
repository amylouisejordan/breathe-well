import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const DataPrivacy = () => {
  return (
    <HelpArticle title="Is my data private?">
      <Paragraph>
        Your wellbeing data is personal, and we treat it with care. BreatheWell
        stores your information securely and never shares it without your
        permission.
      </Paragraph>

      <Step>• Your logs stay on your device unless you sync them</Step>
      <Step>• You control what you share</Step>
      <Step>• You can delete your data at any time</Step>

      <Paragraph>
        For full details, visit the Privacy & Data section in your app settings.
      </Paragraph>
    </HelpArticle>
  );
};

export default DataPrivacy;
