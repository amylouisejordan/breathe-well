import React from "react";
import { Modal, View } from "react-native";
import {
  ModalBackdrop,
  ModalCard,
  ModalTitle,
  EntryRow,
  EntrySeverity,
  EntryTags,
  EntryNotes,
  CloseButton,
  CloseButtonText,
} from "./styled";
import { MaterialIcons } from "@expo/vector-icons";
import { REFLECT_EMOTIONS } from "../(modals)/add-wellbeing-form";
import { MedicationEntry, SymptomEntry } from "../(tabs)/history";

interface DayModalProps {
  visible: boolean;
  dayLabel: string;
  symptoms: SymptomEntry[];
  medications: MedicationEntry[];
  wellbeing: { emotion: string; tags: string[]; notes?: string }[];
  type: "symptom" | "medication" | "wellbeing" | "both" | null;
  onClose: () => void;
}

const DayModal = (props: DayModalProps) => {
  const { visible, dayLabel, symptoms, medications, wellbeing, type, onClose } =
    props;
  if (!visible) return null;

  const getEmotionMeta = (key: string) =>
    REFLECT_EMOTIONS.find((e) => e.key === key) || null;

  return (
    <Modal transparent animationType="fade">
      <ModalBackdrop>
        <ModalCard>
          <ModalTitle>{dayLabel}’s entries</ModalTitle>

          {(type === "wellbeing" || type === "both") &&
            wellbeing.map((entry, i) => {
              const meta = getEmotionMeta(entry.emotion);

              return (
                <EntryRow key={`w-${i}`}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <MaterialIcons
                      name={meta?.icon || "sentiment-neutral"}
                      size={22}
                      color={meta?.color || "#999"}
                      style={{ marginRight: 8 }}
                    />
                    <EntrySeverity>
                      Feeling: {meta?.label || entry.emotion}
                    </EntrySeverity>
                  </View>

                  <EntryTags>
                    Tags: {entry.tags?.length ? entry.tags.join(", ") : "None"}
                  </EntryTags>

                  <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                </EntryRow>
              );
            })}

          {(type === "symptom" || type === "both") &&
            symptoms?.map((entry, i) => (
              <EntryRow key={`s-${i}`}>
                <EntrySeverity>Severity: {entry.severity}</EntrySeverity>
                <EntryTags>Tags: {entry.tags?.join(", ") || "None"}</EntryTags>
                <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
              </EntryRow>
            ))}

          {(type === "medication" || type === "both") &&
            medications?.map((entry, i) => (
              <EntryRow key={`m-${i}`}>
                <EntrySeverity>{entry.name}</EntrySeverity>
                <EntryTags>Dose: {entry.dose}</EntryTags>
                <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
              </EntryRow>
            ))}

          {!type && (
            <>
              {wellbeing.map((entry, i) => {
                const meta = getEmotionMeta(entry.emotion);
                return (
                  <EntryRow key={`w-${i}`}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <MaterialIcons
                        name={meta?.icon || "sentiment-neutral"}
                        size={22}
                        color={meta?.color || "#999"}
                        style={{ marginRight: 8 }}
                      />
                      <EntrySeverity>
                        Feeling: {meta?.label || entry.emotion}
                      </EntrySeverity>
                    </View>
                    <EntryTags>
                      Tags:{" "}
                      {entry.tags?.length ? entry.tags.join(", ") : "None"}
                    </EntryTags>
                    <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                  </EntryRow>
                );
              })}

              {symptoms.map((entry, i) => (
                <EntryRow key={`s-${i}`}>
                  <EntrySeverity>
                    Symptom severity: {entry.severity}
                  </EntrySeverity>
                  <EntryTags>
                    Tags: {entry.tags?.length ? entry.tags.join(", ") : "None"}
                  </EntryTags>
                  <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                </EntryRow>
              ))}

              {medications.map((entry, i) => (
                <EntryRow key={`m-${i}`}>
                  <EntrySeverity>Medication: {entry.name}</EntrySeverity>
                  <EntryTags>Dose: {entry.dose}</EntryTags>
                  <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                </EntryRow>
              ))}
            </>
          )}

          <CloseButton onPress={onClose}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </ModalCard>
      </ModalBackdrop>
    </Modal>
  );
};

export default DayModal;
