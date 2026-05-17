import { useState, useEffect } from 'react'
 
function useFetch() {

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const url = 'https://randomuser.me/api/?results=5';

  useEffect(() => {
      const fetchData = async () => {
      try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result.results);
          setLoading(false);
          console.log(result.results);
      } catch (error) {           
          console.error('Error fetching data', error);
          setLoading(false); 
      }
    }
        fetchData();
  }, [])

  return { data, loading }
}

export default useFetch