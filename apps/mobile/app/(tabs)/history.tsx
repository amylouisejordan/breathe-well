import React, { useState, useCallback, useMemo } from "react";
import { ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  Subtext,
  ToggleRow,
  Toggle,
  ToggleText,
  Section,
  SectionTitle,
  DailyCard,
  Insight,
  TodayItemTitle,
  TodayItemText,
  TodayCard,
  Card,
  Divider,
} from "../history/styled";

import Graph from "../history/Graph";
import DayModal from "../history/DayModal";
import { REFLECT_EMOTIONS } from "../(modals)/add-wellbeing-form";
import MoodDotChart from "../history/MoodDotChart";
import {
  getAllMedications,
  getAllSymptoms,
  getAllWellbeing,
} from "@/utils/loggingFirestore";

export type SymptomEntry = {
  id: string;
  severity: number;
  tags: string[];
  notes: string;
  date: string;
};

export type MedicationEntry = {
  id: string;
  name: string;
  dose: string;
  notes: string;
  date: string;
};

export type WellbeingEntry = {
  id: string;
  emotion: string;
  notes?: string;
  tags: string[];
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
  const [selectedType, setSelectedType] = useState<
    "symptom" | "medication" | "wellbeing" | "both" | null
  >(null);
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
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const day = new Date(utc).getUTCDay();
    const diff = day === 0 ? -6 : 1 - day;

    return new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + diff)
    );
  };

  const getWeeklyMoodData = () => {
    const monday = getStartOfWeek();
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dates: Date[] = [];

    const values = dayNames.map((_, i) => {
      const d = new Date(
        monday.getFullYear(),
        monday.getMonth(),
        monday.getDate() + i
      );

      dates.push(d);

      const dayValues = wellbeing
        .filter((w) => {
          const wd = new Date(w.date);
          wd.setHours(0, 0, 0, 0);

          const dd = new Date(d);
          dd.setHours(0, 0, 0, 0);
          console.log("COMPARE:", w.date, "vs", d.toISOString());

          return wd.getTime() === dd.getTime();
        })
        .map((w) => EMOTION_SEVERITY[w.emotion] ?? null);

      return dayValues.length
        ? Math.round(dayValues.reduce((a, b) => a + b) / dayValues.length)
        : null;
    });

    return { values, labels: dayNames, dates };
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const symptoms = await getAllSymptoms();
        const medications = await getAllMedications();
        const wellbeing = await getAllWellbeing();

        setSymptoms(symptoms);
        setMedications(medications);
        setWellbeing(wellbeing);
      };
      fetchData();
    }, [])
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const weeklyMood = useMemo(() => getWeeklyMoodData(), [wellbeing]);

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

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

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
      setSelectedCalendarDay(day);
      setSelectedType("both");
    },
  };

  const utcDay = (iso: string) => new Date(iso).getUTCDate();

  const getDateForWeekIndex = (index: number) => {
    const mon = getStartOfWeek();
    mon.setDate(mon.getDate() + index);
    return mon;
  };

  const selectedDaySymptoms = useMemo(() => {
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

  const selectedDayMedications = useMemo(() => {
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
    selectedDaySymptoms.length +
      selectedDayMedications.length +
      selectedDayWellbeing.length >
    0;

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  return (
    <Container>
      <Header>
        <Title>Your Progress</Title>
        <Subtext style={{ marginTop: 4 }}>
          A gentle look at how you’ve been feeling over time
        </Subtext>
      </Header>

      <ToggleRow
        style={{
          backgroundColor: "#f3f0ff",
          padding: 6,
          borderRadius: 14,
          marginHorizontal: 16,
          marginBottom: 20,
          flexDirection: "row",
          gap: 6,
          shadowColor: "#000",
          shadowOpacity: 0.03,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 1 },
        }}
      >
        {["day", "week", "month"].map((item) => (
          <Toggle
            active={range === item}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: range === item ? "#6c63ff" : "transparent",
              alignItems: "center",
            }}
            key={item}
            onPress={() => {
              setRange(item as any);
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

            {todayWellbeing && (
              <DailyCard
                style={{
                  borderLeftWidth: 4,
                  borderLeftColor:
                    getEmotionMeta(todayWellbeing.emotion)?.color || "#ccc",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                {(() => {
                  const meta = getEmotionMeta(todayWellbeing.emotion);
                  const severity =
                    EMOTION_SEVERITY[todayWellbeing.emotion] ?? 3;

                  return (
                    <>
                      <View
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 36,
                          backgroundColor: meta?.color || "#ccc",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 12,
                          shadowColor: "#000",
                          shadowOpacity: 0.06,
                          shadowRadius: 6,
                          shadowOffset: { width: 0, height: 2 },
                        }}
                      >
                        <MaterialIcons
                          name={meta?.icon || "sentiment-neutral"}
                          size={40}
                          color="#fff"
                          style={{ marginTop: 2 }}
                        />
                      </View>

                      <Insight
                        style={{
                          marginTop: 2,
                          fontWeight: "700",
                          fontSize: 17,
                          color: "#333",
                        }}
                      >
                        You’re feeling {meta?.label || "Okay"}
                      </Insight>

                      <Insight
                        style={{
                          marginTop: 8,
                          opacity: 0.85,
                          fontSize: 15,
                          lineHeight: 22,
                        }}
                      >
                        {severity <= 1
                          ? "A gentle day so far."
                          : severity <= 3
                          ? "A mixed day - remember to rest."
                          : "A tougher day - be kind to yourself."}
                      </Insight>

                      {todayWellbeing.tags?.length > 0 && (
                        <Insight
                          style={{
                            marginTop: 16,
                            fontSize: 14,
                            opacity: 0.9,
                          }}
                        >
                          Tags: {todayWellbeing.tags.join(", ")}
                        </Insight>
                      )}

                      <Insight
                        style={{
                          marginTop: 10,
                          fontSize: 14,
                          opacity: 0.9,
                        }}
                      >
                        {todayWellbeing.notes || "No wellbeing notes logged"}
                      </Insight>

                      <Insight
                        style={{
                          marginTop: 20,
                          fontSize: 14,
                          opacity: 0.75,
                        }}
                      >
                        {todaySymptoms.length} symptom
                        {todaySymptoms.length !== 1 ? "s" : ""} •{" "}
                        {todayMedications.length} medication
                        {todayMedications.length !== 1 ? "s" : ""}
                      </Insight>
                    </>
                  );
                })()}
              </DailyCard>
            )}

            {!todayWellbeing &&
              (todaySymptoms.length > 0 || todayMedications.length > 0) && (
                <Card>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 32, marginRight: 8 }}>🌤️</Text>
                    <Insight
                      style={{ fontSize: 16, opacity: 0.8, marginTop: 3 }}
                    >
                      No data yet - log something to begin
                    </Insight>
                  </View>
                </Card>
              )}

            {!todayWellbeing &&
              todaySymptoms.length === 0 &&
              todayMedications.length === 0 && (
                <DailyCard
                  style={{
                    padding: 28,
                    alignItems: "center",
                    backgroundColor: "#faf8ff",
                    borderColor: "#e8e4ff",
                    borderRadius: 18,
                  }}
                >
                  <Text style={{ fontSize: 48, marginBottom: 8 }}>🌤️</Text>
                  <Insight style={{ fontSize: 16, opacity: 0.8 }}>
                    No entries logged yet today.
                  </Insight>
                </DailyCard>
              )}

            {(todaySymptoms.length > 0 || todayMedications.length > 0) && (
              <>
                <SectionTitle style={{ marginTop: 20 }}>
                  Today’s items
                </SectionTitle>

                {todaySymptoms.length > 0 && (
                  <View style={{ marginTop: 12 }}>
                    {todaySymptoms.map((entry, i) => (
                      <TodayCard
                        key={`s-${i}`}
                        style={{
                          borderLeftWidth: 4,
                          borderLeftColor:
                            entry.severity >= 7
                              ? "#ff6b6b"
                              : entry.severity >= 4
                              ? "#f7b731"
                              : "#6c63ff",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 6,
                          }}
                        >
                          <MaterialIcons
                            name="healing"
                            size={18}
                            color="#6c63ff"
                          />
                          <TodayItemTitle style={{ marginLeft: 6 }}>
                            Symptom
                          </TodayItemTitle>
                        </View>

                        <TodayItemText style={{ fontSize: 14, opacity: 0.9 }}>
                          Severity: {entry.severity}
                        </TodayItemText>

                        {entry.tags.length > 0 && (
                          <TodayItemText
                            style={{ marginTop: 4, fontSize: 14, opacity: 0.8 }}
                          >
                            Tags: {entry.tags.join(", ")}
                          </TodayItemText>
                        )}
                      </TodayCard>
                    ))}
                  </View>
                )}

                {todayMedications.length > 0 && (
                  <View style={{ marginTop: 12 }}>
                    {todayMedications.map((entry, i) => (
                      <TodayCard
                        key={`m-${i}`}
                        style={{
                          borderLeftWidth: 4,
                          borderLeftColor: "#6c63ff",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 6,
                          }}
                        >
                          <MaterialIcons
                            name="medication"
                            size={18}
                            color="#6c63ff"
                          />
                          <TodayItemTitle style={{ marginLeft: 6 }}>
                            Medication
                          </TodayItemTitle>
                        </View>

                        <TodayItemText style={{ fontSize: 14, opacity: 0.9 }}>
                          {entry.name} • {entry.dose}
                        </TodayItemText>

                        {entry.notes?.length > 0 && (
                          <TodayItemText
                            style={{ marginTop: 4, fontSize: 14, opacity: 0.8 }}
                          >
                            Notes: {entry.notes}
                          </TodayItemText>
                        )}
                      </TodayCard>
                    ))}
                  </View>
                )}
              </>
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
            <Section style={{ marginBottom: -10 }}>
              <SectionTitle>Mood</SectionTitle>
              <MoodDotChart
                data={weeklyMood}
                dates={weeklyMood.dates}
                onSelectDay={(date) => {
                  setSelectedType("wellbeing");
                  setSelectedWeekIndex(getWeekIndex(date));
                  setSelectedCalendarDay(null);
                }}
              />
            </Section>

            <Divider style={{ marginTop: 30 }} />

            <Section style={{ marginBottom: 10 }}>
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

            <Divider style={{ marginTop: 15 }} />

            <Section style={{ marginBottom: 10 }}>
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
          monthName={monthName}
          symptoms={selectedDaySymptoms}
          medications={selectedDayMedications}
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
          <DailyCard>
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
