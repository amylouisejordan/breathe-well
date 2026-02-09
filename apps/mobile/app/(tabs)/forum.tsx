import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const ForumScreen = () => {
  const posts = [
    { id: 1, title: "How do I track my breathing?", author: "User1" },
    { id: 2, title: "Tips for managing symptoms", author: "User2" },
    { id: 3, title: "Favorite breathing exercises", author: "User3" },
  ];

  const hasPosts = posts.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Forum</Text>
        <Text style={styles.subtext}>
          You’re among friends here - share, ask, or read along
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {hasPosts ? (
          posts.map((post) => (
            <Link key={post.id} href={`/forum/${post.id}` as any} asChild>
              <TouchableOpacity
                style={styles.card}
                accessibilityRole="button"
                accessibilityLabel={`Open post: ${post.title}`}
              >
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text style={styles.cardSubtext}>by {post.author}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#bbb"
                  style={{ marginTop: 8 }}
                />
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={40} color="#aaa" />
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptySubtext}>
              Start a conversation to help others feel less alone
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        accessibilityRole="button"
        accessibilityLabel="Create a new post"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
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
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  cardSubtext: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    color: "#444",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default ForumScreen;
