import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import {
  Screen,
  Card,
  SmallCard,
  Title,
  Subtitle,
  Timestamp,
  BodyText,
  RepliesHeader,
  Avatar,
  AvatarText,
  Row,
  InputCard,
  Input,
  Button,
  ButtonText,
  EditButton,
  EditButtonText,
  DeleteButton,
  DeleteButtonText,
} from "./styled";

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
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const posts: ForumPost[] = (await load("forum_posts")) || [];
      const found = posts.find((p) => p.id === numericId) || null;
      setPost(found);

      if (found) {
        setEditTitle(found.title);
        setEditBody(found.body);
      }
    };
    fetch();
  }, [numericId]);

  const saveEdit = async () => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }

    const posts: ForumPost[] = (await load("forum_posts")) || [];
    const updated = posts.map((p) =>
      p.id === numericId ? { ...p, title: editTitle, body: editBody } : p
    );

    await save("forum_posts", updated);
    setPost(updated.find((p) => p.id === numericId) || null);
    setEditing(false);
  };

  const deletePost = async () => {
    const posts: ForumPost[] = (await load("forum_posts")) || [];
    const filtered = posts.filter((p) => p.id !== numericId);

    await save("forum_posts", filtered);
    router.back();
  };

  const addReply = async () => {
    if (!reply.trim()) {
      alert("Reply cannot be empty.");
      return;
    }

    const posts: ForumPost[] = (await load("forum_posts")) || [];
    const updated = posts.map((p) =>
      p.id === numericId
        ? { ...p, replies: [...p.replies, { text: reply, date: Date.now() }] }
        : p
    );

    await save("forum_posts", updated);
    setPost(updated.find((p) => p.id === numericId) || null);
    setReply("");
  };

  if (!post) return null;

  return (
    <Screen>
      <Card>
        <Row>
          <Avatar>
            <AvatarText>{post.author.charAt(0)}</AvatarText>
          </Avatar>

          <Title style={{ flex: 1 }}>{post.title}</Title>
        </Row>

        <Subtitle style={{ marginTop: 6 }}>by {post.author}</Subtitle>
        <Timestamp>{new Date(post.createdAt).toLocaleString()}</Timestamp>

        <Row style={{ marginTop: 16, gap: 12 }}>
          <EditButton onPress={() => setEditing(true)}>
            <EditButtonText>Edit</EditButtonText>
          </EditButton>

          <DeleteButton onPress={deletePost}>
            <DeleteButtonText>Delete</DeleteButtonText>
          </DeleteButton>
        </Row>
      </Card>

      {editing && (
        <Card>
          <Input
            value={editTitle}
            onChangeText={setEditTitle}
            style={{ minHeight: 50 }}
          />

          <Input value={editBody} onChangeText={setEditBody} multiline />

          <Button onPress={saveEdit}>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        </Card>
      )}

      <Card>
        <BodyText>{post.body}</BodyText>
      </Card>

      <RepliesHeader>Replies ({post.replies.length})</RepliesHeader>

      {post.replies.map((r, i) => (
        <SmallCard key={i}>
          <Row>
            <Avatar>
              <AvatarText>{post.author.charAt(0)}</AvatarText>
            </Avatar>

            <BodyText style={{ flex: 1 }}>{r.text}</BodyText>
          </Row>

          <Timestamp>{new Date(r.date).toLocaleString()}</Timestamp>
        </SmallCard>
      ))}

      <InputCard>
        <Input
          placeholder="Write a reply..."
          value={reply}
          onChangeText={setReply}
          multiline
        />

        <Button onPress={addReply}>
          <ButtonText>Reply</ButtonText>
        </Button>
      </InputCard>
    </Screen>
  );
};

export default PostDetail;
