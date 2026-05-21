import HelpArticle from "./_article";
import { Paragraph, Step } from "./styled";

const EditingEntries = () => {
  return (
    <HelpArticle title="Editing or deleting entries">
      <Paragraph>
        Mistakes happen - and that’s okay. You can edit or delete any symptom or
        medication entry you’ve logged.
      </Paragraph>

      <Step>1. Open your history screen</Step>
      <Step>2. Tap the entry you want to change</Step>
      <Step>3. Choose “Edit” or “Delete”</Step>

      <Paragraph>
        Editing helps keep your records accurate and useful.
      </Paragraph>
    </HelpArticle>
  );
};

export default EditingEntries;
