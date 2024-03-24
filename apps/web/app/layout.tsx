"use client";

import "./globals.css";
import { Inter } from "next/font/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></body>
    </html>
  );
}
