import { FilmStoreInitializer } from "@/components/FilmStoreInitializer/FilmStoreInitializer";
import Header from "@/components/sections/header";
import MainContent from "@/components/sections/mainContent";
import Nav from "@/components/sections/nav";
import { ghibliService } from "@/services/api/route";

export default async function Home() {
  const films = await ghibliService.getFilms();

  return (
    <div className="p-8">
      <FilmStoreInitializer films={films} />
      <Header />
      <Nav />
      <MainContent />
    </div>
  );
}
