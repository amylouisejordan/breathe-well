import { useState } from "react";
import { router } from "expo-router";
import { save, load } from "../utils/storage";
import { Screen, Card, Title, Input, Button, ButtonText } from "./styled";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
    </Screen>
  );
};

export default NewPost;
