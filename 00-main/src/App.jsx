// App.jsx

import React from 'react'
import './App.css'
import useFetch from './CustomHook'

function App() {

  const { data: users = [], loading } = useFetch();

  return (

    <div className='app'>

      <h1 className='title'>Users Data</h1>

      {
        loading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <div className='users-container'>

            {
              users.map(user => (
                <div className='user-card' key={user.login.uuid}>

                  <img
                    className='user-image'
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                  />

                  <h2 className='user-name'>
                    {user.name.first} {user.name.last}
                  </h2>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>

                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>

                  <p>
                    <strong>Age:</strong> {user.dob.age}
                  </p>

                  <p>
                    <strong>Country:</strong> {user.location.country}
                  </p>

                  <p>
                    <strong>City:</strong> {user.location.city}
                  </p>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default App