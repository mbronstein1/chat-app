import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Login from './Login';
import Chat from './Chat';

const connectionString = 'https://dark-wildflower-6160.fly.dev/';

const socket = io.connect(connectionString);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [roomVisibility, setRoomVisibility] = useState('hidden');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Toast notifications
  const notifyRoomSuccess = () => toast.success(`You have successfully joined room ${room}`);
  const notifyNewUserInRoom = name => toast.success(`${name} has joined room ${room}`);
  const notifyInvalidInput = () =>
    toast.error('Please enter both name and room before entering chat', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

  // Handle message receipt
  useEffect(() => {
    socket.on('receive_message', ({ username, message }) => {
      setMessageList([...messageList, { username, message }]);
    });
  }, [messageList]);

  // Handle room connection
  const roomConnectionHandler = e => {
    e.preventDefault();
    if (room.trim() === '' || username.trim() === '') {
      notifyInvalidInput();
      return;
    }
    setRoomVisibility('visible');
    setIsLoggedIn(true);
    notifyRoomSuccess(username);
    socket.emit('join_room', room, username);
    socket.on('room_joined', name => {
      notifyNewUserInRoom(name);
    });
  };

  // Handle sending a message
  const sendMessageHandler = e => {
    e.preventDefault();
    socket.emit('send_message', { room, username, message });
    setMessageList([...messageList, { username, message }]);
    setMessage('');
  };

  return (
    <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme='colored'
      />
      <h1>Chat App</h1>
      <h2 style={{ visibility: roomVisibility }}>Room: {room}</h2>
      <div className='container'>
        <div className='box'>
          {!isLoggedIn ? (
            <Login username={username} room={room} connectToRoom={roomConnectionHandler} setUsername={setUsername} setRoom={setRoom} />
          ) : (
            <Chat messageList={messageList} username={username} message={message} setMessage={setMessage} sendMessage={sendMessageHandler} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
