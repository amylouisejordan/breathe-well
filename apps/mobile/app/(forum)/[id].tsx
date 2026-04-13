import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { getPostById, addCommentToPost } from "../../utils/forumFirestore";
import { Avatar, AvatarText } from "./styled";
import { Divider } from "../history/styled";

type Comment = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
};

type ForumPost = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  comments: Comment[];
};

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [reply, setReply] = useState("");

  const fetchPost = async () => {
    const data = await getPostById(id as string);
    setPost(data);
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addReply = async () => {
    if (!reply.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: reply,
      author: "You",
      createdAt: new Date().toISOString(),
    };

    await addCommentToPost(id as string, newComment);
    setReply("");
    fetchPost();
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

        <View style={{ flexDirection: "row", marginTop: 6 }}>
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

        <Divider />

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
        Comments ({post.comments?.length || 0})
      </Text>

      {post.comments?.map((c) => (
        <View
          key={c.id}
          style={{
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#eee",
            marginBottom: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar style={{ backgroundColor: "#f3f0ff", marginRight: 10 }}>
              <AvatarText style={{ color: "#6c63ff" }}>
                {c.author.charAt(0)}
              </AvatarText>
            </Avatar>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: "#333" }}>
                {c.author}
              </Text>

              <Text style={{ color: "#aaa", fontSize: 13 }}>
                {new Date(c.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 10, color: "#444", lineHeight: 20 }}>
            {c.text}
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
          placeholder="Write a comment..."
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
            Comment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PostDetail;
