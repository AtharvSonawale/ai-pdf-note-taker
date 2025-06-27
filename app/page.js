"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    if (!user) return;
    await createUser({
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
      userName: user.fullName,
    });
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl space-y-6"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">PDF GPT</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Your ultimate pdf summarizer buddy
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            className="text-base px-6 py-4 animate-pulse"
            onClick={handleRedirect}
          >
            Get Started
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </motion.div>
    </main>
  );
}
