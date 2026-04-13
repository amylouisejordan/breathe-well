import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  View,
  RefreshControl,
  Pressable,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { getForumPosts } from "../../utils/forumFirestore";

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

import * as Haptics from "expo-haptics";

type ForumReply = { text: string; date: number };

export type ForumPost = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: number;
  replies: ForumReply[];
};

const PostCard = React.memo(({ post }: { post: ForumPost }) => {
  return (
    <Pressable
      onPress={() => router.navigate(`/(forum)/${post.id}`)}
      style={{ width: "100%" }}
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
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Screen>
    </Container>
  );
}
