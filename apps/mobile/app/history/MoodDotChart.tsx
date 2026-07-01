import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  GraphLabel,
  LegendRow,
  LegendDot,
  LegendText,
  GraphArea,
  Grid,
  GridLine,
  GraphHint,
  BarLabel,
  Insight,
} from "./styled";
import { Card } from "../styled";

interface MoodDotChartProps {
  data: { values: (number | null)[]; labels: string[] };
  dates?: Date[];
  onSelectDay?: (date: Date) => void;
}

export const EMOTION_COLORS: Record<number, string> = {
  1: "#4CAF50",
  2: "#8BC34A",
  3: "#FFEB3B",
  4: "#FF9800",
  5: "#F44336",
};

const EMOTION_LABELS: Record<number, string> = {
  1: "Very Good",
  2: "Good",
  3: "Neutral",
  4: "Low",
  5: "Very Low",
};

const MoodDotChart = (props: MoodDotChartProps) => {
  const { data, dates, onSelectDay } = props;
  const { values, labels } = data;

  if (!values.some((v) => v !== null)) {
    return (
      <Card
        accessible={true}
        accessibilityLabel="Thoughts and feelings history chart. No data logged yet. Log something to begin."
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ fontSize: 32, marginRight: 8 }}
            importantForAccessibility="no"
            accessibilityElementsHidden={true}
          >
            🌤️
          </Text>
          <Insight style={{ fontSize: 16, opacity: 0.8, marginTop: 3 }}>
            No data yet - log something to begin
          </Insight>
        </View>
      </Card>
    );
  }

  const width = Dimensions.get("window").width - 75;

  const height = 100;
  const padding = 20;

  const pointSpacing = (width - padding * 2) / (values.length - 1);
  const dotY = height - 75;

  const points = values.map((v, i) => ({
    x: padding + i * pointSpacing,
    v,
  }));

  return (
    <Card>
      <GraphLabel accessibilityRole="header">Thoughts & Feelings</GraphLabel>

      <LegendRow
        accessible={true}
        accessibilityLabel="Chart index key: Displays your logged mood levels over time."
      >
        <LegendDot
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        />
        <LegendText>Your logged mood</LegendText>
      </LegendRow>
      <GraphArea style={{ height: 60, paddingTop: 32, paddingBottom: 36 }}>
        <Grid importantForAccessibility="no" accessibilityElementsHidden={true}>
          {[...Array(2)].map((_, i) => (
            <GridLine key={i} />
          ))}
        </Grid>

        <Svg
          width={width}
          height={height}
          style={{ position: "absolute" }}
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          {points.map((p, i) =>
            p.v !== null ? (
              <Circle
                key={`c-${i}`}
                cx={p.x}
                cy={dotY}
                r={12}
                fill={EMOTION_COLORS[p.v]}
                stroke="#fff"
                strokeWidth={2}
                pointerEvents="none"
              />
            ) : null
          )}
        </Svg>

        {points.map((p, i) => {
          if (p.v === null) return null;

          const dayLabel = labels[i];
          const moodText = EMOTION_LABELS[p.v] || `Level ${p.v}`;

          return (
            <TouchableOpacity
              key={i}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${dayLabel}. Mood level: ${moodText}.`}
              accessibilityHint="Double tap to open mood notes and tags for this day."
              style={{
                position: "absolute",
                left: p.x - pointSpacing / 2,
                top: dotY - 20,
                width: pointSpacing,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
              onPress={() => dates && onSelectDay?.(dates[i])}
            />
          );
        })}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width,
            height: 20,
          }}
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden={true}
        >
          {labels.map((label, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: padding + i * pointSpacing - pointSpacing / 2 + 0.5,
                width: pointSpacing,
                alignItems: "center",
              }}
            >
              <BarLabel>{label}</BarLabel>
            </View>
          ))}
        </View>
      </GraphArea>

      <GraphHint>Tap a dot to see your mood notes and tags</GraphHint>
    </Card>
  );
};

export default MoodDotChart;
