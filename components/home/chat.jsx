'use client'
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './blur.css';
import { ChatLine } from './chat-line';



const initialMessages = [
  {
    role: 'assistant',
    content: "Hello there! I'm your Personal IT Roadmap Assistant.I'm here to help you navigate the exciting world of IT. I can make a roadmap for beginners or based on your existing experience. if you have not decided on a profession, go to the page list of majors or take a survey",
  },
]

const InputMessage = ({ input, setInput, sendMessage }) => {
  const inputRef = useRef(null)
  const handleSendMessage = () => {
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <button
            className="absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
            type="submit"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : initialMessages;
  });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("wss://roadmap-back-zntr.onrender.com/ws");

    websocket.onopen = () => {
      setWs(websocket);
    };

    websocket.onclose = (event) => {
      console.log('WebSocket closed', event);
    };

    websocket.onerror = (error) => {
      console.log('WebSocket error', error);
    };

    websocket.onmessage = async (event) => {
      console.log('WebSocket message', event.data);
      try {
        setMessages(old => [...old.slice(0, -1), { role: 'assistant', content: event.data }]);
      } catch (err) {
        console.error(err);
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = async (newMessage) => {
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
      { role: 'assistant', content: '' },
    ]
    setMessages(newMessages)

    try {
      if (ws) {
        ws.send(newMessage);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const likeMessage = async (message) => {
    try {
      await axios.post('https://roadmap-back-zntr.onrender.com/save_roadmap',
        {
          roadmap: message,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });
    } catch (err) {
      console.error(err)
    }
  }
  const handleGetLinks = async () => {
  try {
    const res = await axios.post('https://roadmap-back-zntr.onrender.com/create_links', { roadmap: messages[messages.length - 1].content });

    setMessages(oldMessages => {
      const newMessages = [...oldMessages];
      const lastMessage = newMessages[newMessages.length - 1];
      // Create a new message object with the updated content
      const updatedMessage = { ...lastMessage, content: lastMessage.content + "\n" + res.data };
      // Replace the last message with the updated message
      newMessages[newMessages.length - 1] = updatedMessage;
      return newMessages;
    });
  } catch (err) {
    console.error(err);
  }
};
  
  
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  return {
    messages,
    sendMessage,
    likeMessage,
    handleGetLinks
  }
}


export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, likeMessage, handleGetLinks } = useMessages()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 w-full border-zinc-100 overflow-hidden">
      <div style={{ maxHeight: 'calc(100vh - 165px)', overflowY: 'scroll' }}>
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} onLike={() => likeMessage(content)} />
        ))}
        <button
          className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black text-sm hover:opacity-50 disabled:opacity-25"
          onClick={handleGetLinks}
        >
          <div className="w-4 h-4">
            <AcademicCapIcon />
          </div> {'Get links'}
        </button>
        <div ref={messagesEndRef} />
      </div>
      <InputMessage input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  )
}
