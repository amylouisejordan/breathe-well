import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { save, load } from "../../utils/storage";

type ForumReply = { text: string; date: number };

type ForumPost = {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: number;
  replies: ForumReply[];
};

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const numericId = Number(id);

  const [post, setPost] = useState<ForumPost | null>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const posts: ForumPost[] = (await load("forum_posts")) || [];
      const found = posts.find((p) => p.id === numericId) || null;
      setPost(found);
    };
    fetch();
  }, [numericId]);

  const addReply = async () => {
    if (!reply.trim()) return;

    const posts: ForumPost[] = (await load("forum_posts")) || [];

    const updated = posts.map((p) =>
      p.id === numericId
        ? {
            ...p,
            replies: [...p.replies, { text: reply, date: Date.now() }],
          }
        : p
    );

    await save("forum_posts", updated);
    setPost(updated.find((p) => p.id === numericId) || null);
    setReply("");
  };

  if (!post) return null;

  return (
    <ScrollView
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
          {post.title}
        </Text>

        <Text style={{ color: "#666", marginTop: 6, fontSize: 15 }}>
          by {post.author}
        </Text>

        <Text style={{ color: "#aaa", marginTop: 4, fontSize: 13 }}>
          {new Date(post.createdAt).toLocaleString()}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#f1f1f5",
          marginBottom: 28,
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 22, color: "#444" }}>
          {post.body}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          color: "#6c63ff",
          marginBottom: 12,
        }}
      >
        Replies ({post.replies.length})
      </Text>

      {post.replies.map((r, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#f1f1f5",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 15, color: "#333", marginBottom: 6 }}>
            {r.text}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>
            {new Date(r.date).toLocaleString()}
          </Text>
        </View>
      ))}

      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#f1f1f5",
          marginTop: 20,
        }}
      >
        <TextInput
          placeholder="Write a reply..."
          value={reply}
          onChangeText={setReply}
          multiline
          style={{
            backgroundColor: "#fafafa",
            padding: 14,
            borderRadius: 12,
            minHeight: 80,
            textAlignVertical: "top",
            fontSize: 15,
            color: "#333",
          }}
        />

        <TouchableOpacity
          onPress={addReply}
          style={{
            backgroundColor: "#6c63ff",
            padding: 14,
            borderRadius: 12,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PostDetail;
