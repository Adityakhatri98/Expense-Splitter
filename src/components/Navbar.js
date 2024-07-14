import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <button className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add-expense">Add Expense</Link></li>
        <li><Link to="/expenses">Expense List</Link></li>
        <li><Link to="/friends">Friend List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
