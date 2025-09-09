import axios from 'axios';

import { getRuntimeEnvironment } from './config';

export const apiClient = axios.create();

getRuntimeEnvironment('API_URL').then((baseURL) => {
  if (baseURL) {
    apiClient.defaults.baseURL = baseURL;
  }
});
