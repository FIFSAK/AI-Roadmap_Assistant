'use client'
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './blur.css';
import { ChatLine } from './chat-line';
import Image from "next/image";

// const initialMessages = [
//   {
//     role: 'assistant',
//     content: "Hello there! I'm your Personal IT Roadmap Assistant.I'm here to help you navigate the exciting world of IT. I can make a roadmap for beginners or based on your existing experience. if you have not decided on a profession, go to the page list of majors or take a survey",
//   },
// ]
const ClearChatButton = ({ clearChat, rightOffset = 8, bottomOffset = 0 }) => {
  return (
    <button
      className="fixed rounded-full p-1 text-white font-bold hover:bg-gray-400 transition-colors"
      style={{ right: `${rightOffset}px`, bottom: `${bottomOffset}px` }} // Apply the offsets here
      type="button"
      onClick={clearChat}
    >
      <Image src="/icons8-erase-48.png" alt="Menu" width="30" height="30" />
    </button>
  );
};

const InputMessage = ({ input, setInput, sendMessage, clearChat }) => {
  const inputRef = useRef(null)
  const handleSendMessage = () => {
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl relative">
        <div className="relative mx-2 flex flex-row justify-between items-center rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 flex-grow border-0 bg-transparent p-0 py-3 pl-4 text-black"
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
          <div className="flex flex-row items-center space-x-4">
            <button
              className="rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
              type="submit"
              onClick={handleSendMessage}
            >
              Send
            </button>
            <button
              className="rounded-full p-1 text-white font-bold hover:bg-gray-400 transition-colors"
              type="button"
              onClick={clearChat}
            >
              <Image src="/icons8-erase-48.png" alt="Menu" width="30" height="30" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [isRoadmapCreated, setIsRoadmapCreated] = useState(false);
  const [ws, setWs] = useState(null);
  const [wsLinks, setWsLinks] = useState(null);
  const [links, setLinks] = useState('');

  useEffect(() => {
    const websocket = new WebSocket("wss://roadmap-back-zntr.onrender.com/ws");
    const websocketLinks = new WebSocket("wss://roadmap-back-zntr.onrender.com/links");

    websocket.onopen = () => {
      setWs(websocket);
    };

    websocketLinks.onopen = () => {
      setWsLinks(websocketLinks);
    };

    websocket.onclose = (event) => {
      console.log('WebSocket closed', event);
    };

    websocketLinks.onclose = (event) => {
      console.log('WebSocket Links closed', event);
    };

    websocket.onerror = (error) => {
      console.log('WebSocket error', error);
    };

    websocketLinks.onerror = (error) => {
      console.log('WebSocket Links error', error);
    };

    websocket.onmessage = async (event) => {
      console.log('WebSocket message', event.data);
      try {
        setMessages(old => [...old.slice(0, -1), { role: 'assistant', content: event.data }]);
      } catch (err) {
        console.error(err);
      }
    };

    websocketLinks.onmessage = async (event) => {
      console.log('WebSocket Links message', event.data);
      try {
        setLinks(event.data);
      } catch (err) {
        console.error(err);
      }
    };

    return () => {
      websocket.close();
      websocketLinks.close();
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
        setIsRoadmapCreated(true);
      }
    } catch (err) {
      console.error(err);
    }
  }
  const handleGetLinks = async () => {
    try {
      if (wsLinks) {
        wsLinks.send(messages[messages.length - 1].content);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
     window.alert('Roadmap saved successfully!');
    } catch (err) {
      console.error(err)
      // Show an error alert if something goes wrong
      window.alert('Failed to save the roadmap. Please try again later.');
    }
  }

  useEffect(() => {
    if (links) {
      setMessages(old => [...old.slice(0, -1), { role: 'assistant', content: messages[messages.length - 1].content + links }]);
      setLinks('');
      setIsRoadmapCreated(false);
    }
  }, [links]);


  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    window.location.reload(); // you may want to find a way to reset the state without reloading the page
  }
  return {
    messages,
    sendMessage,
    likeMessage,
    handleGetLinks,
    isRoadmapCreated,
    clearChat
  }
}


export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, likeMessage, handleGetLinks, isRoadmapCreated, clearChat } = useMessages()
  const messagesEndRef = useRef(null)
  const [isInstructionVisible, setIsInstructionVisible] = useState(true);

  useEffect(() => {
    setIsInstructionVisible(messages.length === 0);
  }, [messages]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (message) => {
    setIsInstructionVisible(false);
    sendMessage(message);
  }

  return (
    <div className="flex-1 w-full border-zinc-100 overflow-hidden" style={{ marginBottom: "60px" }}>
      {isInstructionVisible && (
        <div className="flex flex-col items-center justify-start h-screen pt-40">
          <div className="p-5 bg-white rounded shadow-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Instructions:</h2>
            <p className="mb-4 text-black text-lg">
              - The Roadmap Assistant can create a roadmap for any IT major.
              <br />
              - If you have some background, please indicate it, and it will create a roadmap based on your skills.
              <br />
              - If you have not decided on a specialty, you can go to the <a href="/majors" className="font-bold underline">List of Majors</a> page or <a href="/take_a_survey" className="font-bold underline">Take a Survey</a>.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Some examples:</h2>
            <p className="mb-4 text-black text-lg">
              - Create a roadmap for a backend developer.
              <br />
              - Create a roadmap for me based on my skills.
            </p>
          </div>
        </div>
      )}
      <div style={{ maxHeight: 'calc(100vh - 165px)', overflowY: 'scroll' }}>
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} onLike={() => likeMessage(content)} />
        ))}
        {isRoadmapCreated && (
          <button
            className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black text-sm hover:opacity-50 disabled:opacity-25"
            onClick={handleGetLinks}
          >
            <div className="w-4 h-4">
              <AcademicCapIcon />
            </div> {'Get links'}
          </button>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ClearChatButton clearChat={clearChat} />
      <InputMessage input={input} setInput={setInput} sendMessage={handleSendMessage} clearChat={clearChat} />
    </div>
  )
}
