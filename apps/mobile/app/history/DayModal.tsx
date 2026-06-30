import React from "react";
import { Modal, View, ScrollView, Dimensions, Text } from "react-native";
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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalBackdrop>
        <ModalCard
          aria-modal={true}
          style={{ maxHeight: SCREEN_HEIGHT * 0.8, paddingBottom: 12 }}
        >
          <ModalTitle
            accessibilityRole="header"
            accessibilityLabel={`Logs for ${formatted}`}
          >
            {formatted}
          </ModalTitle>

          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            {(type === "wellbeing" || type === "both") &&
              wellbeing.length > 0 && (
                <>
                  <SectionHeader accessibilityRole="header">
                    Wellbeing
                  </SectionHeader>
                  {wellbeing.map((entry, i) => {
                    const meta = getEmotionMeta(entry.emotion);
                    const tagString = entry.tags?.length
                      ? entry.tags.join(", ")
                      : "None";
                    const noteText = entry.notes || "No notes";

                    return (
                      <EntryBlock
                        key={`w-${i}`}
                        accessible={true}
                        accessibilityLabel={`Wellbeing log: Feel ${
                          meta?.label || entry.emotion
                        }. Tags: ${tagString}. Note: ${noteText}`}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                          importantForAccessibility="no-hide-descendants"
                          accessibilityElementsHidden={true}
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

                          <EntryTitle>
                            {meta?.label || entry.emotion}
                          </EntryTitle>
                        </View>

                        {entry.tags?.length > 0 && (
                          <EntryTags
                            importantForAccessibility="no"
                            accessibilityElementsHidden={true}
                          >
                            Tags: {entry.tags.join(", ")}
                          </EntryTags>
                        )}

                        <EntryNotes
                          importantForAccessibility="no"
                          accessibilityElementsHidden={true}
                        >
                          {entry.notes || "No notes"}
                        </EntryNotes>
                      </EntryBlock>
                    );
                  })}
                </>
              )}

            {(type === "symptom" || type === "both") && symptoms.length > 0 && (
              <>
                <SectionHeader accessibilityRole="header">
                  Symptoms
                </SectionHeader>
                {symptoms.map((entry, i) => {
                  const tagString = entry.tags?.length
                    ? entry.tags.join(", ")
                    : "None";
                  const noteText = entry.notes || "No notes";

                  return (
                    <EntryBlock
                      key={`s-${i}`}
                      accessible={true}
                      accessibilityLabel={`Symptom log. Severity level: ${entry.severity}. Associated tags: ${tagString}. Note: ${noteText}`}
                    >
                      <EntryTitle
                        importantForAccessibility="no"
                        accessibilityElementsHidden={true}
                      >
                        Severity: {entry.severity}
                      </EntryTitle>
                      <EntryTags
                        importantForAccessibility="no"
                        accessibilityElementsHidden={true}
                      >
                        Tags:{" "}
                        {entry.tags?.length ? entry.tags.join(", ") : "None"}
                      </EntryTags>
                      <EntryNotes
                        importantForAccessibility="no"
                        accessibilityElementsHidden={true}
                      >
                        {entry.notes || "No notes"}
                      </EntryNotes>
                    </EntryBlock>
                  );
                })}
              </>
            )}

            {(type === "medication" || type === "both") &&
              medications.length > 0 && (
                <>
                  <SectionHeader accessibilityRole="header">
                    Medication
                  </SectionHeader>
                  {medications.map((entry, i) => {
                    const noteText = entry.notes || "No notes";

                    return (
                      <EntryBlock
                        key={`m-${i}`}
                        accessible={true}
                        accessibilityLabel={`Medication log: ${entry.name}. Dose quantity: ${entry.dose}. Note: ${noteText}`}
                      >
                        <EntryTitle
                          importantForAccessibility="no"
                          accessibilityElementsHidden={true}
                        >
                          {entry.name}
                        </EntryTitle>
                        <EntryTags
                          importantForAccessibility="no"
                          accessibilityElementsHidden={true}
                        >
                          Dose: {entry.dose}
                        </EntryTags>
                        <EntryNotes
                          importantForAccessibility="no"
                          accessibilityElementsHidden={true}
                        >
                          {entry.notes || "No notes"}
                        </EntryNotes>
                      </EntryBlock>
                    );
                  })}
                </>
              )}

            {wellbeing.length === 0 &&
              symptoms.length === 0 &&
              medications.length === 0 && (
                <View
                  style={{ paddingVertical: 32, alignItems: "center" }}
                  accessible={true}
                  accessibilityLabel="Nothing logged for this day. Tap another day or close to add an entry."
                >
                  <Text
                    style={{ fontSize: 32, marginBottom: 12 }}
                    importantForAccessibility="no"
                    accessibilityElementsHidden={true}
                  >
                    🌤️
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 22,
                      paddingHorizontal: 16,
                    }}
                    importantForAccessibility="no"
                    accessibilityElementsHidden={true}
                  >
                    Nothing logged for this day - tap another day or add an
                    entry.
                  </Text>
                </View>
              )}
          </ScrollView>
          <CloseButton
            onPress={onClose}
            style={{ marginTop: 8 }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Close daily logs display dialog"
          >
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </ModalCard>
      </ModalBackdrop>
    </Modal>
  );
};

export default DayModal;
