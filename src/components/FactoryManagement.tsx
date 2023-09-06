import React, { useEffect } from 'react';
import FactoryItem from './FactoryItem';
import { useFactories } from '../contexts/FactoriesContext';
import { items } from '@/utils/items';

const FactoryManagement: React.FC = () => {
  const { factories, setFactories, resources, setResources } = useFactories();

  const onProduce = (itemName) => {
    const recipeRequirements = items[itemName];
    console.log(recipeRequirements)
  
    // Check if we have the necessary resources to produce the item.
    const canProduce = Object.keys(recipeRequirements).every(resource => {
      return resources[resource] && resources[resource].amount >= recipeRequirements[resource];
    });
  
    // If we can produce the item, deduct the necessary resources and produce the item.
    if (canProduce) {
      setResources(prevResources => {
        const newResources = { ...prevResources };
  
        // Deduct the required resources.
        for (let resource in recipeRequirements) {
          newResources[resource].amount -= recipeRequirements[resource];
        }
  
        // Increase the item count.
        newResources[itemName] = {
          ...newResources[itemName],
          amount: (newResources[itemName]?.amount || 0) + 1
        };
  
        return newResources;
      });
    }
  };

  useEffect(() => {
    const timers = factories.map((factory) => {
      if (!factory.recipe) return null;

      return setInterval(() => {
        onProduce(factory.recipe);
      }, 10000);
    });

    return () => timers.forEach(timer => timer && clearInterval(timer));
  }, [factories]);

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
      <h2 className="text-xl mb-2">Factories</h2>
      
      {factories.map((factory, index) => (
        <FactoryItem 
          key={index} 
          factory={factory} 
          onConfigure={(selectedRecipe) => onConfigureFactory(index, selectedRecipe)}
        />
      ))}

      <button onClick={onBuyFactory} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Buy Factory</button>
    </div>
  );
}

export default FactoryManagement;
