import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

export const getForumPosts = async () => {
  const q = query(collection(db, "forum_posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();

    return {
      id: d.id,
      title: data.title ?? "",
      body: data.body ?? "",
      author: data.author ?? "Unknown",
      createdAt: data.createdAt ?? new Date().toISOString(),
      comments: data.comments ?? [],
    };
  });
};

export const addForumPost = async (post: any) => {
  const docRef = await addDoc(collection(db, "forum_posts"), {
    ...post,
    comments: [],
  });

  return { id: docRef.id, ...post, comments: [] };
};

export const updateForumPost = async (id: string, data: any) => {
  await updateDoc(doc(db, "forum_posts", id), data);
};

export const deleteForumPost = async (id: string) => {
  await deleteDoc(doc(db, "forum_posts", id));
};

export const addCommentToPost = async (postId: string, comment: any) => {
  const postRef = doc(db, "forum_posts", postId);

  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
};

export const getPostById = async (postId: string) => {
  const postRef = doc(db, "forum_posts", postId);
  const snap = await getDoc(postRef);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    title: data.title ?? "",
    body: data.body ?? "",
    author: data.author ?? "Unknown",
    createdAt: data.createdAt ?? new Date().toISOString(),
    comments: data.comments ?? [],
  };
};
