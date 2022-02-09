import React from 'react'

const Toggle = () => {

    function addDays(date, days) {        
        const copy = new Date(date.replaceAll('-','/'))
        copy.setDate(copy.getDate() + days)
        return copy
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
                document.querySelector('#fechaTope').value = addDays(document.querySelector('#fechaInicio').value, parseInt(document.querySelector('#plazo').value)).toLocaleDateString("en-CA")
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