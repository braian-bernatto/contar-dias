import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Toggle from './Toggle';

const DiasCorridos = () => {
  return (
    <div className='w-80 bg-white rounded-xl p-5 flex flex-wrap justify-center items-center gap-4 shadow-xl'>
        <h1 id='titulo' className='w-full rounded-full bg-teal-500 text-white text-sm text-center font-semibold py-1'>DÍAS CORRIDOS</h1>
        <Toggle />
        <div className='text-sm w-full flex justify-center place-items-center'>
            <label htmlFor='fechaInicio' className='mr-3 border-b-2 border-teal-500'>Fecha inicio</label>
            <input id='fechaInicio' type='date' className='text-center focus:outline-none'/>
        </div>

        <div className='text-sm w-full flex justify-center place-items-center'>
            <label htmlFor='plazo' className='mr-3 border-b-2 border-teal-500'>Días de plazo</label>
            <input id='plazo' type='number' className='text-center text-4xl font-bold w-40 p-2 text-pink-800 focus:outline-none' defaultValue={0}/>
        </div>

        <div className='text-sm w-full flex flex-wrap justify-center place-items-center rounded-xl bg-teal-500 py-1 text-white'>
            <label htmlFor='fechaTope' className='w-full text-center border-b border-white'>Fecha Tope</label>
            <input css={css`
              ::-webkit-calendar-picker-indicator {
                  position: absolute;
                  top: -1000px
              }
            `} id='fechaTope' type='date' className='text-center focus:outline-none w-full bg-transparent py-1 text-2xl'/>
        </div>
        
        <p className='w-full text-teal-600 font-bold text-center'>
          Faltan 10 días
        </p>
        <p className='w-full text-pink-800 font-bold text-center'>
          Ya pasaron 10 días
        </p>
        

    </div>
  )
};

export default DiasCorridos;
