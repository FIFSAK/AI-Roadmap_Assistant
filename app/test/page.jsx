'use client'
import { useEffect, useState } from "react";

const Page = () => {
    const [ws, setWs] = useState(null);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8000/ws");
        websocket.onopen = () => setWs(websocket);
        websocket.onmessage = (event) => setResponses(old => [...old, event.data]);
        websocket.onclose = (event) => console.log('WebSocket closed', event);
        websocket.onerror = (error) => console.log('WebSocket error', error);
        websocket.onmessage = (event) => {
            console.log('WebSocket message', event.data);
            setResponses(old => [...old, event.data]);
        };
        return () => websocket.close();
    }, []);

    const sendText = (text) => {
        if (ws) {
            ws.send(text);
        }
    };

    return (
        <div>
            {responses.map((response, index) => <p key={index}>{response}</p>)}
            <button onClick={() => sendText("president of kazakhstan?")}>Send Text</button>
        </div>
    );
};

export default Page;
