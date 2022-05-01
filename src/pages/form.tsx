import Head from "next/head";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import styles from "../styles/Form.module.scss";

export default function Form() {
  return (
    <>
      <Head>
        <title>Vaixell - Alistar-se</title>
      </Head>

      <main className={styles.formContainer}>
        <section className={styles.content}>
          <form>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="Email"
            />

            <label htmlFor="Time">Time</label>
            <select>
              <option value="Valorant">Valorant</option>
              <option value="Fortnite">Fortnite</option>
            </select>

            <input type="submit" value="ENVIAR" />
          </form>
        </section>
      </main>
    </>
  );
}