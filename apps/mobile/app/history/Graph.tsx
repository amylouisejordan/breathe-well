import React from "react";
import {
  Card,
  GraphLabel,
  LegendRow,
  LegendDot,
  LegendText,
  GraphArea,
  Grid,
  GridLine,
  BarRow,
  BarContainer,
  Bar,
  ValueLabel,
  BarLabel,
  GraphHint,
  CalendarGrid,
  DayCell,
  DayNumber,
  SymptomDot,
  MedicationDot,
  SectionTitle,
  DailyCard,
  Circle,
  CircleText,
  Insight,
  MoodDot,
  Divider,
} from "./styled";
import { View, Text } from "react-native";
import { REFLECT_EMOTIONS } from "../(modals)/add-wellbeing-form";

interface GraphProps {
  label: string;
  data: { values: number[]; labels: string[] };
  onSelectDay?: (day: number) => void;
  setSelectedMonthName?: (name: string) => void;
  monthlyContext?: {
    monthlyAvgSeverity: number;
    daysLogged: number;
    totalSymptoms: number;
    totalMedications: number;
    topTags: string[];
    calendarDays: (number | null)[];
    year: number;
    month: number;
    symptoms: { date: string; severity: number }[];
    medications: { date: string }[];
    wellbeing: { date: string; emotion: string }[];
    onSelectCalendarDay: (day: number) => void;
  };
}

