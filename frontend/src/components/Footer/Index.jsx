import React from "react";
import styles from "./Footer.module.css"; // Importando o CSS Module
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Coluna de links */}
        <div className={styles.footerLinks}>
          <h4>Links Úteis</h4>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#medidas">Medidas</a></li>
            <li><a href="#medicamentos">Medicamentos</a></li>
          </ul>
        </div>

        {/* Coluna de contato */}
        <div className={styles.footerContact}>
          <h4>Contato</h4>
          <p>Email: suporte@medfit.com</p>
          <p>Telefone: +55 (11) 1234-5678</p>
        </div>

        {/* Redes sociais */}
        <div className={styles.footerSocials}>
          <h4>Nos siga</h4>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Direitos autorais */}
      <div className={styles.footerBottom}>
        <p>© 2024 MedFit. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
