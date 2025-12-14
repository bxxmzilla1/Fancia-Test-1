import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Message, MessageSender, MessageType, Chat as ChatType, Model } from '../types';
import { LockClosedIcon, PaperAirplaneIcon, CameraIcon } from '../components/icons/Icons';

interface ChatProps {
  chats: ChatType[];
  models: Model[];
  onReadChat: (chatId: number) => void;
  onUnlockMessage: (chatId: number, messageId: number) => void;
  onSendMessage: (chatId: number, content: string) => void;
  onSendMedia: (chatId: number, content: string, isPPV: boolean, price?: number) => void;
}

const Chat: React.FC<ChatProps> = ({ chats, models, onReadChat, onUnlockMessage, onSendMessage, onSendMedia }) => {
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);

  const chatData = chats.find(c => c.id === chatId);
  const model = models.find(m => m.id === chatData?.modelId);

  const [input, setInput] = useState('');
  const [pendingMedia, setPendingMedia] = useState<{ file: File, preview: string }[]>([]);
  const [mediaPrice, setMediaPrice] = useState('');
  const [unlockingMessage, setUnlockingMessage] = useState<Message | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if(chatId) {
      onReadChat(chatId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatData?.messages.length]);

  if (!chatData || !model) {
    return <div className="text-center text-red-500">Chat not found.</div>;
  }
  
  const handleSendText = () => {
    if (input.trim() === '') return;
    onSendMessage(chatId, input);
    setInput('');
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newMediaPromises = Array.from(files).map((file: File) => 
        new Promise<{ file: File, preview: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ file, preview: reader.result as string });
          };
          reader.readAsDataURL(file);
        })
      );

      Promise.all(newMediaPromises).then(newMedia => {
        setPendingMedia(prev => [...prev, ...newMedia]);
      });
    }
  };
  
  const handleCancelSend = () => {
    setPendingMedia([]);
    setMediaPrice('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleConfirmSend = () => {
    const isPPV = mediaPrice !== '' && parseFloat(mediaPrice) > 0;
    const price = isPPV ? parseFloat(mediaPrice) : undefined;
    
    pendingMedia.forEach(media => {
        onSendMedia(chatId, media.preview, isPPV, price);
    });
    
    handleCancelSend();
  };

  const handleRemoveMedia = (indexToRemove: number) => {
    const newMedia = pendingMedia.filter((_, index) => index !== indexToRemove);
    if (newMedia.length === 0) {
        handleCancelSend();
    } else {
        setPendingMedia(newMedia);
    }
  };
  
  const handleConfirmUnlock = () => {
    if (unlockingMessage) {
        onUnlockMessage(chatId, unlockingMessage.id);
        setUnlockingMessage(null);
    }
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === MessageSender.USER;
    const isMedia = message.type === MessageType.MEDIA;

    // Show blurred PPV message if it's from model and not unlocked
    if (!isUser && message.isPPV && !message.isUnlocked && isMedia) {
      const handleUnlock = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onUnlockMessage(chatId, message.id);
      };
      
      return (
        <div className="flex justify-start">
          <div className="relative rounded-2xl overflow-hidden cursor-pointer group" onClick={handleUnlock}>
              <img src={message.content} alt="media content" className="blur-lg max-w-xs shadow-md" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center transition-all group-hover:bg-black/50 pointer-events-none">
                  <LockClosedIcon className="w-8 h-8 mb-2" />
                  <span className="font-bold">Unlock Media</span>
                  <span className="text-sm">${message.price?.toFixed(2)}</span>
              </div>
          </div>
        </div>
      );
    }
    
    // Show unblurred media (including unlocked PPV messages)
    if (isMedia) {
        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`inline-flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <img src={message.content} alt="media content" className="rounded-2xl max-w-xs shadow-md" />
                    {isUser && message.isPPV && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                            Sent for ${message.price?.toFixed(2)}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-4 py-2 rounded-2xl max-w-sm ${isUser ? 'bg-primary-600 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-lg'}`}>
          {message.content}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-10rem-1px)] md:h-[calc(100vh-7rem)] max-w-3xl mx-auto bg-white dark:bg-gray-900/50 rounded-t-2xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 overflow-hidden shrink-0">
                  <img src={model.profilePicture} alt={model.name} className="w-full h-full object-cover" />
              </div>
              <div>
                  <h2 className="font-bold text-lg">{model.name}</h2>
                  {model.isOnline && <p className="text-xs text-green-500">Online</p>}
              </div>
          </div>
          <div>
              <Link to={`/profile/${model.id}`} className="text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline mr-4">View Profile</Link>
              <Link to={`/chat/${chatId}/gallery`} className="text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">Gallery</Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatData.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black shrink-0">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2">
              <input type="file" ref={fileInputRef} onChange={handleFileSelection} className="hidden" accept="image/*,video/*" multiple />
              <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500"><CameraIcon className="w-6 h-6"/></button>
              <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                  placeholder="Send a message..." 
                  className="flex-1 bg-transparent p-3 focus:outline-none text-gray-900 dark:text-white"
              />
              <button onClick={handleSendText} className="p-2 text-white bg-primary-600 rounded-full m-1 hover:bg-primary-700 transition-colors disabled:bg-primary-300">
                  <PaperAirplaneIcon className="w-5 h-5"/>
              </button>
          </div>
        </div>
      </div>

      {/* Media Preview Popup */}
      {pendingMedia.length > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Send Media</h3>
            
            <div className="flex-1 mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-black min-h-[200px]">
                {pendingMedia[0].file.type.startsWith('image') ? (
                    <img src={pendingMedia[0].preview} alt="Preview" className="max-h-full max-w-full object-contain" />
                ) : (
                    <video src={pendingMedia[0].preview} controls className="max-h-full max-w-full" />
                )}
            </div>

            {pendingMedia.length > 1 && (
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                    {pendingMedia.map((media, index) => (
                        <div key={index} className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 border-transparent focus-within:border-primary-500">
                            <img src={media.preview} className="w-full h-full object-cover" alt={`Thumbnail ${index+1}`} />
                             <button onClick={() => handleRemoveMedia(index)} className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full text-xs leading-none w-4 h-4 flex items-center justify-center font-bold hover:bg-black/80">&times;</button>
                        </div>
                    ))}
                </div>
            )}
            
            <div>
              <button onClick={() => fileInputRef.current?.click()} className="w-full text-center py-2 px-4 mb-4 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 rounded-lg transition-colors">
                Add More
              </button>
            </div>
            
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price (optional)
                </label>
                <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                    <input
                        type="number"
                        id="price"
                        value={mediaPrice}
                        onChange={(e) => setMediaPrice(e.target.value)}
                        min="0.01"
                        step="0.01"
                        placeholder="Set a price to make it PPV"
                        className="w-full pl-7 bg-gray-100 dark:bg-gray-700 border-transparent focus:border-primary-500 focus:ring-primary-500 rounded-lg p-3 transition"
                    />
                </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={handleCancelSend} className="px-5 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                    Cancel
                </button>
                <button onClick={handleConfirmSend} className="px-5 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                    Send ({pendingMedia.length})
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Unlock Confirmation Popup */}
      {unlockingMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Unlock Content</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">You are about to purchase this content.</p>
                <div className="bg-primary-500/10 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 rounded-lg py-4 px-6 mb-6">
                    <p className="text-sm">Price</p>
                    <p className="text-4xl font-bold">${unlockingMessage.price?.toFixed(2)}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setUnlockingMessage(null)} className="px-6 py-3 bg-gray-200 dark:bg-gray-600 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition w-full">
                        Cancel
                    </button>
                    <button onClick={handleConfirmUnlock} className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition w-full">
                        Confirm Purchase
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Chat;
