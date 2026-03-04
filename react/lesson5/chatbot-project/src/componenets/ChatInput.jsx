import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

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

export default ChatInput;