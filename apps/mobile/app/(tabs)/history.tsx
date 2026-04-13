import React, { useState, useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { load } from "../../utils/storage";
import { MaterialIcons } from "@expo/vector-icons";

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
  Insight,
  TodayItem,
  TodayItemTitle,
  TodayItemText,
} from "../history/styled";

import Graph from "../history/Graph";
import DayModal from "../history/DayModal";
import { REFLECT_EMOTIONS } from "../(modals)/add-wellbeing-form";
import MoodDotChart from "../history/MoodDotChart";

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
  wellbeing: any[];
  onSelectCalendarDay: (day: number) => void;
};

export const EMOTION_SEVERITY: Record<string, number> = {
  great: 1,
  good: 2,
  okay: 3,
  sad: 4,
  upset: 5,
};

const HistoryScreen = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [wellbeing, setWellbeing] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<
    "symptom" | "medication" | "wellbeing" | "both" | null
  >(null);
  const [updatedText, setUpdatedText] = useState("");
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number | null>(
    null
  );
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(
    null
  );

  const getWeekIndex = (d: Date) => {
    const mon = getStartOfWeek();
    const diff = d.getTime() - mon.getTime();
    return Math.round(diff / 86400000);
  };

  const getStartOfWeek = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return monday;
  };

  const getWeeklyMoodData = () => {
    const monday = getStartOfWeek();
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dates: Date[] = [];

    const values = dayNames.map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);

      const dayValues = wellbeing
        .filter((w) => new Date(w.date).toDateString() === d.toDateString())
        .map((w) => EMOTION_SEVERITY[w.emotion]);

      return dayValues.length
        ? Math.round(dayValues.reduce((a, b) => a + b) / dayValues.length)
        : null;
    });

    return { values, labels: dayNames, dates };
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const [symptomData, medicationData, wellbeingData] = await Promise.all([
          load("symptoms"),
          load("medications"),
          load("wellbeing"),
        ]);

        setSymptoms(symptomData ?? []);
        setMedications(medicationData ?? []);
        setWellbeing(wellbeingData ?? []);

        const latestDate = new Date(
          Math.max(
            ...(symptomData ?? []).map((s: any) => new Date(s.date).getTime()),
            ...(medicationData ?? []).map((m: any) =>
              new Date(m.date).getTime()
            )
          )
        );
        setUpdatedText(
          Number.isFinite(latestDate.getTime())
            ? `Last updated: ${latestDate.toLocaleDateString()}`
            : ""
        );
      };
      fetchData();
    }, [])
  );

  const todaySymptoms = symptoms.filter(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  );
  const todayMedications = medications.filter(
    (m) => new Date(m.date).toDateString() === new Date().toDateString()
  );
  const todayWellbeing =
    wellbeing.find(
      (w) => new Date(w.date).toDateString() === new Date().toDateString()
    ) || null;

  const getEmotionMeta = (emotionKey: string) =>
    REFLECT_EMOTIONS.find((e) => e.key === emotionKey) || null;

  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth();

  const belongsToMonth = (iso: string) => {
    const d = new Date(iso);
    return d.getUTCFullYear() === year && d.getUTCMonth() === month;
  };

  const monthSymptoms = symptoms.filter((s) => belongsToMonth(s.date));
  const monthMedications = medications.filter((m) => belongsToMonth(m.date));
  const monthWellbeing = wellbeing.filter((w) => belongsToMonth(w.date));

  const monthlyAvgSeverity = monthSymptoms.length
    ? Math.round(
        monthSymptoms.reduce((sum, s) => sum + s.severity, 0) /
          monthSymptoms.length
      )
    : 0;

  const daysLogged = new Set(
    monthSymptoms.map((s) => new Date(s.date).toISOString().slice(0, 10))
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
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++)
    calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

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

        const weekday = d.getDay();

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

      monthSymptoms.forEach((s) => {
        const day = new Date(s.date).getUTCDate();
        if (day >= 1 && day <= daysInMonth) buckets[day - 1].push(s.severity);
      });

      const values = buckets.map((day) =>
        day.length ? Math.round(day.reduce((a, b) => a + b) / day.length) : 0
      );

      const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

      return { values, labels };
    }

    return { values: [], labels: [] };
  };

  const getMedicationGraphData = () => {
    if (medications.length === 0) return { values: [], labels: [] };

    const nowLocal = new Date();

    if (range === "day") {
      const todayList = medications.filter(
        (m) => new Date(m.date).toDateString() === nowLocal.toDateString()
      );

      return { values: [todayList.length], labels: ["Today"] };
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

      monthMedications.forEach((m) => {
        const day = new Date(m.date).getUTCDate();
        if (day >= 1 && day <= daysInMonth) buckets[day - 1] += 1;
      });

      const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

      return { values: buckets, labels };
    }

    return { values: [], labels: [] };
  };

  const symptomGraph = getSymptomGraphData();
  const medicationGraph = getMedicationGraphData();

  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const getDayLabel = () => {
    if (selectedWeekIndex !== null)
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
        selectedWeekIndex
      ];
    if (selectedCalendarDay !== null) return `Day ${selectedCalendarDay}`;
    return "Today";
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
    symptoms: monthSymptoms,
    medications: monthMedications,
    wellbeing: monthWellbeing,
    onSelectCalendarDay: (day) => {
      setSelectedDay(day);
      setSelectedType("both");
    },
  };

  const utcDay = (iso: string) => new Date(iso).getUTCDate();

  const getDateForWeekIndex = (index: number) => {
    const mon = getStartOfWeek();
    mon.setDate(mon.getDate() + index);
    return mon;
  };

  const selectedDayEntries = useMemo(() => {
    if (selectedWeekIndex !== null && range === "week") {
      const d = getDateForWeekIndex(selectedWeekIndex);
      return symptoms.filter(
        (s) => new Date(s.date).toDateString() === d.toDateString()
      );
    }
    if (selectedCalendarDay !== null && range === "month") {
      return symptoms.filter((s) => utcDay(s.date) === selectedCalendarDay);
    }
    if (range === "day") {
      return todaySymptoms;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symptoms, range, selectedWeekIndex, selectedCalendarDay]);

  const selectedDayMeds = useMemo(() => {
    if (selectedWeekIndex !== null && range === "week") {
      const d = getDateForWeekIndex(selectedWeekIndex);
      return medications.filter(
        (m) => new Date(m.date).toDateString() === d.toDateString()
      );
    }
    if (selectedCalendarDay !== null && range === "month") {
      return medications.filter((m) => utcDay(m.date) === selectedCalendarDay);
    }
    if (range === "day") return todayMedications;
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medications, range, selectedWeekIndex, selectedCalendarDay]);

  const selectedDayWellbeing = useMemo(() => {
    if (selectedWeekIndex !== null && range === "week") {
      const d = getDateForWeekIndex(selectedWeekIndex);
      return wellbeing.filter(
        (w) => new Date(w.date).toDateString() === d.toDateString()
      );
    }
    if (selectedCalendarDay !== null && range === "month") {
      return wellbeing.filter((w) => utcDay(w.date) === selectedCalendarDay);
    }
    if (range === "day") return todayWellbeing ? [todayWellbeing] : [];
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wellbeing, range, selectedWeekIndex, selectedCalendarDay]);

  const hasAnyEntry =
    selectedDayEntries.length +
      selectedDayMeds.length +
      selectedDayWellbeing.length >
    0;

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

            {todayWellbeing ? (
              <DailyCard style={{ paddingVertical: 22, alignItems: "center" }}>
                {(() => {
                  const meta = getEmotionMeta(todayWellbeing.emotion);

                  return (
                    <>
                      <View
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 32,
                          backgroundColor: meta?.color || "#ccc",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <MaterialIcons
                          name={meta?.icon || "sentiment-neutral"}
                          size={36}
                          color="#fff"
                        />
                      </View>

                      <Insight
                        style={{
                          marginTop: 4,
                          fontWeight: "600",
                          fontSize: 16,
                        }}
                      >
                        You’re feeling {meta?.label || "Okay"}
                      </Insight>

                      <Insight style={{ marginTop: 6, opacity: 0.8 }}>
                        {todayWellbeing.severity <= 1
                          ? "A gentle day so far."
                          : todayWellbeing.severity <= 3
                          ? "A mixed day — remember to rest."
                          : "A tougher day — be kind to yourself."}
                      </Insight>

                      {todayWellbeing.tags?.length > 0 && (
                        <Insight style={{ marginTop: 14 }}>
                          Tags: {todayWellbeing.tags.join(", ")}
                        </Insight>
                      )}

                      <Insight style={{ marginTop: 6 }}>
                        {todayWellbeing.notes || "No wellbeing notes logged"}
                      </Insight>

                      <Insight style={{ marginTop: 16, fontSize: 14 }}>
                        {todaySymptoms.length} symptom
                        {todaySymptoms.length !== 1 ? "s" : ""} •{" "}
                        {todayMedications.length} medication
                        {todayMedications.length !== 1 ? "s" : ""}
                      </Insight>
                    </>
                  );
                })()}
              </DailyCard>
            ) : (
              <DailyCard style={{ paddingVertical: 22, alignItems: "center" }}>
                <Insight>No wellbeing logged yet today.</Insight>
              </DailyCard>
            )}

            {(todaySymptoms.length > 0 || todayMedications.length > 0) && (
              <Section style={{ marginTop: 24 }}>
                <SectionTitle>Today’s items</SectionTitle>

                {todaySymptoms.length > 0 && (
                  <View style={{ marginTop: 12 }}>
                    {todaySymptoms.map((entry, i) => (
                      <TodayItem
                        key={`s-${i}`}
                        onPress={() => {
                          setSelectedType("symptom");
                          setSelectedDay(0);
                        }}
                        style={{
                          paddingVertical: 14,
                          paddingHorizontal: 16,
                          borderRadius: 12,
                          marginBottom: 12,
                        }}
                      >
                        <TodayItemTitle>Symptom</TodayItemTitle>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          <TodayItemText>
                            Severity: {entry.severity}
                          </TodayItemText>
                        </View>

                        {entry.tags.length > 0 && (
                          <TodayItemText style={{ marginTop: 4 }}>
                            Tags: {entry.tags.join(", ")}
                          </TodayItemText>
                        )}
                      </TodayItem>
                    ))}
                  </View>
                )}

                {todayMedications.length > 0 && (
                  <View style={{ marginTop: 12 }}>
                    {todayMedications.map((entry, i) => (
                      <TodayItem
                        key={`m-${i}`}
                        onPress={() => {
                          setSelectedType("medication");
                          setSelectedDay(0);
                        }}
                        style={{
                          paddingVertical: 14,
                          paddingHorizontal: 16,
                          borderRadius: 12,
                          marginBottom: 12,
                        }}
                      >
                        <TodayItemTitle>Medication</TodayItemTitle>
                        <TodayItemText style={{ marginTop: 4 }}>
                          {entry.name}
                        </TodayItemText>
                        <TodayItemText>Dose: {entry.dose}</TodayItemText>
                      </TodayItem>
                    ))}
                  </View>
                )}
              </Section>
            )}
          </Section>
        ) : range === "month" ? (
          <Section>
            <SectionTitle>This month</SectionTitle>
            <Graph
              label="This month"
              data={{ values: [1], labels: [""] }}
              monthlyContext={monthlyContext}
            />
          </Section>
        ) : (
          <>
            <Section>
              <SectionTitle>Mood</SectionTitle>
              <MoodDotChart
                data={getWeeklyMoodData()}
                dates={getWeeklyMoodData().dates}
                onSelectDay={(date) => {
                  setSelectedType("wellbeing");
                  setSelectedWeekIndex(getWeekIndex(date));
                  setSelectedCalendarDay(null);
                }}
              />
            </Section>

            <Section>
              <SectionTitle>Symptoms</SectionTitle>
              <Graph
                label="Breathlessness"
                data={symptomGraph}
                onSelectDay={(index) => {
                  setSelectedType("symptom");
                  if (range === "week") {
                    setSelectedWeekIndex(index);
                    setSelectedCalendarDay(null);
                  } else if (range === "month") {
                    setSelectedCalendarDay(index + 1);
                    setSelectedWeekIndex(null);
                  } else {
                    setSelectedWeekIndex(null);
                    setSelectedCalendarDay(null);
                  }
                }}
              />
            </Section>

            <Section>
              <SectionTitle>Medication</SectionTitle>
              <Graph
                label="Medication taken"
                data={medicationGraph}
                onSelectDay={(index) => {
                  setSelectedType("medication");
                  if (range === "week") {
                    setSelectedWeekIndex(index);
                    setSelectedCalendarDay(null);
                  } else if (range === "month") {
                    setSelectedCalendarDay(index + 1);
                    setSelectedWeekIndex(null);
                  } else {
                    setSelectedWeekIndex(null);
                    setSelectedCalendarDay(null);
                  }
                }}
              />
            </Section>
          </>
        )}
      </ScrollView>

      {hasAnyEntry ? (
        <DayModal
          visible={selectedWeekIndex !== null || selectedCalendarDay !== null}
          dayLabel={getDayLabel()}
          symptoms={selectedDayEntries}
          medications={selectedDayMeds}
          wellbeing={selectedDayWellbeing}
          type={selectedType}
          onClose={() => {
            setSelectedWeekIndex(null);
            setSelectedCalendarDay(null);
            setSelectedType(null);
          }}
        />
      ) : (
        (selectedWeekIndex !== null || selectedCalendarDay !== null) && (
          <DailyCard style={{ marginTop: 12 }}>
            <Insight>
              Nothing logged for this day - tap another or add an entry.
            </Insight>
          </DailyCard>
        )
      )}
    </Container>
  );
};

export default HistoryScreen;
