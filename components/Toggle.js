import React from 'react'

const Toggle = ({ setDiasHabilesToggle }) => {
  return (
    <div className='flex items-center justify-center pr-2 select-none'>
      <label htmlFor='toggle' className='flex items-center cursor-pointer'>
        {/* <!-- toggle --> */}
        <div className='relative'>
          {/* <!-- input --> */}
          <input
            type='checkbox'
            id='toggle'
            className='sr-only'
            onChange={e => {
              setDiasHabilesToggle(e.target.checked)
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
