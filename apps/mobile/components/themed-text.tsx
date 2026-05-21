import { TextProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

import {
  DefaultText,
  DefaultSemiBoldText,
  TitleText,
  SubtitleText,
  LinkText,
} from "./styled";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const sharedStyle = [{ color }, style];

  switch (type) {
    case "title":
      return <TitleText style={sharedStyle} {...rest} />;
    case "defaultSemiBold":
      return <DefaultSemiBoldText style={sharedStyle} {...rest} />;
    case "subtitle":
      return <SubtitleText style={sharedStyle} {...rest} />;
    case "link":
      return <LinkText style={sharedStyle} {...rest} />;
    default:
      return <DefaultText style={sharedStyle} {...rest} />;
  }
}
