# Changelog

🚀 **BreatheWell** — A React Native MVP developed for a BSc (Hons) Digital & Technology Solutions dissertation project. 

This log tracks development milestones, shifting from initial mock setups to a functional AI-integrated prototype. It follows standard changelog principles, grouped by features and fixes.

---

## [1.0.0] - June 2026 (Final Academic MVP & Polish)
### Added
- ✨ **Profiles:** Added a mini-profile view inside the community forum features.
- ✅ **Testing Suite:** Configured Jest and React Testing Library (RTL) framework and verified test cases.
- 🧱 **Educational Content:** Built an articles layout with placeholder data for user learning modules.

### Changed
- ⚡️ **Bedrock AI:** Tuned the Amazon Bedrock system prompt constraints to optimize the companion's responses.
- 🎨 **UI Overhaul:** Updated the theme colours to match design style tiles and migrated inline styles to `styled-components`.
- 🗃️ **Database Tuning:** Optimised database read behaviors after creating strategic Firestore indexes.

### Fixed
- 🐛 **Day Modal:** Fixed a view overflow bug by wrapping modal elements in a proper scrollable view container.
- 🔧 **Data Handling:** Patched a medication logging bug and corrected data sorting orders inside the community modules.

---

## [0.2.0] - April 2026 (Firebase Backing & AI Core)
### Added
- 🏗️ **Auth:** Integrated Firebase Authentication for secure personal user sessions.
- ✨ **AI Companion:** Connected the interface to Amazon Bedrock to bring the interactive companion prototype to life.
- 🧱 **Forum Feature:** Linked the community forum to Firebase with working cloud storage, live comments, and entry animations.
- ✨ **Wellbeing Logs:** Rolled out a dedicated wellbeing logging form to capture metrics alongside standard symptoms.

### Changed
- 🔒 **Security Rules:** Updated active data fetching structures to align with strict Firebase Security Rules.

### Fixed
- 🐛 **Weekly Mood:** Patched data mapping logic that was causing a calculation bug on the weekly graph.
- 🎨 **Layout UI:** Fixed alignment issues with modal titles, back arrows, and forum details screens.

---

## [0.1.0] - February/March 2026 (Initial App Framework)
### Added
- 🎉 **Project Scaffold:** Initialised the React Native app environment using Expo and TypeScript.
- 🏗️ **UI Mockups:** Created the baseline navigation shell and placeholder layouts for the Companion, History, Forum, and Profile spaces.
- ✨ **Tracking Inputs:** Created fundamental forms to let users log symptoms, medications, and input basic tracker information.

### Changed
- 🎨 **Refactoring:** Cleaned up the folder structures and broke down major screens into smaller, reusable child subcomponents.