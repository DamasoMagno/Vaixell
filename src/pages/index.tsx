
import Image from "next/image";
import { GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import ReactPlayer from "react-player";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

import { HOME } from "../apollo/Home";
import { apolloClient } from "../libs/apollo";
import { Home } from "../types/Home";
import { gql, useQuery } from "@apollo/client";

import { SectionTitle } from "../components/SectionTitle";
import { Contact } from "../components/Contact";
import { Patner } from "../components/Patner";

import styles from "../styles/Home.module.scss";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type HomeProps = {
  home: Home;
}

export default function Homes({ home }: HomeProps) {
  const [sectionHasStream, setSectionHasStream] = useState(false);

  const carouselNavigation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSectionHasStream(true);
    }
  }, []);

  function left() {
    const carouselExists = carouselNavigation.current as HTMLDivElement;
    carouselExists.scrollLeft -= carouselExists.offsetWidth;
  }

  function right() {
    const carouselExists = carouselNavigation.current as HTMLDivElement;
    carouselExists.scrollLeft += carouselExists.offsetWidth;
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

      <section className={styles.teamContainer} id="#teams">
        <SectionTitle>Nossos Times</SectionTitle>


        <nav className={styles.teamNavigation} ref={carouselNavigation}>
          <button>Valorant</button>

          <button
            className={styles.navigationLeft}
            onClick={left}
          >
            <MdArrowLeft />
          </button>
          <button
            className={styles.navigationRight}
            onClick={right}
          >
            <MdArrowRight />
          </button>
        </nav>
      </section>

      <section className={styles.streamContainer}>
        <div>
          <SectionTitle>Nossas Lives</SectionTitle>

          {sectionHasStream && (
            <ReactPlayer
              url={home.twitch}
              width='100%'
              height='30rem'
            />
          )}
        </div>
      </section>

      <section className={styles.patnerContainer} id="#patners">
        <div className={styles.content}>
          <SectionTitle>Parcerias</SectionTitle>

          <div className={styles.patners}>
            {home.partners.map(patner => {
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

      <section className={styles.contactsContainer} id="#contacts">
        <div className={styles.content}>
          <SectionTitle>Redes Sociais</SectionTitle>
          <p>
            Entre em contato conosco
            através das redes sociais abaixo
          </p>

          <div className={styles.socialsMedia}>
            {home.contacts.map(contact => {
              return (
                <Contact
                  key={contact.id}
                  description="Entre e divirta-se conosco"
                  name={contact.name}
                  url={contact.address}
                  icon={contact.icon}
                />
              )
            })}
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