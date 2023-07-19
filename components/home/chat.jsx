'use client'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './blur.css';
import { ChatLine } from './chat-line';



const initialMessages = [
  {
    role: 'assistant',
    content: 'Hi! I am your Road Map Assistant.',
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

const useMessages = (email) => {
  const [messages, setMessages] = useState(initialMessages);
  const [ongoingMessage, setOngoingMessage] = useState(''); // Add this line
  const [ws, setWs] = useState(null); 
  // const lastResponse = useRef(''); 

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");
    websocket.onopen = () => setWs(websocket);
    websocket.onclose = (event) => console.log('WebSocket closed', event);
    websocket.onerror = (error) => console.log('WebSocket error', error);
    websocket.onmessage = (event) => {
      console.log('WebSocket message', event.data);
        
      // const newPart = event.data.slice(lastResponse.current.length);
      // lastResponse.current = event.data; // Update the lastResponse ref
      
      setMessages(old => [...old.slice(0, -1), { role: 'assistant', content: event.data }]);
    };
    return () => websocket.close();
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
        // lastResponse.current = ''; // Also reset the lastResponse ref
      }
    } catch (err) {
      console.error(err)
    }
  }
  const likeMessage = async (message) => {
    try {
      await axios.post('https://roadmap-back-zntr.onrender.com/save_roadmap', {
        roadmap: { roadmap: message },
        email: { email: email }
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    messages,
    sendMessage,
    likeMessage,
  }
}

export default function Chat({ email }) {
  console.log(email);
  const [input, setInput] = useState('')
  const { messages, sendMessage, likeMessage } = useMessages(email)
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
        <div ref={messagesEndRef} />
      </div>
      <InputMessage input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  )
}
