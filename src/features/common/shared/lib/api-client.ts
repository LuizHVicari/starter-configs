import axios from 'axios';

import { getRuntimeEnvironment } from './config';

export const apiClient = axios.create();

let initializationPromise: Promise<void> | null = null;

async function initializeApiClient(): Promise<void> {
  if (initializationPromise) return initializationPromise;

  initializationPromise = getRuntimeEnvironment('API_URL').then((baseURL) => {
    if (baseURL) {
      apiClient.defaults.baseURL = baseURL;
    }
  });

  return initializationPromise;
}

apiClient.interceptors.request.use(async (config) => {
  await initializeApiClient();
  return config;
});
