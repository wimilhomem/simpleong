import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (error) {
      alert("falha no login");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero" />

        <form onSubmit={handleLogin}>
          <h2>Faça seu logon</h2>
          <input
            palceholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          ></input>

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
