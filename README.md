# Personal Health Tracker

Personal Health Tracker is a mobile app designed to help you keep track of your health in a simple way. It lets you manage the medications you're taking, your medical appointments, and a directory of doctors and medical institutions, all in one place.

The app works as a personal organizer: it's designed both for people who take medications regularly and visit the doctor frequently, and for any user who simply wants better control and tracking of their health.

## Project architecture

The project is built with [Expo](https://docs.expo.dev/versions/v57.0.0/) (v57), using [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing.

- **UI**: [React Native Paper](https://reactnativepaper.com/) is used as the component library, aiming to speed up UI development by following Material Design.
- **Forms**: forms are handled with [React Hook Form](https://react-hook-form.com/), chosen over Formik for its better performance (fewer re-renders), which matters for an app with multiple forms (medications, appointments, directory, registration, etc.).
- **Validation**: form validation is done with [Zod](https://zod.dev/), integrated with React Hook Form through `@hookform/resolvers`.
- **Internationalization (i18n)**: the app supports multiple languages via `i18next` and `react-i18next`. Currently supported languages are **English** and **Spanish**.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- The [Expo Go](https://expo.dev/go) app on your mobile device, or a configured Android/iOS emulator/simulator

### Steps

1. Clone the repository and enter the project folder

   ```bash
   git clone <repository-url>
   cd personal-health-care
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the project

   ```bash
   npm run start
   ```

   In the command output you'll find options to open the app in:

   - A [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - An [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - An [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can also start the app directly on a specific platform:

```bash
npm run android
npm run ios
npm run web
```

### Lint

To lint the code with ESLint:

```bash
npm run lint
```

## Project structure

This project uses Expo Router's file-based routing. You can start developing by editing the files inside the `src/app` directory.

## Learn more

- [Expo v57 documentation](https://docs.expo.dev/versions/v57.0.0/)
- [React Native Paper documentation](https://reactnativepaper.com/)
- [React Hook Form documentation](https://react-hook-form.com/)
- [Zod documentation](https://zod.dev/)
- [i18next documentation](https://www.i18next.com/)
