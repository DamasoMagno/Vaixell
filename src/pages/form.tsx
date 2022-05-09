import { GetStaticProps } from "next";
import { SectionTitle } from "../components/SectionTitle";

import { PageDocument } from "../generated/graphql";
import { client } from "../libs/urql";

import styles from "../styles/pages/Enlist.module.scss";

export default function Form({ teams }: any) {
  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <aside>
            <strong>Aliste-se!</strong>
            <p>Tome seu controle e partiremos em uma nova aventura.</p>
          </aside>

          <main>
            <SectionTitle>Alistar-se</SectionTitle>

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
                {teams.map((team: any) => {
                  return (
                    <option
                      key={team.id}
                      value={team.game}
                    >
                      {team.game}
                    </option>
                  );
                })}
              </select>

              <button>Candidatar-se</button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query(
    PageDocument,
    {
      slug: "Home"
    }
  ).toPromise();

  return {
    props: {
      teams: data.page.teams
    },
    revalidate: 60 * 1
  }
}