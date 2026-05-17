import "./App.css";
import useFetch from "./customHooks";

function App() {
  const { data: users = [], loading } = useFetch('https://randomuser.me/api/?results=5');

  return (
    <div className="App">
      <h1>User Profiles</h1>
      
      {loading ? (
        <div>Loading users...</div>
      ) : (
        users.map((user) => (
          <div key={user.login.uuid} className="user-card">
            <div className="left-side">
              <img 
                src={user.picture.large} 
                alt={`${user.name.first} ${user.name.last}`} 
              />
            </div>
            <div className="right-side">
              <p><b>Name:</b> {user.name.first} {user.name.last}</p>
              <p><b>Phone:</b> {user.cell}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Location:</b> {user.location.city}, {user.location.country}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;