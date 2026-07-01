import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  RefreshControl,
  Modal,
  AccessibilityInfo,
} from "react-native";
import { getPostById, addCommentToPost } from "../../utils/forumFirestore";
import { Divider, AvatarText, Avatar } from "../styled";

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

type UserProfile = {
  username: string;
  joinDate: string;
};

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    AccessibilityInfo.announceForAccessibility("Refreshing post content.");
    fetchPost().finally(() => {
      setRefreshing(false);
      AccessibilityInfo.announceForAccessibility("Post content updated.");
    });
  };

  const fetchPost = async () => {
    const data = await getPostById(id as string);
    setPost(data);
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAvatarPress = (username: string) => {
    const mockProfile: UserProfile = {
      username: username,
      joinDate: "Jan 2024", // Mocked join date
    };
    setSelectedUser(mockProfile);
    setIsModalVisible(true);
  };

  const addReply = async () => {
    if (!reply.trim() || sending) return;
    setSending(true);
    try {
      await addCommentToPost(id as string, {
        id: Date.now().toString(),
        text: reply.trim(),
        author: "You",
        createdAt: new Date().toISOString(),
      });
      setReply("");
      await fetchPost();
      AccessibilityInfo.announceForAccessibility(
        "Comment posted successfully."
      );
    } catch {
      AccessibilityInfo.announceForAccessibility("Failed to post comment.");
    } finally {
      setSending(false);
    }
  };

  if (!post) return null;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1, backgroundColor: "#fafafb" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
    >
      <View
        accessibilityRole="summary"
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#f1f1f5",
          marginBottom: 20,
        }}
      >
        <Text
          accessibilityRole="header"
          style={{ fontSize: 22, fontWeight: "700", color: "#333" }}
        >
          {post.title}
        </Text>

        <View
          style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => handleAvatarPress(post.author)}
            accessibilityRole="button"
            accessibilityLabel={`View profile for author ${post.author}`}
            accessibilityHint="Opens a profile summary sheet"
          >
            <Text
              style={{
                color: "#4a90e2",
                fontSize: 14,
                marginRight: 8,
                fontWeight: "600",
              }}
            >
              by {post.author}
            </Text>
          </TouchableOpacity>

          <Text
            accessibilityLabel={`Posted on ${new Date(
              post.createdAt
            ).toLocaleDateString()}`}
            style={{ color: "#aaa", fontSize: 14 }}
          >
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
        accessibilityRole="header"
        style={{
          fontSize: 17,
          fontWeight: "700",
          color: "#4a90e2",
          marginBottom: 12,
        }}
      >
        Comments ({post.comments?.length || 0})
      </Text>

      {post.comments?.map((c) => (
        <View
          key={c.id}
          accessible={true}
          accessibilityLabel={`Comment by ${c.author}, text: ${
            c.text
          }, posted on ${new Date(c.createdAt).toLocaleDateString()}`}
          style={{
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#F4D6D2",
            marginBottom: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handleAvatarPress(c.author)}
              accessibilityRole="button"
              accessibilityLabel={`View ${c.author}'s profile`}
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Avatar
                style={{ backgroundColor: "#f3f0ff", marginRight: 10 }}
                importantForAccessibility="no"
              >
                <AvatarText style={{ color: "#4a90e2" }}>
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
            </TouchableOpacity>
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
          accessibilityLabel="Write a comment text input field"
          accessibilityHint="Type your response to this forum post here"
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
          disabled={sending || !reply.trim()}
          accessibilityRole="button"
          accessibilityState={{
            disabled: sending || !reply.trim(),
            busy: sending,
          }}
          style={{
            backgroundColor: "#4a90e2",
            padding: 14,
            borderRadius: 12,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
            {sending ? "Sending..." : "Comment"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
        accessibilityViewIsModal={true}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setIsModalVisible(false)}
          accessibilityLabel="Close profile summary"
          accessibilityRole="button"
        >
          <View
            accessibilityRole="alert"
            style={{
              backgroundColor: "#fff",
              width: "80%",
              padding: 24,
              borderRadius: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {selectedUser && (
              <>
                <Avatar
                  importantForAccessibility="no"
                  style={{
                    backgroundColor: "#f3f0ff",
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    marginBottom: 14,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AvatarText
                    style={{
                      color: "#4a90e2",
                      fontSize: 28,
                      fontWeight: "700",
                    }}
                  >
                    {selectedUser.username.charAt(0)}
                  </AvatarText>
                </Avatar>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#333",
                    marginBottom: 4,
                  }}
                >
                  {selectedUser.username}
                </Text>

                <Text style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
                  Joined: {selectedUser.joinDate}
                </Text>

                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  accessibilityRole="button"
                  style={{
                    backgroundColor: "#f1f1f5",
                    paddingVertical: 10,
                    paddingHorizontal: 24,
                    borderRadius: 10,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#555", fontWeight: "600", fontSize: 15 }}
                  >
                    Close Profile
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default PostDetail;
