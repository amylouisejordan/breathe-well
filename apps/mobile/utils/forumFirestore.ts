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
import { getAuth } from "firebase/auth";

const forumRef = collection(db, "forum_posts");

export const getForumPosts = async () => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];

  const q = query(forumRef, orderBy("createdAt", "desc"));
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
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("No user logged in");

  const docRef = await addDoc(forumRef, {
    ...post,
    authorId: uid,
    createdAt: new Date().toISOString(),
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
  await updateDoc(postRef, { comments: arrayUnion(comment) });
};

export const getPostById = async (postId: string) => {
  const snap = await getDoc(doc(db, "forum_posts", postId));
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
