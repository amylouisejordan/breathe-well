import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Paragraph, Step } from "./styled";

const DataPrivacy = () => {
  return (
    <HelpArticle title="Is my data private?">
      <Paragraph>
        Your wellbeing data is personal, and we treat it with care. BreatheWell
        stores your information securely and never shares it without your
        permission.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Key data privacy pillars"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Your logs stay on your device unless you sync them"
        >
          • Your logs stay on your device unless you sync them
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="You control what you share"
        >
          • You control what you share
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="You can delete your data at any time"
        >
          • You can delete your data at any time
        </Step>
      </View>

      <Paragraph>
        For full details, visit the Privacy & Data section in your app settings.
      </Paragraph>
    </HelpArticle>
  );
};

export default DataPrivacy;
