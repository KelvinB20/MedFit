import { FaRegCircleUser } from "react-icons/fa6";
import React from 'react';
import styles from './Header.module.css'
import { Link } from "react-router-dom";

function App() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.nav}>
        <img src="/LogoHeader.jpg" alt="MedFit Logo" className={styles.logoHeader} />
      </div>

      {/* Navigation Buttons */}
      <nav className={styles.nav}>
        <Link className={styles.navlink} to="/">Início</Link>
        <Link className={styles.navlink} to="/Medidas">Acompanhamentos</Link>
        <Link className={styles.navlink} to="/Medicamentos">Medicamentos</Link>
      </nav>

      {/* Profile Icon */}
      <div className={styles.profile}>
        <FaRegCircleUser />
      </div>
    </header>
  );
}

export default App;

