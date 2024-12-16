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
  const [imcData, setImcData] = useState([]); // Histórico de IMC
  const [paData, setPaData] = useState([]); // Histórico de PA
  const [currentImc, setCurrentImc] = useState(null); // IMC atual
  const [currentPa, setCurrentPa] = useState(null); // PA atual

  // Função para calcular o IMC
  const handleIMC = () => {
    if (altura && peso) {
      const imc = peso / (altura * altura);
      return imc.toFixed(2);
    }
    return null;
  };

  // Função para determinar a categoria do IMC
  const categorizeIMC = (imc) => {
    if (imc < 18.5) return 'Magreza';
    if (imc >= 18.5 && imc <= 24.9) return 'Normal';
    if (imc >= 25.0 && imc <= 29.9) return 'Sobrepeso';
    if (imc >= 30.0 && imc <= 39.9) return 'Obesidade';
    return 'Obesidade Grave';
  };

  // Função para calcular a Pressão Arterial
  const handlePA = () => {
    if (sistolica && diastolica) {
      return `PA: ${sistolica}/${diastolica}`;
    }
    return null;
  };

  // Função para determinar a categoria da Pressão Arterial (com a nova tabela fornecida)
  const categorizePA = (sistolica, diastolica) => {
    if (sistolica < 130 && diastolica >= 80 && diastolica <= 89) return 'Pressão Normal';
    if (sistolica >= 130 && sistolica <= 139 && diastolica >= 90 && diastolica <= 99) return 'Normal Limítrofe';
    if ((sistolica >= 140 && sistolica <= 159) || (diastolica >= 100 && diastolica <= 109)) return 'Hipertensão leve (estágio 1)';
    if (sistolica >= 160 && sistolica <= 179 || diastolica >= 110 && diastolica <= 119) return 'Hipertensão moderada (estágio 2)';
    if (sistolica >= 180 || diastolica >= 120) return 'Hipertensão Grave (estágio 3)';
    return 'Indeterminado';
  };

  // Função para adicionar IMC ao gráfico
  const addIMCData = () => {
    const newIMC = handleIMC();
    if (newIMC) {
      const imcCategory = categorizeIMC(newIMC);
      setImcData((prevData) => [
        ...prevData,
        { label: `Entrada ${new Date().toLocaleDateString()}`, value: newIMC, category: imcCategory },
      ]);
      setCurrentImc(newIMC); // Atualizando o gráfico pequeno com o valor atual
    }
  };

  // Função para adicionar PA ao gráfico
  const addPAData = () => {
    if (sistolica && diastolica) {
      const paCategory = categorizePA(sistolica, diastolica);
      setPaData((prevData) => [
        ...prevData,
        { label: `Entrada ${new Date().toLocaleDateString()}`, systolic: sistolica, diastolic: diastolica, category: paCategory },
      ]);
      setCurrentPa({ systolic: sistolica, diastolic: diastolica }); // Atualizando o gráfico pequeno com o valor atual
    }
  };

  // Função para limpar os dados
  const handleClear = () => {
    setAltura('');
    setPeso('');
    setSistolica('');
    setDiastolica('');
    setCurrentImc(null);
    setCurrentPa(null);
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
              onChange={(e) => setAltura(Math.abs(e.target.value))}
            />
            <input
              type="number"
              placeholder="Peso (em kg)"
              value={peso}
              onChange={(e) => setPeso(Math.abs(e.target.value))}
            />
            <div className={styles.graph}>
              {currentImc && (
                <Line
                  data={{
                    labels: ['Entrada atual'],
                    datasets: [
                      {
                        label: 'IMC',
                        data: [currentImc],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1,
                        fill: false,
                      },
                    ],
                    options: {
                      scales: {
                        y: {
                          min: 0,
                          max: 50,
                          title: {
                            display: true,
                            text: 'IMC',
                          },
                          // Linha de referência para IMC 24.9
                          ticks: {
                            callback: function (value) {
                              if (value === 24.9) {
                                return '24.9 (Limite Superior)';
                              }
                              return value;
                            },
                          },
                        },
                      },
                    },
                  }}
                />
              )}
              {currentImc && <p>IMC: {currentImc}</p>}
              {currentImc && <p>Categoria: {categorizeIMC(currentImc)}</p>}
            </div>
            <button className={styles['clear-button']} onClick={handleClear}>
              Limpar
            </button>
            <button onClick={addIMCData}>Adicionar IMC</button>
          </div>

          <div className={styles['input-box']}>
            <h2>Pressão Arterial</h2>
            <input
              type="number"
              placeholder="Sistólica"
              value={sistolica}
              onChange={(e) => setSistolica(Math.abs(e.target.value))}
            />
            <input
              type="number"
              placeholder="Diastólica"
              value={diastolica}
              onChange={(e) => setDiastolica(Math.abs(e.target.value))}
            />
            <div className={styles.graph}>
              {currentPa && (
                <Line
                  data={{
                    labels: ['Entrada atual'],
                    datasets: [
                      {
                        label: 'Pressão Arterial',
                        data: [currentPa.systolic, currentPa.diastolic],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1,
                        fill: false,
                      },
                    ],
                    options: {
                      scales: {
                        y: {
                          min: 0,
                          max: 200,
                          title: {
                            display: true,
                            text: 'Pressão Arterial',
                          },
                          // Linha de referência para Pressão Normal
                          ticks: {
                            callback: function (value) {
                              if (value === 130) {
                                return '130 (Limite Superior)';
                              }
                              if (value === 80) {
                                return '80 (Ideal Diastólica)';
                              }
                              return value;
                            },
                          },
                        },
                      },
                    },
                  }}
                />
              )}
              {currentPa && <p>PA: {currentPa.systolic}/{currentPa.diastolic}</p>}
              {currentPa && <p>Categoria: {categorizePA(currentPa.systolic, currentPa.diastolic)}</p>}
            </div>
            <button className={styles['clear-button']} onClick={handleClear}>
              Limpar
            </button>
            <button onClick={addPAData}>Adicionar PA</button>
          </div>
        </div>

        {/* Seção de Gráficos Históricos */}
        <div className={styles['graph-section']}>
          <h2>Gráficos de Histórico</h2>
          <div className={styles['graph-container']}>
            <h3>Gráfico de IMC</h3>
            {imcData.length > 0 && (
              <Line
                data={{
                  labels: imcData.map((item) => item.label),
                  datasets: [
                    {
                      label: 'IMC',
                      data: imcData.map((item) => item.value),
                      borderColor: 'rgba(75, 192, 192, 1)',
                      tension: 0.1,
                      fill: false,
                    },
                  ],
                  options: {
                    scales: {
                      y: {
                        min: 0,
                        max: 50,
                        title: {
                          display: true,
                          text: 'IMC',
                        },
                        ticks: {
                          callback: function (value) {
                            if (value === 24.9) {
                              return '24.9 (Limite Superior)';
                            }
                            return value;
                          },
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </div>
          <div className={styles['graph-container']}>
            <h3>Gráfico de PA</h3>
            {paData.length > 0 && (
              <Line
                data={{
                  labels: paData.map((item) => item.label),
                  datasets: [
                    {
                      label: 'Pressão Arterial',
                      data: paData.map((item) => [item.systolic, item.diastolic]),
                      borderColor: 'rgba(255, 99, 132, 1)',
                      tension: 0.1,
                      fill: false,
                    },
                  ],
                  options: {
                    scales: {
                      y: {
                        min: 0,
                        max: 200,
                        title: {
                          display: true,
                          text: 'Pressão Arterial',
                        },
                        ticks: {
                          callback: function (value) {
                            if (value === 130) {
                              return '130 (Limite Superior)';
                            }
                            if (value === 80) {
                              return '80 (Ideal Diastólica)';
                            }
                            return value;
                          },
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Medidas;
