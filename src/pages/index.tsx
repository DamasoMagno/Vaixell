import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("react-player/youtube"),
  { ssr: false }
);

import { client } from "../libs/urql";
import { useQuery } from "urql";
import { PageDocument, TeamDocument } from "../generated/graphql";
import { TeamQuery } from "../types/TeamQuery";
import { PageQuery } from "../types/PageQuery";

import { SectionTitle } from "../components/SectionTitle";
import { Contact } from "../components/Contact";
import { Patner } from "../components/Patner";

import styles from "../styles/pages/Home.module.scss";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type HomeProps = {
  home: PageQuery;
}

export default function Homes({
  home: {
    contacts,
    partners,
    teams,
    ...home
  }
}: HomeProps) {
  const [teamName, setTeamName] = useState(teams[0].game);

  const [{ data, fetching: loadingTeam }] = useQuery<TeamQuery>({
    query: TeamDocument,
    variables: {
      game: teamName
    }
  });

  return (
    <>
      <Head>
        <title>Vaixell - Home</title>
      </Head>

      <section className={styles.homeContainer}>
        <div className={styles.content}>
          <Image
            src="/assets/logo.svg"
            width="300px"
            height="100px"
            alt="Logo da organizaação"
          />
          <h1>{home.title}</h1>
          <p>{home.description}</p>
        </div>
      </section>

      <section className={styles.teamContainer}>
        <div>
          <SectionTitle>Nossos Times</SectionTitle>

          <nav className={styles.chooseTeam}>
            {teams.map((team) => {
              return (
                <button
                  key={team.id}
                  onClick={() => setTeamName(team.game)}
                  className={teamName === team.game ? styles.currentTeam : ""}
                >
                  {team.game}
                </button>
              );
            })}
          </nav>

          <div className={styles.playersTeam}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              breakpoints={{
                450: {
                  width: 500,
                  slidesPerView: 3
                },
                728: {
                  width: 1200,
                  slidesPerView: 4.5
                }
              }}
            >
              {!loadingTeam ? (
                data?.team.players.map((player: any) => (
                  <SwiperSlide key={player.id}>
                    <div className={styles.player}>
                      <img
                        src={player.photo?.url ?? "/assets/player.svg"}
                        alt={`Foto do jogador ${player.name}`}
                      />
                      <strong>{player.name}</strong>
                    </div>
                  </SwiperSlide>
                ))

              ) : (
                <div className={styles.loader}>
                  <h1>Carregando Times</h1>
                </div>
              )}
            </Swiper>
          </div>
        </div>
      </section>

      <section className={styles.streamContainer}>
        <div className={styles.content}>
          <SectionTitle>Acompanhar a Live</SectionTitle>

          <Player
            url={"https://www.youtube.com/watch?v=3rxEC_TOfj8"}
            width={"100%"}
            height={"30rem"}
          />
        </div>
      </section>

      <section className={styles.patnerContainer}>
        <div className={styles.content}>
          <SectionTitle>Parcerias</SectionTitle>

          <div className={styles.patners}>
            {partners.map(patner => {
              return (
                <Patner
                  key={patner.id}
                  name={patner.name}
                  icon={patner.icon}
                  coupon={patner.coupon}
                  url={patner.addressSite}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.contactsContainer}>
        <div className={styles.content}>
          <SectionTitle>Redes Sociais</SectionTitle>
          <p>
            Entre em contato conosco
            através das nossas redes sociais
          </p>

          <div className={styles.socialsMedia}>
            {contacts.map(contact => (
              <Contact
                key={contact.id}
                description="Entre e divirta-se conosco"
                name={contact.name}
                url={contact.address}
                icon={contact.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query(
    PageDocument,
    {
      slug: "Home"
    }
  ).toPromise();

  const page = {
    ...data.page,
    contacts: data.page.contacts.map((contact: any) => {
      return {
        ...contact,
        icon: contact.icon.url,
      }
    }),
    partners: data.page.partners.map((partner: any) => {
      return {
        ...partner,
        icon: partner.icon.url,
        coupon: {
          code: partner.codeCoupon,
          percentageValue: partner.percentageCoupon
        },
      }
    }),
  }

  return {
    props: {
      home: page
    },
    revalidate: 60 * 1
  }
}