import { View, Text, StyleSheet, ScrollView } from "react-native";

interface HelpArticleProps {
  title: string;
  children: React.ReactNode;
}

export default function HelpArticle({ title, children }: HelpArticleProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6c63ff",
    marginBottom: 20,
  },
});
