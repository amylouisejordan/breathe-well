import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Paragraph, Step } from "./styled";

const EditingEntries = () => {
  return (
    <HelpArticle title="Editing or deleting entries">
      <Paragraph>
        Mistakes happen - and that’s okay. You can edit or delete any symptom or
        medication entry you’ve logged.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Three steps to edit or delete logged data"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 1: Open your history screen"
        >
          1. Open your history screen
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 2: Tap the entry you want to change"
        >
          2. Tap the entry you want to change
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 3: Choose Edit or Delete"
        >
          3. Choose “Edit” or “Delete”
        </Step>
      </View>

      <Paragraph>
        Editing helps keep your records accurate and useful.
      </Paragraph>
    </HelpArticle>
  );
};

export default EditingEntries;
