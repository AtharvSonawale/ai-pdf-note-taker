"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, FileText, Brain, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function LandingPage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryEmailAddress) {
      createUser({
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl,
        userName: user.fullName,
      });
    }
  }, [user, createUser]);

  const handleRedirect = () => router.push("/dashboard");

  return (
    <div className="min-h-screen scroll-smooth bg-white text-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            PDF <span className="text-yellow-500">GPT</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex tracking-tight">
            <button
              onClick={() => scrollToSection("features")}
              className="text-black/70 hover:text-yellow-500 transition font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how")}
              className="text-black/70 hover:text-yellow-500 transition font-medium"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-black/70 hover:text-yellow-500 transition font-medium"
            >
              Pricing
            </button>
            <Button
              className="bg-neutral-900 hover:bg-neutral-700 text-secondary font-semibold"
              onClick={handleRedirect}
            >
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </nav>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-4 border-t tracking-tighter border-black/10 px-6 py-4 md:hidden bg-white">
            <button
              onClick={() => scrollToSection("features")}
              className="text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how")}
              className="text-left"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-left"
            >
              Pricing
            </button>
            <Button
              className="bg-yellow-500 text-black"
              onClick={handleRedirect}
            >
              Dashboard
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative flex items-center justify-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-5xl font-black leading-tight sm:text-6xl md:text-7xl">
            Turn Lengthy PDFs Into
            <span className="text-yellow-500"> Instant Knowledge</span>
          </h1>

          <p className="mt-6 text-lg text-black/70 sm:text-xl">
            Upload any PDF and get summaries, key insights, and answers in
            seconds. Built for students, developers, researchers, and teams who
            refuse to waste time scrolling.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-black hover:bg-neutral-700 text-white font-semibold shadow-lg"
              onClick={handleRedirect}
            >
              Start Summarizing
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Powerful Features</h2>
          <p className="mt-4 text-black/70">
            Everything you need to extract intelligence from documents.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition hover:shadow-xl hover:border-yellow-500"
            >
              <feature.icon className="mb-4 h-10 w-10 text-yellow-500" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-black/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-yellow-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold">How It Works</h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-black font-bold shadow">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-black/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Simple Pricing</h2>
          <p className="mt-4 text-black/70">
            Start free. Upgrade when you need serious power.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricing.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl border bg-white p-8 transition hover:shadow-xl ${
                plan.popular
                  ? "border-yellow-500 shadow-lg scale-105"
                  : "border-black/10"
              }`}
            >
              {plan.popular && (
                <span className="mb-4 inline-block rounded-full bg-yellow-500 px-3 py-1 text-sm text-black font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-4xl font-extrabold text-yellow-600">
                {plan.price}
              </p>
              <ul className="mt-6 space-y-2 text-black/70">
                {plan.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full font-semibold ${
                  plan.popular
                    ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                    : "bg-black text-white hover:bg-black/80"
                }`}
                onClick={handleRedirect}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-500 px-6 py-24 text-center text-white">
        <h2 className="text-4xl font-bold">
          Stop Reading. Start Understanding.
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Join thousands already saving hours every week.
        </p>
        <Button
          size="lg"
          className="mt-8 px-10 py-6 text-lg bg-black text-white hover:bg-black/80"
          onClick={handleRedirect}
        >
          Try PDF GPT Now
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 py-10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-black/60">
            © {new Date().getFullYear()} PDF GPT. All rights reserved.
          </p>
          <div className="flex gap-6 text-black/60">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: FileText,
    title: "Instant Summaries",
    desc: "Compress 200-page documents into clear, structured insights within seconds.",
  },
  {
    icon: Brain,
    title: "Ask Anything",
    desc: "Chat with your PDF and get precise answers without digging manually.",
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    desc: "Optimized AI pipelines deliver results before you lose focus.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    desc: "Your documents stay private with enterprise-grade protection.",
  },
  {
    icon: Brain,
    title: "Context Aware AI",
    desc: "Understands relationships across pages for deeper insights.",
  },
  {
    icon: Zap,
    title: "Built for Power Users",
    desc: "Perfect for research, technical docs, legal files, and study material.",
  },
];

const steps = [
  {
    title: "Upload PDF",
    desc: "Drag, drop, and you're done.",
  },
  {
    title: "AI Processes It",
    desc: "Our models extract structure, meaning, and key points.",
  },
  {
    title: "Get Insights",
    desc: "Summaries, answers, and takeaways instantly.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "₹0",
    features: ["Limited PDFs", "Basic summaries", "Standard speed"],
  },
  {
    name: "Pro",
    price: "₹499/mo",
    popular: true,
    features: [
      "Unlimited PDFs",
      "Faster AI",
      "Deep insights",
      "Priority processing",
    ],
  },
  {
    name: "Team",
    price: "₹1299/mo",
    features: ["Multi-user", "Shared knowledge", "Admin controls", "Top speed"],
  },
];
