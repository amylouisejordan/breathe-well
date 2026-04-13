import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  View,
  RefreshControl,
  Pressable,
  Text,
  ActionSheetIOS,
} from "react-native";
import { getForumPosts } from "../../utils/forumFirestore";

import {
  Screen,
  Card,
  BodyText,
  Avatar,
  AvatarText,
  Row,
  ActionRow,
  ActionButton,
  ActionButtonText,
  ActionButtonSecondary,
} from "../(forum)/styled";

import {
  Container,
  Header,
  Subtext,
  Title,
  GraphLabel,
} from "../history/styled";

import * as Haptics from "expo-haptics";

export type ForumPost = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  comments: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }[];
};

const PostCard = React.memo(({ post }: { post: ForumPost }) => {
  return (
    <Pressable
      onPress={() => router.navigate(`/(forum)/${post.id}`)}
      style={({ pressed }) => ({
        width: "100%",
        transform: [{ scale: pressed ? 0.98 : 1 }],
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <Card
        style={{
          borderWidth: 1,
          borderColor: "#eee",
          borderRadius: 14,
        }}
      >
        {post.comments.length > 0 && (
          <View
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "#6c63ff",
              borderRadius: 999,
              paddingHorizontal: 10,
              paddingVertical: 4,
              marginTop: 3,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {post.comments.length}
            </Text>
          </View>
        )}

        <Row style={{ alignItems: "center", marginBottom: 4 }}>
          <Avatar style={{ backgroundColor: "#f3f0ff", marginTop: -10 }}>
            <AvatarText style={{ color: "#6c63ff" }}>
              {post.author.charAt(0)}
            </AvatarText>
          </Avatar>

          <GraphLabel
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: "700",
              color: "#333",
              marginTop: 5,
            }}
          >
            {post.title}
          </GraphLabel>
        </Row>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#666", fontSize: 14, marginRight: 8 }}>
            by {post.author}
          </Text>

          <Text style={{ color: "#aaa", fontSize: 14 }}>
            •{" "}
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#f1f1f5",
            marginVertical: 10,
          }}
        />

        <BodyText
          numberOfLines={2}
          style={{
            color: "#444",
          }}
        >
          {post.body}
        </BodyText>
      </Card>
    </Pressable>
  );
});
PostCard.displayName = "PostCard";

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
  <View style={{ width: "100%", marginBottom: 12 }}>
    <Card
      style={{
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 14,
      }}
    >
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
  </View>
);

export default function ForumScreen() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortMode, setSortMode] = useState<"newest" | "oldest" | "az" | "za">(
    "newest"
  );
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMode])
  );

  const sortPosts = (list: ForumPost[], mode: typeof sortMode) => {
    return [...list].sort((a, b) => {
      switch (mode) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

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
    setLoading(true);

    const data = await getForumPosts();
    const sorted = sortPosts(data, sortMode);

    setPosts(sorted);
    setLoading(false);
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

        <ActionButtonSecondary onPress={showSortSheet}>
          <Text style={{ color: "#6c63ff", fontWeight: "600" }}>
            Sort: {sortMap[sortMode]}
          </Text>
        </ActionButtonSecondary>
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
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Screen>
    </Container>
  );
}
