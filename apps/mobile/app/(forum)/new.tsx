import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View, AccessibilityInfo, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen, Input } from "./styled";
import { addForumPost } from "../../utils/forumFirestore";
import * as Haptics from "expo-haptics";
import { useAuth } from "../../utils/useAuth";
import { Divider, Card, Title, Subtitle, Button, ButtonText } from "../styled";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  const createPost = async () => {
    if (!title.trim() || !body.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(
        "Validation error. Title and body cannot be empty."
      );
      Alert.alert("Hold up", "Title and body can't be empty.");
      return;
    }
    if (!user) return;

    setSending(true);
    try {
      await addForumPost({
        title: title.trim(),
        body: body.trim(),
        author: user.displayName?.split(" ")[0] || "You",
        createdAt: Date.now(),
        comments: [],
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      AccessibilityInfo.announceForAccessibility(
        "Post successfully published."
      );
      router.back();
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(
        "Error. Post creation failed."
      );
      Alert.alert("Oops", "Post failed – try again?");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Navigates back to the main forum stream screen"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <Screen>
        <View style={{ width: "100%" }}>
          <Card>
            <Title accessibilityRole="header">Create New Post</Title>
            <Subtitle>Make a new post to share with the community</Subtitle>

            <Divider style={{ marginTop: 0 }} />

            <Input
              placeholder="Post title"
              value={title}
              onChangeText={setTitle}
              style={{ minHeight: 50 }}
              accessibilityLabel="Post title field"
              accessibilityHint="Enter a short title for your post"
            />

            <Input
              autoFocus
              placeholder="Write your post..."
              value={body}
              onChangeText={setBody}
              multiline
              accessibilityLabel="Post body content field"
              accessibilityHint="Enter the detailed body text of your forum post"
            />

            <Button
              onPress={createPost}
              disabled={sending}
              accessibilityRole="button"
              accessibilityState={{ disabled: sending, busy: sending }}
              accessibilityLabel={sending ? "Publishing post" : "Publish post"}
            >
              <ButtonText>{sending ? "Publishing…" : "Publish"}</ButtonText>
            </Button>
          </Card>
        </View>
      </Screen>
    </>
  );
};

export default NewPost;
