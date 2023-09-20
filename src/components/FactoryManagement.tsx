import React, { useEffect } from 'react';
import FactoryItem from './FactoryItem';
import { useFactories } from '../contexts/FactoriesContext';


const FactoryManagement: React.FC = () => {
  const { factories, setFactories, resources, setResources, items } = useFactories();


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
