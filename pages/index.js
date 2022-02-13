import Head from 'next/head'
import CalcularFecha from '../components/CalcularFecha'
import Feriados from '../components/Feriados'
import clienteAxios from '../config/axios'

export const getServerSideProps = async () => {
  const res = await clienteAxios.get(`/api/feriados`)
  return {
    props: {
      fechas: res.data
    }
  }
}

export default function Home({ fechas }) {
  return (
    <div className='min-h-screen bg-gray-200'>
      <Head>
        <title>Calcular Días</title>
        <meta
          name='description'
          content='App para calcular días y plazos entre dos fechas'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className='container mx-auto'>
        <header className='flex justify-center items-center mb-7'>
          <h1 className='text-teal-600 text-2xl font-bold mt-5'>
            Calcular Días
          </h1>
        </header>

        <main className='flex flex-col items-center mt-2 gap-4'>
          <CalcularFecha fechas={fechas} />
          <Feriados fechas={fechas} />
        </main>
      </div>

      <footer className='flex flex-wrap justify-center items-center mt-5'>
        <span className='text-xs text-gray-800 font-bold'>by Bernatto</span>
      </footer>
    </div>
  )
}
