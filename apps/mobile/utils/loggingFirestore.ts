import {
  MedicationEntry,
  SymptomEntry,
  WellbeingEntry,
} from "@/app/(tabs)/history";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  CollectionReference,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const symptomsRef = collection(db, "symptoms");
const medsRef = collection(db, "medications");
const wellbeingRef = collection(db, "wellbeing");

const buildUserQuery = (coll: CollectionReference, uid: string) =>
  query(coll, where("userId", "==", uid), orderBy("date", "desc"));

export const saveSymptomEntry = async (
  entry: Omit<SymptomEntry, "id">
): Promise<void> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("No user logged in");
  await addDoc(symptomsRef, { ...entry, userId: uid });
};

export const saveMedicationEntry = async (
  entry: Omit<MedicationEntry, "id">
): Promise<void> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("No user logged in");
  await addDoc(medsRef, { ...entry, userId: uid });
};

export const saveWellbeingEntry = async (
  entry: Omit<WellbeingEntry, "id">
): Promise<void> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("No user logged in");
  await addDoc(wellbeingRef, { ...entry, userId: uid });
};

export const getMySymptoms = async (): Promise<SymptomEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];
  const q = buildUserQuery(symptomsRef, uid);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<SymptomEntry, "id">),
  }));
};

export const getMyMedications = async (): Promise<MedicationEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];
  const q = buildUserQuery(medsRef, uid);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<MedicationEntry, "id">),
  }));
};

export const getMyWellbeing = async (): Promise<WellbeingEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];
  const q = buildUserQuery(wellbeingRef, uid);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<WellbeingEntry, "id">),
  }));
};

export const getSymptomsForMonth = async (
  year: number,
  month: number
): Promise<SymptomEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];

  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const end = `${year}-${String(month + 1).padStart(2, "0")}-31`;

  const q = query(
    symptomsRef,
    where("userId", "==", uid),
    where("date", ">=", start),
    where("date", "<=", end),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<SymptomEntry, "id">),
  }));
};

export const getMedicationsForMonth = async (
  year: number,
  month: number
): Promise<MedicationEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];

  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const end = `${year}-${String(month + 1).padStart(2, "0")}-31`;

  const q = query(
    medsRef,
    where("userId", "==", uid),
    where("date", ">=", start),
    where("date", "<=", end),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<MedicationEntry, "id">),
  }));
};

export const getWellbeingForMonth = async (
  year: number,
  month: number
): Promise<WellbeingEntry[]> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return [];

  const monthStr = String(month + 1).padStart(2, "0");
  const start = `${year}-${monthStr}-01`;
  const end = `${year}-${monthStr}-31`;

  const q = query(
    wellbeingRef,
    where("userId", "==", uid),
    where("date", ">=", start),
    where("date", "<=", end),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<WellbeingEntry, "id">),
  }));
};

export const loadMonthData = async (year: number, month: number) => {
  const [symptoms, medications, wellbeing] = await Promise.all([
    getSymptomsForMonth(year, month),
    getMedicationsForMonth(year, month),
    getWellbeingForMonth(year, month),
  ]);
  return { symptoms, medications, wellbeing };
};
