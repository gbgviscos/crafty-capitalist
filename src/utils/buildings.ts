export type Factory = {
    id: string;
    type: "resource extraction" | "production";
    size: number;
    upgrades: string[];
    resourceTarget?: string;
    recipe: null,
    lastProduced: Date,
    productionTime: 10000, // Assuming you want 10 seconds like the timers
    productionRate: 1,
    location: string
};