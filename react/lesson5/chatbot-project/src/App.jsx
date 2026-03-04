import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const inputMessageState = useState('');
  const [inputMessage, setInputMessage] = inputMessageState;
  const [loadingState, setLoadingState] = useState(false);

  async function sendMessage() {

    if (loadingState === true) {
      return;
    }

    const newChatMessages = [...chatMessages, {
      message: inputMessage,
      sender: 'user',
      key: crypto.randomUUID()
    }];

    setChatMessages([
      ...newChatMessages,
      {
        message: 'Loading....',
        sender: 'robot',
        key: crypto.randomUUID()
      }
    ]);

    setLoadingState(true);

    const response = await Chatbot.getResponseAsync(inputMessage);
    setInputMessage('');

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        key: crypto.randomUUID()
      }
    ]);

    setLoadingState(false);

  }

  function inputMessageSetting(event) {
    setInputMessage(event.target.value);
  }

  function inputKeyTrigger(event) {
    if (event.key === 'Enter') {
      if (inputMessage) {
        sendMessage();
      }
    }

    if (event.key === 'Escape') {
      setInputMessage('');
    }
  }

  return (
    <div className="input-container">
      <input
        placeholder="Ask something from me"
        size="30"
        onChange={inputMessageSetting}
        value={inputMessage}
        onKeyDown={inputKeyTrigger}
        className="user-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
}

function MsgBox({ message, sender }) {
  return (
    <div
      className={
        sender === 'robot' ?
          'msg-box-robot' :
          'msg-box-user'
      }
    >
      {sender === 'robot' && <img src={RobotProfileImage} width="50px" />}
      <p className="msg-box">{message}</p>
      {sender === 'user' && <img src={UserProfileImage} width="50px" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (<div
    className="chat-messages-container"
    ref={chatMessagesRef}>
    {chatMessages.map(chatMessage => {
      return (
        <MsgBox
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.key}
        />
      );
    })}
  </div>
  )
}

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
