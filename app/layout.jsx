"use client"; // ✅ Keeps the component as a Client Component

import "./globals.css";
import { Radio_Canada_Big } from "next/font/google";
import { Provider } from "@radix-ui/react-tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";

const outfit = Radio_Canada_Big({ subsets: ["latin"] });
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL); // ✅ Ensure this is set

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {" "}
        <html lang="en">
          <body className={outfit.className}>
            <Provider>{children}</Provider>
            <Toaster />
          </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}
