import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #fafafb;
  padding: 28px 20px 0;
`;

export const Header = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: #6c63ff;
`;

export const Subtext = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 6px;
`;

export const UpdatedText = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  margin-bottom: 28px;
  background: #f1f1f5;
  border-radius: 30px;
  padding: 4px;
`;

export const Toggle = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 10px 0;
  border-radius: 26px;
  align-items: center;
  background: ${({ active }: { active: boolean }) =>
    active ? "#6c63ff" : "transparent"};
`;

export const ToggleText = styled.Text<{ active: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ active }: { active: boolean }) => (active ? "#fff" : "#666")};
`;

export const Section = styled.View`
  margin-bottom: 36px;
`;

export const SectionTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #6c63ff;
  margin-bottom: 14px;
`;

export const Card = styled.View`
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #f1f1f5;
  margin-bottom: 20px;
`;

export const GraphLabel = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
`;

export const LegendRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const LegendDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #6c63ff;
  margin-right: 6px;
`;

export const LegendText = styled.Text`
  font-size: 13px;
  color: #666;
`;

export const GraphArea = styled.View`
  margin-bottom: 16px;
  position: relative;
`;

export const Grid = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
`;

export const GridLine = styled.View`
  height: 1px;
  background: #eee;
`;

export const BarRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 160px;
  gap: 8px;
`;

export const BarContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

export const Bar = styled.View`
  background: #6c63ff;
  border-radius: 8px;
  opacity: 0.9;
  width: 22px;
`;

export const ValueLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-top: 6px;
`;

export const BarLabel = styled.Text`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

export const GraphHint = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const ModalBackdrop = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const ModalCard = styled.View`
  background: #fff;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
`;

export const EntryRow = styled.View`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const EntrySeverity = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const EntryTags = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

export const EntryNotes = styled.Text`
  font-size: 14px;
  color: #777;
`;

export const CloseButton = styled.Text`
  margin-top: 20px;
  text-align: center;
  color: #6c63ff;
  font-weight: 700;
  font-size: 16px;
`;

export const CalendarGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const DayCell = styled.TouchableOpacity`
  width: 13%;
  aspect-ratio: 1;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #f1f1f5;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const DayNumber = styled.Text`
  font-size: 12px;
  color: #333;
  margin-bottom: 4px;
`;

export const SymptomDot = styled.View<{ severity: number }>`
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

export const MedicationDot = styled.View<{ hasMed: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${({ hasMed }: { hasMed: boolean }) =>
    hasMed ? "#6c63ff" : "transparent"};
  margin-top: 2px;
`;

export const DailyCard = styled.View`
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #f1f1f5;
  margin-bottom: 24px;
  align-items: center;
`;

export const Circle = styled.View<{ severity: number }>`
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

export const CircleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

export const Insight = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`;

export const TodayItem = styled.TouchableOpacity`
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #f1f1f5;
  margin-bottom: 12px;
`;

export const TodayItemTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

export const TodayItemText = styled.Text`
  font-size: 14px;
  color: #555;
`;
