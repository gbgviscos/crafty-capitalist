import React from 'react';
import { useFactories } from '@/contexts/FactoriesContext';
import BuildingItem from '../Buildings/BuildingItem';
import { Factory } from '@/utils/buildings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildingPrices } from '@/utils/pricing';

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

const LandManagement2: React.FC<LandManagementProps> = ({ landPlot, onUpdateLand }) => {
    const { factories, setFactories, resources, setResources } = useFactories();

    const hasSufficientResources = (buildingType) => {
        const cost = buildingPrices[buildingType]?.resources;
        if (!cost) return false;

        for (let resource in cost) {
            if (!resources[resource] || resources[resource].amount < cost[resource]) {
                return false;
            }
        }
        return true;
    };
    const deductBuildingCost = (buildingType) => {
        if (!hasSufficientResources(buildingType)) return false;

        const cost = buildingPrices[buildingType]?.resources;
        let updatedResources = { ...resources };

        for (let resource in cost) {
            updatedResources[resource].amount -= cost[resource];
        }

        setResources(updatedResources);
        return true;
    };
    // Logic to buy a new building (factory) for this land plot
    const onBuyFactory = () => {
        const buildingTypeString = 'production' 
        const buildingSize = buildingPrices[buildingTypeString]?.size
        if (landPlot.availableSpace < buildingSize) {
            toast.error("Not enough space on this land plot to build a new factory!");
            return;
        }

        if (!deductBuildingCost(buildingTypeString)) {
            toast.error("Insufficient resources to build a new factory!");
            return;
        }

        const newFactory: Factory = {
            id: Date.now().toString(),
            type: "production",
            size: 10,
            upgrades: [],
            recipe: null,
            lastProduced: null,
            productionTime: 10000,
            productionRate: 1,
            location: landPlot.name
        };

        const updatedLandPlot = {
            ...landPlot,
            factories: [...(landPlot.factories || []), newFactory],
            availableSpace: landPlot.availableSpace - buildingSize
        };

        onUpdateLand(updatedLandPlot);
        setFactories(prev => [...prev, newFactory]);
    };
    const onBuyResourceGatherer = () => {

        const buildingTypeString = 'extraction' 
        const buildingSize = buildingPrices[buildingTypeString]?.size
        if (landPlot.availableSpace <= buildingSize) {
            toast.error("Not enough space on this land plot to build a new gathering facility!");
            return;
        }

        if (!deductBuildingCost(buildingTypeString)) {
            toast.error("Insufficient resources to build a new gathering facility!");
            return;
        }

        const newFactory: Factory = {
            id: Date.now().toString(),
            type: "extraction",
            size: 5,
            upgrades: [],
            recipe: null,
            lastProduced: null,
            productionTime: 10000, // Assuming you want 10 seconds like the timers
            productionRate: 1,
            location: landPlot.name
        }

        const updatedLandPlot = {
            ...landPlot,
            factories: [...(landPlot.factories || []), newFactory],
            availableSpace: landPlot.availableSpace - 5
        };

        onUpdateLand(updatedLandPlot);
        setFactories(prev => [...prev, newFactory]);

        }

    const onBuyFarm = () => {
        if (landPlot.availableSpace >= 5) {
            const newFactory: Factory = {
                id: Date.now().toString(),
                type: "farm",
                size: 5,
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
                availableSpace: landPlot.availableSpace - 5
            };

            onUpdateLand(updatedLandPlot);
            setFactories(prev => [...prev, newFactory]);

        } else {
            toast.error("Not enough space on this land plot to build a new factory!");
            return;
        }
    };

    function Tooltip({ children, content }) {
        return (
            <div className="relative group cursor-pointer inline-block">
                {children}
                <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 z-10">
                    {content}
                </div>
            </div>
        );
    }
    

    const getTooltipContent = (type) => {
        const resourceCosts = buildingPrices[type].resources;
        const content = Object.entries(resourceCosts)
            .map(([resource, amount]) => `${amount} ${resource}`)
            .join(', ');

        return `Cost: ${content}`;
    }
    const buttonBackgroundImages = {
        'Factory': '/path/to/factory.jpg',
        'ResourceGatherer': '/path/to/resourceGatherer.jpg',
        'Farm': '/path/to/farm.jpg',
      };

    const factoriesOnLand = factories.filter(factory => factory.location === landPlot.name);

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-lg mb-2">Buildings on {landPlot.name}</h3>
            <Tooltip content={getTooltipContent('production')}>
                <button onClick={onBuyFactory} className="mt-2 mr-2 mb-4 bg-blue-500 text-white py-2 px-4 rounded">Buy Factory</button>
            </Tooltip>

            <Tooltip content={getTooltipContent('extraction')}>
                <button onClick={onBuyResourceGatherer} className="mt-2 mb-4 mr-2 bg-lime-400 text-white py-2 px-4 rounded">Buy Resource Gatherer</button>
            </Tooltip>

            <Tooltip content={getTooltipContent('farm')}>
                <button onClick={onBuyFarm} className="mt-2 mb-4 mr-2 bg-orange-400 text-white py-2 px-4 rounded">Buy Farm</button>
            </Tooltip>
            {factoriesOnLand.map((factory, index) => (
                <BuildingItem
                    key={index}
                    building={factory}
                    resources={resources}
                />
            ))}
        </div>
    );

}

export default LandManagement2;