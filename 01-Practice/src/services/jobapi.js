const API_URL = 'https://www.arbeitnow.com/api/job-board-api'

const fetchData = async () => {
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error('Failed to fetch Data');
    }

    const data = await response.json();
    console.log(data);
    
    return data.data;
}

export default fetchData;