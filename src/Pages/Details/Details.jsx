import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error en el escaneo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <h3 className="loading-text">DESENCRIPTANDO EXPEDIENTE...</h3>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div id="contenedorDetalles">
      <button className="volver" onClick={() => navigate(-1)}>
        &#9664; VOLVER 
      </button>

      <div id="detalles">
        <div id="imagenPersonaje">
          <img src={character.image} alt={character.name} />
          <div className="status-bar">
            ESTADO: <span className={character.status.toLowerCase()}>{character.status}</span>
          </div>
        </div>

        <div id="detallesInformacion">
          <h2>{character.name}</h2>
          
          <div id="contenedorInformacion">
            <div className="info">
              <span className="infoNombre">ESPECIE</span>
              <span className="infoValor">{character.species}</span>
            </div>
            <div className="info">
              <span className="infoNombre">GÉNERO</span>
              <span className="infoValor">{character.gender}</span>
            </div>
            <div className="info">
              <span className="infoNombre">ORIGEN</span>
              <span className="infoValor">{character.origin.name}</span>
            </div>
            <div className="info">
              <span className="infoNombre">ÚLTIMA UBICACIÓN</span>
              <span className="infoValor">{character.location.name}</span>
            </div>
            <div className="info">
              <span className="infoNombre">APARICIONES</span>
              <span className="infoValor">{character.episode.length} EPISODIOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}