import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Paragraph, Step } from "./styled";

const HowToLogMedication = () => {
  return (
    <HelpArticle title="How to log medication">
      <Paragraph>
        Logging your medication helps you keep track of how often you use your
        inhalers, tablets, or capsules. It can also help you notice patterns and
        share accurate information with your healthcare team.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Six steps to log your medication"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 1: Open the Medication tab"
        >
          1. Open the Medication tab
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 2: Tap Add medication entry"
        >
          2. Tap “Add medication entry”
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 3: Choose a saved medication from your list, or type one manually"
        >
          3. Choose a saved medication from your list, or type one manually
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 4: Adjust the dosage if it’s different from your usual amount"
        >
          4. Adjust the dosage if it’s different from your usual amount
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 5: Add any notes you want to remember"
        >
          5. Add any notes you want to remember
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 6: Save your entry"
        >
          6. Save your entry
        </Step>
      </View>

      <Paragraph>
        You can view all your medication logs in the Medication History screen.
        This helps you understand your routine and spot changes over time.
      </Paragraph>
    </HelpArticle>
  );
};

export default HowToLogMedication;
