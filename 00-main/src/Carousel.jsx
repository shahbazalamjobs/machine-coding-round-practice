import { useEffect, useRef, useState } from 'react'
import data from './data.json'

const data_length = data.length

function Carousel() {

  const [ activeIndex, setActiveIndex ] = useState(0);
    const timerRef = useRef(null);

  const handlePrev = () => {
    setActiveIndex(prev =>
      prev === 0 ? data_length - 1 : prev - 1
    );
  }

  const handleNext = () => {
    setActiveIndex(prev =>
      prev === data_length - 1 ? 0 : prev + 1
    );
  }

  useEffect(() => {

    timerRef.current = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div  className='container'>
      <div 
        className="image-container"
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={() => {
          clearInterval(timerRef.current);
          timerRef.current = setInterval(handleNext, 2000);
      }}  
      >
        <img src={data[activeIndex].download_url} alt="" />

        <button 
          className='prev-btn'
          onClick={handlePrev}
        >
          &lt;
        </button>
        
        <button 
          className='next-btn'
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Carousel