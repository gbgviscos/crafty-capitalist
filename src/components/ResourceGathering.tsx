import React from 'react';
import { useFactories } from '@/contexts/FactoriesContext';

const ResourceGathering: React.FC = () => {
  const { gatherResource } = useFactories();

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Gather Resources</h2>
      
      <button 
        className="mr-2 py-2 px-4 bg-green-500 text-white rounded"
        onClick={() => gatherResource('wood')}
      >
        Chop Wood
      </button>

      <button 
        className="mr-2 py-2 px-4 bg-blue-500 text-white rounded"
        onClick={() => gatherResource('stone')}
      >
        Mine Stone
      </button>


      {/* You can add more buttons for other resources if needed */}
    </div>
  );
};

export default ResourceGathering;
