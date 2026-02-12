"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

if (!paypalClientId) {
  console.error("PayPal Client ID is missing! Ensure it's set in .env file.");
}

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ConvexProvider client={convex}>
      <PayPalScriptProvider options={{ clientId: paypalClientId }}>
        {children}
      </PayPalScriptProvider>
    </ConvexProvider>
  );
}

export default Provider;
