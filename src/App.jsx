import { useState } from "react";
import JoinScreen from "./components/JoinScreen";
import ChatScreen from "./components/ChatScreen";
import { useWebSocket } from "./hooks/useWebSocket";

export default function App() {
  const [hasJoined, setHasJoined] = useState(false);

  const {
    messages,
    users,
    isConnected,
    myInfo,
    connect,
    sendMessage,
  } = useWebSocket("ws://localhost:8080");

  const handleJoin = (name) => {
    connect(name);       
    setHasJoined(true);  
  };

  if (hasJoined && !isConnected && !myInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <p className="text-white text-lg">Connecting to server...</p>
          <p className="text-gray-400 text-sm mt-2">
            Make sure server is running:{" "}
            <code className="text-purple-400">node server/index.js</code>
          </p>
        </div>
      </div>
    );
  }

  if (!hasJoined || !myInfo) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <ChatScreen
      myInfo={myInfo}
      messages={messages}
      users={users}
      sendMessage={sendMessage}
    />
  );
}
