import { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      <h1>Chat App</h1>
      {!isLoggedIn ? (
        <div className='login'>
          <div className='inputs'>
            <input type='text' placeholder='Name...' />
            <input type='text' placeholder='Room...' />
          </div>
          <button>Enter Chat</button>
        </div>
      ) : (
        <h1>You are logged in</h1>
      )}
    </div>
  );
}

export default App;
