import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import { ActionSheetIOS } from "react-native";
import { router } from "expo-router";
import ArticlesScreen from "@/app/(tabs)/articles";

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: "success",
  },
}));

jest
  .spyOn(ActionSheetIOS, "showActionSheetWithOptions")
  .mockImplementation(() => {});

describe("ArticlesScreen Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe("Initial Layout Compilation & Rendering Integrity", () => {
    it("should correctly display the main screen header and layout descriptive titles", async () => {
      const { getByText } = await render(<ArticlesScreen />);

      expect(getByText("Articles")).toBeTruthy();
      expect(
        getByText("Read up on wellness, science, and stories")
      ).toBeTruthy();
    });

    it("should render all static dummy articles by default in the list hierarchy", async () => {
      const { getByText } = await render(<ArticlesScreen />);

      expect(getByText("Breathe Your Way to Calm")).toBeTruthy();
      expect(getByText("The Science of Micro-Meditation")).toBeTruthy();
      expect(getByText("Sleep Like a Pro")).toBeTruthy();
    });

    it("should default the structural sorting UI view to state: Newest", async () => {
      const { getByText } = await render(<ArticlesScreen />);
      expect(getByText("Sort: Newest")).toBeTruthy();
    });
  });

  describe("Navigation Routing Interactivity", () => {
    it("should intercept card press selection events and dispatch router navigate tracking pathways", async () => {
      const { getByText } = await render(<ArticlesScreen />);

      const articleTitle = getByText("Breathe Your Way to Calm");
      fireEvent.press(articleTitle);

      expect(router.navigate).toHaveBeenCalledWith("/articles/1");
    });
  });

  describe("Sorting Sheet Action State Flow", () => {
    it("should launch the native iOS Action Sheet modal layout upon pressing the sort button wrapper", async () => {
      const { getByText } = await render(<ArticlesScreen />);
      const sortButton = getByText("Sort: Newest");

      fireEvent.press(sortButton);

      expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          options: ["Newest", "Oldest", "Cancel"],
          cancelButtonIndex: 2,
        }),
        expect.any(Function)
      );
    });

    it("should update the sorting label and reorder structural rendering trees when selecting 'Oldest'", async () => {
      jest
        .mocked(ActionSheetIOS.showActionSheetWithOptions)
        .mockImplementationOnce((options, callback) => {
          callback(1);
        });

      const { getByText } = await render(<ArticlesScreen />);
      const sortButton = getByText("Sort: Newest");

      fireEvent.press(sortButton);

      await waitFor(() => {
        expect(getByText("Sort: Oldest")).toBeTruthy();
      });
    });
  });
});
