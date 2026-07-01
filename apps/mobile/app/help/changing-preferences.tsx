import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Step } from "./styled";
import { Paragraph } from "../styled";

const ChangingPreferences = () => {
  return (
    <HelpArticle title="How to change your preferences">
      <Paragraph>
        You can personalise BreatheWell to match your needs and comfort level.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Four steps to update your breathing configurations"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 1: Open the Profile tab"
        >
          1. Open the Profile tab
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 2: Tap Breathing preferences"
        >
          2. Tap “Breathing preferences”
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 3: Adjust your settings"
        >
          3. Adjust your settings
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 4: Save your changes"
        >
          4. Save your changes
        </Step>
      </View>

      <Paragraph>
        Your preferences help tailor the app to your breathing style and energy
        levels.
      </Paragraph>
    </HelpArticle>
  );
};

export default ChangingPreferences;
