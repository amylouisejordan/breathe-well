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
} from "firebase/firestore";

const symptomsRef = collection(db, "symptoms");

export const saveSymptomEntry = async (entry: Omit<SymptomEntry, "id">) => {
  console.log("Firestore function reached!");
  await addDoc(symptomsRef, entry);
};

export const getAllSymptoms = async (): Promise<SymptomEntry[]> => {
  const snap = await getDocs(symptomsRef);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<SymptomEntry, "id">),
  }));
};

export const getSymptomsForMonth = async (
  year: number,
  month: number
): Promise<SymptomEntry[]> => {
  const q = query(
    symptomsRef,
    where("date", ">=", `${year}-${String(month + 1).padStart(2, "0")}-01`),
    where("date", "<=", `${year}-${String(month + 1).padStart(2, "0")}-31`),
    orderBy("date", "asc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<SymptomEntry, "id">),
  }));
};

const medsRef = collection(db, "medications");

export const saveMedicationEntry = async (
  entry: Omit<MedicationEntry, "id">
) => {
  await addDoc(medsRef, entry);
};

export const getAllMedications = async (): Promise<MedicationEntry[]> => {
  const snap = await getDocs(medsRef);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<MedicationEntry, "id">),
  }));
};

export const getMedicationsForMonth = async (
  year: number,
  month: number
): Promise<MedicationEntry[]> => {
  const q = query(
    medsRef,
    where("date", ">=", `${year}-${String(month + 1).padStart(2, "0")}-01`),
    where("date", "<=", `${year}-${String(month + 1).padStart(2, "0")}-31`),
    orderBy("date", "asc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<MedicationEntry, "id">),
  }));
};

const wellbeingRef = collection(db, "wellbeing");

export const saveWellbeingEntry = async (entry: Omit<WellbeingEntry, "id">) => {
  await addDoc(wellbeingRef, entry);
};

export const getAllWellbeing = async (): Promise<WellbeingEntry[]> => {
  const snap = await getDocs(wellbeingRef);
  return snap.docs.map((d) => {
    return {
      id: d.id,
      ...(d.data() as Omit<WellbeingEntry, "id">),
    };
  });
};

export const getWellbeingForMonth = async (
  year: number,
  month: number
): Promise<WellbeingEntry[]> => {
  const monthStr = String(month + 1).padStart(2, "0");

  const q = query(
    wellbeingRef,
    where("date", ">=", `${year}-${monthStr}-01`),
    where("date", "<=", `${year}-${monthStr}-31`),
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

export const loadAllData = async (): Promise<{
  symptoms: SymptomEntry[];
  medications: MedicationEntry[];
  wellbeing: WellbeingEntry[];
}> => {
  const [symptoms, medications, wellbeing] = await Promise.all([
    getAllSymptoms(),
    getAllMedications(),
    getAllWellbeing(),
  ]);

  return { symptoms, medications, wellbeing };
};
