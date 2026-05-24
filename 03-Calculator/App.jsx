import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'

const buttons = ['C', 'B', '/', 
  '7', '8', '9', '*',
  '4', '5', '6', '+',
  '1', '2', '3', '-',
  '.', '0', '='
]

function App() {

  const [input, setInput] = useState('');

  const handleClick = (val) => {
    if(val === 'C') {
      setInput('');
    } else if(val === 'B') {
      setInput(prev => prev.slice(0, -1))
      
    } else if(val === '=') {
      try {
        const result = evaluate(input);
        setInput((result.toFixed(2)));
      } catch (error) {
        console.error(error);
        setInput(error);
      }
    } else {
      setInput(prev => prev + val )
    }
  }

  return (
    <div className='container'>
      <input 
      value={input}
      type='input'
      onChange={e => setInput(e.target.value)}
      readOnly />

      <div className="btn-container">
        {buttons.map((btn, index) => (
          <button 
          key={index}
          onClick={() => handleClick(btn)}
          className={
            btn === 'C' 
            ? 'btn-clear' 
            : btn === '=' 
            ? 'btn-equal' 
            : ['+', '-', '*', '/'].includes(btn)
            ? 'btn-operator'
            : ''}
          >
          {btn}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App