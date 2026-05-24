import { useEffect, useState, useRef } from 'react'

function AutoIncrementCounter() {

  const [ count, setCount ] = useState(0);
  const [ isPaused, setIsPaused ] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {

  // dont do this mistake
  // run interval timer only when counter is running , otherwise empty it. 
  
  // timerRef.current = setInterval(() => {
  //   if(!isPaused) {
  //     setCount(prev => prev + 1);      
  //   }
  // }, 1000)  

  if(!isPaused) {
    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  }

  return () => clearInterval(timerRef.current);
  },[isPaused])

  const handleStartStop = () => {
    setIsPaused(prev => !prev)
  }
  const handleReset = () => {
    setIsPaused(true);
    setCount(0);
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  return (
    <div className='container'>
      <div className="counter-value">{count}</div>
      <div className="button-container">
        <button onClick={handleStartStop}>{isPaused ? 'Start' : 'Stop'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default AutoIncrementCounter;