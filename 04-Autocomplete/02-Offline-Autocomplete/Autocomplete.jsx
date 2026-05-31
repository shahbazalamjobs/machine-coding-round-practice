import { useState } from 'react'

const data = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig',
  'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Nectarine',
  'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine',
  'Ugli fruit', 'Vanilla', 'Watermelon', 'Xigua', 'Yellow Passion Fruit', 'Zucchini',
  'Apricot', 'Blackberry', 'Cantaloupe', 'Dragonfruit', 'Eggfruit', 'Feijoa',
  'Guava', 'Hackberry', 'Indian Fig', 'Jackfruit', 'Kumquat', 'Lychee',
  'Mulberry', 'Naranjilla', 'Olive', 'Peach', 'Pear', 'Pineapple',
  'Plum', 'Pomegranate', 'Rambutan', 'Salak', 'Satsuma', 'Tamarind',
  'Tomato', 'Uva Ursi', 'Velvet Apple', 'White Currant', 'Yuzu', 'Ziziphus'
];

function Autocomplete() {

    const [ input, setInput ] = useState('');
    const [ suggestion, setSuggestion ] = useState([]);
    const [ isSelected, setIsSelected ] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value;

        setInput(value);
        setIsSelected(false);

        if(!value.trim()) {
            setSuggestion([])
            return;
        }

        const filteredData = data.filter(fruit => fruit.toLowerCase().includes(value.toLowerCase()))
        setSuggestion(filteredData);
    }

    const handleClick = (name) => {
        setInput(name);
        setSuggestion([]);
        setIsSelected(true);
    }
    

  return (
    <div className='container'>

        <h1>Autocomplete Offline </h1>

        <input 
            type="text"
            value={input}
            onChange={handleChange}
        />

        <div className="suggestion">
            {suggestion.length > 0 && 
                <ul>
                    {suggestion.map((item) => (
                        <li 
                            key={item}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            } 

            {input.trim() && (suggestion.length === 0) && !isSelected && (<div className='not-found'>Not Found</div>)}
        </div>
    </div>
  )
}

export default Autocomplete