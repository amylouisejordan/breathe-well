import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { load } from "../utils/storage";

import {
  Container,
  Header,
  Title,
  Subtext,
  UpdatedText,
  ToggleRow,
  Toggle,
  ToggleText,
  Section,
  SectionTitle,
  DailyCard,
  Circle,
  CircleText,
  Insight,
  TodayItem,
  TodayItemTitle,
  TodayItemText,
} from "../history/styled";

import Graph from "../history/Graph";
import DayModal from "../history/DayModal";

export type SymptomEntry = {
  severity: number;
  tags: string[];
  notes: string;
  date: string;
};

export type MedicationEntry = {
  name: string;
  dose: string;
  notes: string;
  date: string;
};

export type MonthlyContext = {
  monthlyAvgSeverity: number;
  daysLogged: number;
  totalSymptoms: number;
  totalMedications: number;
  topTags: string[];
  calendarDays: (number | null)[];
  year: number;
  month: number;
  symptoms: SymptomEntry[];
  medications: MedicationEntry[];
  onSelectCalendarDay: (day: number) => void;
};

const HistoryScreen = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<
    "symptom" | "medication" | "both" | null
  >(null);
  const [updatedText, setUpdatedText] = useState("");

  const getStartOfWeek = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return monday;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const symptomData = await load("symptoms");
        const medicationData = await load("medications");

        setSymptoms(symptomData || []);
        setMedications(medicationData || []);

        const latestDate = new Date(
          Math.max(
            ...symptoms.map((s) => new Date(s.date).getTime()),
            ...medications.map((m) => new Date(m.date).getTime())
          )
        );

        setUpdatedText(`Last updated: ${latestDate.toLocaleDateString()}`);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const todaySymptoms = symptoms.filter(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  );

  const todayMedications = medications.filter(
    (m) => new Date(m.date).toDateString() === new Date().toDateString()
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const monthSymptoms = symptoms.filter((s) => {
    const d = new Date(s.date);
    return d >= firstOfMonth && d <= lastOfMonth;
  });

  const monthMedications = medications.filter((m) => {
    const d = new Date(m.date);
    return d >= firstOfMonth && d <= lastOfMonth;
  });

  const monthlyAvgSeverity = monthSymptoms.length
    ? Math.round(
        monthSymptoms.reduce((sum, s) => sum + s.severity, 0) /
          monthSymptoms.length
      )
    : 0;

  const daysLogged = new Set(
    monthSymptoms.map((s) => new Date(s.date).toDateString())
  ).size;

  const totalSymptoms = monthSymptoms.length;
  const totalMedications = monthMedications.length;

  const tagCounts: Record<string, number> = {};
  monthSymptoms.forEach((s) =>
    s.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    })
  );

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag]) => tag);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const getSymptomGraphData = () => {
    if (symptoms.length === 0) return { values: [], labels: [] };

    const nowLocal = new Date();

    if (range === "day") {
      const todayList = symptoms.filter(
        (s) => new Date(s.date).toDateString() === nowLocal.toDateString()
      );

      return {
        values: todayList.length
          ? [
              Math.round(
                todayList.reduce((a, b) => a + b.severity, 0) / todayList.length
              ),
            ]
          : [],
        labels: todayList.length ? ["Today"] : [],
      };
    }

    if (range === "week") {
      const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const buckets: number[][] = Array(7)
        .fill(null)
        .map(() => []);

      const monday = getStartOfWeek();

      symptoms.forEach((s) => {
        const d = new Date(s.date);
        if (d < monday) return;

        const weekday = new Date(
          d.getTime() + d.getTimezoneOffset() * 60000
        ).getDay();
        const index = weekday === 0 ? 6 : weekday - 1;
        buckets[index].push(s.severity);
      });

      const values = buckets.map((day) =>
        day.length ? Math.round(day.reduce((a, b) => a + b) / day.length) : 0
      );

      return { values, labels };
    }

    if (range === "month") {
      const buckets: number[][] = Array(daysInMonth)
        .fill(null)
        .map(() => []);

      symptoms.forEach((s) => {
        const d = new Date(s.date);
        const day = d.getDate();
        if (day >= 1 && day <= daysInMonth) {
          buckets[day - 1].push(s.severity);
        }
      });

      const values = buckets.map((day) =>
        day.length ? Math.round(day.reduce((a, b) => a + b) / day.length) : 0
      );

      const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

      return { values, labels };
    }

    return { values: [], labels: [] };
  };

  const symptomGraph = getSymptomGraphData();

  const getMedicationGraphData = () => {
    if (medications.length === 0) return { values: [], labels: [] };

    const nowLocal = new Date();

    if (range === "day") {
      const todayList = medications.filter(
        (m) => new Date(m.date).toDateString() === nowLocal.toDateString()
      );

      return {
        values: [todayList.length],
        labels: ["Today"],
      };
    }

    if (range === "week") {
      const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const buckets = Array(7).fill(0);

      const monday = getStartOfWeek();

      medications.forEach((m) => {
        const d = new Date(m.date);
        if (d < monday) return;

        const weekday = new Date(
          d.getTime() + d.getTimezoneOffset() * 60000
        ).getDay();
        const index = weekday === 0 ? 6 : weekday - 1;
        buckets[index] += 1;
      });

      return { values: buckets, labels };
    }

    if (range === "month") {
      const buckets = Array(daysInMonth).fill(0);

      medications.forEach((m) => {
        const d = new Date(m.date);
        const day = d.getDate();
        if (day >= 1 && day <= daysInMonth) {
          buckets[day - 1] += 1;
        }
      });

      const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

      return { values: buckets, labels };
    }

    return { values: [], labels: [] };
  };

  const medicationGraph = getMedicationGraphData();

  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const entriesForSelectedDay =
    selectedDay !== null
      ? symptoms.filter((s) => {
          const d = new Date(s.date);
          if (range === "week") {
            if (d < startOfWeek || d >= endOfWeek) return false;
            const weekday = new Date(
              d.getTime() + d.getTimezoneOffset() * 60000
            ).getDay();
            const index = weekday === 0 ? 6 : weekday - 1;
            return index === selectedDay;
          }
          if (range === "month") return d.getDate() === selectedDay;
          return d.toDateString() === new Date().toDateString();
        })
      : [];

  const medicationEntriesForSelectedDay =
    selectedDay !== null
      ? medications.filter((m) => {
          const d = new Date(m.date);
          if (range === "week") {
            if (d < startOfWeek || d >= endOfWeek) return false;
            const weekday = new Date(
              d.getTime() + d.getTimezoneOffset() * 60000
            ).getDay();
            const index = weekday === 0 ? 6 : weekday - 1;
            return index === selectedDay;
          }
          if (range === "month") return d.getDate() === selectedDay;
          return d.toDateString() === new Date().toDateString();
        })
      : [];

  const avgSeverity = todaySymptoms.length
    ? Math.round(
        todaySymptoms.reduce((sum, s) => sum + s.severity, 0) /
          todaySymptoms.length
      )
    : 0;

  const getDayLabel = (index: number) => {
    if (range === "day") return "Today";
    if (range === "week")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index];
    if (range === "month") return `Day ${index}`;
    return "";
  };

  const monthlyContext: MonthlyContext = {
    monthlyAvgSeverity,
    daysLogged,
    totalSymptoms,
    totalMedications,
    topTags,
    calendarDays,
    year,
    month,
    symptoms,
    medications,
    onSelectCalendarDay: (day: number) => setSelectedDay(day),
  };

  return (
    <Container>
      <Header>
        <Title accessibilityRole="header">Your Progress</Title>
        <Subtext>A gentle look at how you’ve been feeling over time</Subtext>
        <UpdatedText>{updatedText}</UpdatedText>
      </Header>

      <ToggleRow>
        {["day", "week", "month"].map((item) => (
          <Toggle
            key={item}
            active={range === item}
            onPress={() => {
              setRange(item as any);
              setSelectedDay(null);
              setSelectedType(null);
            }}
          >
            <ToggleText active={range === item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ToggleText>
          </Toggle>
        ))}
      </ToggleRow>

      <ScrollView showsVerticalScrollIndicator={false}>
        {range === "day" ? (
          <Section>
            <SectionTitle>Today</SectionTitle>

            <DailyCard>
              <Circle severity={avgSeverity}>
                <CircleText>{avgSeverity}</CircleText>
              </Circle>

              <Insight style={{ marginTop: 8, fontWeight: "600" }}>
                Average severity today
              </Insight>

              <Insight style={{ marginTop: 6 }}>
                {todaySymptoms.length} symptom
                {todaySymptoms.length !== 1 ? "s" : ""} •{" "}
                {todayMedications.length} medication
                {todayMedications.length !== 1 ? "s" : ""}
              </Insight>

              <Insight style={{ marginTop: 14 }}>
                {avgSeverity === 0
                  ? "Nothing logged yet today."
                  : avgSeverity <= 2
                  ? "A gentle day so far."
                  : avgSeverity <= 4
                  ? "A mixed day - remember to rest."
                  : "A tougher day - be kind to yourself."}
              </Insight>
            </DailyCard>

            {(todaySymptoms.length > 0 || todayMedications.length > 0) && (
              <Section>
                <SectionTitle>Today’s items</SectionTitle>

                {todaySymptoms.map((entry, i) => (
                  <TodayItem
                    key={`s-${i}`}
                    onPress={() => {
                      setSelectedType("symptom");
                      setSelectedDay(0);
                    }}
                  >
                    <TodayItemTitle>Symptom</TodayItemTitle>
                    <TodayItemText>Severity: {entry.severity}</TodayItemText>
                    {entry.tags.length > 0 && (
                      <TodayItemText>
                        Tags: {entry.tags.join(", ")}
                      </TodayItemText>
                    )}
                  </TodayItem>
                ))}

                {todayMedications.map((entry, i) => (
                  <TodayItem
                    key={`m-${i}`}
                    onPress={() => {
                      setSelectedType("medication");
                      setSelectedDay(0);
                    }}
                  >
                    <TodayItemTitle>Medication</TodayItemTitle>
                    <TodayItemText>{entry.name}</TodayItemText>
                    <TodayItemText>Dose: {entry.dose}</TodayItemText>
                  </TodayItem>
                ))}
              </Section>
            )}
          </Section>
        ) : range === "month" ? (
          <Section>
            <SectionTitle>This month</SectionTitle>
            <Graph
              label="Symptoms & medication"
              data={symptomGraph}
              onSelectDay={(day) => {
                setSelectedType("both");
                setSelectedDay(day);
              }}
              monthlyContext={monthlyContext}
            />
          </Section>
        ) : (
          <>
            <Section>
              <SectionTitle>Symptoms</SectionTitle>
              <Graph
                label="Breathlessness & mood"
                data={symptomGraph}
                onSelectDay={(day) => {
                  setSelectedType("symptom");
                  setSelectedDay(day);
                }}
              />
            </Section>

            <Section>
              <SectionTitle>Medication</SectionTitle>
              <Graph
                label="Medication taken"
                data={medicationGraph}
                onSelectDay={(day) => {
                  setSelectedType("medication");
                  setSelectedDay(day);
                }}
              />
            </Section>
          </>
        )}
      </ScrollView>

      <DayModal
        visible={selectedDay !== null}
        dayLabel={selectedDay !== null ? getDayLabel(selectedDay) : ""}
        symptoms={entriesForSelectedDay}
        medications={medicationEntriesForSelectedDay}
        type={selectedType}
        onClose={() => {
          setSelectedDay(null);
          setSelectedType(null);
        }}
      />
    </Container>
  );
};

export default HistoryScreen;
