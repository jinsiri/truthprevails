import type { Metadata } from 'next';
import '@/styles/globals.css';
import { preconnect } from 'react-dom';
import { IMAGE_ROOT } from '@/constants/imageSrc';
import HistoryDepthTracker from '@/components/HistoryDepthTracker';

const OG_IMAGE = { url: `${IMAGE_ROOT}/images/game/preview_game_day_v2.png`, width: 3023, height: 1643, alt: 'TRUTH WORLD 게임 모드 미리보기' };

export const metadata: Metadata = {
  metadataBase: new URL('https://truthprevails.me'),
  title: 'TRUTH WORLD',
  description: '환영합니다!',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'TRUTH WORLD',
    title: 'TRUTH WORLD',
    description: '환영합니다!',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRUTH WORLD',
    description: '환영합니다!',
    images: [OG_IMAGE.url],
  },
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/favicon.ico`, type: 'image/x-icon' },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/android-chrome-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/android-chrome-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon/apple-touch-icon.png`, sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect(new URL(IMAGE_ROOT).origin);

  return (
    <html lang='ko'>
      <body>
        <HistoryDepthTracker />
        {children}
      </body>
    </html>
  );
}
