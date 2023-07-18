'use client'
import { useEffect, useState, useRef } from "react";

const Page = () => {
    const [ws, setWs] = useState(null);
    const [responses, setResponses] = useState([]);
    const lastResponse = useRef(''); // This is a ref to store the last received response

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:8000/ws");
        websocket.onopen = () => setWs(websocket);
        websocket.onclose = (event) => console.log('WebSocket closed', event);
        websocket.onerror = (error) => console.log('WebSocket error', error);
        websocket.onmessage = (event) => {
            console.log('WebSocket message', event.data);
            
            const newPart = event.data.slice(lastResponse.current.length);
            lastResponse.current = event.data; // Update the lastResponse ref
            
            setResponses(old => [...old, newPart]);
        };
        return () => websocket.close();
    }, []);

    const sendText = (text) => {
        if (ws) {
            ws.send(text);
            setResponses([]); // Reset the responses state whenever a new text is sent
            lastResponse.current = ''; // Also reset the lastResponse ref
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


// 'use client'
// import { useEffect, useState } from "react";

// const Page = () => {
//     const [ws, setWs] = useState(null);
//     const [responses, setResponses] = useState([]);

//     useEffect(() => {
//         const websocket = new WebSocket("ws://localhost:8000/ws");
//         websocket.onopen = () => setWs(websocket);
//         websocket.onclose = (event) => console.log('WebSocket closed', event);
//         websocket.onerror = (error) => console.log('WebSocket error', error);
//         websocket.onmessage = (event) => {
//             console.log('WebSocket message', event.data);
//             setResponses([event.data]);
//         };
//         return () => websocket.close();
//     }, []);

//     const sendText = (text) => {
//         if (ws) {
//             ws.send(text);
//             setResponses([]); // Reset the responses state whenever a new text is sent
//         }
//     };

//     return (
//         <div>
//             {responses.map((response, index) => <p key={index}>{response}</p>)}
//             <button onClick={() => sendText("president of kazakhstan?")}>Send Text</button>
//         </div>
//     );
// };

// export default Page;

