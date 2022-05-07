import Head from "next/head";
import { FormEvent, useState } from "react";
import { api } from "../services/api";

import styles from "../styles/pages/Enlist.module.scss";

export default function Form() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("");

  async function handleEnlistUser(e: FormEvent) {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
        team
      }

      const response = await api.post("/", { data });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Vaixell - Alistar-se</title>
      </Head>

      <div className={styles.formContainer}>
        <main className={styles.content}>
          <form onSubmit={handleEnlistUser}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              required
              onChange={e => setName(e.target.value)}
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              required
              onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="team">Time</label>
            <select
              id="team"
              required
              onChange={e => setTeam(e.target.value)}
            >
              <option value="Valorant" defaultChecked>Valorant</option>
              <option value="Fortnite">Fortnite</option>
            </select>

            <button>Candidatar-se</button>
          </form>
        </main>
      </div>
    </>
  );
}