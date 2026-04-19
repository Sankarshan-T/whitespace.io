"use client";

import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { user } = useKindeBrowserClient();

  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
