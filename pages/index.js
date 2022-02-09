import Head from 'next/head'
import DiasCorridos from '../components/DiasCorridos'

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-200'>
      <Head>
        <title>Calcular Días</title>
        <meta name="description" content="App para calcular días y plazos entre dos fechas" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href='https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div className='container mx-auto'>

        <header className='flex justify-center items-center'>
          <h1 className='text-teal-600 text-2xl font-bold mt-5'>
            Calcular Días
          </h1>
        </header>

        <main className='flex justify-center items-center mt-2'>
          <DiasCorridos />
        </main>

      </div>

      <footer className='flex flex-wrap justify-center items-center mt-5'>
          <span className='text-xs text-gray-800 font-bold'>            
            by Bernatto
          </span>
      </footer>
    </div>
  )
}
