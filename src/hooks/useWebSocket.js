import { useState, useEffect, useRef, useCallback } from "react";

export function useWebSocket(url) {
  const [messages, setMessages] = useState([]);          
  const [users, setUsers] = useState([]);                
  const [isConnected, setIsConnected] = useState(false);
  const [myInfo, setMyInfo] = useState(null);            

  const wsRef = useRef(null);

  // Connect Function ----
  const connect = useCallback((name) => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join", name }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "joined") {
        setMyInfo({ id: data.userId, name: data.name, color: data.color });

      } else if (data.type === "user_joined" || data.type === "user_left") {
        setUsers(data.users || []);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "system",
            text: data.message,
            timestamp: data.timestamp,
          },
        ]);

      } else if (data.type === "message") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(), 
            type: "message",
            userId: data.userId,
            name: data.name,
            color: data.color,
            text: data.text,
            timestamp: data.timestamp,
          },
        ]);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
      setIsConnected(false);
    };
  }, [url]);

  //Send Message Function ----
  const sendMessage = useCallback((text) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "message", text }));
    }
  }, []);

  // ---- Cleanup ----
  // close WebSocket connection when component unmounts
  useEffect(() => {
    return () => wsRef.current?.close();
  }, []);

  // return everything the component needs
  return {
    messages,
    users,
    isConnected,
    myInfo,
    connect,
    sendMessage,
  };
}