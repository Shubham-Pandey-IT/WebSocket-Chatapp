import React from "react";
export default function UsersList({ users, myId }) {
  return (
    <div className="w-56 bg-gray-900 border-l border-gray-700 flex flex-col">

      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold text-sm">
          Online Users
          <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            {users.length}
          </span>
        </h3>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {user.name[0].toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 truncate">
                {user.name}
                {user.id === myId && (
                  <span className="text-purple-400 text-xs ml-1">(You)</span>
                )}
              </p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">WebSocket Connected</span>
        </div>
      </div>
    </div>
  );
}
