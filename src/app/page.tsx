"use client";

import Header from "@/components/sections/header";
import MainContent from "@/components/sections/mainContent";
import Nav from "@/components/sections/nav";
import { useGhibliFilms } from "@/hooks/useGhibliFilms";

export default function Home() {
  useGhibliFilms();
  return (
    <div className="p-8">
      <Header />
      <Nav />
      <MainContent />
    </div>
  );
}
