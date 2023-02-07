import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

let socket;
const CONNECTION_PORT = 'http://localhost:3001';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [roomVisibility, setRoomVisibility] = useState('hidden');

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Toast notifications
  const notifyRoomSuccess = () => toast.success(`${username} has joined room ${room}`);
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

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  const connectToRoom = () => {
    if (room.trim() === '' || username.trim() === '') {
      notifyInvalidInput();
      return;
    }
    setRoomVisibility('visible');
    setIsLoggedIn(true);
    socket.emit('join_room', room, notifyRoomSuccess);
    socket.on('room_joined', () => {
      notifyRoomSuccess();
    });
  };

  const sendMessage = () => {
    socket.emit('send_message', { room, username, message });
    setMessageList(prevList => [...prevList, { username, message }]);
    setMessage('');

    socket.on('receive_message', messageData => {
      setMessageList(prevList => [...prevList, { username: messageData.username, message: messageData.message }]);
    });
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
        <div className='login'>
          {!isLoggedIn ? (
            <>
              <div className='inputs'>
                <input type='text' value={username} placeholder='Name...' onChange={e => setUsername(e.target.value)} />
                <input type='text' value={room} placeholder='Room...' onChange={e => setRoom(e.target.value)} />
              </div>
              <button type='button' onClick={connectToRoom}>
                Enter Chat
              </button>
            </>
          ) : (
            <>
              <div className='messages'>
                {messageList.map((messageInfo, index) => {
                  return (
                    <h1 key={`${messageInfo.username}: ${index}`}>
                      {messageInfo.username} {messageInfo.message}
                    </h1>
                  );
                })}
              </div>
              <div className='message-inputs'>
                <input type='text' value={message} placeholder='Message...' onChange={e => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
