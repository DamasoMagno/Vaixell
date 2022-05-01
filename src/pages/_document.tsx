import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Condensed&family=Russo+One&display=swap" rel="stylesheet" />

        <meta name="description" content="Plataforma para apresentação de organização e-esports" />
        <link rel="shortcut icon" href="/assets/logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}