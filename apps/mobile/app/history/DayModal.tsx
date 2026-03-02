import React from "react";
import { Modal } from "react-native";
import {
  ModalBackdrop,
  ModalCard,
  ModalTitle,
  EntryRow,
  EntrySeverity,
  EntryTags,
  EntryNotes,
  CloseButton,
} from "./styled";

interface DayModalProps {
  visible: boolean;
  dayLabel: string;
  symptoms: { severity: number; tags: string[]; notes?: string }[];
  medications: { name: string; dose: string; notes?: string }[];
  type: "symptom" | "medication" | "both" | null;
  onClose: () => void;
}

const DayModal = (props: DayModalProps) => {
  const { visible, dayLabel, symptoms, medications, type, onClose } = props;
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <ModalBackdrop>
        <ModalCard>
          <ModalTitle>{dayLabel}’s entries</ModalTitle>

          {(type === "symptom" || type === "both") &&
            symptoms.map((entry, i) => (
              <EntryRow key={i}>
                <EntrySeverity>Severity: {entry.severity}</EntrySeverity>
                <EntryTags>Tags: {entry.tags.join(", ") || "None"}</EntryTags>
                <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
              </EntryRow>
            ))}

          {(type === "medication" || type === "both") &&
            medications.map((entry, i) => (
              <EntryRow key={i}>
                <EntrySeverity>{entry.name}</EntrySeverity>
                <EntryTags>Dose: {entry.dose}</EntryTags>
                <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
              </EntryRow>
            ))}

          <CloseButton onPress={onClose}>Close</CloseButton>
        </ModalCard>
      </ModalBackdrop>
    </Modal>
  );
};

export default DayModal;
