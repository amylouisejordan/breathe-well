import React from "react";
import { Modal, View } from "react-native";
import {
  ModalBackdrop,
  ModalCard,
  ModalTitle,
  EntryTags,
  EntryNotes,
  CloseButton,
  CloseButtonText,
  EntryBlock,
  EntryTitle,
  SectionHeader,
} from "./styled";
import { MaterialIcons } from "@expo/vector-icons";
import { REFLECT_EMOTIONS } from "../(modals)/add-wellbeing-form";
import { MedicationEntry, SymptomEntry } from "../(tabs)/history";

interface DayModalProps {
  visible: boolean;
  dayLabel: string;
  monthName?: string;
  symptoms: SymptomEntry[];
  medications: MedicationEntry[];
  wellbeing: { emotion: string; tags: string[]; notes?: string }[];
  type: "symptom" | "medication" | "wellbeing" | "both" | null;
  onClose: () => void;
}

const DayModal = (props: DayModalProps) => {
  const {
    visible,
    dayLabel,
    monthName,
    symptoms,
    medications,
    wellbeing,
    type,
    onClose,
  } = props;
  if (!visible) return null;

  const getEmotionMeta = (key: string) =>
    REFLECT_EMOTIONS.find((e) => e.key === key) || null;

  const extractDayNumber = (label: string) => {
    const match = label.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const formatDayWithSuffix = (day: number) => {
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix}`;
  };

  const day = extractDayNumber(dayLabel);
  const formatted = day
    ? monthName
      ? `${formatDayWithSuffix(day)} ${monthName}`
      : formatDayWithSuffix(day)
    : dayLabel;

  return (
    <Modal transparent animationType="fade">
      <ModalBackdrop>
        <ModalCard>
          <ModalTitle>{formatted}</ModalTitle>

          {(type === "wellbeing" || type === "both") &&
            wellbeing.length > 0 && (
              <>
                <SectionHeader>Wellbeing</SectionHeader>
                {wellbeing.map((entry, i) => {
                  const meta = getEmotionMeta(entry.emotion);

                  return (
                    <EntryBlock key={`w-${i}`}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: meta?.color || "#ccc",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 12,
                          }}
                        >
                          <MaterialIcons
                            name={meta?.icon || "sentiment-neutral"}
                            size={22}
                            color="#fff"
                          />
                        </View>

                        <EntryTitle>{meta?.label || entry.emotion}</EntryTitle>
                      </View>

                      {entry.tags?.length > 0 && (
                        <EntryTags>Tags: {entry.tags.join(", ")}</EntryTags>
                      )}

                      <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                    </EntryBlock>
                  );
                })}
              </>
            )}

          {(type === "symptom" || type === "both") && symptoms.length > 0 && (
            <>
              <SectionHeader>Symptoms</SectionHeader>
              {symptoms.map((entry, i) => (
                <EntryBlock key={`s-${i}`}>
                  <EntryTitle>Severity: {entry.severity}</EntryTitle>
                  <EntryTags>
                    Tags: {entry.tags?.length ? entry.tags.join(", ") : "None"}
                  </EntryTags>
                  <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                </EntryBlock>
              ))}
            </>
          )}

          {(type === "medication" || type === "both") &&
            medications.length > 0 && (
              <>
                <SectionHeader>Medication</SectionHeader>
                {medications.map((entry, i) => (
                  <EntryBlock key={`m-${i}`}>
                    <EntryTitle>{entry.name}</EntryTitle>
                    <EntryTags>Dose: {entry.dose}</EntryTags>
                    <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                  </EntryBlock>
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
