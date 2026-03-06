import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, RefreshControl } from "react-native";
import { load } from "../utils/storage";
import {
  Screen,
  Card,
  Title,
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
} from "../forum/styled";
import { Container, Header, Subtext } from "../history/styled";

type ForumPost = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: number;
  replies: { text: string; date: number }[];
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
        <Title>Community Forum</Title>
        <Subtext>You’re among friends here - share, ask, or read along</Subtext>
      </Header>

      <ActionRow>
        <Link href="/forum/new" asChild>
          <ActionButton>
            <ActionButtonText>+ New Post</ActionButtonText>
          </ActionButton>
        </Link>

        <View style={{ width: "48%" }}>
          <ActionButtonSecondary onPress={() => setSortOpen(!sortOpen)}>
            <ActionButtonTextSecondary>Sort</ActionButtonTextSecondary>
          </ActionButtonSecondary>

          {sortOpen && (
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
          )}
        </View>
      </ActionRow>

      <Screen
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post) => (
          <Link key={post.id} href={`/forum/${post.id}`} asChild>
            <Card>
              <Row>
                <Avatar>
                  <AvatarText>{post.author.charAt(0)}</AvatarText>
                </Avatar>

                <Title style={{ flex: 1 }}>{post.title}</Title>
              </Row>

              <Subtitle style={{ marginTop: 6 }}>by {post.author}</Subtitle>
              <Timestamp>{new Date(post.createdAt).toLocaleString()}</Timestamp>

              <BodyText numberOfLines={2} style={{ marginTop: 12 }}>
                {post.body}
              </BodyText>
            </Card>
          </Link>
        ))}
      </Screen>
    </Container>
  );
};
export default ForumScreen;
