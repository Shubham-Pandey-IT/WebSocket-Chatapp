const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

const users = new Map();

const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
];

let colorIndex = 0;

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
}
function broadcastAll(data) {
  broadcast(data);
}

wss.on("connection", (ws) => {
  const userId = Date.now().toString();
  const color = COLORS[colorIndex % COLORS.length];
  colorIndex++;

  console.log(`New connection: ${userId}`);

  ws.on("message", (raw) => {
    // WebSocket sends data as string — convert it back to object
    let data;
    try {
      data = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (data.type === "join") {
      users.set(ws, { id: userId, name: data.name, color });
      ws.send(
        JSON.stringify({
          type: "joined",
          userId,
          name: data.name,
          color,
        }),
      );

      // Tell everyone that a new user joined
      broadcastAll({
        type: "user_joined",
        userId,
        name: data.name,
        color,
        message: `${data.name} joined! `,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        // Send updated users list so sidebar refreshes
        users: [...users.values()].map((u) => ({
          id: u.id,
          name: u.name,
          color: u.color,
        })),
      });

      // ---- Handle MESSAGE ----
    } else if (data.type === "message") {
      const user = users.get(ws);
      if (!user) return;

      broadcastAll({
        type: "message",
        userId: user.id,
        name: user.name,
        color: user.color,
        text: data.text,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  });

  // Handle DISCONNECT ----
  ws.on("close", () => {
    const user = users.get(ws);
    if (user) {
      users.delete(ws);
      broadcastAll({
        type: "user_left",
        userId: user.id,
        name: user.name,
        message: `${user.name} left 👋`,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        users: [...users.values()].map((u) => ({
          id: u.id,
          name: u.name,
          color: u.color,
        })),
      });
      console.log(`Disconnected: ${user.name}`);
    }
  });

  ws.on("error", console.error);
});

console.log("✅ WebSocket Server is running: ws://localhost:8080");
