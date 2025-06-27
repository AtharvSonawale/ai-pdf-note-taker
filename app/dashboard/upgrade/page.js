"use client";
import { api } from "@/convex/_generated/api";
import { userUpgradePlan } from "@/convex/user";
import { useUser } from "@clerk/nextjs";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import React from "react";
import { toast } from "sonner";

function UpgradePlans() {
  const upgradeUserPlan = useMutation(api.user.userUpgradePlan);
  const { user } = useUser();

  const onPaymentSucces = async () => {
    try {
      const result = await upgradeUserPlan({
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result);
      toast('Plan upgradation successful');
    } catch (error) {
      console.error("Error upgrading user:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
      }}
    >
      <div>
        <h2 className="font-medium text-3xl">Plans</h2>
        <p>Upgrade your plan to upload multiple PDFs and take notes</p>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            {/* Unlimited Plan */}
            <div className="rounded-2xl border border-zinc-600 p-6 ring-1 shadow-xs ring-zinc-600 sm:order-last sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Unlimited <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    $9.99
                  </strong>
                  <span className="text-sm font-medium text-gray-700">
                    /once
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Unlimited PDF uploads</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Unlimited note-taking</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Help center access</span>
                </li>
              </ul>
              <div className="mt-5">
                <PayPalButtons
                  onApprove={async () => await onPaymentSucces()}
                  onCancel={() => console.log("Payment cancelled")}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "9.99",
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            </div>

            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">Free Plan</h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    $0
                  </strong>
                  <span className="text-sm font-medium text-gray-700">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">5 PDF uploads</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Unlimited note-taking</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center gap-1">
                  ✅ <span className="text-gray-700">Help center access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default UpgradePlans;
