'use client'
import axios from 'axios';
import { useRef, useState } from 'react';
import './blur.css';
import { ChatLine } from './chat-line';

const initialMessages = [
  {
    role: 'assistant',
    content: 'Hi! I am your Road Map Assistant, choose mode.',
  },
]

const InputMessage = ({ input, setInput, sendMessage }) => {
  const inputRef = useRef(null)
  const handleSendMessage = () => {
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-0 w-1/2 left-1/4" style={{ marginBottom: "50px" }}>
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
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages)

  const sendMessage = async (newMessage) => {
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ]
    setMessages(newMessages)

    try {
      console.log(newMessage)
      const response = await axios.post('http://127.0.0.1:8000/roadmap_create', { message: newMessage })

      setMessages([
        ...newMessages,
        { role: 'assistant', content: response.data },
      ])
    } catch (err) {
      console.error(err)
    }
  }

  return {
    messages,
    sendMessage,
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useMessages()

  return (
    <div className="flex-1 w-full border-zinc-100 bg-slate-600 overflow-hidden">
      <div className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden mb-100">
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} />
        ))}
      </div>
      <InputMessage input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  )
}