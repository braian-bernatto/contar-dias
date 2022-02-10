import React from 'react'
import {addBusinessDays,subBusinessDays, parseISO, format} from 'date-fns'

const Toggle = () => {

    function addDays(date, days) {        
        const copy = new Date(date.replaceAll('-','/'))
        copy.setDate(copy.getDate() + days)
        return copy
      }
      
    const diasHabiles  = (fecha, dias, feriados)=>{
        const fechaInicio = new Date(fecha.replaceAll('-','/'))
        const fechaFinal = ''
        const count = 0
        let date = ''
        let month = ''
        let year = ''

        while (count < dias) {
            fechaFinal = new Date(fechaInicio.setDate(fechaInicio.getDate()+1))
        
                year = parseISO(fechaFinal).getFullYear()
                month = parseISO(fechaFinal).getFullYear() + 1; //Months are zero based
                date = parseISO(fechaFinal).getFullYear()

                let date1 = year+'/'+month+'/'+date

            feriados.forEach(day => {
                year = parseISO(day).getFullYear()
                month = parseISO(day).getFullYear() + 1; //Months are zero based
                date = parseISO(day).getFullYear()
        
                let date2 = year+'/'+month+'/'+date                
                                

                if(fechaFinal.getDay() !== 0 && fechaFinal.getDay() !== 6 && date1 !== date2){
                    count ++
                }
            });
            return fechaFinal
        }
    }


  return (
    <div className='flex items-center justify-center pr-2'>
        <label
            htmlFor='toggle'
            className='flex items-center cursor-pointer'
        >
            {/* <!-- toggle --> */}
            <div className='relative'>
            {/* <!-- input --> */}
            <input
                type='checkbox'
                id='toggle'
                value={true}
                className='sr-only'
                onClick={() => {
                document.querySelector('#titulo').innerText === 'DÍAS HÁBILES'? document.querySelector('#titulo').innerText = 'DÍAS CORRIDOS' : document.querySelector('#titulo').innerText = 'DÍAS HÁBILES'
                document.querySelector('#fechaTope').value = addBusinessDays(parseISO(document.querySelector('#fechaInicio').value), parseInt(document.querySelector('#plazo').value)).toLocaleDateString("en-CA")
                
                diasHabiles(document.querySelector('#fechaInicio').value,4,['2022-02-10','2022-02-09'])

                }}
                
            />
            {/* <!-- line --> */}
            <div className='block bg-gray-600 w-10 h-6 rounded-full'></div>
            {/* <!-- dot --> */}
            <div className='dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition'></div>
            </div>
            {/* <!-- label --> */}
            <div className='ml-3 font-medium select-none'>Hábiles</div>
        </label>
        </div>
  )
}

export default Toggle