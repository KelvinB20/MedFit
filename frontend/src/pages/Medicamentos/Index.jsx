import Footer from '../../components/Footer/Index';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Medicamentos.module.css';

function Medicamentos() {
    const [medicines, setMedicines] = useState([]); // Lista de medicamentos
    const [medicineName, setMedicineName] = useState('');
    const [interval, setInterval] = useState('');
    const [notes, setNotes] = useState('');

    // Buscar medicamentos do backend ao carregar a página
    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/medicamentos');
            setMedicines(response.data);
        } catch (error) {
            console.error('Erro ao buscar medicamentos:', error);
        }
    };

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        if (!medicineName || !interval) {
            alert('Por favor, preencha o nome do medicamento e o intervalo.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/medicamentos', {
                name: medicineName,
                interval: parseInt(interval), // Converte o intervalo para número
                notes,
            });
            fetchMedicines(); // Atualiza a lista após adicionar
            setMedicineName('');
            setInterval('');
            setNotes('');
        } catch (error) {
            console.error('Erro ao adicionar medicamento:', error);
        }
    };

    const handleRemoveMedicine = async (index) => {
        const medicineToRemove = medicines[index]; // Seleciona o medicamento pelo índice
        try {
            await axios.delete(`http://localhost:5000/api/medicamentos/${medicineToRemove.name}`);
            fetchMedicines(); // Atualiza a lista após remover
        } catch (error) {
            console.error('Erro ao remover medicamento:', error);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.medicationPagecontainer}>
                <div className={styles.medicationForm}>
                    <h2>Adicionar Medicamento</h2>
                    <form onSubmit={handleAddMedicine} className={styles.formGrid}>
                        <div className={styles.formLeft}>
                            <label htmlFor="medicineName">Nome do Medicamento:</label>
                            <input
                                type="text"
                                id="medicineName"
                                value={medicineName}
                                onChange={(e) => setMedicineName(e.target.value)}
                                placeholder="Ex.: Paracetamol"
                                required
                            />

                            <label htmlFor="interval">Intervalo (em horas):</label>
                            <input
                                type="number"
                                id="interval"
                                value={interval}
                                onChange={(e) => setInterval(e.target.value)}
                                placeholder="Ex.: 8"
                                min="1"
                                required
                            />
                        </div>
                        <div className={styles.formRight}>
                            <label htmlFor="notes">Observações:</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Ex.: Tomar em caso de febre"
                            ></textarea>
                        </div>
                        <button type="submit" className={styles.ctaButton}>
                            Adicionar Medicamento
                        </button>
                    </form>
                </div>

                <div className={styles.medicationList}>
                    <h2>Lista de Medicamentos</h2>
                    <div id="medicationsContainer" className={styles.medicationsGrid}>
                        {medicines.length === 0 ? (
                            <p id="noMedicationsMessage" className={styles.noMedicationsMessage}>
                                Nenhum medicamento adicionado ainda.
                            </p>
                        ) : (
                            medicines.map((med, index) => (
                                <div className={styles.medicationCard} key={index}>
                                    <h3>{med.name}</h3>
                                    <p>
                                        <strong>Intervalo:</strong> A cada {med.interval} horas
                                    </p>
                                    <p>
                                        <strong>Observações:</strong> {med.notes || 'Nenhuma observação adicionada.'}
                                    </p>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleRemoveMedicine(index)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Medicamentos;
