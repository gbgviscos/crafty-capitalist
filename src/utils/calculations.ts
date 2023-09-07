import { items, resources } from '@/utils/items';

export const calculatePrice = (item: string, supply: number) => {
    console.log("Hello!")
    let basePrice = items[item]?.value;
    console.log(basePrice)

    // If not found in items, check in resources
    if (!basePrice) {
        basePrice = resources[item]?.value;
        console.log(basePrice)
    }

    if (!basePrice) {
        console.error(`Price not found for item/resource: ${item}`);
        return 0;  // Default to 0 if price not found
    }

    return Math.round(basePrice * (1.0 / (1 + 0.1 * supply)));
};
