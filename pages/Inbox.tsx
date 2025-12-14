
import React from 'react';
import { Link } from 'react-router-dom';
import { Chat, Model } from '../types';

interface InboxProps {
  chats: Chat[];
  models: Model[];
}

const Inbox: React.FC<InboxProps> = ({ chats, models }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Inbox</h1>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {chats.length} conversations
        </span>
      </div>
      <div className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {chats.map((chat) => {
            const model = models.find((m) => m.id === chat.modelId);
            const lastMessage = chat.messages[chat.messages.length - 1];

            if (!model) return null;

            return (
              <li key={chat.id} className="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                <Link to={`/chat/${chat.id}`} className="flex items-center p-4">
                  <div className="relative shrink-0">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={model.profilePicture}
                        alt={model.name}
                      />
                    </div>
                    {model.isOnline && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-900"></span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{model.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{lastMessage?.timestamp}</p>
                    </div>
                    <div className="flex justify-between items-start mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {lastMessage?.content.startsWith('http') ? 'Sent a photo' : lastMessage?.content}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-500 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Inbox;
