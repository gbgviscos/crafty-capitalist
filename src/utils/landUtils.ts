import { terrainTypes } from '../utils/terrainTypes';
import { resources } from '../utils/items';
import { toast } from 'react-toastify';
const generateLandName = (terrainType: string) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${terrainType.charAt(0).toUpperCase() + terrainType.slice(1)}-${randomNumber}`;
};

export type LandType = {
    landData: {
        name: string,
        terrain: string;
        fertility: number;
        water: boolean;
        availableSpace: number;
        population: number;
        resources: { [key: string]: number };
    };
};

export const generateLandPlot = (terrainType: string) => {
    const terrain = terrainTypes[terrainType];

    if (!terrain) {
        toast.error(`Terrain type "${terrainType}" not found.`);
        return null;
    }

    // Generate resources based on terrain type
    const availableResources = {};
    for (let resource in resources) {
        if (resources[resource].spawnLocations.includes(terrainType)) {
            // Generate a random amount with a minimum value
            const minAmount = 100; // Set your desired minimum value
            availableResources[resource] = Math.floor(Math.random() * (1000 - minAmount + 1)) + minAmount;
            console.log(availableResources)
        }
    }

    const landPlot = {
        terrain: terrainType,
        // Generate a random fertility value with a minimum value
        fertility: Math.random(), // Min: 0
        // 50% chance for a water source (no need for a minimum)
        water: Math.random() > 0.5,
        // Generate random available space with a minimum value
        availableSpace: Math.floor(Math.random() * (100 - 10 + 1)) + 10, // Min: 10
        population: 0,
        resources: availableResources,
        name: generateLandName(terrainType)  // Add this line to set the name
    };
    return landPlot;
};
