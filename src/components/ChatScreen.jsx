// Messages dikhana, input handle karna, typing events bhejana

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import UsersList from "./UsersList";

export default function ChatScreen({
  myInfo,
  messages,
  users,
  sendMessage,
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);       
    setInput("");             
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-800">

      {/* ---- Left Side — Chat Area ---- */}
      <div className="flex-1 flex flex-col min-w-0">

        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
          <div className="text-2xl">💬</div>
          <div>
            <h2 className="text-white font-semibold">ChatRoom</h2>
            <p className="text-gray-400 text-xs">{users.length} user online</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} myId={myInfo?.id} />
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-gray-900 border-t border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${myInfo?.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
              {myInfo?.name?.[0]?.toUpperCase()}
            </div>

            <input
              type="text"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              maxLength={500}
              className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <UsersList users={users} myId={myInfo?.id} />
    </div>
  );
}
