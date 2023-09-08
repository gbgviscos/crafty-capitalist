import React, { useState } from 'react';
import { useFactories } from '@/contexts/FactoriesContext';
import LandManagement2 from '../Factory/FactoryManagement';

const OwnedLand: React.FC = () => {
  const { land, setLand } = useFactories();
  const [expandedLandIndex, setExpandedLandIndex] = useState<number | null>(null); // Track which land plot is expanded

  const handleUpdateLand = (updatedLandPlot) => {
    setLand(prevLand => prevLand.map(plot => plot.name === updatedLandPlot.name ? updatedLandPlot : plot));
  };

  const terrainBackgroundImages = {
    'mountain': '/images/mountain.png',
    'desert': '/images/desert.png',
    'forest': '/images/forest.png',
    'grassland': '/images/grassland.png',
    'wetland': '/images/wetland.png',
    // ... other terrains
  };

  const toggleExpandLand = (index: number) => {
    setExpandedLandIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Owned Land</h2>
      {land.map((plot, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-md mb-6 bg-center bg-cover`}
          style={{ backgroundImage: `url(${terrainBackgroundImages[plot.terrain] || 'default.jpg'})` }}
        >
          <div className="flex justify-between">
            <h3 className="text-xl  text-white font-semibold border-b pb-2 mb-4">{plot.name} - Terrain: {plot.terrain}</h3>
            <button className="mt-2 mr-2 mb-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => toggleExpandLand(index)} aria-expanded={expandedLandIndex === index}>
              {expandedLandIndex === index ? 'Collapse ↑' : 'Expand ↓'}
            </button>
          </div>

          {expandedLandIndex === index && (
            <div className='p-6 bg-neutral-200 bg-opacity-70 rounded-lg shadow-md mb-6 bg-center bg-cover'>
              <p className="mb-2"><strong className="font-medium">Fertility:</strong> {plot.fertility.toFixed(2)}</p>
              <p className="mb-2"><strong className="font-medium">Water Source:</strong> {plot.water ? 'Yes' : 'No'}</p>
              <p className="mb-2"><strong className="font-medium">Available Space:</strong> {plot.availableSpace}</p>
              <p className="mb-4"><strong className="font-medium">Population:</strong> {plot.population}</p>

              <h4 className="text-lg font-semibold border-b pb-2 mb-4">Available Resources:</h4>
              <ul>
                {Object.entries(plot.resources).map(([resource, amount]) => (
                  <li key={resource} className="mb-2">
                    <strong className="font-medium">{resource}: </strong>
                    {JSON.stringify(
                      typeof amount === 'number' ? parseFloat(amount.toFixed(2)) : amount
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-gray-200 p-2 text-center font-bold">
                Construction
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Factories:</h4>
                {/* You can add the FactoryManagement component logic here */}
                <LandManagement2
                  landPlot={plot}
                  onUpdateLand={handleUpdateLand} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnedLand;
