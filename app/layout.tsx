import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'TRUTH WORLD',
  description: '환영합니다!',
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
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
