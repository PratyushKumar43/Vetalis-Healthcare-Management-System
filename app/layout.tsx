import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NeonAuthProvider } from "@/components/auth/NeonAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vitalis - AI Healthcare Management System",
  description: "A comprehensive management system empowering doctors with AI-driven prescriptions, instant report analysis, and seamless patient monitoring.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NeonAuthProvider>{children}</NeonAuthProvider>
      </body>
    </html>
  );
}

