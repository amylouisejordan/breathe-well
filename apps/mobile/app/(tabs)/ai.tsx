import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

const AiScreen = () => {
  const messages = [
    { id: 1, type: "user", text: "I’m feeling short of breath today." },
    { id: 2, type: "ai", text: "Try taking slow deep breaths for 5 minutes." },
    { id: 3, type: "user", text: "Thanks! Any tips for relaxation?" },
    { id: 4, type: "ai", text: "Consider a gentle walk outside or guided meditation." },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Companion</Text>
        <Text style={styles.subtext}>Get helpful breathing advice</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.type === "user" ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type a message..."
          style={styles.input}
          editable={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  userMessage: {
    backgroundColor: "#6c63ff",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#333",
  },
  inputBar: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  input: {
    fontSize: 16,
    color: "#888",
  },
});

export default AiScreen;