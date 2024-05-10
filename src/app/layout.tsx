import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

declare namespace NodeJS {
  interface ProcessEnv {
      NEXT_PUBLIC_GA_TRACKING_ID: string;
  }
}
const googleAnalyticsId: string = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

const inter = Inter({ subsets: ["latin"] });
const universalJackFont = localFont({
  src: 'fonts/UniversalJackHalftoneItalic-K7rAo.otf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Max Laurendeau Web Dev",
  description: "My personal page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${universalJackFont.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          // disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={googleAnalyticsId} />
    </html>
  );
}
