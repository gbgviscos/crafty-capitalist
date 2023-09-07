import React from 'react';
import { LandType } from '@/utils/landUtils';
import { useFactories } from '@/contexts/FactoriesContext';
import FactoryManagement from '../FactoryManagement';
import { Factory } from '@/utils/buildings';



const LandManagement: React.FC = () => {
    const { land } = useFactories();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Lands</h2>
            {land.map((landProps, index) => (
                <div key={index} className="border p-4 mb-4">
                    <h3 className="text-lg font-semibold mb-2">{landProps.landData.name}</h3>
                    <p><strong>Terrain:</strong> {landProps.landData.terrain}</p>
                    <p><strong>Fertility:</strong> {landProps.landData.fertility.toFixed(2)}</p>
                    <p><strong>Water Source:</strong> {landProps.landData.water ? 'Yes' : 'No'}</p>
                    <p><strong>Available Space:</strong> {landProps.landData.availableSpace}</p>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Manage Factories</button>
                </div>
            ))}
        </div>
    );
};

export default LandManagement;
