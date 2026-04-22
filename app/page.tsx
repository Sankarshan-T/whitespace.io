"use client";

import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Features } from "./_components/Features";

export function MainBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#030712]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f630,transparent_60%),radial-gradient(circle_at_100%_100%,#60a5fa20,transparent_60%),radial-gradient(circle_at_0%_50%,#dbeafe50,transparent_40%)] dark:hidden" />

      <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a40,transparent_50%),radial-gradient(circle_at_100%_100%,#1e40af25,transparent_50%)]" />

      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_80%,transparent_100%)]" />

    </div>
  );
}

export default function Home() {
  const { user } = useKindeBrowserClient();

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden">
        <MainBackground />
        <Hero />
        <Features />
      </div>
    </>
  );
}
