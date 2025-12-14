
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronRightIcon, SunIcon, MoonIcon } from '../components/icons/Icons';
import { Link } from 'react-router-dom';
import { Model } from '../types';

interface SettingsProps {
  currentUser: Model;
}

const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
  const { theme, toggleTheme } = useTheme();

  const settingsOptions = [
    { title: 'Profile Settings', subtitle: 'Update your name, photo, etc.', path: '/settings/profile' },
    { title: 'Payment Method', subtitle: 'Manage your cards and billing', path: '/settings/payment' },
    { title: 'Subscriptions', subtitle: 'View and manage your active subscriptions', path: '/settings/subscriptions' },
  ];
  
  const SettingItem: React.FC<{ title: string; subtitle: string, path: string }> = ({ title, subtitle, path }) => (
    <li>
        <Link to={path} className="flex justify-between items-center py-4 px-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
            <div>
                <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </Link>
    </li>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-4">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          <li>
            <Link to={`/profile/${currentUser.id}`} className="flex justify-between items-center py-4 px-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <img src={currentUser.profilePicture} alt="Your avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </Link>
          </li>
          {settingsOptions.map(option => (
            <SettingItem key={option.title} {...option} />
          ))}
          <li className="flex justify-between items-center py-4 px-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Appearance</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode</p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-full">
              <button 
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-white shadow' : ''}`}
              >
                <SunIcon className={`w-5 h-5 ${theme === 'light' ? 'text-primary-500' : 'text-gray-500'}`} />
              </button>
              <button 
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-900 shadow' : ''}`}
              >
                <MoonIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-primary-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
