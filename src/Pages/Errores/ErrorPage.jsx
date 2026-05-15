import { Link } from 'react-router-dom';
import './ErrorPage.css'; 
import confundidos from '../../assets/confudidos (1).png';

export default function Error() {
  return (
    <div className="error-page-container">
      
      <h1 className="error-code">!404¡</h1>
      <h2 className="error-title">
        ¡DIMENSIÓN NO ENCONTRADA!
      </h2>
      <img src={confundidos} alt="Rick y Morty confundidos" className="error-image" /> 
      <Link to="/" className="btn-return">
        VOLVER AL INICIO
      </Link>
      
    </div>
  );
}