import { useEffect, useRef, useState } from "react";

function Autocomplete() {

    const [ input, setInput ] = useState('');
    const [ suggestion, setSuggestion ] = useState([]);
    const [ isSelected, setIsSelected ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const cacheRef = useRef({});

    const handleSuggestionClick = (name) => {
        setInput(name);
        setSuggestion([]);
        setLoading(false);
        setIsSelected(true);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        setIsSelected(false);
        
        if(!value.trim()) {
            setSuggestion([]);
        }
    }

    useEffect(() => {
        if (!input.trim() || isSelected) {
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {

            // check from cache
            if(cacheRef.current[input]){
                console.log('Suggestion from cache')
                setSuggestion(cacheRef.current[input]);
                return;
            }

            try {
                setLoading(true);

                const url = `https://dummyjson.com/recipes/search?q=${input}`;
                const data = await fetch(url, {
                    signal: controller.signal,
                });
                const json = await data.json();
                console.log('fetched from api', json);

                const recipes = json.recipes.map((recipe) => ({
                    id: recipe.id,
                    name: recipe.name
                }))

                // save in cache
                cacheRef.current[input] = recipes;

                setSuggestion(recipes);
                setLoading(false);
            
            } catch (error) {
               // Ignore abort error
               if(error.name === 'AbortError') {
                console.log('Request Aborted');
                return
               }
               console.error(error);
               setSuggestion([])
    
            }
        }

        const timerId = setTimeout(() => {
            fetchData();
        }, 300)

        return () => {
            clearTimeout(timerId);
            controller.abort();
        }
    }, [input, isSelected]);

    return (
        <div className="container">

            <h1>Autocomplete</h1>
            <input
                type="text"
                value={input}
                onChange={handleChange}
            />
            <div className="suggestion">
                {loading ? <div className="loading">Loading ...</div> : (
                    suggestion.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => handleSuggestionClick(item.name)}
                    >{item.name}</div>
                )))}
            </div>
        </div>
    );
}

export default Autocomplete;