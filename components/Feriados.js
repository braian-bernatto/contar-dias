import { parseISO } from 'date-fns'
import React, { useState } from 'react'

const Feriados = ({ fechas }) => {
  const listado = fechas.data

  const listadoOrdenado = listado.sort(
    (a, b) =>
      parseISO(a.attributes.fecha).getMonth() -
      parseISO(b.attributes.fecha).getMonth()
  )

  const [isVisible, setIsVisible] = useState([])
  const toggle = i => {
    if (isVisible.indexOf(i) === -1) {
      setIsVisible([...isVisible, i])
    } else {
      const newArray = isVisible.filter(item => item !== i)
      setIsVisible(newArray)
    }
  }

  return (
    <div className='w-80 sm:w-4/5 lg:w-3/5 bg-white rounded-xl p-5 flex flex-wrap justify-center items-center gap-4 shadow-xl select-none'>
      <h1
        id='titulo'
        className='w-full rounded-full bg-pink-700 text-white text-sm text-center font-semibold py-1'
      >
        FERIADOS
      </h1>

      <div className='flex flex-wrap gap-4 justify-evenly place-items-center'>
        {listadoOrdenado.map(item => (
          <div
            key={item.id}
            className='z-10 relative w-28 text-sm flex flex-wrap justify-center place-items-center rounded-xl border shadow-xl text-white overflow-hidden cursor-pointer'
            onClick={() => {
              toggle(item.id)
            }}
          >
            <h1 className='z-20 w-full text-center px-1 text-lg font-bold bg-teal-600 capitalize'>
              {parseISO(item.attributes.fecha).toLocaleString('es-Es', {
                month: 'long'
              })}
            </h1>
            <div className='bg-white w-full z-10'>
              <p
                id='fechaTope'
                className='text-center focus:outline-none w-full text-5xl font-bold text-gray-500'
              >
                {parseISO(item.attributes.fecha).getDate()}
              </p>
              <p className='w-full text-center pb-1 text-sm text-teal-600 font-bold capitalize'>
                {parseISO(item.attributes.fecha).toLocaleString('es-Es', {
                  weekday: 'long'
                })}
              </p>
            </div>
            <p
              id='motivo2'
              className={`w-full h-full p-2 ${
                isVisible.indexOf(item.id) !== -1 ? '' : 'translate-y-28'
              } bg-white opacity-80 font-bold text-center text-md text-pink-800 transition-all ease-in delay-150 z-50 transform absolute flex items-center justify-center`}
            >
              {item.attributes.titulo}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feriados
