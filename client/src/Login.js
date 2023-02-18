import React from 'react';

const Login = ({ username, room, connectToRoom, setRoom, setUsername }) => {
  return (
    <>
      <form onSubmit={connectToRoom} className='inputs'>
        <input type='text' value={username} placeholder='Name...' onChange={e => setUsername(e.target.value)} />
        <input type='text' value={room} placeholder='Room...' onChange={e => setRoom(e.target.value)} />
        <button type='submit'>Enter Chat</button>
      </form>
    </>
  );
};

export default Login;
