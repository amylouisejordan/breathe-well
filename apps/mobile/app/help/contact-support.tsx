import React from "react";
import { Linking } from "react-native";
import HelpArticle from "./_article";
import { Button, ButtonText, Paragraph } from "../styled";

const ContactSupport = () => {
  const sendEmail = () => {
    const subject = encodeURIComponent("BreatheWell Support Request");
    const body = encodeURIComponent(
      "Hi BreatheWell team,\n\nI need help with..."
    );
    Linking.openURL(
      `mailto:support@breathewell.app?subject=${subject}&body=${body}`
    );
  };

  return (
    <HelpArticle title="Contact support">
      <Paragraph>
        If something isn’t working or you need help, we’re here for you.
      </Paragraph>

      <Button
        onPress={sendEmail}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Send email to support"
        accessibilityHint="Opens your default email application to send a support request message"
      >
        <ButtonText>Send email to support</ButtonText>
      </Button>
    </HelpArticle>
  );
};

export default ContactSupport;
