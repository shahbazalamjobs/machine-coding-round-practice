import React, { useState } from 'react'
import Modal from './Modal'
import './App.css'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='container'>
      <h1>Modal</h1>

      <button onClick={() => setIsModalOpen(true)}>open Modal</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>Modal Title</h3>
        <p>Modal Content ...</p>
      </Modal>
    </div>
  )
}

export default App