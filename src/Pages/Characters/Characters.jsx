import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../Componentes/Cards/CharacterCard';
import './Character.css';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({}); 
  const [page, setPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${searchTerm}`);
        if (response.status === 404) {
          setCharacters([]);
          setInfo({});
          setError("No se encontraron especimenes con ese nombre.");
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error("El portal interdimensional ha colapsado.");
        
        const data = await response.json();
        setCharacters(data.results);
        setInfo(data.info); 
      } catch (err) {
        setError("CONEXIÓN FALLIDA: No se pudo acceder a la base de datos."); 
      } finally {
        setLoading(false);
      }
    };
    const delaySearch = setTimeout(() => {
      fetchCharacters();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [page, searchTerm]); 

  const goToNextPage = () => { if (info.next) setPage(page + 1); };
  const goToPrevPage = () => { if (info.prev) setPage(page - 1); };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); 
  };

  return (
    <div id="contenedorPersonajes">
      <h2>PERSONAJES DE LA SERIE</h2>
      <div id="contenedorBusqueda">
        <input type="text" id="busqueda" placeholder="Ingresa nombre del especimen..." value={searchTerm}onChange={handleSearch}/>
      </div>
      {loading && (<div className="loading-container"><h3 className="loading-text">Escaneando multiverso...</h3></div>)}
      {error && !loading && (
        <div className="error-container">
          <h3>⚠ {error} ⚠</h3>
        </div>
      )}
      {!loading && !error && (
        <div id="personajes">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}

      {!loading && !error && info.pages > 1 && (
        <div id="paginacion">
          <button onClick={goToPrevPage} disabled={!info.prev}>&#9664; ANT</button>
          <span className="page-tracker-small">
            {page} / {info.pages}
          </span>
          <button onClick={goToNextPage} disabled={!info.next}>SIG &#9654;</button>
        </div>
      )}
    </div>
  );
}