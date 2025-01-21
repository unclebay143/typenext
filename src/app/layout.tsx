import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/layout";
import { createClient } from "@/lib/supabase/server";
import { User } from "@/types";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeNext ⚡",
  description: "",
  openGraph: {
    images: [
      "https://res.cloudinary.com/dm3qlqunj/image/upload/v1737441084/typenext-og_ctyezg.png",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <html lang='en' suppressHydrationWarning>
      <Script
        defer
        data-website-id='677ae862387a31aa44576e9c'
        data-domain='unclebigbay.com'
        src='https://datafa.st/js/script.js'
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />

        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Layout currentUser={data as unknown as User}>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
