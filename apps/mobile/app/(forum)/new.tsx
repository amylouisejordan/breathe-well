import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen, Card, Title, Input, Button, ButtonText } from "./styled";
import { addForumPost } from "../../utils/forumFirestore";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import { useAuth } from "../utils/useAuth";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  const createPost = async () => {
    if (!title.trim() || !body.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
      router.back();
    } catch (e) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
            <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <Screen>
        <View style={{ width: "100%" }}>
          <Card>
            <Title>Create a New Post</Title>

            <Input
              placeholder="Post title"
              value={title}
              onChangeText={setTitle}
              style={{ minHeight: 50 }}
            />

            <Input
              autoFocus
              placeholder="Write your post..."
              value={body}
              onChangeText={setBody}
              multiline
            />

            <Button onPress={createPost} disabled={sending}>
              <ButtonText>{sending ? "Publishing…" : "Publish"}</ButtonText>
            </Button>
          </Card>
        </View>
      </Screen>
    </>
  );
};

export default NewPost;
