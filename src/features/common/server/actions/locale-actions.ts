'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Locale } from '@/i18n/request';

export async function setLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  redirect('/');
}
