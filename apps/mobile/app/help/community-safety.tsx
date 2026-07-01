import React from "react";
import HelpArticle from "./_article";
import { View } from "react-native";
import { Step } from "./styled";
import { Paragraph } from "../styled";

const CommunitySafety = () => {
  return (
    <HelpArticle title="Staying safe in the community">
      <Paragraph>
        Living with COPD can make busy environments feel overwhelming. These
        tips can help you stay safe and confident when you`re out and about.
      </Paragraph>

      <View
        accessibilityRole="list"
        accessibilityLabel="Community safety recommendations and tips"
        style={{ marginVertical: 12 }}
      >
        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Carry your reliever inhaler with you"
        >
          • Carry your reliever inhaler with you
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Avoid smoky or polluted areas when possible"
        >
          • Avoid smoky or polluted areas when possible
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Take breaks if you feel breathless"
        >
          • Take breaks if you feel breathless
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Let someone know if you're feeling unwell"
        >
          • Let someone know if you`re feeling unwell
        </Step>

        <Step
          accessible={true}
          accessibilityRole="listitem"
          accessibilityLabel="Keep your phone charged in case you need help"
        >
          • Keep your phone charged in case you need help
        </Step>
      </View>

      <Paragraph>
        If you ever feel very unwell or unsafe, reach out to someone you trust
        or contact local services who can help you right away.
      </Paragraph>
    </HelpArticle>
  );
};

export default CommunitySafety;
