export default function Message({ msg, myId }) {
  if (msg.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
          {msg.text} · {msg.timestamp}
        </span>
      </div>
    );
  }

  const isMe = msg.userId === myId;

  return (
    <div
      className={`flex items-end gap-2 mb-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isMe && (
        <div
          className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {msg.name[0].toUpperCase()}
        </div>
      )} 

{/* //Adjusting alignment based on sender.. */}
      <div
        className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}
      > 
        {/*  sender name only if its not me */}
        {!isMe && (
          <span className="text-xs text-gray-400 mb-1 ml-1">{msg.name}</span>
        )}
        <div
          className={`px-4 py-2 rounded-2xl text-sm ${
            isMe
              ? "bg-purple-600 text-white rounded-br-sm"
              : "bg-gray-700 text-gray-100 rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>

        <span className="text-xs text-gray-500 mt-1 mx-1">{msg.timestamp}</span>
      </div>
    </div>
  );
}
