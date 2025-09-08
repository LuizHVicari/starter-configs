'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Locale } from '@/i18n/request';

export async function setLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies();

  // Set the locale cookie
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow client-side access if needed
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Redirect to the same page to trigger locale change
  redirect('/');
}
