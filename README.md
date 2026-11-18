# Fleet Management App

Mobile fleet operations dashboard for tracking vehicles, maintenance, fuel usage, and work orders. Designed for dispatch and maintenance teams to get an at-a-glance view of fleet health and take action quickly.

## Tech Stack

React Native, Expo, TypeScript, C# .NET API, MySQL.

## Core Features

Dashboard analytics, Preventative Maintenance scheduling, Fuel logging, Work Order tracking.

## Setup Instructions

Backend API (C# .NET)

```bash
cd path/to/backend
dotnet restore
dotnet run
```

Mobile App (React Native Expo)

Copy `.env.example` to `.env` and fill in the token URL and API credentials. Credentials are never committed.

```bash
cd path/to/learning_react
npm install
npx expo start
```

## Firebase Auth Setup (Native)

This app uses React Native Firebase. Expo Go does not support custom native modules.

1. Add Firebase config files
- `android/app/google-services.json`
- `ios/GoogleService-Info.plist`

2. Prebuild and run a native build

```bash
npx expo prebuild
npx expo run:android
```

For iOS:

```bash
npx expo run:ios
```
