import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@worldcord/components/providers/theme-provider";
import QueryProvider from "@worldcord/components/providers/query-provider";
import ModalProvider from "@worldcord/components/providers/modal-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "WorldCord",
  description: "Explore what others are doing around the world!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="worldcord-theme"
          >
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
