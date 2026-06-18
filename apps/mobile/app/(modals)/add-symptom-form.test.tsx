/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import { Alert } from "react-native";
import AddSymptomForm from "./add-symptom-form";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Ionicons: (props: any) => React.createElement(Text, null, props.name),
  };
});

jest.mock("@react-native-community/slider", () => {
  const React = require("react");
  const { TextInput } = require("react-native");
  const MockSlider = (props: any) => {
    return React.createElement(TextInput, {
      testID: "mock-slider",
      value: String(props.value),
      onChangeText: (val: string) => props.onValueChange?.(Number(val)),
    });
  };
  MockSlider.displayName = "MockSlider";
  return MockSlider;
});

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
  Stack: {
    Screen: () => null,
  },
}));

jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: "success",
    Error: "error",
  },
}));

jest.mock("@/utils/loggingFirestore", () => ({
  saveSymptomEntry: jest.fn(),
}));

jest.mock("../styled", () => {
  const actual = jest.requireActual("../styled");
  const React = require("react");
  const { View } = require("react-native");
  return {
    ...(typeof actual === "object" && actual !== null ? actual : {}),
    AnimatedCardWrapper: ({ children }: any) =>
      React.createElement(View, null, children),
  };
});

jest.spyOn(Alert, "alert");

describe("AddSymptomForm Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderFormAndSettle = async () => {
    return await render(<AddSymptomForm />);
  };

  describe("Initial Compilation & Default State Structural Integrity", () => {
    it("should render screen headers, descriptive texts, and default severity parameters", async () => {
      const { getByText, getByPlaceholderText } = await renderFormAndSettle();

      expect(getByText("Log Symptom")).toBeTruthy();
      expect(
        getByText("Take a moment to record how you’re feeling")
      ).toBeTruthy();
      expect(getByText("Moderate")).toBeTruthy();
      expect(getByText("5")).toBeTruthy();
      expect(
        getByPlaceholderText("Add anything you’d like to remember")
      ).toBeTruthy();
    });
  });

  describe("Form Input Changes & Interactive Calculations", () => {
    it("should dynamically recalculate severity threshold strings when slider limits change", async () => {
      const { getByTestId, getByText } = await renderFormAndSettle();

      const slider = getByTestId("mock-slider");

      fireEvent.changeText(slider, "2");

      await waitFor(() => {
        expect(getByText("Mild")).toBeTruthy();
        expect(getByText("2")).toBeTruthy();
      });
    });

    it("should manage symptom tag toggle arrays and calculate selection counters accurately", async () => {
      const { getByText, queryByText } = await renderFormAndSettle();

      const tagElement = getByText("Breathless");
      expect(queryByText("(1 selected)")).toBeNull();

      fireEvent.press(tagElement);

      await waitFor(() => {
        expect(getByText("(1 selected)")).toBeTruthy();
      });
    });
  });

  describe("Form State Clear Operations", () => {
    it("should cleanly reset form states back to initial baselines when firing reset buttons", async () => {
      const { getByText, getByPlaceholderText } = await renderFormAndSettle();

      fireEvent.changeText(
        getByPlaceholderText("Add anything you’d like to remember"),
        "Woke up struggling."
      );
      fireEvent.press(getByText("Wheezy"));

      fireEvent.press(getByText("Reset"));

      expect(getByText("Moderate")).toBeTruthy();
      expect(getByText("5")).toBeTruthy();
      expect(
        getByPlaceholderText("Add anything you’d like to remember").props.value
      ).toBe("");
    });
  });
});
