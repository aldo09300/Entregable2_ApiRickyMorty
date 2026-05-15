import { Link } from 'react-router-dom';
import './Nav.css';
import pepinillorick from '../../assets/pepinillorick.png';
import portal from '../../assets/portal.png';
import pistola from '../../assets/pistola.png';

export default function Nav() {
  return (
    <nav>
      <Link to="/" className="navegacion"><img src={portal} alt="Portal Rick Nav"/> Inicio</Link>
      <Link to="/characters" className="navegacion"><img src={pepinillorick} alt="Pepinillo Rick Nav"/> Personajes</Link>
      <Link to="/filtros" className="navegacion"><img src={pistola} alt="Pistola Rick Nav"/> Filtros por especie</Link>
    </nav>
  );
}