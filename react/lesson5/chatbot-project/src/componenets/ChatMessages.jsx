import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import { useRef, useEffect } from 'react'
import './ChatMessages.css'

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

export default ChatMessages;