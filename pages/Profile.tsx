
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Model, Post as PostType } from '../types';
import { HeartIcon, ChatBubbleLeftRightIcon, LockClosedIcon, SparklesIcon, EllipsisVerticalIcon, PinIcon, PencilIcon, TrashIcon } from '../components/icons/Icons';

interface PostCardProps {
    post: PostType; 
    isSubscribed: boolean; 
    isOwnProfile: boolean;
    onDelete: (postId: number) => void;
    onPin: (postId: number) => void;
    onStartEdit: (post: PostType) => void;
    onLike: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isSubscribed, isOwnProfile, onDelete, onPin, onStartEdit, onLike }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLocked = post.type !== 'text' && (!isSubscribed || post.isPPV);

    const handleDelete = () => {
        const postDescription = post.caption ? `"${post.caption.substring(0, 40)}..."` : "this post";
        if (window.confirm(`Are you sure you want to permanently delete ${postDescription}? This action cannot be undone.`)) {
            onDelete(post.id);
        }
        setIsMenuOpen(false);
    };

    const handlePin = () => {
        onPin(post.id);
        setIsMenuOpen(false);
    };

    const handleEdit = () => {
        onStartEdit(post);
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-white dark:bg-gray-900/50 shadow-md rounded-2xl relative">
            {post.isPinned && (
                <div className="absolute top-3 left-3 z-10 bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <PinIcon className="w-3 h-3"/>
                    Pinned
                </div>
            )}
            {isOwnProfile && (
                <div className="absolute top-2 right-2 z-10">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 ring-1 ring-black ring-opacity-5">
                            <button onClick={handlePin} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                                <PinIcon className="w-4 h-4" />
                                {post.isPinned ? 'Unpin Post' : 'Pin Post'}
                            </button>
                            <button onClick={handleEdit} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                                <PencilIcon className="w-4 h-4" />
                                Edit Post
                            </button>
                            <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                                <TrashIcon className="w-4 h-4" />
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {post.type === 'image' && (
                <div className="relative rounded-t-2xl overflow-hidden">
                    <img 
                        src={post.content} 
                        alt="Post content" 
                        className={`w-full h-auto max-h-[70vh] object-contain bg-black ${isLocked ? 'blur-2xl' : ''}`}
                    />
                    {isLocked && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                            <LockClosedIcon className="w-10 h-10 md:w-12 md:h-12" />
                            <p className="font-bold mt-2 text-lg">
                                {post.isPPV ? `Unlock for $${post.price?.toFixed(2)}` : 'Subscribe to see content'}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <div className="p-4">
                {post.type === 'text' && <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>}
                {post.caption && <p className="text-gray-800 dark:text-gray-200">{post.caption}</p>}
                
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
                    <span>{post.timestamp}</span>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => onLike(post.id)} className={`flex items-center space-x-1 transition-colors ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                            <HeartIcon className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`}/>
                            <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1">
                            <ChatBubbleLeftRightIcon className="w-5 h-5"/>
                            <span>{post.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProfileProps {
    posts: PostType[];
    models: Model[];
    onDeletePost: (postId: number) => void;
    onPinPost: (postId: number) => void;
    onEditPost: (postId: number, newCaption: string) => void;
    onLikePost: (postId: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ posts, models, onDeletePost, onPinPost, onEditPost, onLikePost }) => {
  const { id } = useParams<{ id: string }>();
  const model = models.find(m => m.id === Number(id));
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);
  const [editedCaption, setEditedCaption] = useState('');

  // Simulate the current user's ID. In a real app, this would come from auth context.
  const currentUserId = 1;
  const isOwnProfile = Number(id) === currentUserId;

  const modelPosts = posts
    .filter(p => p.modelId === Number(id))
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  if (!model) {
    return <div className="text-center text-red-500">Model not found.</div>;
  }

  const handleSubscribe = () => {
      setIsSubscribed(true);
  };

  const handleStartEdit = (post: PostType) => {
    setEditingPost(post);
    setEditedCaption(post.caption || '');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditedCaption('');
  };

  const handleSaveEdit = () => {
    if (editingPost) {
      onEditPost(editingPost.id, editedCaption);
      handleCancelEdit();
    }
  };

  const formatStat = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const profileStats = [
    { value: formatStat(model.stats.posts), label: 'Posts' },
    { value: formatStat(model.subscriberCount), label: 'Subscribers' },
    { value: formatStat(model.stats.likes), label: 'Likes' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl overflow-hidden">
        <div className="relative">
          <img src={model.bannerPicture} alt={`${model.name}'s banner`} className="w-full h-48 md:h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 transform translate-y-1/2 px-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-black shadow-md overflow-hidden">
                <img src={model.profilePicture} alt={model.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        <div className="pt-20 md:pt-24 px-6 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center">{model.name}
            {model.isOnline && <span className="ml-3 w-3 h-3 bg-green-400 rounded-full"></span>}
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{model.location}</p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {model.bio}
          </p>

          <div className="mt-6 flex justify-around text-center border-t border-b border-gray-200 dark:border-gray-800 py-4">
            {profileStats.map(stat => (
              <div key={stat.label}>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            {isOwnProfile ? (
                <Link 
                    to="/settings/profile"
                    className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-4 px-4 rounded-xl text-lg transition-colors"
                >
                    Edit Profile
                </Link>
            ) : isSubscribed ? (
                <Link 
                    to={`/chat/${model.id}`}
                    className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-4 px-4 rounded-xl text-lg transition-colors"
                >
                    Subscribed
                </Link>
            ) : (
                <button 
                  onClick={handleSubscribe}
                  className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-4 rounded-xl transition-colors duration-300 text-lg"
                >
                  <SparklesIcon className="w-6 h-6 mr-3" />
                  Subscribe for ${model.subscriptionPrice.toFixed(2)}/day
                </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 px-2">Feed</h2>
        <div className="grid grid-cols-1 gap-6">
            {modelPosts.map(post => (
                <PostCard 
                    key={post.id} 
                    post={post} 
                    isSubscribed={isSubscribed || isOwnProfile} 
                    isOwnProfile={isOwnProfile}
                    onDelete={onDeletePost}
                    onPin={onPinPost}
                    onStartEdit={handleStartEdit}
                    onLike={onLikePost}
                />
            ))}
            {modelPosts.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">This creator hasn't posted anything yet.</p>
            )}
        </div>
      </div>
      
      {editingPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              rows={5}
              className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
              placeholder="Enter a new caption..."
            />
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={handleCancelEdit} className="px-5 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-5 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
