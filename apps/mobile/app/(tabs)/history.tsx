import { ScrollView, Modal } from "react-native";
import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { useFocusEffect } from "expo-router";
import { load } from "../utils/storage";

const Container = styled.View`
  flex: 1;
  background: #fafafb;
  padding: 28px 20px 0;
`;

const Header = styled.View`
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: #6c63ff;
`;

const Subtext = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 6px;
`;

const UpdatedText = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  margin-bottom: 28px;
  background: #f1f1f5;
  border-radius: 30px;
  padding: 4px;
`;

interface ToggleProps {
  active: boolean;
}

const Toggle = styled.TouchableOpacity<ToggleProps>`
  flex: 1;
  padding: 10px 0;
  border-radius: 26px;
  align-items: center;
  background: ${({ active }: { active: boolean }) =>
    active ? "#6c63ff" : "transparent"};
`;

interface ToggleTextProps {
  active: boolean;
}

const ToggleText = styled.Text<ToggleTextProps>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ active }: ToggleTextProps) => (active ? "#fff" : "#666")};
`;

const Section = styled.View`
  margin-bottom: 36px;
`;

const SectionTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #6c63ff;
  margin-bottom: 14px;
`;

const Card = styled.View`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #f1f1f5;
  margin-bottom: 20px;
`;

const GraphLabel = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
`;

const LegendRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const LegendDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #6c63ff;
  margin-right: 6px;
`;

const LegendText = styled.Text`
  font-size: 13px;
  color: #666;
`;

const GraphArea = styled.View`
  margin-bottom: 16px;
  position: relative;
`;

const Grid = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
`;

const GridLine = styled.View`
  height: 1px;
  background: #eee;
`;

const BarRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 160px;
  gap: 8px;
`;

const BarContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const Bar = styled.View`
  background: #6c63ff;
  border-radius: 8px;
  opacity: 0.9;
  width: 22px;
`;

const ValueLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-top: 6px;
`;

const BarLabel = styled.Text`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

const GraphHint = styled.Text`
  font-size: 13px;
  color: #999;
`;

const ModalBackdrop = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ModalCard = styled.View`
  background: #fff;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
`;

const EntryRow = styled.View`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const EntrySeverity = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const EntryTags = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const EntryNotes = styled.Text`
  font-size: 14px;
  color: #777;
`;

const CloseButton = styled.Text`
  margin-top: 20px;
  text-align: center;
  color: #6c63ff;
  font-weight: 700;
  font-size: 16px;
`;

const DailyCard = styled.View`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #f1f1f5;
  margin-bottom: 24px;
  align-items: center;
`;

const Circle = styled.View<{ severity: number }>`
  background: ${({ severity }: { severity: number }) =>
    severity === 0
      ? "#e5e5e5"
      : severity <= 2
      ? "#b2e8c8"
      : severity <= 4
      ? "#ffe6a7"
      : "#ffb3b3"};
  width: 90px;
  height: 90px;
  border-radius: 45px;
  justify-content: center;
  align-items: center;
`;

const CircleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const Insight = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`;

const TodayItem = styled.TouchableOpacity`
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #f1f1f5;
  margin-bottom: 12px;
`;

const TodayItemTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const TodayItemText = styled.Text`
  font-size: 14px;
  color: #555;
`;

const CalendarGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const DayCell = styled.TouchableOpacity`
  width: 13%;
  aspect-ratio: 1;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #f1f1f5;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const DayNumber = styled.Text`
  font-size: 12px;
  color: #333;
  margin-bottom: 4px;
`;

const SymptomDot = styled.View<{ severity: number }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${({ severity }: { severity: number }) =>
    severity === 0
      ? "transparent"
      : severity <= 2
      ? "#b2e8c8"
      : severity <= 4
      ? "#ffe6a7"
      : "#ffb3b3"};
`;

