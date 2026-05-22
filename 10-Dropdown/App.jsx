import React from 'react'
import './App.css'
import Dropdown from'./Dropdown' 

const options = [ 'Apple', 'Mango', 'Banana', 'Guava' ];

function App() {
  return (
    <div className='container'>
      <Dropdown options={options} />
    </div>
  )
}

export default App