import { useState } from 'react'
import 'animate.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'animate.css';

import Header from './Componentes/Header/Header';
import Nav from './Componentes/Navbar/Nav';
import Footer from './Componentes/Footer/Footer';

import Home from './Pages/Home/Home';
import Characters from './Pages/Characters/Characters';
import Error from './Pages/Errores/ErrorPage';
import Details from './Pages/Details/Details';
import Filtros from './Pages/Filtros/Filtros';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Nav /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/characters' element={<Characters />} />
          <Route path='/characters/:id' element={<Details />} />
          <Route path='/filtros' element={<Filtros/>} />
          <Route path='*' element={<Error />} /> 
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;