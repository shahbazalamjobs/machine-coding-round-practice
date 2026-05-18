import { useEffect } from 'react'

function Modal({ isOpen, onClose, children}) {

  useEffect(() => {

    const handleEscape = (e) => {
      if(e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose])

  if(!isOpen) return null;
  
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-close-btn' onClick={onClose}>x</div>
        {children}
      </div>
    </div>
  )
}

export default Modal