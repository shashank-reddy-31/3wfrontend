// src/components/ChatRoom.js  
import React, { useEffect, useState } from 'react';  
import { io } from 'socket.io-client';  
import MessageInput from './MessageInput';  
import OnlineUsers from './OnlineUsers';  

const socket = io('http://localhost:5000');  

const ChatRoom = ({ username, room }) => {  
  const [messages, setMessages] = useState([]);  
  const [typingUser, setTypingUser] = useState('');  
  const [onlineUsers  ] = useState(new Set());  

  useEffect(() => {  
    socket.emit('joinRoom', { username, room });  

    socket.on('message', (message) => {  
      setMessages((prevMessages) => [...prevMessages, message]);  
    });  

    socket.on('loadMessages', (previousMessages) => {  
      setMessages(previousMessages);  
    });  

    socket.on('typing', (user) => {  
      setTypingUser(user);  
      setTimeout(() => setTypingUser(''), 3000); // Hide typing message after 3 seconds  
    });  

    return () => {  
      socket.off();  
    };  
  }, [username, room]);  

  return (  
    <div>  
      <OnlineUsers users={Array.from(onlineUsers)} />  
      <div>  
        {messages.map((msg, index) => (  
          <div key={index}>  
            <strong>{msg.user}:</strong> {msg.text}  
          </div>  
        ))}  
        {typingUser && <div>{typingUser} is typing...</div>}  
      </div>  
      <MessageInput socket={socket} room={room} username={username} />  
    </div>  
  );  
};  

export default ChatRoom;