const MedicationDot = styled.View<{ hasMed: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${({ hasMed }: { hasMed: boolean }) =>
    hasMed ? "#6c63ff" : "transparent"};
  margin-top: 2px;
`;

type SymptomEntry = {
  severity: number;
  tags: string[];
  notes: string;
  date: string;
};

type MedicationEntry = {
  name: string;
  dose: string;
  notes: string;
  date: string;
};

type MonthlyContext = {
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

const History = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<
    "symptom" | "medication" | "both" | null
  >(null);

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

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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
      const buckets: number[][] = Array(30)
        .fill(null)
        .map(() => []);

      symptoms.forEach((s) => {
        const diff = Math.floor(
          (nowLocal.getTime() - new Date(s.date).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (diff < 30) buckets[29 - diff].push(s.severity);
      });

      const values = buckets.map((day) =>
        day.length ? Math.round(day.reduce((a, b) => a + b) / day.length) : 0
      );

      const labels = Array.from({ length: 30 }, (_, i) => `${30 - i}`);

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
      const buckets = Array(30).fill(0);

      medications.forEach((m) => {
        const diff = Math.floor(
          (nowLocal.getTime() - new Date(m.date).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (diff < 30) buckets[29 - diff] += 1;
      });

      const labels = Array.from({ length: 30 }, (_, i) => `${30 - i}`);

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
        <UpdatedText>Last updated: today</UpdatedText>
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

      {selectedDay !== null && (
        <Modal transparent animationType="fade">
          <ModalBackdrop>
            <ModalCard>
              <ModalTitle>{getDayLabel(selectedDay)}’s entries</ModalTitle>

              {(selectedType === "symptom" || selectedType === "both") &&
                entriesForSelectedDay.map((entry, i) => (
                  <EntryRow key={i}>
                    <EntrySeverity>Severity: {entry.severity}</EntrySeverity>
                    <EntryTags>
                      Tags: {entry.tags.join(", ") || "None"}
                    </EntryTags>
                    <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                  </EntryRow>
                ))}

              {(selectedType === "medication" || selectedType === "both") &&
                medicationEntriesForSelectedDay.map((entry, i) => (
                  <EntryRow key={i}>
                    <EntrySeverity>{entry.name}</EntrySeverity>
                    <EntryTags>Dose: {entry.dose}</EntryTags>
                    <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                  </EntryRow>
                ))}

              <CloseButton
                onPress={() => {
                  setSelectedDay(null);
                  setSelectedType(null);
                }}
              >
                Close
              </CloseButton>
            </ModalCard>
          </ModalBackdrop>
        </Modal>
      )}
    </Container>
  );
};

const Graph = ({
  label,
  data,
  onSelectDay,
  monthlyContext,
}: {
  label: string;
  data: { values: number[]; labels: string[] };
  onSelectDay?: (day: number) => void;
  monthlyContext?: MonthlyContext;
}) => {
  const isMonth = data.labels.length === 30;

  if (!data.values.length || data.values.every((v) => v === 0)) {
    return (
      <Card>
        <GraphLabel>{label}</GraphLabel>
        <GraphHint>No data yet - log something to begin</GraphHint>
      </Card>
    );
  }

  if (isMonth && monthlyContext) {
    const {
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
      onSelectCalendarDay,
    } = monthlyContext;

    return (
      <Card>
        <GraphLabel>{label}</GraphLabel>

        <LegendRow>
          <LegendDot />
          <LegendText>Your logged data</LegendText>
        </LegendRow>

        <GraphArea>
          <DailyCard style={{ marginBottom: 28 }}>
            <Circle severity={monthlyAvgSeverity}>
              <CircleText>{monthlyAvgSeverity}</CircleText>
            </Circle>

            <Insight style={{ marginTop: 8, fontWeight: "600" }}>
              Average severity this month
            </Insight>

            <Insight style={{ marginTop: 6 }}>
              {daysLogged} days logged • {totalSymptoms} symptoms •{" "}
              {totalMedications} meds
            </Insight>

            <Insight style={{ marginTop: 14 }}>
              {topTags.length > 0
                ? `Most common: ${topTags.join(", ")}`
                : "No tags logged this month."}
            </Insight>
          </DailyCard>

          <SectionTitle style={{ marginBottom: 16 }}>Calendar</SectionTitle>

          <CalendarGrid>
            {calendarDays.map((day, index) => {
              if (!day) return <DayCell key={index} />;

              const dateString = new Date(year, month, day).toDateString();

              const daySymptoms = symptoms.filter(
                (s) => new Date(s.date).toDateString() === dateString
              );

              const dayMedications = medications.filter(
                (m) => new Date(m.date).toDateString() === dateString
              );

              const avgSeverity = daySymptoms.length
                ? Math.round(
                    daySymptoms.reduce((sum, s) => sum + s.severity, 0) /
                      daySymptoms.length
                  )
                : 0;

              return (
                <DayCell
                  key={index}
                  onPress={() => {
                    onSelectCalendarDay(day);
                    onSelectDay && onSelectDay(day);
                  }}
                >
                  <DayNumber>{day}</DayNumber>
                  <SymptomDot severity={avgSeverity} />
                  <MedicationDot hasMed={dayMedications.length > 0} />
                </DayCell>
              );
            })}
          </CalendarGrid>

          <Insight style={{ marginTop: 12, marginBottom: 12 }}>
            {monthlyAvgSeverity <= 2
              ? "A gentle month overall."
              : monthlyAvgSeverity <= 4
              ? "A mixed month — some ups and downs."
              : "A tougher month — remember to rest and be kind to yourself."}
          </Insight>
        </GraphArea>

        <GraphHint>Tap a day to see your notes and tags</GraphHint>
      </Card>
    );
  }

  return (
    <Card>
      <GraphLabel>{label}</GraphLabel>

      <LegendRow>
        <LegendDot />
        <LegendText>Your logged data</LegendText>
      </LegendRow>

      <GraphArea>
        <Grid>
          {[...Array(4)].map((_, i) => (
            <GridLine key={i} />
          ))}
        </Grid>

        <BarRow>
          {data.values.map((value, index) => (
            <BarContainer
              key={index}
              onPress={() => onSelectDay && onSelectDay(index)}
            >
              <Bar style={{ height: value * 10 }} />
              <ValueLabel>{value}</ValueLabel>
              <BarLabel>{data.labels[index]}</BarLabel>
            </BarContainer>
          ))}
        </BarRow>
      </GraphArea>

      <GraphHint>Tap a bar to see your notes and tags for that day</GraphHint>
    </Card>
  );
};

export default History;
