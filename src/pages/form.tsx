import Head from "next/head";

import styles from "../styles/pages/Enlist.module.scss";

export default function Form() {
  return (
    <>
      <Head>
        <title>Vaixell - Alistar-se</title>
      </Head>

      <div className={styles.formContainer}>
        <main className={styles.content}>
          <form action={`https://formsubmit.co/vaixelloficial@gmail.com`} method="POST">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="nome"
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
            />

            <input 
              type="hidden" 
              name="_template" 
              value="basic" 
            />

            <input 
              type="hidden" 
              name="_next" 
              value="https://vaixell.vercel.app/form" 
            />

            <input 
              type="hidden" 
              name="_captcha" 
              value="false" 
            />

            <input 
              type="hidden" 
              name="_autoresponse" 
              value="Parabéns, você se candidatou com sucesso" 
            />

            <label htmlFor="team">Time</label>
            <select
              id="team"
              name="time"
              required
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