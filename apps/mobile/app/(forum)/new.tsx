import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen, Card, Title, Input, Button, ButtonText } from "./styled";
import { addForumPost } from "../../utils/forumFirestore";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please enter both a title and a description.");
      return;
    }

    await addForumPost({
      title,
      body,
      author: "You",
      createdAt: Date.now(),
      replies: [],
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert("Success", "Your post has been published!");
    router.back();

    router.back();
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
              placeholder="Write your post..."
              value={body}
              onChangeText={setBody}
              multiline
            />

            <Button onPress={createPost}>
              <ButtonText>Publish</ButtonText>
            </Button>
          </Card>
        </View>
      </Screen>
    </>
  );
};

export default NewPost;
