import Head from 'next/head'
import CalcularFecha from '../components/CalcularFecha'
import Feriados from '../components/Feriados'
import clienteAxios from '../config/axios'

export const getServerSideProps = async () => {
  const res = await clienteAxios.get(`/api/feriados?pagination[pageSize]=9999`)
  // const filteredFeriados = res.data.data.filter(year =>
  //   year.attributes.fecha.includes(new Date().getFullYear().toString())
  // )

  const filteredFeriados = res.data.data

  return {
    props: {
      fechas: filteredFeriados
    }
  }
}

export default function Home({ fechas }) {
  // useEffect(() => {
  //   const getFechas = async () => {
  //     try {
  //       const res = await clienteAxios.get(`/api/feriados`)
  //       setFechas(
  //         res.data.data.filter(year => year.attributes.fecha.includes('2023'))
  //       )
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getFechas()
  // }, [])

  return (
    <div className='min-h-screen bg-gray-200'>
      <Head>
        <title>Calcular Días</title>
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
          {fechas ? (
            <CalcularFecha fechas={fechas} />
          ) : (
            <div className='relative w-8 h-8 bg-pink-700 absolute rounded-full flex justify-center items-center opacity-70 my-5'>
              <span className='animate-ping w-8 h-8 bg-pink-700 rounded-full'></span>
            </div>
          )}
          {fechas ? <Feriados fechas={fechas} /> : null}
        </main>
      </div>

      <footer className='flex flex-wrap justify-center items-center mt-5 gap-4 pb-5'>
        <span className='text-xs text-gray-500 font-bold'>
          &copy; {new Date().getFullYear()} - Bernatto
        </span>
        <span className='text-gray-400'>{' | '}</span>
        <a
          href='https://feriados-strapi.bernatto.com/admin'
          rel='noreferrer'
          target='_blank'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-gray-500'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
            />
          </svg>
        </a>
      </footer>
    </div>
  )
}
