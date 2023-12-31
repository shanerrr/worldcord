import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@worldcord/components/providers/theme-provide";
import { SocketProvider } from "@worldcord/components/providers/socket-provider";

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
            <SocketProvider>{children}</SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
