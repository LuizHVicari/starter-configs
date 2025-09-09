'use server';

export async function getEnvironmentVariables(): Promise<Record<string, string | undefined>> {
  return {
    API_URL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
  };
}
