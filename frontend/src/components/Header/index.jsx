import { FaUserCircle } from "react-icons/fa";
import React from 'react';
import styles from './Header.module.css'

function App() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.nav}>
        <img src="/LogoHeader.jpg" alt="MedFit Logo" className={styles.logoHeader} />
      </div>

      {/* Navigation Buttons */}
      <nav className={styles.nav}>
        <button className={styles.navbutton}>Início</button>
        <button className={styles.navbutton}>Medidas</button>
        <button className={styles.navbutton}>Medicamentos</button>
      </nav>

      {/* Profile Icon */}
      <div className={styles.profile}>
        <FaUserCircle />
      </div>
    </header>
  );
}

export default App;

