import { useState } from 'react'
import ChatInput from './componenets/ChatInput'
import ChatMessages from './componenets/ChatMessages';
import './App.css'

function App() {
  const array = useState([{
    message: 'Hello',
    sender: 'user',
    key: 'id1'
  }, {
    message: 'Hi',
    sender: 'robot',
    key: 'id2'
  }
  ]);

  const [chatMessages, setChatMessages] = array;

  return (
    <div className="app-container">

      <ChatMessages
        chatMessages={chatMessages}
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

    </div>
  );
}

export default App
