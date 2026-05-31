import { useEffect, useRef, useState } from "react";

function Autocomplete() {
    const [input, setInput] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    const cacheRef = useRef({});

    const handleSuggestionClick = (name) => {
        setInput(name);
        setSuggestion([]);
        setIsSelected(true);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        setInput(value);
        setIsSelected(false);

        if (!value.trim()) {
            setSuggestion([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!input.trim() || isSelected) {
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {
            // Cache hit
            if (cacheRef.current[input]) {
                console.log("Suggestions from cache");
                setSuggestion(cacheRef.current[input]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(
                    `https://dummyjson.com/recipes/search?q=${input}`,
                    {
                        signal: controller.signal,
                    }
                );

                const json = await response.json();

                const recipes = json.recipes.map((recipe) => ({
                    id: recipe.id,
                    name: recipe.name,
                }));

                // Save in cache
                cacheRef.current[input] = recipes;

                setSuggestion(recipes);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setSuggestion([]);
                }
            } finally {
                setLoading(false);
            }
        };

        const timerId = setTimeout(fetchData, 300);

        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [input, isSelected]);

    return (
        <div className="container">
            <h1>Autocomplete</h1>

            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Search Recipes..."
            />

            <div className="suggestion">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    suggestion.map((item) => (
                        <div
                            key={item.id}
                            onClick={() =>
                                handleSuggestionClick(item.name)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            {item.name}
                        </div>
                    ))
                )}

                {!loading &&
                !isSelected &&
                input.trim() &&
                suggestion.length === 0 && (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
}

export default Autocomplete;