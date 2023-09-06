import React, { useState } from 'react';
import { items } from '@/utils/items';


interface FactoryItemProps {
  factory: any;
  onConfigure: (recipe: string) => void;
}

const FactoryItem: React.FC<FactoryItemProps> = ({ factory, onConfigure }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(factory.recipe);

  const handleSetProductionClick = () => {
    console.log("Selected Recipe in FactoryItem:", selectedRecipe);
    onConfigure(selectedRecipe);
  }

  return (
    <div className="flex justify-between items-center mb-2 border p-2">
      <span>Producing: {factory.recipe || "Not Configured"}</span>
      <div>
        <select value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
          {/* Using the keys from the items object to populate the dropdown */}
          {Object.keys(items).map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button onClick={handleSetProductionClick} className="ml-2 bg-green-500 text-white py-1 px-2 rounded">Set Production</button>
      </div>
    </div>
  );
}

export default FactoryItem;
