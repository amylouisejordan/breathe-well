import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import { router } from "expo-router";
import { getForumPosts } from "../../utils/forumFirestore";
import { useAuth } from "../utils/useAuth";
import * as Haptics from "expo-haptics";
import { ActionSheetIOS } from "react-native";
import ForumScreen from "./community";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    navigate: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: "success",
  },
}));

jest.mock("../utils/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../utils/forumFirestore", () => ({
  getForumPosts: jest.fn(),
}));

const mockUser = { uid: "user-123", email: "test@breathewell.com" };

const mockSamplePosts = [
  {
    id: "post-alpha",
    title: "B - Coping with cold air",
    body: "Does anyone else find winters tough with their chest?",
    author: "Emma",
    createdAt: new Date("2026-01-10T12:00:00.000Z").toISOString(),
    comments: [
      {
        id: "c1",
        text: "Wrap up warm!",
        author: "Dave",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "post-beta",
    title: "A - Inhaler technique advice",
    body: "Just learned how to correctly use my spacer tool today.",
    author: "Raj",
    createdAt: new Date("2026-01-15T12:00:00.000Z").toISOString(),
    comments: [],
  },
];

describe("ForumScreen Component Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useAuth).mockReturnValue({
      user: mockUser as any,
      loading: false,
    });

    jest.mocked(getForumPosts).mockResolvedValue(mockSamplePosts as any);

    jest
      .spyOn(ActionSheetIOS, "showActionSheetWithOptions")
      .mockImplementation(() => {});
  });

  describe("Authentication Context Guarding", () => {
    it("should render nothing or block fetching if user context is null", async () => {
      jest.mocked(useAuth).mockReturnValue({
        user: null,
        loading: false,
      });

      const { queryByText } = await render(<ForumScreen />);

      await waitFor(() => {
        expect(getForumPosts).not.toHaveBeenCalled();
        expect(queryByText("Community Forum")).toBeTruthy();
      });
    });
  });

  describe("Initial Compilation & Lifecycle States", () => {
    it("should fetch remote data on clean load", async () => {
      const { findByText } = await render(<ForumScreen />);

      expect(await findByText("B - Coping with cold air")).toBeTruthy();
      expect(getForumPosts).toHaveBeenCalledTimes(1);
    });

    it("should display empty state indicators gracefully if no data exists", async () => {
      jest.mocked(getForumPosts).mockResolvedValue([]);

      const { findByText } = await render(<ForumScreen />);

      const emptyIndicator = await findByText("No posts yet - be the first!");
      expect(emptyIndicator).toBeTruthy();
    });
  });

  describe("Content Rendering & Data Mapping Accuracy", () => {
    it("should display titles, authors, and comment badge values correctly", async () => {
      const { findByText } = await render(<ForumScreen />);

      expect(await findByText("B - Coping with cold air")).toBeTruthy();
      expect(await findByText("by Emma")).toBeTruthy();
      expect(await findByText("A - Inhaler technique advice")).toBeTruthy();
      expect(await findByText("1")).toBeTruthy();
    });
  });

  describe("Navigation & User Intent Interaction Hooks", () => {
    it("should push user to the creation panel upon selecting the new post button", async () => {
      const { findByText } = await render(<ForumScreen />);
      await findByText("B - Coping with cold air");

      const newPostBtn = await findByText("+ New Post");
      fireEvent.press(newPostBtn);
      expect(router.push).toHaveBeenCalledWith("/new");
    });

    it("should execute routing navigate to detailed posts view dynamically on item press", async () => {
      const { findByText } = await render(<ForumScreen />);
      const postCardElement = await findByText("B - Coping with cold air");

      fireEvent.press(postCardElement);
      expect(router.navigate).toHaveBeenCalledWith("/(forum)/post-alpha");
    });
  });

  describe("Data Sorting Metrics", () => {
    it("should present structural iOS platform native ActionSheet options upon pressing sort action rows", async () => {
      const { findByText } = await render(<ForumScreen />);
      await findByText("B - Coping with cold air");

      const sortButton = await findByText("Sort: Newest");
      fireEvent.press(sortButton);

      expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          options: ["Newest", "Oldest", "A → Z", "Z → A", "Cancel"],
          cancelButtonIndex: 4,
        }),
        expect.any(Function)
      );
    });

    it("should correctly update the internal sorting matrix arrays and order (A -> Z)", async () => {
      const { findByText, getAllByText } = await render(<ForumScreen />);
      await findByText("B - Coping with cold air");

      const sortButton = await findByText("Sort: Newest");
      fireEvent.press(sortButton);

      const mockActionSheetCall = jest.mocked(
        ActionSheetIOS.showActionSheetWithOptions
      ).mock.calls[0];
      const callbackAction = mockActionSheetCall[1] as (index: number) => void;

      act(() => {
        callbackAction(2);
      });

      await waitFor(() => {
        const postHeaders = getAllByText(
          /Inhaler technique advice|Coping with cold air/
        );
        expect(postHeaders[0].props.children).toContain(
          "A - Inhaler technique advice"
        );
        expect(postHeaders[1].props.children).toContain(
          "B - Coping with cold air"
        );
      });
    });
  });

  describe("Pull-to-Refresh Control Mechanics", () => {
    it("should re-execute pipeline fetch queries and fire haptics notifications upon activation", async () => {
      const { findByTestId, findByText } = await render(<ForumScreen />);

      await findByText("B - Coping with cold air");

      const screenWrapper = await findByTestId("forum-screen");
      const refreshControl = screenWrapper.props.refreshControl;

      await act(async () => {
        await refreshControl.props.onRefresh();
      });

      expect(getForumPosts).toHaveBeenCalledTimes(2);
      expect(Haptics.notificationAsync).toHaveBeenCalledWith(
        Haptics.NotificationFeedbackType.Success
      );
    });
  });
});
