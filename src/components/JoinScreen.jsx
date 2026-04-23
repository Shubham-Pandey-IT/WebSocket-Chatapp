import { useState } from "react";

export default function JoinScreen({ onJoin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const trimmed = name.trim();
    if (trimmed.length < 2) return; 
    onJoin(trimmed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💬</div>
          <h1 className="text-3xl font-bold text-white">ChatRoom</h1>
          <p className="text-white/60 mt-2 text-sm">
            Real-time chat 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Your Name...
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              maxLength={20}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            {name.trim().length > 0 && name.trim().length < 2 && (
              <p className="text-red-300 text-xs mt-1">
                Please enter at least 2 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
          >
            Enter to Chatroom →
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            Made with ❤️ by{" "} Shubham Pandey..
          </p>
        </div>
      </div>
    </div>
  );
}
