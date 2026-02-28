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
  background: ${({ active }: ToggleProps) =>
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
  height: 160px;
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
  height: 100%;
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

const History = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  const getSymptomGraphData = () => {
    if (symptoms.length === 0) return { values: [], labels: [] };

    const now = new Date();

    if (range === "day") {
      const today = symptoms.filter(
        (s) => new Date(s.date).toDateString() === now.toDateString()
      );

      return {
        values: today.length
          ? [
              Math.round(
                today.reduce((a, b) => a + b.severity, 0) / today.length
              ),
            ]
          : [],
        labels: today.length ? ["Today"] : [],
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
          (now.getTime() - new Date(s.date).getTime()) / (1000 * 60 * 60 * 24)
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

    const now = new Date();

    if (range === "day") {
      const today = medications.filter(
        (m) => new Date(m.date).toDateString() === now.toDateString()
      );

      return {
        values: [today.length],
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
          (now.getTime() - new Date(m.date).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff < 30) buckets[29 - diff] += 1;
      });

      const labels = Array.from({ length: 30 }, (_, i) => `${30 - i}`);

      return { values: buckets, labels };
    }

    return { values: [], labels: [] };
  };

  const medicationGraph = getMedicationGraphData();

  const entriesForSelectedDay =
    selectedDay !== null
      ? symptoms.filter((s) => {
          const weekday = new Date(
            new Date(s.date).getTime() +
              new Date(s.date).getTimezoneOffset() * 60000
          ).getDay();
          const index = weekday === 0 ? 6 : weekday - 1;
          return index === selectedDay;
        })
      : [];

  const medicationEntriesForSelectedDay =
    selectedDay !== null
      ? medications.filter((m) => {
          const weekday = new Date(
            new Date(m.date).getTime() +
              new Date(m.date).getTimezoneOffset() * 60000
          ).getDay();
          const index = weekday === 0 ? 6 : weekday - 1;
          return index === selectedDay;
        })
      : [];

  const getDayLabel = (index: number) => {
    if (range === "day") return "Today";
    if (range === "week")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index];
    if (range === "month") return `Day ${index + 1}`;
    return "";
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
            onPress={() => setRange(item as any)}
          >
            <ToggleText active={range === item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ToggleText>
          </Toggle>
        ))}
      </ToggleRow>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Symptoms</SectionTitle>
          <Graph
            label="Breathlessness & mood"
            data={symptomGraph}
            onSelectDay={setSelectedDay}
          />
        </Section>

        <Section>
          <SectionTitle>Medication</SectionTitle>
          <Graph
            label="Medication taken"
            data={medicationGraph}
            onSelectDay={setSelectedDay}
          />
        </Section>
      </ScrollView>

      {selectedDay !== null && (
        <Modal transparent animationType="fade">
          <ModalBackdrop>
            <ModalCard>
              <ModalTitle>{getDayLabel(selectedDay)}’s entries</ModalTitle>

              {entriesForSelectedDay.map((entry, i) => (
                <EntryRow key={i}>
                  <EntrySeverity>Severity: {entry.severity}</EntrySeverity>
                  <EntryTags>Tags: {entry.tags.join(", ") || "None"}</EntryTags>
                  <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                </EntryRow>
              ))}

              {medicationEntriesForSelectedDay.length > 0 && (
                <>
                  <ModalTitle>Medication</ModalTitle>
                  {medicationEntriesForSelectedDay.map((entry, i) => (
                    <EntryRow key={i}>
                      <EntrySeverity>{entry.name}</EntrySeverity>
                      <EntryTags>Dose: {entry.dose}</EntryTags>
                      <EntryNotes>{entry.notes || "No notes"}</EntryNotes>
                    </EntryRow>
                  ))}
                </>
              )}

              <CloseButton onPress={() => setSelectedDay(null)}>
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
}: {
  label: string;
  data: { values: number[]; labels: string[] };
  onSelectDay?: (day: number) => void;
}) => {
  const isMonth = data.labels.length === 30;

  if (!data.values.length || data.values.every((v) => v === 0)) {
    return (
      <Card>
        <GraphLabel>{label}</GraphLabel>
        <GraphHint>No data yet — log something to begin</GraphHint>
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

        {isMonth ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarRow style={{ width: data.values.length * 20 }}>
              {data.values.map((value, index) => (
                <BarContainer
                  key={index}
                  onPress={() => onSelectDay && onSelectDay(index)}
                >
                  <Bar style={{ width: 10, height: value * 8 }} />
                  <ValueLabel>{value}</ValueLabel>
                  <BarLabel>{index + 1}</BarLabel>
                </BarContainer>
              ))}
            </BarRow>
          </ScrollView>
        ) : (
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
        )}
      </GraphArea>

      <GraphHint>Tap a bar to see your notes and tags for that day</GraphHint>
    </Card>
  );
};

export default History;
