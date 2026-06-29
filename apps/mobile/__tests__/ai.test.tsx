/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import { useAuth } from "../app/utils/useAuth";
import AiScreen from "../app/(tabs)/ai";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Ionicons: (props: any) => React.createElement(Text, null, props.name),
  };
});

jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LinearGradient: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
  },
}));

jest.mock("../utils/useAuth", () => ({
  useAuth: jest.fn(() => ({
    user: {
      uid: "user-456",
      email: "amy@breathewell.com",
      displayName: "Amy Jordan",
    },
    loading: false,
  })),
}));

const mockAddListener = jest.fn((event: string, callback: () => void) => {
  if (event === "focus") callback();
  return () => {};
});
jest.mock("expo-router/build/useNavigation", () => ({
  useNavigation: () => ({
    addListener: mockAddListener,
  }),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 20, left: 0, right: 0 }),
}));

describe("AiScreen Component Unit Tests", () => {
  let mockFetch: jest.Mock<() => Promise<any>>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = jest.fn();
    global.fetch = mockFetch as any;
  });

  describe("Initial Compilation & Context Layout Integrity", () => {
    it("should display greeting layout welcoming the user by their parsed first name", async () => {
      const { getByText, getByPlaceholderText } = await render(<AiScreen />);

      expect(getByText("AI Companion")).toBeTruthy();
      expect(getByPlaceholderText("Hi Amy, how are you feeling?")).toBeTruthy();
    });

    it("should fall back to using email address context strings if profile display names are absent", async () => {
      jest.mocked(useAuth).mockReturnValueOnce({
        user: {
          uid: "user-456",
          email: "amy@breathewell.com",
          displayName: undefined,
        } as any,
        loading: false,
      });

      const { getByPlaceholderText } = await render(<AiScreen />);

      expect(
        getByPlaceholderText("Hi amy@breathewell.com, how are you feeling?")
      ).toBeTruthy();
    });
  });

  describe("Interactive Conversational State Messaging Mechanics", () => {});

  describe("Validation Guards & UI Constraints", () => {
    it("should isolate actions and block submission streams when structural contents evaluate blank whitespaces", async () => {
      const { getByPlaceholderText, getByLabelText } = await render(
        <AiScreen />
      );

      const textInput = getByPlaceholderText("Hi Amy, how are you feeling?");
      const sendButton = getByLabelText("Send message");

      fireEvent.changeText(textInput, "   ");
      fireEvent.press(sendButton);

      expect(mockFetch).not.toHaveBeenCalled();
      expect(sendButton.props.accessibilityState?.disabled).toBe(true);
    });
  });
});
