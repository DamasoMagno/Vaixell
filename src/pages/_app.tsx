import { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../libs/apollo";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp
