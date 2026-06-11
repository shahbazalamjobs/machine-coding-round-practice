//App.js

import { useState } from 'react';

const App = () => {
    // State to keep track of the like status
    const [liked, setLiked] = useState(false);

    // Toggle like status
    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="container flex items-center justify-center h-screen w-screen">
          <button
            onClick={toggleLike}
            className={`px-4 py-2 border rounded cursor-pointer ${
              liked ? 'bg-orange-400 text-white' : 'bg-white'
            }`}
          >
            {liked ? 'Like ❤️' : 'Like ♡'}
          </button>
        </div>
    );
};

export default App;