const Graph = (props: GraphProps) => {
  const { label, data, onSelectDay, setSelectedMonthName, monthlyContext } =
    props;

  const isMonth = monthlyContext != null;

  if (!isMonth && (!data.values.length || data.values.every((v) => v === 0))) {
    return (
      <Card accessible={true} accessibilityLabel="No health metrics logged yet. Log something to begin your charts.">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 32, marginRight: 8 }} importantForAccessibility="no" accessibilityElementsHidden={true}>🌤️</Text>
          <Insight style={{ fontSize: 16, opacity: 0.8, marginTop: 3 }}>
            No data yet - log something to begin
          </Insight>
        </View>
      </Card>
    );
  }

  if (isMonth) {
    const {
      monthlyAvgSeverity,
      calendarDays,
      symptoms,
      medications,
      wellbeing,
      onSelectCalendarDay,
    } = monthlyContext;

    const utcDay = (iso: string) => new Date(iso).getUTCDate();

    const monthName = new Date(
      monthlyContext.year,
      monthlyContext.month
    ).toLocaleString("default", { month: "long" });

    const emotionCounts: Record<string, number> = {};
    wellbeing.forEach((w) => {
      emotionCounts[w.emotion] = (emotionCounts[w.emotion] || 0) + 1;
    });

    const mostCommonKey = Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    const moodMetaAvg = mostCommonKey
      ? REFLECT_EMOTIONS.find((e) => e.key === mostCommonKey)
      : null;

    const streak = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      return symptoms?.some((s) => utcDay(s.date) === d.getUTCDate()) || false;
    }).filter(Boolean).length;

    return (
      <Card style={{ marginBottom: 30 }}>
        <GraphLabel accessibilityRole="header">{label}</GraphLabel>

        <LegendRow 
          style={{ marginTop: 10, gap: 6 }}
          accessible={true}
          accessibilityLabel="Graph Color Key. Pink indicator represents symptoms. Blue indicator represents medications. Grey indicator represents mood."
        >
          <SymptomDot importantForAccessibility="no" accessibilityElementsHidden={true} />
          <LegendText>Symptom</LegendText>
          <MedicationDot importantForAccessibility="no" accessibilityElementsHidden={true} />
          <LegendText>Medication</LegendText>
          <MoodDot color="#aaa" importantForAccessibility="no" accessibilityElementsHidden={true} />
          <LegendText>Mood</LegendText>
        </LegendRow>

        <Insight style={{ marginTop: 8, fontSize: 13, marginBottom: 5 }}>
          {streak === 7
            ? "🔥 Great job - a full week of logging!"
            : `💪 ${7 - streak} day${
                7 - streak === 1 ? "" : "s"
              } of logging left to complete this week.`}
        </Insight>

        <GraphArea>
          <DailyCard
            style={{
              marginTop: 12,
              marginBottom: 28,
              alignItems: "flex-start",
            }}
            accessible={true}
            accessibilityLabel={`Monthly summary block: Average symptom severity is ${monthlyAvgSeverity}. ${
              moodMetaAvg ? `Predominant emotional state logged is ${moodMetaAvg.label}` : "No mood logs found this month"
            }`}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden={true}>
              <View style={{ position: "relative", marginRight: 16 }}>
                <Circle severity={monthlyAvgSeverity}>
                  <CircleText>{monthlyAvgSeverity}</CircleText>
                </Circle>

                {moodMetaAvg && (
                  <View
                    style={{
                      position: "absolute",
                      width: 104,
                      height: 104,
                      borderRadius: 52,
                      borderWidth: 4,
                      borderColor: moodMetaAvg.color,
                      top: -7,
                      left: -7,
                    }}
                  />
                )}
              </View>

              <View style={{ flexShrink: 1 }}>
                <Insight style={{ marginTop: 0, fontWeight: "600", textAlign: "left" }}>
                  Average severity this month
                </Insight>

                <Insight style={{ marginTop: 4, textAlign: "left" }}>
                  {moodMetaAvg
                    ? `Mostly felt ${moodMetaAvg.label}`
                    : "No mood logged this month"}
                </Insight>
              </View>
            </View>
          </DailyCard>

          <Divider style={{ marginTop: -7 }} importantForAccessibility="no" accessibilityElementsHidden={true} />

          <SectionTitle style={{ marginBottom: 16 }} accessibilityRole="header">
            Calendar • {monthName} {monthlyContext.year}
          </SectionTitle>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
            accessible={true}
            accessibilityLabel="Days of the week grid header: Monday through Sunday"
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Text
                key={d}
                style={{
                  flexBasis: "14.285%",
                  textAlign: "center",
                  color: "#999",
                  fontSize: 12,
                }}
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {d}
              </Text>
            ))}
          </View>

          <CalendarGrid>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return (
                  <DayCell
                    key={index}
                    importantForAccessibility="no"
                    accessibilityElementsHidden={true}
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "transparent",
                    }}
                  />
                );
              }

              const isToday = day === new Date().getDate();

              const hasSymptom = symptoms.some((s) => utcDay(s.date) === day);
              const hasMedication = medications.some((m) => utcDay(m.date) === day);
              const moodEntry = wellbeing.find((w) => utcDay(w.date) === day);
              const moodMeta = moodEntry
                ? REFLECT_EMOTIONS.find((e) => e.key === moodEntry.emotion)
                : null;

              const historyArray: string[] = [];
              if (hasSymptom) historyArray.push("Symptom");
              if (hasMedication) historyArray.push("Medication");
              if (moodMeta) historyArray.push(`Mood: ${moodMeta.label}`);
              
              const historyText = historyArray.length > 0 
                ? `data present for: ${historyArray.join(", ")}` 
                : "no metrics recorded";

              return (
                <DayCell
                  key={index}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`${day}${isToday ? ", Today," : ""}. ${historyText}. Double tap to inspect entries`}
                  onPress={() => {
                    onSelectCalendarDay(day);
                    setSelectedMonthName?.(monthName);
                  }}
                  style={
                    isToday
                      ? {
                          borderColor: "#4a90e2",
                          backgroundColor: "#f3f0ff",
                        }
                      : undefined
                  }
                >
                  <DayNumber importantForAccessibility="no" accessibilityElementsHidden={true}>{day}</DayNumber>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 4,
                      gap: 4,
                    }}
                    importantForAccessibility="no"
                    accessibilityElementsHidden={true}
                  >
                    {hasSymptom && <SymptomDot />}
                    {hasMedication && <MedicationDot />}
                    {moodMeta && <MoodDot color={moodMeta.color} />}
                  </View>
                </DayCell>
              );
            })}
          </CalendarGrid>
        </GraphArea>

        <GraphHint style={{ marginTop: -100 }}>
          Tap a day to see your notes and tags
        </GraphHint>
      </Card>
    );
  }

  return (
    <Card>
      <GraphLabel accessibilityRole="header">{label}</GraphLabel>

      <LegendRow accessible={true} accessibilityLabel="Weekly tracking index bar container">
        <LegendDot importantForAccessibility="no" accessibilityElementsHidden={true} />
        <LegendText>Your logged data</LegendText>
      </LegendRow>

      <GraphArea>
        <Grid importantForAccessibility="no" accessibilityElementsHidden={true}>
          {[...Array(4)].map((_, i) => (
            <GridLine key={i} />
          ))}
        </Grid>

        <BarRow>
          {data.values.map((value, index) => {
            const dayLabel = data.labels[index];
            return (
              <BarContainer
                key={index}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${dayLabel}. Severity index score: ${value}. Double tap to view breakdown.`}
                onPress={() => onSelectDay && onSelectDay(index)}
              >
                <Bar style={{ height: value * 10 }} importantForAccessibility="no" accessibilityElementsHidden={true} />
                <ValueLabel importantForAccessibility="no" accessibilityElementsHidden={true}>{value}</ValueLabel>
                <BarLabel importantForAccessibility="no" accessibilityElementsHidden={true}>{dayLabel}</BarLabel>
              </BarContainer>
            );
          })}
        </BarRow>
      </GraphArea>

      <GraphHint>Tap a bar to see your notes and tags for that day</GraphHint>
    </Card>
  );
};

export default Graph;
