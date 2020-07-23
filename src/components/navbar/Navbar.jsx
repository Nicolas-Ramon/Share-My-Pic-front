import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to="/gallery" className="link-navbar" style={{ textDecoration: 'none' }}>
            <p>Gallery</p>
          </Link>
        </li>
        <li>
          <Link to="/manage" className="link-navbar" style={{ textDecoration: 'none' }}>
            <p>Manage</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
