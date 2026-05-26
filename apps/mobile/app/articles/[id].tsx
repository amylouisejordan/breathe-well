import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, RefreshControl, ScrollView, View } from "react-native";
import { Divider } from "../styled";

const dummyArticles = [
  {
    id: "1",
    title: "Breathe Your Way to Calm",
    body: `Discover how simple breathing techniques can lower stress in minutes.\n\nFollow our 4-7-8 guide:\n\n1️⃣ Inhale through your nose for 4 seconds.\n2️⃣ Hold your breath for 7 seconds.\n3️⃣ Exhale through your mouth for 8 seconds.\n\nRepeat four cycles. Research shows this pattern activates the parasympathetic nervous system, reducing heart rate and blood pressure almost instantly.`,
    author: "Dr. Lila Chen",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    readTime: 4,
  },
  {
    id: "2",
    title: "The Science of Micro-Meditation",
    body: "No time to meditate? Learn the 60-second reset that neuroscientists swear by. Perfect for busy commuters and desk workers.",
    author: "Sam Patel",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    readTime: 3,
  },
  {
    id: "3",
    title: "Sleep Like a Pro",
    body: "Struggling to nod off? We break down the latest research on circadian rhythms, blue-light blocking, and pre-bed routines.",
    author: "Dr. Maya Singh",
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    readTime: 7,
  },
];

const ArticleDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };
  const { id } = useLocalSearchParams();
  const article = dummyArticles.find((a) => a.id === id);

  if (!article) return null;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1, backgroundColor: "#fafafb" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#f1f1f5",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#333" }}>
          {article.title}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <Text style={{ color: "#666", fontSize: 14, marginRight: 8 }}>
            by {article.author}
          </Text>

          <Text style={{ color: "#aaa", fontSize: 14 }}>
            •{" "}
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>

        <Divider />

        <Text style={{ fontSize: 16, lineHeight: 22, color: "#444" }}>
          {article.body}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ArticleDetailScreen;
