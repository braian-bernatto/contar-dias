import Head from 'next/head'
import { useEffect, useState } from 'react'
import CalcularFecha from '../components/CalcularFecha'
import Feriados from '../components/Feriados'
import clienteAxios from '../config/axios'

// can't use this option because strapi takes more than 10 seconds to start on heroku which causes an error message on the app
// export const getServerSideProps = async () => {
//   const res = await clienteAxios.get(`/api/feriados`)
//   return {
//     props: {
//       fechas: res.data
//     }
//   }
// }

export default function Home() {
  const [fechas, setFechas] = useState([])
  useEffect(async () => {
    try {
      const res = await clienteAxios.get(`/api/feriados`)
      setFechas(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

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
          <h1 className='text-teal-600 text-md font-bold mt-5 bg-white text-center px-4 rounded-xl shadow-lg border-r-4 border-l-4 border-teal-600 border-t border-b'>
            Calcular Días
          </h1>
        </header>

        <main className='flex flex-col items-center mt-2 gap-4'>
          {fechas.data ? (
            <CalcularFecha fechas={fechas} />
          ) : (
            <div className='relative w-8 h-8 bg-pink-700 absolute rounded-full flex justify-center items-center opacity-70 my-5'>
              <span className='animate-ping w-8 h-8 bg-pink-700 rounded-full'></span>
            </div>
          )}
          {fechas.data ? <Feriados fechas={fechas} /> : null}
        </main>
      </div>

      <footer className='flex flex-wrap justify-center items-center mt-5'>
        <span className='text-xs text-gray-500 font-bold'>by Bernatto</span>
      </footer>
    </div>
  )
}
