export type BuildingType = "production" | "extraction" | "workshop" | "house" | 'farm';

export type Building = {
    id: string;
    type: BuildingType;
    size: number;
    upgrades: string[];
    resourceTarget?: string;
    abilities?: string[];
    recipe: string | null;
    lastProduced: Date;
    productionTime: number;
    productionRate: number;
    location: string;
};

// If Workshop and House have unique properties, extend from the Building type:

export type Workshop = Building & {
    // additional properties specific to Workshop...
};

export type House = Building & {
    // additional properties specific to House...
};

export type Factory = Building & {
    
}
