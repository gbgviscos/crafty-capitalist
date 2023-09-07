import React, { useEffect } from 'react';
import FactoryItem from './FactoryItem';
import { useFactories } from '../contexts/FactoriesContext';
import { items } from '@/utils/items';

const FactoryManagement: React.FC = () => {
  const { factories, setFactories, resources, setResources } = useFactories();

  const onBuyFactory = () => {
    const newFactory = {
      id: Date.now().toString(),
      recipe: null,
      lastProduced: Date.now(),
      productionTime: 10000, // Assuming you want 10 seconds like the timers
      productionRate: 1,
    };

    // Add the new factory to the factories state
    setFactories(prevFactories => [...prevFactories, newFactory]);
};


  const onConfigureFactory = (index, selectedRecipe) => {
    const updatedFactories = [...factories];
    updatedFactories[index].recipe = selectedRecipe;
    setFactories(updatedFactories);
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl mb-2">All Factories</h2>
      
      {factories.map((factory, index) => (
        <FactoryItem 
          key={index} 
          factory={factory} 
          onConfigure={(selectedRecipe) => onConfigureFactory(index, selectedRecipe)}
        />
      ))}

      
    </div>
  );
}

export default FactoryManagement;
