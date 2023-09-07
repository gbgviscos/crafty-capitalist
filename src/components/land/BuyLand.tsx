import React, { useState } from 'react';
import terrainTypes from '@/utils/terrainTypes';
import { generateLandPlot } from '@/utils/landUtils';
import LandPlot from './LandPlot';
import { useFactories } from '@/contexts/FactoriesContext';

const BuyLand: React.FC = () => {
  const [landData, setLandData] = useState(null);
  const { land, setLand } = useFactories();

  const generateLandName = (terrainType: string) => {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${terrainType.charAt(0).toUpperCase() + terrainType.slice(1)}-${randomNumber}`;
  };

  const handleBuyLand = (terrainType: string) => {
    const newLandData = generateLandPlot(terrainType);
    newLandData.name = generateLandName(terrainType);
    setLandData(newLandData);
    setLand(prevLand => [...prevLand, newLandData]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Buy Land</h1>
      <p className="mb-4">Choose a type of terrain to purchase:</p>
      <div className="mb-4 space-x-4">
        {Object.keys(terrainTypes).map(terrain => (
          <button 
            key={terrain} 
            onClick={() => handleBuyLand(terrain)}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            {terrain.charAt(0).toUpperCase() + terrain.slice(1)}
          </button>
        ))}
      </div>

      {landData && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your New Land</h2>
          <LandPlot landData={landData} />
        </div>
      )}
    </div>
  );
};

export default BuyLand;
