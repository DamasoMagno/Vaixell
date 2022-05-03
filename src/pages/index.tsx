
import Image from "next/image";
import { GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";

import { HOME } from "../apollo/Home";
import { apolloClient } from "../libs/apollo";
import { Home } from "../types/Home";

import { SectionTitle } from "../components/SectionTitle";
import { Contact } from "../components/Contact";
import { Patner } from "../components/Patner";

import styles from "../styles/Home.module.scss";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useQuery } from "@apollo/client";
import { gql } from "urql";
import { Navigation, Pagination } from "swiper";

type HomeProps = {
  home: Home;
}

export default function Homes({ home }: HomeProps) {
  const { partners, contacts, teams } = home;
  const [playersByTeam, setPlayersByTeam] = useState("Valorant");

  const { data } = useQuery(
    gql`
      {
        team (where: { game: "${playersByTeam}" }){
          players {
            id
            name
          }
        }
      }
    `
  );

  function handleShowTeam(name: string) {
    const buttons = document.querySelectorAll("nav button");
    let buttonAlreadySelecioned: Element;

    buttons.forEach((btn: Element) => {
      if (btn.ariaSelected === 'true') {
        buttonAlreadySelecioned = btn;
      }
      
      btn.addEventListener("click", () => {
        buttonAlreadySelecioned.ariaSelected = 'false';
        btn.ariaSelected = "true";
      })
    });

    setPlayersByTeam(name)
  }

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
            {teams.map((team, index) => {
              return (
                <button
                  key={team.id}
                  onClick={() => handleShowTeam(team.game)}
                  aria-selected={index === 0 ? 'true' : 'false'}
                >
                  {team.game}
                </button>
              );
            })}
          </nav>

          <div className={styles.playersTeam}>
            <Swiper
              modules={[Navigation, Pagination]}
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
              {data?.team.players.map((player: any) => (
                <SwiperSlide key={player.id}>
                  <div className={styles.player}>
                    <img src="/assets/player.svg" alt={`Foto do jogador ${player.name}`} />
                    <strong>{player.name}</strong>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
            através das redes sociais abaixo
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
  const { data } = await apolloClient.query({ query: HOME });

  const page: Home = {
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
    revalidate: 60
  }
}