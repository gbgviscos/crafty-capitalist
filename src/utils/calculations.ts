import { items, resources } from "./items";

export const calculatePrice = (item: string, supply: number) => {
    const basePrice = items[item]?.value || resources[item]?.value;

    if (basePrice === undefined) {
        throw new Error(`Base price for item "${item}" not found.`);
    }

    // Here's a simple formula to alter the price based on supply.
    // You can adjust the constants to control price elasticity.
    return Math.round(basePrice * (1.0 / (1 + 0.1 * supply)));
};
