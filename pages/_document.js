import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
        <meta
          name='description'
          content='App para calcular días y plazos entre dos fechas'
        />    
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}