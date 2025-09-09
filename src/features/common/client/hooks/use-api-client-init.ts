'use client';

import { useEffect } from 'react';

import { apiClient } from '../../shared/lib/api-client';
import { getRuntimeEnvironment } from '../../shared/lib/config';

export function useApiClientInit(): void {
  useEffect(() => {
    let initialized = false;

    const initializeApiClient = async (): Promise<void> => {
      if (initialized) return;

      try {
        const baseURL = await getRuntimeEnvironment('API_URL');
        if (baseURL) {
          apiClient.defaults.baseURL = baseURL;
        }
        initialized = true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize API client:', error);
      }
    };

    initializeApiClient();
  }, []);
}
