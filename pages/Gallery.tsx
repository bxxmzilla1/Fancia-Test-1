
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Chat, Model, MessageType } from '../types';
import { ChevronLeftIcon } from '../components/icons/Icons';

interface GalleryProps {
  chats: Chat[];
  models: Model[];
}

const Gallery: React.FC<GalleryProps> = ({ chats, models }) => {
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);

  const chatData = chats.find(c => c.id === chatId);
  const model = models.find(m => m.id === chatData?.modelId);

  if (!chatData || !model) {
    return <div className="text-center text-red-500">Gallery not found.</div>;
  }

  const mediaMessages = chatData.messages.filter(
    msg => msg.type === MessageType.MEDIA && msg.isUnlocked !== false
  );

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <div>
                <Link to={`/chat/${chatId}`} className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-2">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Chat
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gallery with {model.name}</h1>
            </div>
            <img src={model.profilePicture} alt={model.name} className="w-12 h-12 rounded-full object-cover" />
        </div>

        {mediaMessages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaMessages.map(msg => (
                    <div key={msg.id} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img src={msg.content} alt="Gallery media" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-900/50 rounded-2xl">
                <p className="text-gray-500 dark:text-gray-400">No media has been shared in this chat yet.</p>
            </div>
        )}
    </div>
  );
};

export default Gallery;
