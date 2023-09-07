import React from 'react';

interface LandPlotProps {
    landData: {
        name: string,
        terrain: string;
        fertility: number;
        water: boolean;
        availableSpace: number;
        population: number;
        resources: { [key: string]: number };
    };
}

const LandPlot: React.FC<LandPlotProps> = ({ landData }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">Terrain: {landData.terrain}</h3>
            <p className="mb-2"><strong className="font-medium">Fertility:</strong> {landData.fertility.toFixed(2)}</p>
            <p className="mb-2"><strong className="font-medium">Water Source:</strong> {landData.water ? 'Yes' : 'No'}</p>
            <p className="mb-2"><strong className="font-medium">Available Space:</strong> {landData.availableSpace}</p>
            <p className="mb-4"><strong className="font-medium">Population:</strong> {landData.population}</p>
            
            <h4 className="text-lg font-semibold border-b pb-2 mb-4">Available Resources:</h4>
            <ul>
                {Object.entries(landData.resources).map(([resource, amount]) => (
                    <li key={resource} className="mb-2"><strong className="font-medium">{resource}:</strong> {amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default LandPlot;
