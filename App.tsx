
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import Upload from './pages/Upload';
import Auth from './pages/Auth';
import { chats as initialChats, posts as initialPosts, models as initialModels } from './data';
import { Chat as ChatType, Message, MessageSender, MessageType, Post as PostType, Model } from './types';
import ProfileSettings from './pages/settings/ProfileSettings';
import PaymentMethod from './pages/settings/PaymentMethod';
import Subscriptions from './pages/settings/Subscriptions';
import Gallery from './pages/Gallery';

const AppContent: React.FC = () => {
  const [chats, setChats] = useState<ChatType[]>(initialChats);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [models, setModels] = useState<Model[]>(initialModels);
  
  const totalUnreadCount = chats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  const location = useLocation();
  const isAuthPage = location.pathname === '/';
  
  // Assuming the current logged-in user is the first one in the models array (ID 1).
  const currentUser = models.find(m => m.id === 1);

  const handleReadChat = (chatId: number) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const handleUnlockMessage = (chatId: number, messageId: number) => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg =>
              msg.id === messageId ? { ...msg, isUnlocked: true } : msg
            ),
          };
        }
        return chat;
      })
    );
  };

  const handleSendMessage = (chatId: number, content: string) => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: chat.messages.length + 1,
            sender: MessageSender.USER,
            type: MessageType.TEXT,
            content,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            isPPV: false,
          };
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      })
    );
  };

  const handleSendMedia = (chatId: number, content: string, isPPV: boolean, price?: number) => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: chat.messages.length + 1,
            sender: MessageSender.USER,
            type: MessageType.MEDIA,
            content,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            isPPV: isPPV,
            price: isPPV ? price : undefined,
            isUnlocked: true, // Media sent by user is always unlocked for them
          };
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      })
    );
  };

  const handleDeletePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handlePinPost = (postId: number) => {
    setPosts(prevPosts => {
      const currentPost = prevPosts.find(p => p.id === postId);
      const isCurrentlyPinned = currentPost?.isPinned;
      
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, isPinned: !isCurrentlyPinned };
        }
        if (!isCurrentlyPinned && post.isPinned) {
          return { ...post, isPinned: false };
        }
        return post;
      });
    });
  };

  const handleEditPost = (postId: number, newCaption: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, caption: newCaption } : post
      )
    );
  };

  const handleLikePost = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newLikedState = !post.isLiked;
          const newLikeCount = newLikedState ? post.likes + 1 : post.likes - 1;
          return { ...post, isLiked: newLikedState, likes: newLikeCount };
        }
        return post;
      })
    );
  };
  
  const handleUpdateProfile = (userId: number, updatedData: Partial<Model>) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === userId ? { ...model, ...updatedData } : model
      )
    );
  };

  if (!currentUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {!isAuthPage && <Header totalUnreadCount={totalUnreadCount} />}
      <main className={isAuthPage ? '' : 'pt-20 pb-24 md:pb-8 px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto'}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home models={models} />} />
          <Route path="/profile/:id" element={
            <Profile 
              posts={posts}
              models={models}
              onDeletePost={handleDeletePost}
              onPinPost={handlePinPost}
              onEditPost={handleEditPost}
              onLikePost={handleLikePost}
            />
          } />
          <Route path="/inbox" element={<Inbox chats={chats} models={models} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/upload" element={<Upload />} />
          <Route 
            path="/chat/:id" 
            element={
              <Chat 
                chats={chats} 
                models={models}
                onReadChat={handleReadChat}
                onUnlockMessage={handleUnlockMessage}
                onSendMessage={handleSendMessage}
                onSendMedia={handleSendMedia}
              />
            } 
          />
          <Route path="/chat/:id/gallery" element={<Gallery chats={chats} models={models} />} />
          <Route path="/settings" element={<Settings currentUser={currentUser} />} />
          <Route path="/settings/profile" element={<ProfileSettings currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} />
          <Route path="/settings/payment" element={<PaymentMethod />} />
          <Route path="/settings/subscriptions" element={<Subscriptions models={models} />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
