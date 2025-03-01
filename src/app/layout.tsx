"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { LayoutProvider } from "./_context/layout.context";
import { Layout } from "./_components/layout";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LayoutProvider>
        <Layout>{children}</Layout>
      </LayoutProvider>
    </html>
  );
}
