import Head from 'next/head'
import CalcularFecha from '../components/CalcularFecha'
import Feriados from '../components/Feriados'
import clienteAxios from '../config/axios'

export const getServerSideProps = async () => {
  const res = await clienteAxios.get(`/api/feriados`)
  const filteredFeriados = res.data.data.filter(year => year.attributes.fecha.includes(new Date().getFullYear().toString()))
  return {
    props: {
      fechas: filteredFeriados
    }
  }
}

export default function Home({fechas}) {

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

      <footer className='flex flex-wrap justify-center items-center mt-5'>
        <span className='text-xs text-gray-500 font-bold'>
          &copy; {new Date().getFullYear()} - Bernatto
        </span>
      </footer>
    </div>
  )
}
