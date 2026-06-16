import React, { useCallback, useState } from "react";
import { router } from "expo-router";
import {
  View,
  RefreshControl,
  Pressable,
  Text,
  ActionSheetIOS,
} from "react-native";

import {
  Screen,
  Card,
  BodyText,
  Avatar,
  AvatarText,
  Row,
  ActionRow,
  ActionButtonSecondary,
} from "../(forum)/styled";

import { Container, Header, Subtext, Title, Divider } from "../history/styled";

import * as Haptics from "expo-haptics";

type Article = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  readTime: number;
};

const dummyArticles: Article[] = [
  {
    id: "1",
    title: "Breathe Your Way to Calm",
    body: "Discover how simple breathing techniques can lower stress in minutes. Follow our 4-7-8 guide and feel the difference today.",
    author: "Dr. Lila Chen",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 4,
  },
  {
    id: "2",
    title: "The Science of Micro-Meditation",
    body: "No time to meditate? Learn the 60-second reset that neuroscientists swear by. Perfect for busy commuters and desk workers.",
    author: "Sam Patel",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 3,
  },
  {
    id: "3",
    title: "Sleep Like a Pro",
    body: "Struggling to nod off? We break down the latest research on circadian rhythms, blue-light blocking, and pre-bed routines.",
    author: "Dr. Maya Singh",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 7,
  },
];

const ArticleCard = React.memo(({ article }: { article: Article }) => (
  <Pressable
    onPress={() => router.navigate(`/articles/${article.id}`)}
    style={({ pressed }) => ({
      width: "100%",
      transform: [{ scale: pressed ? 0.98 : 1 }],
      opacity: pressed ? 0.9 : 1,
    })}
  >
    <Card style={{ borderWidth: 1, borderColor: "#F4D6D2", borderRadius: 14 }}>
      <Row style={{ alignItems: "center", marginBottom: 4 }}>
        <Avatar style={{ backgroundColor: "#f3f0ff" }}>
          <AvatarText style={{ color: "#4a90e2" }}>
            {article.author.charAt(0)}
          </AvatarText>
        </Avatar>
        <Text
          style={{
            flex: 1,
            fontSize: 17,
            fontWeight: "700",
            color: "#333",
            marginLeft: 12,
          }}
        >
          {article.title}
        </Text>
      </Row>

      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <Text style={{ color: "#666", fontSize: 14 }}>by {article.author}</Text>
        <Text style={{ color: "#aaa", fontSize: 14, marginLeft: 8 }}>
          • {article.readTime} min read
        </Text>
      </View>

      <Divider />

      <BodyText numberOfLines={2} style={{ color: "#444" }}>
        {article.body}
      </BodyText>
    </Card>
  </Pressable>
));
ArticleCard.displayName = "ArticleCard";

const Empty = () => (
  <View style={{ alignItems: "center", marginTop: 60 }}>
    <Text style={{ fontSize: 64 }}>📚</Text>
    <Text style={{ marginTop: 12, color: "#666" }}>
      No articles yet – come back later!
    </Text>
  </View>
);

const ArticlesScreen = () => {
  const [articles] = useState<Article[]>(dummyArticles);
  const [refreshing, setRefreshing] = useState(false);
  const [sortMode, setSortMode] = useState<"newest" | "oldest">("newest");

  const sortArticles = (list: Article[], mode: typeof sortMode) =>
    [...list].sort((a, b) =>
      mode === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 800));
    setRefreshing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const showSortSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      { options: ["Newest", "Oldest", "Cancel"], cancelButtonIndex: 2 },
      (idx) => {
        if (idx === 0) setSortMode("newest");
        if (idx === 1) setSortMode("oldest");
      }
    );

  const sorted = sortArticles(articles, sortMode);

  return (
    <Container>
      <Header>
        <Title>Articles</Title>
        <Subtext>Read up on wellness, science, and stories</Subtext>
      </Header>

      <ActionRow>
        <ActionButtonSecondary onPress={showSortSheet}>
          <Text style={{ color: "#4a90e2", fontWeight: "600" }}>
            Sort: {sortMode === "newest" ? "Newest" : "Oldest"}
          </Text>
        </ActionButtonSecondary>
      </ActionRow>

      <Screen
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sorted.length === 0 ? (
          <Empty />
        ) : (
          sorted.map((a) => <ArticleCard key={a.id} article={a} />)
        )}
      </Screen>
    </Container>
  );
};

export default ArticlesScreen;
