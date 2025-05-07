"use client";

import { useGhibliFilms } from "@/hooks/useGhibliFilms";

export default function Home() {
  const { films, loading, error } = useGhibliFilms()

  if (loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>
  return (
   <div>
    <h1>Studio Ghibli Films</h1> 
    <ul>
      {films.map((film) => (
        <li key={film.id}>{film.title}</li>
      ))}
    </ul>
   </div>
  );
}
