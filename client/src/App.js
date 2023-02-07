import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

let socket;
const CONNECTION_PORT = 'http://localhost:3001';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  const connectToRoom = () => {
    socket.emit('join_room', room);
  };

  return (
    <div className='App'>
      <h1>Chat App</h1>
      {!isLoggedIn ? (
        <div className='login'>
          <div className='inputs'>
            <input type='text' placeholder='Name...' onChange={e => setUsername(e.target.value)} />
            <input type='text' placeholder='Room...' onChange={e => setRoom(e.target.value)} />
          </div>
          <button type='button' onClick={connectToRoom}>
            Enter Chat
          </button>
        </div>
      ) : (
        <h1>You are logged in</h1>
      )}
    </div>
  );
}

export default App;
