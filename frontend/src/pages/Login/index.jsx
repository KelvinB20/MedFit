import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importando o hook useNavigate
import styles from "./Login.module.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", birthDate: "" });

  const navigate = useNavigate(); // Inicializando o useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";
      const response = await axios.post(url, formData);

      if (isRegister) {
        // Após o registro, redireciona para a tela de login
        location.reload();
        navigate("/Login");  // Redireciona para a página de login após o registro
      } else {
        // Se for um login bem-sucedido, armazene o token no localStorage e redirecione
        localStorage.setItem("token", response.data.token);
        navigate("/Inicio");  // Caminho para a página de "Inicio"
      }
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao processar a requisição.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{isRegister ? "Criar Conta" : "Bem-vindo de volta"}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="date"
                name="birthDate"
                placeholder="Data de nascimento"
                value={formData.birthDate}
                onChange={handleChange}
                className={styles.input}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          <button className={styles.button} type="submit">
            {isRegister ? "Registrar" : "Login"}
          </button>
        </form>
        <p className={styles.toggleText}>
          {isRegister ? "Já tem uma conta? " : "Ainda não tem conta? "}
          <span
            className={styles.toggleLink}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Faça login" : "Registre-se"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;