import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <>
      <div
        className={`fixed bg-[#5f5f5f83] top-0 left-0 right-0 bottom-0 z-40`}
      ></div>
    <div className='loader z-50'></div>
    </>
  )
}

export default Spinner;