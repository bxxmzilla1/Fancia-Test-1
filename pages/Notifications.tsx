import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Notifications</h1>
      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;
