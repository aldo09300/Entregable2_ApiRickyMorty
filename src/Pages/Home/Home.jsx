import { useState, useEffect } from 'react';
import './Home.css';
import logoRickMorty from '../../assets/mortydescripcion.png';

export default function Home() {
  const [stats, setStats] = useState({
    characters: "...",
    locations: "...",
    episodes: "..."
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resCharacters, resLocations, resEpisodes] = await Promise.all([
          fetch('https://rickandmortyapi.com/api/character'),
          fetch('https://rickandmortyapi.com/api/location'),
          fetch('https://rickandmortyapi.com/api/episode')
        ]);

        const dataCharacters = await resCharacters.json();
        const dataLocations = await resLocations.json();
        const dataEpisodes = await resEpisodes.json();
        setStats({
          characters: dataCharacters.info.count,
          locations: dataLocations.info.count,
          episodes: dataEpisodes.info.count
        });
      } catch (error) {
        console.error("Error al conectar con la API interdimensional:", error);
        setStats({ characters: "ERR", locations: "ERR", episodes: "ERR" });
      }
    };

    fetchStats();
  }, []); 

  return (
    <main>
      <section id="SectionDescripcion">
        <article id="descripcion">
          <p>
          Rick y Morty es una comedia de animación para adultos que sigue las locas y peligrosas aventuras de Rick Sanchez, 
          un científico genio, alcohólico y nihilista, y su tímido e influenciable nieto Morty. Juntos viajan a través del 
          espacio, el tiempo y realidades paralelas usando una pistola de portales, arrastrando frecuentemente al resto de 
          su disfuncional familia a caos intergalácticos de proporciones cósmicas.
         
          </p>
        </article>
        <article id="imagen">
            <img src={logoRickMorty} alt="Rick and Morty Home"/>
        </article>
      </section>
      <section id="SectionInfo">
        <article id="contenedor">
          <div className="cajas">
            <h3 className="numeros">{stats.characters}</h3>
            <p className="nombre">PERSONAJES</p>
          </div>
          <div className="cajas">
            <h3 className="numeros">{stats.locations}</h3>
            <p className="nombre">LOCACIONES</p>
          </div>
          <div className="cajas">
            <h3 className="numeros">{stats.episodes}</h3>
            <p className="nombre">EPISODIOS</p>
          </div>
        </article>
      </section>
    </main>
  );
}