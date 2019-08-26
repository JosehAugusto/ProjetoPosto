import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav id="top" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container container-stretched">
          <a className="navbar-brand" href="#!"><i className="fas fa-gas-pump fa-2x"></i>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to='/' className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to='/postos' className="nav-link">Meus Postos</Link>
              </li>
            </ul>
            {/*
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/' className="nav-link" data-toggle="modal" data-target="#registerModal">Registro</Link>
                </li>
                <li className="nav-item">
                  <Link to='/' className="nav-link" data-toggle="modal" data-target="#loginModal">Login</Link>
                </li>
              </ul>
            
            */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
