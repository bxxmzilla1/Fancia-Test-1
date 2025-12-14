
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '../../components/icons/Icons';
import { getSubscriptions } from '../../data';
import { Subscription, Model } from '../../types';

interface SubscriptionsProps {
  models: Model[];
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ models }) => {
  const activeSubscriptions = getSubscriptions();

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/settings" className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6">
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Settings
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Active Subscriptions</h1>

      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl">
        {activeSubscriptions.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {activeSubscriptions.map((sub: Subscription) => {
              const model = models.find(m => m.id === sub.modelId);
              if (!model) return null;

              return (
                <li key={sub.modelId} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <img src={model.profilePicture} alt={model.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-bold">{model.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Renews on {new Date(sub.renewalDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                        Cancel
                    </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">You don't have any active subscriptions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
