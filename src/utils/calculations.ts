import { items, resources } from '@/utils/items';
import { toast } from 'react-toastify';

export const calculatePrice = (item: string, supply: number) => {
    let basePrice = items[item]?.value;

    // If not found in items, check in resources
    if (!basePrice) {
        basePrice = resources[item]?.value;
    }

    if (!basePrice) {
        toast.error(`Price not found for item/resource: ${item}`);
        return 0;  // Default to 0 if price not found
    }

    return Math.round(basePrice * (1.0 / (1 + 0.1 * supply)));
};
