import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ArrowUpTrayIcon } from '../../components/icons/Icons';
import { Model } from '../../types';

interface ProfileSettingsProps {
  currentUser: Model;
  onUpdateProfile: (userId: number, updatedData: Partial<Model>) => void;
}

// Moved outside to prevent re-declaration on each render, fixing the focus bug.
const InputField: React.FC<{ label: string; type: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder?: string, rows?: number }> = ({ label, type, id, value, onChange, placeholder, rows }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    {type === 'textarea' ? (
        <textarea
            id={id}
            rows={rows || 4}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
        />
    ) : (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
        />
    )}
  </div>
);

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ currentUser, onUpdateProfile }) => {
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.name.toLowerCase().replace(/\s/g, ''));
  const [email, setEmail] = useState(`${currentUser.name.toLowerCase().replace(/\s/g, '')}@example.com`);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);

  const [bannerPreview, setBannerPreview] = useState(currentUser.bannerPicture);
  const [photoPreview, setPhotoPreview] = useState(currentUser.profilePicture);
  const [showSuccess, setShowSuccess] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setName(currentUser.name);
    setBio(currentUser.bio);
    setLocation(currentUser.location);
    setBannerPreview(currentUser.bannerPicture);
    setPhotoPreview(currentUser.profilePicture);
  }, [currentUser]);

  const handleImageChange = (file: File | undefined | null, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const updatedData: Partial<Model> = {
      name,
      bio,
      location,
      profilePicture: photoPreview,
      bannerPicture: bannerPreview,
    };
    onUpdateProfile(currentUser.id, updatedData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/settings" className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6">
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Settings
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Profile Settings</h1>

      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Banner</label>
            <div className="relative group rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
              <input type="file" ref={bannerInputRef} onChange={(e) => handleImageChange(e.target.files?.[0], setBannerPreview)} accept="image/*" className="hidden" />
              <img src={bannerPreview} alt="Profile banner" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button type="button" onClick={() => bannerInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold backdrop-blur-sm hover:bg-white/30 transition">
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  Change Banner
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <input type="file" ref={photoInputRef} onChange={(e) => handleImageChange(e.target.files?.[0], setPhotoPreview)} accept="image/*" className="hidden" />
            <img src={photoPreview} alt="Your avatar" className="w-24 h-24 rounded-full object-cover" />
            <div>
              <button type="button" onClick={() => photoInputRef.current?.click()} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition">
                Change Photo
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" id="fullName" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Username" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Location" id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="mt-6">
              <InputField label="Bio" id="bio" type="textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <input placeholder="Current Password" type="password" className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition" />
             <input placeholder="New Password" type="password" className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition" />
          </div>
        </section>
        
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-800 pt-6">
            <button onClick={handleSaveChanges} className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">Save Changes</button>
        </div>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Delete Account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                Delete Your Account
            </button>
        </section>
      </div>

       {showSuccess && (
            <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
                Profile updated successfully!
            </div>
        )}
    </div>
  );
};

export default ProfileSettings;