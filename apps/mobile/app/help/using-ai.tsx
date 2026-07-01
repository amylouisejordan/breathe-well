import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Step } from "./styled";
import { Paragraph } from "../styled";

const UsingAI = () => {
  return (
    <HelpArticle title="Using the AI companion">
      <Paragraph>
        The AI companion is here to help you understand your symptoms,
        medication, and wellbeing. It can explain things in simple language and
        offer gentle guidance.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Capabilities of the AI companion"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Ask questions about symptoms"
        >
          • Ask questions about symptoms
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Get explanations of inhalers and treatments"
        >
          • Get explanations of inhalers and treatments
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Learn how to use the app more effectively"
        >
          • Learn how to use the app more effectively
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Get emotional support and reassurance"
        >
          • Get emotional support and reassurance
        </Step>
      </View>

      <Paragraph>
        The AI companion is not a medical professional, but it can help you feel
        more confident and informed.
      </Paragraph>
    </HelpArticle>
  );
};

export default UsingAI;
