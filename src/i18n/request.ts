import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

async function getLocaleFromHeaders(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }
  return 'en';
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  let locale: string = cookieLocale || (await getLocaleFromHeaders());

  if (!locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
