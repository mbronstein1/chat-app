import React from 'react';

const Chat = ({ messageList, username, message, setMessage, sendMessage }) => {
  return (
    <>
      <div className='messages'>
        {messageList.map((messageInfo, index) => {
          return (
            <div key={`${messageInfo.username}: ${index}`} className='message-container'>
              <div className={messageInfo.username === username ? 'message' : 'message other'}>
                <p>
                  <strong>{messageInfo.username}: </strong>
                  {messageInfo.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage} className='message-inputs'>
        <input type='text' value={message} placeholder='Message...' onChange={e => setMessage(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
    </>
  );
};

export default Chat;
