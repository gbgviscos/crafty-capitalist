import React from 'react';
import { useFactories } from '@/contexts/FactoriesContext';
import BuildingItem from '../Buildings/BuildingItem';
import { Factory } from '@/utils/buildings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LandManagementProps {
    landPlot: {
        name: string,
        terrain: string;
        availableSpace: number;
        factories: Factory[];
        // ... other properties ...
    };
    onUpdateLand: (updatedLandPlot) => void;
}

const LandManagement2: React.FC<LandManagementProps> = ({ landPlot, onUpdateLand  }) => {
    const { factories, setFactories, resources, setResources } = useFactories();


    // Logic to buy a new building (factory) for this land plot
    const onBuyFactory = () => {
        if (landPlot.availableSpace >= 10) {
            const newFactory: Factory = {
                id: Date.now().toString(),
                type: "production",
                size: 10,
                upgrades: [],
                recipe: null,
                lastProduced: null,
                productionTime: 10000, // Assuming you want 10 seconds like the timers
                productionRate: 1,
                location: landPlot.name
            };
    
            const updatedLandPlot = {
                ...landPlot,
                factories: [...(landPlot.factories || []), newFactory],
                availableSpace: landPlot.availableSpace - 10
            };
            
            onUpdateLand(updatedLandPlot);
            setFactories(prev => [...prev, newFactory]);
            console.log(newFactory)
        } else {
            toast.error("Not enough space on this land plot to build a new factory!");
            return;
        }
    };
    const onBuyLumber = () => {
        if (landPlot.availableSpace >= 10) {
            const newFactory: Factory = {
                id: Date.now().toString(),
                type: "extraction",
                size: 5,
                upgrades: [],
                resourceTarget: "wood",
                recipe: null,
                lastProduced: null,
                productionTime: 10000, // Assuming you want 10 seconds like the timers
                productionRate: 1,
                location: landPlot.name
            };
    
            const updatedLandPlot = {
                ...landPlot,
                factories: [...(landPlot.factories || []), newFactory],
                availableSpace: landPlot.availableSpace - 5
            };
            
            onUpdateLand(updatedLandPlot);
            setFactories(prev => [...prev, newFactory]);
            console.log(newFactory)
        } else {
            toast.error("Not enough space on this land plot to build a new factory!");
            return;
        }
    };
    

    const factoriesOnLand = factories.filter(factory => factory.location === landPlot.name);

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-lg mb-2">Buildings on {landPlot.name}</h3>
            <button onClick={onBuyFactory} className="mt-2 mb-4 bg-blue-500 text-white py-2 px-4 rounded">Buy Factory</button>
            <button onClick={onBuyLumber} className="mt-2 mb-4 bg-blue-500 text-white py-2 px-4 rounded">Buy LumberYard</button>
            
            {factoriesOnLand.map((factory, index) => (
                <BuildingItem 
                    key={index} 
                    building={factory}
                    resources={resources}
                    // Additional props if needed...
                />
            ))}

        </div>
    );
}

export default LandManagement2;