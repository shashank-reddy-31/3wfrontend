
import React from 'react';  
import ChatRoom from './components/ChatRoom';  

function App() {  
  const username = "User_" + Math.floor(Math.random() * 1000); // for demo, can be replaced by user input  
  const room = "General"; // default room  

  return (  
    <div>  
      <h1>Chat Application</h1>  
      <ChatRoom username={username} room={room} />  
    </div>  
  );  
}  

export default App;
