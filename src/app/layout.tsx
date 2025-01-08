import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import BootstrapClient from "@/components/wrappers/BootstrapClient";
import Header from "@/components/layout/Header";
import Provider from "@/components/wrappers/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next JS Demo App",
  description: "Template for the Next JS Projects",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <Provider>{children}</Provider>
        <BootstrapClient />
      </body>
    </html>
  );
}
