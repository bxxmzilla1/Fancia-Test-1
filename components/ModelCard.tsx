import React from 'react';
import { Link } from 'react-router-dom';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900/50 transition-all duration-300 hover:shadow-2xl">
      <Link to={`/profile/${model.id}`} className="block">
        <img
          src={model.profilePicture}
          alt={model.name}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end">
            <div>
                <div className="flex items-center space-x-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{model.name}, {model.age}</h3>
                    {model.isOnline && (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                </div>
                 <p className="text-sm text-white/80 mt-1">{model.location}</p>
            </div>
            <div>
                <div className="inline-block bg-primary-600 dark:bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors hover:bg-primary-700 dark:hover:bg-primary-600">
                    View Profile
                </div>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default ModelCard;