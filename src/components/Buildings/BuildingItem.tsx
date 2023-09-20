import React from 'react';
import { Building, BuildingType } from '@/utils/buildings';
import { utilityItems as items } from '@/utils/items';
import { useState } from 'react';
import { useFactories } from '@/contexts/FactoriesContext';

interface BuildingItemProps {
    building: Building;
    resources: { [key: string]: { amount: number, type: string } };
}

const BuildingItem: React.FC<BuildingItemProps> = ({ building, resources }) => {

    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const { assignToolToBuilding } = useFactories()

    const getAvailableTools = (resources, items) => {
        const craftedResources = Object.keys(resources).filter(resourceName => resources[resourceName].type === "tool" || resources[resourceName].type === "machine");
        const validTools = craftedResources.filter(resourceName => items[resourceName] && items[resourceName].type === "tool" || resources[resourceName].type === "machine");
        return validTools;
    }

    const tools = getAvailableTools(resources, items);

    const handleToolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTool = event.target.value;
        setSelectedTool(selectedTool);
        if (selectedTool) {
            assignToolToBuilding(building.id, selectedTool);
        }
    }

    return (
        <div className="p-4 border mb-2 rounded shadow-md">
            <h4 className="mb-4 text-xl font-semibold">{building.type.charAt(0).toUpperCase() + building.type.slice(1)} Details</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="font-medium">Type:</span> {building.type}
                </div>
                {building.type === "production" && (
                    <>
                        <div>
                            <span className="font-medium">Production Efficiency:</span> {building.productionRate}
                        </div>
                        <div>
                            <span className="font-medium">Recipe:</span> {building.recipe || 'None'}
                        </div>
                    </>
                )}
                <div>
                    <span className="font-medium">Size:</span> {building.size}
                </div>
                <div>
                    <span className="font-medium">Abilities: </span>
                    {building.abilities
 ? (
                        building.abilities
                        .map((ability, index) => (
                            <span key={index}>{ability}</span>
                        ))
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div>
                <span className="font-medium">Cost per cycle:</span> None
                </div>
            </div>
            <div className="mt-4">
                <span className="font-medium mr-2">Assign tools and machines:</span>
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
