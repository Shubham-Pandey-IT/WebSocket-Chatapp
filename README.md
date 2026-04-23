# 💬 ChatRoom — WebSocket + React + Tailwind

Real-time group chat app — WebSocket seekhne ke liye!

## Project Structure

```
chat-app/
├── src/                    ← React Frontend
│   ├── components/
│   │   ├── JoinScreen.jsx  ← Naam daalne ki screen
│   │   ├── ChatScreen.jsx  ← Main chat UI
│   │   ├── Message.jsx     ← Ek message ka component
│   │   └── UsersList.jsx   ← Online users sidebar
│   ├── hooks/
│   │   └── useWebSocket.js ← WebSocket ka custom hook ⭐
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js            ← WebSocket Server (Node.js) ⭐
│   └── package.json
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Kaise Chalayein?

### Step 1 — Server start karo (Terminal 1)
```bash
cd server
npm install
npm start
# Output: ✅ WebSocket Server chal raha hai: ws://localhost:8080
```

### Step 2 — Frontend start karo (Terminal 2)
```bash
# Root folder mein (chat-app/)
npm install
npm run dev
# Browser mein kholo: http://localhost:5173
```

### Step 3 — Test karo!
- Browser mein kholo: http://localhost:5173
- Naam dalo aur Enter karo
- **Ek aur tab mein kholo** aur alag naam dalo
- Dono tabs mein real-time chat karo! 🚀

## Features
- ✅ Real-time messaging (WebSocket)
- ✅ Online users list
- ✅ Join/Leave notifications
- ✅ Typing indicator (..."type kar raha hai")
- ✅ Different colors for different users
- ✅ Message timestamps

## WebSocket Flow (Samajhne ke liye)

```
Client                          Server
  |                               |
  |-- WebSocket Connect --------> |
  |-- { type: "join", name } ---> |  (naam bheja)
  |<-- { type: "joined", ... } -- |  (confirm hua)
  |<-- { type: "user_joined"} --- |  (sabko bataya)
  |                               |
  |-- { type: "message", text}--> |  (message bheja)
  |<-- { type: "message", ...} -- |  (sabko mila)
  |                               |
  |-- { type: "typing" } -------> |  (typing shuru)
  |<-- { type: "typing", ... } -- |  (sabko dikhaya)
```

## Key Files to Study

1. **`server/index.js`** — Server code, `wss.on("connection")` se shuru karo
2. **`src/hooks/useWebSocket.js`** — Custom hook, WebSocket ka logic yahan hai
3. **`src/components/ChatScreen.jsx`** — UI + events handle karna
