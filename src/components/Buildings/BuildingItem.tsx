import React from 'react';
import { Factory } from '@/utils/buildings';
import { items } from '@/utils/items';
import { useState } from 'react';

interface BuildingItemProps {
    factory: Factory;
    resources: { [key: string]: { amount: number, type: string } }
    // Add other props if needed...
}

const BuildingItem: React.FC<BuildingItemProps> = ({ factory, resources }) => {

    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    const getAvailableTools = (resources, items) => {
        const craftedResources = Object.keys(resources).filter(resourceName => resources[resourceName].type === "tool");
        const validTools = craftedResources.filter(resourceName => items[resourceName] && items[resourceName].type === "tool");
        return validTools;
    }

    const tools = getAvailableTools(resources, items);

    const handleToolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTool(event.target.value);
        // Here you can also handle the logic to assign the tool to the factory
    }

    return (
        <div className="p-4 border mb-2 rounded shadow-md">
            <h4 className="mb-4 text-xl font-semibold">Factory Details</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="font-medium">Type:</span> {factory.type}
                </div>
                <div>
                    <span className="font-medium">Production Rate:</span> {factory.productionRate}
                </div>
                <div>
                    <span className="font-medium">Recipe:</span> {factory.recipe || 'None'}
                </div>
                <div>
                    <span className="font-medium">Size:</span> {factory.size}
                </div>
            </div>
            <div className="mt-4">
                <span className="font-medium mr-2">Assign Tool:</span>
                <select 
                    value={selectedTool || ''} 
                    onChange={handleToolChange}
                    className="p-2 border rounded-md"
                >
                    <option value="" disabled>Select a tool</option>
                    {tools.map(tool => (
                        <option key={tool} value={tool}>{tool}</option>
                    ))}
                </select>
            </div>
        </div>
    );
    
}

export default BuildingItem;
