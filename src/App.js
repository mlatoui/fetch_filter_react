import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://randomuser.me/api/?inc=name,picture&results=48'
      );
      const result = await response.json();
      setUsers(result.results);
      setFilteredUsers(result.results);
    })();
  }, []);

  const handleFilterChange = (event) => {
    const filtered = users.filter((user) => {
      return `${user.name.title} ${user.name.first} ${user.name.last}`
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(event.target.value.toLowerCase().replace(/\s/g, ''));
    });

    setFilteredUsers(filtered);
  };

  return (
    <div id="app">
      <h1>List of users</h1>
      <div className="container">
        <input
          id="filter"
          class="form-control mb-3 form-control-lg"
          placeholder="Type to filer..."
          onChange={handleFilterChange}
        />
        <div className="users row">
          {filteredUsers.map((user, index) => {
            const {
              name: { title, first, last },
              picture: { large: userPicture },
            } = user;

            const fullName = `${title} ${first} ${last}`;

            return (
              <div key={`index-${index}`} className="col-2 user">
                <img src={userPicture} alt={fullName} />
                <h3>{fullName}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
