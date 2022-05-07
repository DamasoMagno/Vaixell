import { AppProps } from 'next/app';

import { Provider } from 'urql';
import { client, ssrCache } from "../libs/urql";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp
