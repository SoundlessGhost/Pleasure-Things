import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import QueryProviders from "@/providers/QueryProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pleasure Things",
  description: "Generated by silent ghost",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <QueryProviders>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className={inter.className}>
            <Toaster containerClassName="font" />
            {children}
          </body>
        </html>
      </QueryProviders>
    </ClerkProvider>
  );
}
