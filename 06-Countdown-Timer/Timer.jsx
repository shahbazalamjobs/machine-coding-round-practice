
import { useEffect, useRef, useState } from 'react'

function Timer() {

  const [ totalSecond, setTotalSecond ] = useState(0);
  const [ isStarted, setIsStarted ] = useState(false);
  const timerRef = useRef(null);

  const hour = Math.floor(totalSecond / 3600);
  const minute = Math.floor((totalSecond % 3600) / 60);
  const second = Math.floor(totalSecond % 60)

  const handleStart = () => {
    if(totalSecond <= 0) return;

    setIsStarted(true);
  }

  const handleStop = () => {
    setIsStarted(false);
  }

  const handleReset = () => {
    setIsStarted(false);
    setTotalSecond(0);
  }

  const handleHourChange = (e) => {
    const newHours = Number(e.target.value) || 0;
    
    setTotalSecond(
      newHours * 3600 + minute * 60 + second
    )
  }
  const handleMinuteChange = (e) => {
    const newMinutes = Number(e.target.value) || 0;
    
    setTotalSecond(
      hour * 3600 + newMinutes * 60 + second
    )
  }

  const handleSecondChange = (e) => {
    const newSeconds = Number(e.target.value) || 0;
    
    setTotalSecond(
      hour * 3600 + minute * 60 + newSeconds
    )
  }

  const formatTime = (value) => {
    return String(value).padStart('2', 0)
  }

  useEffect(() => {
    if(!isStarted) return;

    timerRef.current = setInterval(() => {
      setTotalSecond((prev) => {

        if(prev <= 1) {
          clearInterval(timerRef.current);
          setIsStarted(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000)

    return () => clearInterval(timerRef.current);
  }, [isStarted])
  
  return (
    <div className='container'>
      <h1>Countdown Timer</h1>

      <div>
        <h2>{formatTime(hour)} : {formatTime(minute)} : {formatTime(second)}</h2>
      </div>

      <div className="timer">
        <label>
          Hour
          <input 
            type="number" 
            value={formatTime(hour)}
            onChange={handleHourChange}
            min='0'
          />
        </label>

        <label>
          Minute
          <input 
            type="number" 
            value={formatTime(minute)}
            onChange={handleMinuteChange}
            min='0'
          />
        </label>

        <label>
          Second
          <input 
            type="number" 
            value={formatTime(second)}
            onChange={handleSecondChange}
            min='0'
          />
        </label>
      </div>

      <div className="btn-container">
        <button 
          onClick={isStarted ? handleStop : handleStart}>
            {isStarted ? 'Stop' : 'Start'}
        </button>

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Timer;