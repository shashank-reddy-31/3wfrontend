// src/components/MessageInput.js  
import React, { useState } from 'react';  

const MessageInput = ({ socket, room, username }) => {  
  const [message, setMessage] = useState('');  

  const sendMessage = (e) => {  
    e.preventDefault();  
    if(message.trim() === '') return;  
    socket.emit('chatMessage', { room, username, message });  
    setMessage('');  
  };  

  const handleTyping = () => {  
    socket.emit('typing', room, username);  
  };  

  return (  
    <form onSubmit={sendMessage}>  
      <input  
        type="text"  
        value={message}  
        onChange={(e) => {  
          setMessage(e.target.value);  
          handleTyping();  
        }}  
        placeholder="Type a message..."  
      />  
      <button type="submit">Send</button>  
    </form>  
  );  
};  

export default MessageInput;