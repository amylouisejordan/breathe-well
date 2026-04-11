import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  Card,
  GraphLabel,
  LegendRow,
  LegendDot,
  LegendText,
  GraphArea,
  Grid,
  GridLine,
  GraphHint,
  BarLabel,
} from "./styled";

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

const MoodDotChart = (props: MoodDotChartProps) => {
  const { data, dates, onSelectDay } = props;
  const { values, labels } = data;

  const [chartWidth, setChartWidth] = React.useState(0);

  if (chartWidth === 0) {
    return (
      <Card>
        <GraphLabel>Mood</GraphLabel>
        <GraphArea
          style={{ height: 100 }}
          onLayout={(e: {
            nativeEvent: { layout: { width: React.SetStateAction<number> } };
          }) => setChartWidth(e.nativeEvent.layout.width)}
        />
      </Card>
    );
  }

  const width = chartWidth;
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
      <GraphLabel>Thoughts & Feelings</GraphLabel>

      <LegendRow>
        <LegendDot />
        <LegendText>Your logged mood</LegendText>
      </LegendRow>
      <GraphArea style={{ height: 60, paddingTop: 32, paddingBottom: 36 }}>
        <Grid>
          {[...Array(2)].map((_, i) => (
            <GridLine key={i} />
          ))}
        </Grid>

        <Svg width={width} height={height} style={{ position: "absolute" }}>
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
        {points.map((p, i) =>
          p.v !== null && dates ? (
            <TouchableOpacity
              key={i}
              style={{
                position: "absolute",
                left: p.x - pointSpacing / 2,
                top: dotY - 20,
                width: pointSpacing,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
              onPress={() => onSelectDay?.(dates[i])}
            />
          ) : null
        )}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width,
            height: 20,
            flexDirection: "row",
          }}
        >
          {labels.map((label, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: points[i].x - pointSpacing / 2,
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
