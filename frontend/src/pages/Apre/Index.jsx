import React from "react";
import { Link } from "react-router-dom";
import styles from "./Apre.module.css";
import Footer from '../../components/Footer/Index';

function Apre() {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>LOGO</div>
          <div className={styles.buttons}>
            <Link to="/login" className={styles.button}>Login</Link>
            <Link to="/register" className={styles.button}>Registrar</Link>
          </div>
        </header>

        {/* Nova seção de imagem e texto */}
        <section className={styles.heroSection}>
          <div className={styles.imageContainer}>
            <img src="/logoF.png.jpg" alt="MedFit Logo" className={styles.logoHeader} />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.heroTitle}>Sua Saúde, Nosso Compromisso</h2>
            <p className={styles.heroDescription}>
              Nossa plataforma foi projetada para ajudar você a monitorar e melhorar sua saúde de maneira simples e eficiente. Descubra um mundo de possibilidades para gerenciar sua saúde com praticidade e segurança.
            </p>
          </div>
        </section>

        <main className={styles.mainContent}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Gerencie sua Saúde com Facilidade</h1>
            <p className={styles.subtitle}>
              Acompanhe suas medições, acesse gráficos e dados de consulta, organize medicamentos e muito mais!
            </p>
            <Link to="/register" className={styles.ctaButton}>Comece Agora</Link>
          </div>

          {/* Seção de Benefícios */}
          <section className={styles.benefits}>
            <h2>Por que escolher nossa plataforma?</h2>
            <ul className={styles.benefitsList}>
              <li>
                <img src="/images/icons/health.svg" alt="Saúde" />
                <h3>Acompanhamento Completo</h3>
                <p>Tenha todas as informações sobre sua saúde em um único lugar.</p>
              </li>
              <li>
                <img src="/images/icons/graph.svg" alt="Gráficos" />
                <h3>Gráficos Detalhados</h3>
                <p>Analise tendências e padrões com nossos gráficos interativos.</p>
              </li>
              <li>
                <img src="/images/icons/reminders.svg" alt="Lembretes" />
                <h3>Lembretes Personalizados</h3>
                <p>Receba alertas para medicamentos e consultas importantes.</p>
              </li>
              <li>
                <img src="/images/icons/shield.svg" alt="Segurança" />
                <h3>Segurança e Privacidade</h3>
                <p>Seus dados protegidos com criptografia de ponta.</p>
              </li>
            </ul>
          </section>

          {/* Seção de Depoimentos */}
          <section className={styles.testimonials}>
            <h2>O que nossos usuários dizem</h2>
            <div className={styles.testimonialCard}>
              <p>"Esta plataforma mudou a forma como cuido da minha saúde. É simples, prático e eficiente!"</p>
              <span>- Maria Silva</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>"Adoro a funcionalidade de gráficos. Agora posso acompanhar minha pressão de forma clara."</p>
              <span>- João Pereira</span>
            </div>
          </section>

          {/* Chamada para Ação Adicional */}
          <div className={styles.extraCTA}>
            <h2>Pronto para transformar sua rotina de cuidados?</h2>
            <Link to="/register" className={styles.ctaButton}>Crie sua conta grátis</Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Apre;
