"use client";

import Header from "@/components/sections/header";
import MainContent from "@/components/sections/mainContent";
import Nav from "@/components/sections/nav";

export default function Home() {
  return (
    <div className="p-8">
      <Header />
      <Nav />
      <MainContent />
    </div>
  );
}
