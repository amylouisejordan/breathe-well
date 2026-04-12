import React, { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import {
  View,
  RefreshControl,
  Pressable,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { load, save } from "../utils/storage";

import Animated, {
  FadeInUp,
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
} from "../(forum)/styled";
import {
  Container,
  Header,
  Subtext,
  Title,
  GraphLabel,
} from "../history/styled";

import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Haptics from "expo-haptics";

type ForumReply = { text: string; date: number };

type ForumPost = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: number;
  replies: ForumReply[];
};

const AnimatedPostCard = React.memo(
  ({ post, index }: { post: ForumPost; index: number }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const renderRightActions = useCallback(
      () => (
        <TouchableOpacity
          style={{
            backgroundColor: "#ef4444",
            justifyContent: "center",
            paddingHorizontal: 20,
            marginLeft: 8,
            borderRadius: 20,
          }}
          onPress={() => {
            console.log("archived", post.id);
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Archive</Text>
        </TouchableOpacity>
      ),
      [post.id]
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
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
              {post.replies.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "#6c63ff",
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {post.replies.length}
                  </Text>
                </View>
              )}

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
      </Swipeable>
    );
  }
);
AnimatedPostCard.displayName = "AnimatedPostCard";

const Empty = () => (
  <View style={{ alignItems: "center", marginTop: 60 }}>
    <Text style={{ fontSize: 64 }}>🎈</Text>
    <Text style={{ marginTop: 12, color: "#666" }}>
      No posts yet - be the first!
    </Text>
    <ActionButton style={{ marginTop: 20 }} onPress={() => router.push("/new")}>
      <ActionButtonText>+ New Post</ActionButtonText>
    </ActionButton>
  </View>
);

const SkeletonCard = ({ index }: { index: number }) => (
  <Animated.View
    entering={FadeInUp.delay(index * 80)
      .duration(350)
      .springify()}
    style={{ width: "100%", marginBottom: 12 }}
  >
    <Card style={{ backgroundColor: "#eee" }}>
      <Row>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#ddd",
          }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <View
            style={{
              height: 16,
              width: "60%",
              backgroundColor: "#ddd",
              borderRadius: 4,
            }}
          />
          <View
            style={{
              height: 12,
              width: "40%",
              backgroundColor: "#ddd",
              borderRadius: 4,
              marginTop: 6,
            }}
          />
        </View>
      </Row>
    </Card>
  </Animated.View>
);

export default function ForumScreen() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortMode, setSortMode] = useState<"newest" | "oldest" | "az" | "za">(
    "newest"
  );
  const [loading, setLoading] = useState(true);

  const sortPosts = (list: ForumPost[], mode: typeof sortMode) => {
    return [...list].sort((a, b) => {
      switch (mode) {
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
  };

  const fetchPosts = async () => {
    const stored = (await load("forum_posts")) || [];
    const sorted = sortPosts(stored, sortMode);
    setPosts(sorted);
    setLoading(false);
    try {
      await save("forum_posts", sorted);
    } catch {}
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  type SortMode = "newest" | "oldest" | "az" | "za";

  const sortMap: Record<SortMode, string> = {
    newest: "Newest",
    oldest: "Oldest",
    az: "A → Z",
    za: "Z → A",
  };

  const sortKeys = Object.keys(sortMap) as SortMode[];
  const sortLabels = sortKeys.map((k) => sortMap[k]);

  const showSortSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      { options: [...sortLabels, "Cancel"], cancelButtonIndex: 4 },
      (idx) => idx < 4 && setSortMode(sortKeys[idx])
    );

  return (
    <Container>
      <Header>
        <Title accessibilityRole="header">Community Forum</Title>
        <Subtext>You’re among friends here – share, ask, or read along</Subtext>
      </Header>

      <ActionRow>
        <ActionButton onPress={() => router.push("/new")}>
          <ActionButtonText>+ New Post</ActionButtonText>
        </ActionButton>

        <TouchableOpacity
          style={{
            width: "48%",
            height: 48,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            backgroundColor: "#fff",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
          onPress={showSortSheet}
        >
          <Text style={{ color: "#333", fontWeight: "600" }}>
            Sort: {sortMap[sortMode]}
          </Text>
        </TouchableOpacity>
      </ActionRow>

      <Screen
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
          </>
        ) : posts.length === 0 ? (
          <Empty />
        ) : (
          posts.map((post, index) => (
            <AnimatedPostCard key={post.id} post={post} index={index} />
          ))
        )}
      </Screen>
    </Container>
  );
}
