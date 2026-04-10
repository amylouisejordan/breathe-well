import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, RefreshControl, Pressable } from "react-native";
import { load } from "../utils/storage";

import Animated, {
  FadeInUp,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import {
  Screen,
  Card,
  Subtitle,
  Timestamp,
  BodyText,
  Avatar,
  AvatarText,
  Row,
  ActionRow,
  ActionButton,
  ActionButtonText,
  ActionButtonSecondary,
  ActionButtonTextSecondary,
  SortDropdown,
  SortOption,
  SortOptionText,
  SortOptionTextActive,
} from "../(forum)/styled";
import {
  Container,
  Header,
  Subtext,
  Title,
  GraphLabel,
} from "../history/styled";

type ForumPost = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: number;
  replies: { text: string; date: number }[];
};

const AnimatedPostCard = ({
  post,
  index,
}: {
  post: ForumPost;
  index: number;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withTiming(0.97))}
      onPressOut={() => (scale.value = withTiming(1))}
      onPress={() => router.navigate(`/(forum)/${post.id}`)}
      style={{ width: "100%" }}
    >
      <Animated.View
        entering={FadeInUp.delay(index * 80)
          .duration(350)
          .springify()}
        style={[{ width: "100%" }, animatedStyle]}
      >
        <Card>
          <Row style={{ alignItems: "center" }}>
            <Avatar>
              <AvatarText>{post.author.charAt(0)}</AvatarText>
            </Avatar>

            <GraphLabel style={{ flex: 1, alignSelf: "center" }}>
              {post.title}
            </GraphLabel>
          </Row>

          <Subtitle style={{ marginTop: 6 }}>by {post.author}</Subtitle>
          <Timestamp>{new Date(post.createdAt).toLocaleString()}</Timestamp>

          <BodyText numberOfLines={2} style={{ marginTop: 12 }}>
            {post.body}
          </BodyText>
        </Card>
      </Animated.View>
    </Pressable>
  );
};

const ForumScreen = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMode, setSortMode] = useState<"newest" | "oldest" | "az" | "za">(
    "newest"
  );

  const fetchPosts = async () => {
    const stored = (await load("forum_posts")) || [];

    const sorted = [...stored].sort((a, b) => {
      switch (sortMode) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setPosts(sorted);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <Container>
      <Header>
        <Title accessibilityRole="header">Community Forum</Title>
        <Subtext>You’re among friends here - share, ask, or read along</Subtext>
      </Header>

      <ActionRow>
        <ActionButton onPress={() => router.push("/forum/new")}>
          <ActionButtonText>+ New Post</ActionButtonText>
        </ActionButton>
        <View style={{ width: "48%" }}>
          <ActionButtonSecondary onPress={() => setSortOpen(!sortOpen)}>
            <ActionButtonTextSecondary>Sort</ActionButtonTextSecondary>
          </ActionButtonSecondary>

          {sortOpen && (
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
            >
              <SortDropdown>
                <SortOption
                  onPress={() => {
                    setSortMode("newest");
                    setSortOpen(false);
                  }}
                >
                  {sortMode === "newest" ? (
                    <SortOptionTextActive>Newest → Oldest</SortOptionTextActive>
                  ) : (
                    <SortOptionText>Newest → Oldest</SortOptionText>
                  )}
                </SortOption>

                <SortOption
                  onPress={() => {
                    setSortMode("oldest");
                    setSortOpen(false);
                  }}
                >
                  {sortMode === "oldest" ? (
                    <SortOptionTextActive>Oldest → Newest</SortOptionTextActive>
                  ) : (
                    <SortOptionText>Oldest → Newest</SortOptionText>
                  )}
                </SortOption>

                <SortOption
                  onPress={() => {
                    setSortMode("az");
                    setSortOpen(false);
                  }}
                >
                  {sortMode === "az" ? (
                    <SortOptionTextActive>Title A → Z</SortOptionTextActive>
                  ) : (
                    <SortOptionText>Title A → Z</SortOptionText>
                  )}
                </SortOption>

                <SortOption
                  onPress={() => {
                    setSortMode("za");
                    setSortOpen(false);
                  }}
                >
                  {sortMode === "za" ? (
                    <SortOptionTextActive>Title Z → A</SortOptionTextActive>
                  ) : (
                    <SortOptionText>Title Z → A</SortOptionText>
                  )}
                </SortOption>
              </SortDropdown>
            </Animated.View>
          )}
        </View>
      </ActionRow>

      <Screen
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post, index) => (
          <AnimatedPostCard key={post.id} post={post} index={index} />
        ))}
      </Screen>
    </Container>
  );
};
export default ForumScreen;
