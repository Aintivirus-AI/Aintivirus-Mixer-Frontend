import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const calSans = localFont({
  src: './CalSans-Regular.ttf',
  variable: '--font-cal-sans',
});
