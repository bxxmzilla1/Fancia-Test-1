
import React from 'react';
import ModelCard from '../components/ModelCard';
import { Model } from '../types';

interface HomeProps {
  models: Model[];
}

const Home: React.FC<HomeProps> = ({ models }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        Discover Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Home;
