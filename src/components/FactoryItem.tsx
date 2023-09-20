import React, { useState } from 'react';
import { resources } from '@/utils/items';
import { useFactories } from '@/contexts/FactoriesContext';

interface FactoryItemProps {
  factory: any; // Ideally, you'd want to be more specific than 'any' for this type
  onConfigure: (recipe: string) => void;
}

const FactoryItem: React.FC<FactoryItemProps> = ({ factory, onConfigure }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(factory.recipe);
  const { items } = useFactories();

  const handleSetProductionClick = () => {
    onConfigure(selectedRecipe);
  };

  const getOptions = () => {
    if (factory.type === 'production') {
      const itemRequirements = items[selectedRecipe]?.requirements || [];
      const factoryAbilities = factory.abilities || [];
      return Object.keys(items).filter(itemKey => {
        const item = items[itemKey];
        const requirements = item.requirements || [];

        return (
          requirements.every(requirement => factoryAbilities.includes(requirement)) &&
          itemKey !== "0" && itemKey !== "1" && itemKey !== "2" && itemKey !== "3"
        );
      });
    } else if (factory.type === 'extraction') {
      return Object.keys(resources); // Assuming 'resources' is similar to 'items'
    } else if (factory.type === 'farm') {
      return Object.keys(resources).filter(itemKey =>
        resources[itemKey].attributes.includes('plantable')
      );
    } else {
      return []; // Return an empty array for unsupported factory types
    }
  };

  return (
    <div className="flex justify-between items-center mb-2 border p-2">
      <span>Facility type: {factory.type}</span>
      <span>Location: {factory.location}</span>
      <span>Producing: {factory.recipe || "Not Configured"}</span>
      <div>
        <select value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
          {/* Default "None" option */}
          <option value="none">None</option>

          {getOptions().map(itemKey => (
            <option key={itemKey} value={itemKey}>
              {itemKey}
            </option>
          ))}
        </select>
        <button
          onClick={handleSetProductionClick}
          className="ml-2 bg-green-500 text-white py-1 px-2 rounded"
        >
          Set Production
        </button>
      </div>
    </div>
  );
};

export default FactoryItem;
