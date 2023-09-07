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
            availableResources[resource] = Math.floor(Math.random() * 100);  // Example to generate a random amount, adjust as necessary
        }
    }

    const landPlot = {
        terrain: terrainType,
        fertility: Math.random(),  // Generate a random fertility value between 0 and 1, adjust as necessary
        water: Math.random() > 0.5,  // 50% chance for a water source, adjust as necessary
        availableSpace: Math.floor(Math.random() * 100),  // Example to generate random available space, adjust as necessary
        population: 0,
        resources: availableResources,
        name: generateLandName(terrainType)  // Add this line to set the name
    };

    return landPlot;
};
