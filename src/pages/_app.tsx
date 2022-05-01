import { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../libs/apollo";

import "../styles/global.scss";

import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />


      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={2500}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}

export default MyApp
