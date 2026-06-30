import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Paragraph, Step } from "./styled";

const HowToLogSymptoms = () => {
  return (
    <HelpArticle title="How to log symptoms">
      <Paragraph>
        Logging symptoms helps you spot patterns and understand how your COPD
        changes day‑to‑day.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Five steps to log your health symptoms"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 1: Open the Symptoms tab"
        >
          1. Open the Symptoms tab
        </Step>
        
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 2: Tap Add symptom"
        >
          2. Tap “Add symptom”
        </Step>
        
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 3: Choose your symptoms from the list"
        >
          3. Choose your symptoms from the list
        </Step>
        
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 4: Add any notes that feel important"
        >
          4. Add any notes that feel important
        </Step>
        
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Step 5: Save your entry"
        >
          5. Save your entry
        </Step>
      </View>

      <Paragraph>
        You can view your full history anytime in the Symptom History screen.
      </Paragraph>
    </HelpArticle>
  );
};

export default HowToLogSymptoms;
