import { useState, useEffect } from 'react';
import CharacterCard from '../../Componentes/Cards/CharacterCard';
import './Filtros.css';
import portal from '../../assets/portal.png';

export default function Filtros() {
  const [characters, setCharacters] = useState([]);
  const [species, setSpecies] = useState(''); 
  
  const [page, setPage] = useState(1); 
  const [info, setInfo] = useState({}); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const speciesList = [
    { id: 'Human', label: 'HUMAN' },
    { id: 'Alien', label: 'ALIEN' },
    { id: 'Humanoid', label: 'HUMANOID' },
    { id: 'Robot', label: 'ROBOT' },
    { id: 'Mythological Creature', label: 'MYTHOLOGICAL CREATURE' },
    { id: 'Disease', label: 'DISEASE' },
    { id: 'Poopybutthole', label: 'POOPYBUTTHOLE' },
    { id: 'unknown', label: 'DESCONOCIDO' }
  ];

  useEffect(() => {
    if (!species) return; 

    const fetchFilteredCharacters = async () => {
      setLoading(true);
      setError(null);
      setCharacters([]);
      
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&species=${species}`);
        
        if (response.status === 404) {
          setError("No se encontraron formas de vida de esta especie.");
          setInfo({}); 
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCharacters(data.results);
        setInfo(data.info); 
      } catch (err) {
        setError("Error de conexión con el portal."); 
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCharacters();
    window.scrollTo({ top: 400, behavior: 'smooth' });

  }, [species, page]); 

  const handleSpeciesSelect = (id) => {
    if (species === id) {
      setSpecies(''); 
      setCharacters([]); 
      setInfo({});
      setError(null);
    } else {
      setSpecies(id);
      setPage(1); 
    }
  };

  const goToNextPage = () => { if (info.next) setPage(page + 1); };
  const goToPrevPage = () => { if (info.prev) setPage(page - 1); };

  return (
    <div id="cotenedorFiltros">
      
      <div id="filtrosHead">
        <h4>FILTRO DIMENSIONAL</h4>
        <h1>POR ESPECIE</h1>
      </div>

      <div id="especiesBoton">
        {speciesList.map((item) => (
          <button key={item.id} className={`boton ${species === item.id ? 'active' : ''}`} onClick={() => handleSpeciesSelect(item.id)}>{item.label}
          </button>
        ))}
      </div>

      {!species && (
        <div id="contenedorPortal">
          <div>
            <img src={portal} alt="Portal" className="PortalIcono animate__animated animate__pulse animate__infinite"/>
          </div>
          <div>
            <p>SELECCIONA UNA ESPECIE</p>
          </div>
        </div>
      )}

      {species && loading && (
        <h3 style={{ textAlign: 'center', color: '#39FF14', marginTop: '40px', letterSpacing: '2px', fontFamily: "'Bungee', cursive" }}>
          ESCANEO EN PROCESO...
        </h3>
      )}

      {error && !loading && (
        <h3 className="error-text" style={{textAlign: 'center', marginTop: '40px', color: '#ff003c'}}>
          ⚠ {error} ⚠
        </h3>
      )}
      
      {!loading && characters.length > 0 && (
        <>
          <div id="personajes">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>

          {info.pages > 1 && (
              <div id="paginacion">
                <button 
                  onClick={goToPrevPage} 
                  disabled={!info.prev}
                >
                  &#9664; ANTERIOR
                </button>
                
                <span>
                  {page} / {info.pages}
                </span>
                
                <button 
                  onClick={goToNextPage} 
                  disabled={!info.next}
                >
                  SIGUIENTE &#9654;
                </button>
              </div>
            )}
        </>
      )}

    </div>
  );
}