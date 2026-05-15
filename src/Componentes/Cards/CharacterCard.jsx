import { useNavigate } from 'react-router-dom';
import './CharacterCard.css';

export default function CharacterCard({ character }) {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  };

  return (
    <div 
      id="contenedorTarjetas" 
      onClick={() => navigate(`/characters/${character.id}`)} 
      style={{ cursor: 'pointer' }} 
    >
      <div id="contenedorImg">
        <img src={character.image} alt={character.name}/>
        <span className={`status-badge ${getStatusClass(character.status)}`}>
          {character.status.toUpperCase()}
        </span>
      </div>
      
      <div id="contenedorPersonaje">
        <h3>{character.name.toUpperCase()}</h3>
        <p><span className="categorias">ESPECIE:</span> {character.species}</p>
        <p><span className="categorias">GÉNERO:</span> {character.gender}</p>
        <p><span className="categorias">ORIGEN:</span> {character.origin.name}</p>
      </div>
    </div>
  );
}