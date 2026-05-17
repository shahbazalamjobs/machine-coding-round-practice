import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); 
            }
        };

        fetchData();
    }, [url]); 

    return { data, loading };
}

export default useFetch;