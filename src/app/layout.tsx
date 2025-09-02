import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Suspense } from "react";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { siteConfig } from "../../site.config";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.site_name,
  description: siteConfig.site_description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <body
        className={` ${geistSans.variable} ${geistMono.variable}  antialiased pb-10`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Suspense>
            <Header />
          </Suspense>
          <div className="mx-auto max-w-7xl  w-full  px-4 md:px-6 pb-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
