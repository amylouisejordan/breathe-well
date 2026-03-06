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
} from "./styled";

interface GraphProps {
  label: string;
  data: { values: number[]; labels: string[] };
  onSelectDay?: (day: number) => void;
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
    onSelectCalendarDay: (day: number) => void;
  };
}

const Graph = (props: GraphProps) => {
  const { label, data, onSelectDay, monthlyContext } = props;

  const isMonth = monthlyContext != null;

  if (!data.values.length || data.values.every((v) => v === 0)) {
    return (
      <Card>
        <GraphLabel>{label}</GraphLabel>
        <GraphHint>No data yet - log something to begin</GraphHint>
      </Card>
    );
  }

  if (isMonth) {
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
              {daysLogged} days logged • {totalSymptoms}{" "}
              {totalSymptoms > 1 ? "symptoms" : "symptom"} • {totalMedications}{" "}
              {totalMedications > 1 ? "medications" : "medication"}
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

              return (
                <DayCell
                  key={index}
                  onPress={() => {
                    onSelectCalendarDay(day);
                    onSelectDay && onSelectDay(day);
                  }}
                >
                  <DayNumber>{day}</DayNumber>
                  <SymptomDot hasSymptom={daySymptoms.length > 0} />
                  <MedicationDot hasMed={dayMedications.length > 0} />
                </DayCell>
              );
            })}
          </CalendarGrid>

          <Insight style={{ marginTop: 12, marginBottom: 12 }}>
            {monthlyAvgSeverity <= 2
              ? "A gentle month overall."
              : monthlyAvgSeverity <= 4
              ? "A mixed month - some ups and downs."
              : "A tougher month - remember to rest and be kind to yourself."}
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

export default Graph;
