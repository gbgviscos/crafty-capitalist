import React from 'react';
import { useFactories } from '@/contexts/FactoriesContext';
import LandManagement2 from '../Factory/FactoryManagement';

const OwnedLand: React.FC = () => {
    const { land, setLand  } = useFactories();
    const handleUpdateLand = (updatedLandPlot) => {
      setLand(prevLand => prevLand.map(plot => plot.name === updatedLandPlot.name ? updatedLandPlot : plot));
  };
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Owned Land</h2>
        {land.map((plot, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">{plot.name} - Terrain: {plot.terrain}</h3>
            <p className="mb-2"><strong className="font-medium">Fertility:</strong> {plot.fertility.toFixed(2)}</p>
            <p className="mb-2"><strong className="font-medium">Water Source:</strong> {plot.water ? 'Yes' : 'No'}</p>
            <p className="mb-2"><strong className="font-medium">Available Space:</strong> {plot.availableSpace}</p>
            <p className="mb-4"><strong className="font-medium">Population:</strong> {plot.population}</p>
            
            <h4 className="text-lg font-semibold border-b pb-2 mb-4">Available Resources:</h4>
            <ul>
              {Object.entries(plot.resources).map(([resource, amount]) => (
                <li key={resource} className="mb-2"><strong className="font-medium">{resource}:</strong> {amount}</li>
              ))}
            </ul>
            
            <div className="mt-4">
                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Factories:</h4>
                {/* You can add the FactoryManagement component logic here */}
                <LandManagement2 
                landPlot={plot}
                onUpdateLand={handleUpdateLand} />
            </div>

            <div className="mt-4 bg-gray-200 p-2 text-center font-bold">
              Construction
            </div>
          </div>
        ))}
      </div>
    );
};

export default OwnedLand;
