import { getEnvironmentVariables } from '../../server/actions/get-environment-variables';

let environmentCache: Record<string, string | undefined> | null = null;

export async function getRuntimeEnvironment(key: string): Promise<string | undefined> {
  if (!environmentCache) {
    try {
      environmentCache = await getEnvironmentVariables();
    } catch {
      environmentCache = {};
    }
  }

  const value = environmentCache[key];
  return value;
}
