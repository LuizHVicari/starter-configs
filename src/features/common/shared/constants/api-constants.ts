import { getRuntimeEnvironment } from '../lib/config';

export const apiUrl = getRuntimeEnvironment('NEXT_PUBLIC_API_URL');
