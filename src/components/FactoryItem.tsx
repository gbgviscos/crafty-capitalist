import React, { useState } from 'react';
import { items, resources } from '@/utils/items';

interface FactoryItemProps {
  factory: any;  // Ideally you'd want to be more specific than 'any' for this type
  onConfigure: (recipe: string) => void;
}

const FactoryItem: React.FC<FactoryItemProps> = ({ factory, onConfigure }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(factory.recipe);

  const handleSetProductionClick = () => {
    onConfigure(selectedRecipe);
  }

  const getOptions = () => {
    if (factory.type === 'production') {
      return Object.keys(items);
    } else if (factory.type === 'extraction') {
      return Object.keys(resources);  // Assuming 'resources' is similar to 'items'
    } else if (factory.type === 'farm') {
      return Object.keys(resources).filter(itemKey => resources[itemKey].attributes.includes('plantable'));
    } else {
      return [];  // Return empty array for unsupported factory types
    }
  }

  return (
    <div className="flex justify-between items-center mb-2 border p-2">
      <span>Facility type: {factory.type}</span>
      <span>Location: {factory.location}</span>
      <span>Producing: {factory.recipe || "Not Configured"}</span>
      <div>
        <select value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
          {/* Default "None" option */}
          <option value="none">None</option>

          {getOptions().map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleSetProductionClick} className="ml-2 bg-green-500 text-white py-1 px-2 rounded">Set Production</button>
      </div>
    </div>
  );
}

export default FactoryItem;
