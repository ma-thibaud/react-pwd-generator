import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import './App.css';

function App() {
  // Initialize state
  const [passwords, setPasswords] = useState([]);
  const [trigger, setTrigger] = useState(false);

  // Fetch passwords after first mount
  useEffect(() => {
    fetch('/api/passwords')
      .then((res) => res.json())
      .then((data) => setPasswords(data));
  }, [trigger]);

  return (
    <div className="App">
      {passwords.length ? (
        <div>
          <h1>5 Passwords.</h1>
          <ul className="passwords">
            {passwords.map((password, index) => (
              // Generally not OK to use 'index' as a key.
              // But OK here because there will be the same # of passwords,
              // and they never change positions in the array.
              <li key={index}>
                {password}
              </li>
            ))}
          </ul>
          <button
            className="more"
            onClick={() => setTrigger(!trigger)}
            type="submit"
          >
            Get More
          </button>
        </div>
      ) : (
        <div>
          <h1>No passwords :(</h1>
          <button
            className="more"
            onClick={() => setTrigger(!trigger)}
            type="submit"
          >
            Try Again?
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
