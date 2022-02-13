import React, { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Toggle from './Toggle'
import { parseISO, differenceInCalendarDays } from 'date-fns'

const CalcularFecha = ({ fechas }) => {
  const listaFeriados = fechas.data.map(fecha => fecha.attributes.fecha)

  const [diasHabilesToggle, setDiasHabilesToggle] = useState(false)
  const [vistaFecha, setVistaFecha] = useState(true)
  const [plazoDias, setPlazoDias] = useState(0)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [fechaTope, setFechaTope] = useState('')
  const [restaDias, setRestaDias] = useState(0)
  const [totalDias, setTotalDias] = useState(0)

  const diasCorridos = (fecha, dias) => {
    let fechaFinal = new Date(fecha.replaceAll('-', '/'))
    fechaFinal = new Date(
      fechaFinal.setDate(fechaFinal.getDate() + parseInt(dias))
    )
    setFechaTope(fechaFinal.toLocaleDateString('en-CA'))
    setRestaDias(differenceInCalendarDays(fechaFinal, new Date()))
  }

  const diasHabiles = (fecha, dias, feriados) => {
    let fechaFinal = new Date(fecha.replaceAll('-', '/'))
    let count = 0
    let date = ''
    let month = ''
    let year = ''
    let bandera = false

    while (count < dias) {
      bandera = true
      fechaFinal = new Date(fechaFinal.setDate(fechaFinal.getDate() + 1))

      year = fechaFinal.getFullYear()
      month = fechaFinal.getMonth() + 1 //Months are zero based
      date = fechaFinal.getDate()

      let date1 = year + '/' + month + '/' + date

      feriados.forEach(day => {
        year = parseISO(day).getFullYear()
        month = parseISO(day).getMonth() + 1 //Months are zero based
        date = parseISO(day).getDate()

        let date2 = year + '/' + month + '/' + date

        if (
          fechaFinal.getDay() === 0 ||
          fechaFinal.getDay() === 6 ||
          date1 === date2
        ) {
          bandera = false
        }
      })
      bandera ? count++ : null
    }
    setFechaTope(fechaFinal.toLocaleDateString('en-CA'))
    setRestaDias(differenceInCalendarDays(fechaFinal, new Date()))
  }

  // total dias
  const calcularTotalDias = (inicio, fin) => {
    if (inicio.length > 0 && fin.length > 0) {
      if (!diasHabilesToggle) {
        setTotalDias(
          Math.abs(differenceInCalendarDays(parseISO(fin), parseISO(inicio))) +
            1
        )
      } else {
        diasHabilesV2(inicio, fin)
      }
    } else {
      setTotalDias(0)
    }
  }

  const diasHabilesV2 = (fechaInicio, fechaFin) => {
    let resultado = 0
    let fechaActual = new Date(fechaInicio.replaceAll('-', '/'))
    let totalDias =
      Math.abs(
        differenceInCalendarDays(parseISO(fechaFin), parseISO(fechaInicio))
      ) + 1
    let count = 0
    let date = ''
    let month = ''
    let year = ''
    let bandera = true

    while (count < totalDias) {
      bandera = true
      if (count > 0)
        fechaActual = new Date(fechaActual.setDate(fechaActual.getDate() + 1))

      year = fechaActual.getFullYear()
      month = fechaActual.getMonth() + 1 //Months are zero based
      date = fechaActual.getDate()

      let date1 = year + '/' + month + '/' + date

      listaFeriados.forEach(day => {
        year = parseISO(day).getFullYear()
        month = parseISO(day).getMonth() + 1 //Months are zero based
        date = parseISO(day).getDate()

        let date2 = year + '/' + month + '/' + date

        if (
          fechaActual.getDay() === 0 ||
          fechaActual.getDay() === 6 ||
          date1 === date2
        ) {
          bandera = false
        }
      })
      count++
      bandera ? resultado++ : null
    }
    setTotalDias(resultado)
  }

  useEffect(() => {
    diasHabilesToggle
      ? diasHabiles(fechaInicio, plazoDias, listaFeriados)
      : diasCorridos(fechaInicio, plazoDias)
    !vistaFecha ? calcularTotalDias(fechaInicio, fechaFin) : ''
  }, [diasHabilesToggle])

  return (
    <div className='relative w-80 bg-white text-md rounded-xl p-5 flex flex-wrap justify-center items-center gap-4 shadow-xl'>
      <button
        onClick={() => {
          setVistaFecha(!vistaFecha)
        }}
        className='w-6 h-6 bg-pink-700 absolute rounded-full -top-3 -right-2 flex justify-center items-center text-white cursor-pointer opacity-70'
      >
        <span className='animate-ping w-6 h-6 bg-pink-700 rounded-full absolute'></span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={3}
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
          />
        </svg>
      </button>
      <h1
        id='titulo'
        className='w-full rounded-full bg-teal-600 text-white text-sm text-center font-semibold py-1'
      >
        DÍAS CORRIDOS
      </h1>
      <Toggle setDiasHabilesToggle={setDiasHabilesToggle} />
      <div className='w-full flex justify-between place-items-center'>
        <label
          htmlFor='fechaInicio'
          className='mr-2 border-b-2 border-teal-600'
        >
          Fecha inicio
        </label>
        <input
          id='fechaInicio'
          type='date'
          className='text-center focus:outline-none font-bold'
          value={fechaInicio}
          onChange={e => {
            setFechaInicio(e.target.value)
            calcularTotalDias(fechaFin, e.target.value)
            diasHabilesToggle
              ? diasHabiles(e.target.value, plazoDias, listaFeriados)
              : diasCorridos(e.target.value, plazoDias)
          }}
        />
      </div>
      {vistaFecha ? (
        <>
          <div className='w-full flex justify-between place-items-center'>
            <label htmlFor='plazo' className='mr-2 border-b-2 border-teal-600'>
              Días de plazo
            </label>
            <input
              id='plazo'
              type='number'
              className='w-40 text-center text-4xl font-bold p-2 text-pink-800 focus:outline-none'
              value={plazoDias}
              onChange={e => {
                setPlazoDias(parseInt(e.target.value))
                diasHabilesToggle
                  ? diasHabiles(fechaInicio, e.target.value, listaFeriados)
                  : diasCorridos(fechaInicio, parseInt(e.target.value))
              }}
            />
          </div>
          <div className='w-full flex flex-wrap justify-center shadow-xl place-items-center rounded-xl border text-white'>
            <label
              htmlFor='fechaTope'
              className='z-30 rounded-t-xl w-full text-center px-1 text-lg font-bold bg-teal-600 capitalize'
            >
              Fecha Tope
            </label>
            <input
              css={css`
                ::-webkit-calendar-picker-indicator {
                  position: absolute;
                  top: -1000px;
                }
              `}
              id='fechaTope'
              type='date'
              disabled='disabled'
              className='text-center focus:outline-none bg-transparent text-gray-500 font-bold py-4 text-4xl'
              value={fechaTope}
            />
          </div>
          <p
            className={`w-full ${
              restaDias < 0 ? 'text-pink-800' : 'text-teal-700'
            } font-bold text-center`}
          >
            {isNaN(restaDias)
              ? null
              : restaDias === 0
              ? 'Hoy'
              : restaDias > 0
              ? 'Dentro de '
              : 'Hace '}
            {isNaN(restaDias)
              ? null
              : restaDias === 0
              ? ''
              : Math.abs(restaDias)}
            {isNaN(restaDias)
              ? null
              : restaDias === 0
              ? ''
              : restaDias > 1 || restaDias < -1
              ? ' días'
              : ' día'}
          </p>
        </>
      ) : (
        <>
          <div className='w-full flex justify-between'>
            <label
              htmlFor='fechaFin'
              className='mr-3 border-b-2 border-teal-600'
            >
              Fecha Fin
            </label>
            <input
              id='fechaFin'
              type='date'
              className='text-center focus:outline-none font-bold'
              value={fechaFin}
              onChange={e => {
                setFechaFin(e.target.value)
                calcularTotalDias(fechaInicio, e.target.value)
              }}
            />
          </div>
          <div className='w-36 flex flex-wrap justify-center place-items-center rounded-xl border shadow-xl text-white'>
            <h1 className='z-30 rounded-t-xl w-full text-center px-1 text-lg font-bold bg-teal-600 capitalize'>
              Total Días
            </h1>
            <p className='text-center text-6xl font-bold p-4 text-gray-500'>
              {totalDias}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default CalcularFecha