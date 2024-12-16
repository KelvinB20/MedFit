import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Footer from '../../components/Footer/Index';
import Header from '../../components/Header';
import styles from './Medidas.module.css'; // Importando o CSS Module

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Medidas() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');

  const handleIMC = () => {
    if (altura && peso) {
      const imc = peso / (altura * altura);
      return imc.toFixed(2);
    }
    return null;
  };

  const handlePA = () => {
    if (sistolica && diastolica) {
      return `PA: ${sistolica}/${diastolica}`;
    }
    return null;
  };

  // Gráfico IMC
  const imcData = {
    labels: ['IMC'],
    datasets: [
      {
        label: 'IMC',
        data: [handleIMC()],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  // Gráfico PA
  const paData = {
    labels: ['PA'],
    datasets: [
      {
        label: 'Pressão Arterial',
        data: [sistolica, diastolica],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  // Função para limpar os dados
  const handleClear = () => {
    setAltura('');
    setPeso('');
    setSistolica('');
    setDiastolica('');
  };

  // Função para enviar (aqui pode adicionar a lógica de envio de dados)
  const handleSubmit = () => {
    alert('Dados enviados!');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Medidas</h1>

        {/* Seção de inputs */}
        <div className={styles['inputs-container']}>
          <div className={styles['input-box']}>
            <h2>IMC</h2>
            <input
              type="number"
              placeholder="Altura (em metros)"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
            <input
              type="number"
              placeholder="Peso (em kg)"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
            <div className={styles.graph}>
              {handleIMC() && <Line data={imcData} />}
              {handleIMC() && <p>IMC: {handleIMC()}</p>}
            </div>
            <button onClick={handleClear}>Limpar</button>
            <button onClick={handleSubmit}>Enviar</button>
          </div>

          <div className={styles['input-box']}>
            <h2>Pressão Arterial</h2>
            <input
              type="number"
              placeholder="Sistólica"
              value={sistolica}
              onChange={(e) => setSistolica(e.target.value)}
            />
            <input
              type="number"
              placeholder="Diastólica"
              value={diastolica}
              onChange={(e) => setDiastolica(e.target.value)}
            />
            <div className={styles.graph}>
              {handlePA() && <Line data={paData} />}
              {handlePA() && <p>{handlePA()}</p>}
            </div>
            <button onClick={handleClear}>Limpar</button>
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
        
        {/* Seção de Gráficos */}
        <div className={styles['graph-section']}>
          <h2>Gráficos</h2>
        <div className={styles['graph-container']}>
            <h3>Gráfico de IMC</h3>
            {handleIMC() && <Line data={imcData} />}
        </div>
          <div className={styles['graph-container']}>
            <h3>Gráfico de PA</h3>
            {handlePA() && <Line data={paData} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Medidas;
