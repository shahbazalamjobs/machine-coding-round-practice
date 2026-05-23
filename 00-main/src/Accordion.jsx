import React, { useState } from 'react'

function Accordion({questions}) {

    const [multiple, setmultiple] = useState(false);
    const [openItems, setOpenItems] = useState([])

    const handleAccordion = (id) => {
        if(multiple) {
            setOpenItems(openItems.includes(id) ? openItems.filter(item => item !== id) : [...openItems, id])
        } else {
            setOpenItems(openItems.includes(id) ? [] : [id])
        }
    }

  return (
    <div className='container'>

        <h1>Accordion</h1>

        <label>
            Select multiple items in accordion.
            <input 
                type="checkbox" 
                checked={multiple}
                onChange={() => setmultiple(prev => ! prev)}
            />
        </label>

        <div className="accordion">
            {questions.map((item) => (
               <div className='accordion-item' key={item.id}>
                    <button 
                        className='accordion-title'
                        onClick={() => handleAccordion(item.id)}    
                    >
                    {item.title}
                    </button>
                    {openItems.includes(item.id) && (
                        <div className="accordion-content">
                            {item.info}
                        </div>
                    )}
               </div> 
            ))}
        </div>
    </div>
  )
}

export default Accordion