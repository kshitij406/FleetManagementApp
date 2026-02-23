import Constants from 'expo-constants';

type AppEnv = 'development' | 'staging' | 'production';

const rawEnv = process.env.EXPO_PUBLIC_APP_ENV ?? Constants.expoConfig?.extra?.appEnv;
const appEnv: AppEnv =
  rawEnv === 'staging' || rawEnv === 'production' ? rawEnv : 'development';

const envUrlMap: Partial<Record<AppEnv, string>> = {
  development: process.env.EXPO_PUBLIC_API_BASE_URL_DEV,
  staging: process.env.EXPO_PUBLIC_API_BASE_URL_STAGING,
  production: process.env.EXPO_PUBLIC_API_BASE_URL_PROD,
};

const apiBaseUrl =
  envUrlMap[appEnv] ??
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  Constants.expoConfig?.extra?.apiBaseUrl;

if (!apiBaseUrl) {
  throw new Error(
    'Missing API base URL. Set EXPO_PUBLIC_API_BASE_URL (or env-specific variables) or expo.extra.apiBaseUrl.'
  );
}

export const APP_ENV = appEnv;
export const API_BASE_URL = apiBaseUrl;
