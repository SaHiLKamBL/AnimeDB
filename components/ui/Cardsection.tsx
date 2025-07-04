import React from 'react'
import Datacard from './Datacard'


const Cardsection = () => {
  return (
    <>
      <div className='w-full m-5 px-5 grid grid-cols-4 gap-5'>
    <Datacard/>
    <Datacard/>
    <Datacard/>
    <Datacard/>
    <Datacard/>
    <Datacard/>
      </div>
    </>
  )
}

export default Cardsection
