import { ForumPost } from "../app/(tabs)/community";
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
} from "firebase/firestore";

export const getForumPosts = async () => {
  const q = query(collection(db, "forum_posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as ForumPost[];
};

export const addForumPost = async (post: any) => {
  const docRef = await addDoc(collection(db, "forum_posts"), post);
  return { id: docRef.id, ...post };
};

export const updateForumPost = async (id: string, data: any) => {
  await updateDoc(doc(db, "forum_posts", id), data);
};

export const deleteForumPost = async (id: string) => {
  await deleteDoc(doc(db, "forum_posts", id));
};
