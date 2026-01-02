import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ForumScreen = () => {
  const posts = [
    { id: 1, title: "How do I track my breathing?", author: "User1" },
    { id: 2, title: "Tips for managing symptoms", author: "User2" },
    { id: 3, title: "Favorite breathing exercises", author: "User3" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forum</Text>
        <Text style={styles.subtext}>Connect with the community</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.card}>
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text style={styles.cardSubtext}>by {post.author}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#bbb"
              style={{ marginTop: 8 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cardSubtext: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default ForumScreen;
