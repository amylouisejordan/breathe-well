import { useState } from "react";
import { router } from "expo-router";
import { save, load } from "../utils/storage";

import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Screen, Card, Title, Input, Button, ButtonText } from "./styled";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const scale = useSharedValue(1);
  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const createPost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please enter both a title and a description.");
      return;
    }

    const existing = (await load("forum_posts")) || [];

    const newPost = {
      id: Date.now(),
      title,
      body,
      author: "You",
      createdAt: Date.now(),
      replies: [],
    };

    await save("forum_posts", [newPost, ...existing]);
    router.back();
  };

  return (
    <Screen>
      <Animated.View
        entering={FadeInUp.duration(350).springify()}
        style={{ width: "100%" }}
      >
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

          <Animated.View style={animatedButtonStyle}>
            <Button
              onPressIn={() => (scale.value = withTiming(0.97))}
              onPressOut={() => (scale.value = withTiming(1))}
              onPress={createPost}
            >
              <ButtonText>Publish</ButtonText>
            </Button>
          </Animated.View>
        </Card>
      </Animated.View>
    </Screen>
  );
};

export default NewPost;
