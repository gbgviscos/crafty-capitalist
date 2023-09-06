import React, { useState, useEffect } from 'react';
import { useFactories } from '../contexts/FactoriesContext';  // Assuming the path is correct
import { items } from '@/utils/items';

interface NPC {
    name: string;
    interest: string;
    offerPrice: number;
    expiry: number;
}

const NPCBuyers: React.FC = () => {
    const { resources, setResources } = useFactories();
    // Sample list of NPCs. This could be dynamic in a more complex scenario.
    const npcNames = ["John", "Alice", "Bob", "Eve", "Charlie"];
    const availableProducts = Object.keys(items);

    const generateRandomNPC = (): NPC => {
        const randomName = npcNames[Math.floor(Math.random() * npcNames.length)];
        const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
        const randomPrice = Math.floor(Math.random() * 100) + 20; // Random price between 20 and 120

        return {
            name: randomName,
            interest: randomProduct,
            offerPrice: randomPrice,
            expiry: 60,
        };
    };
    const [npcList, setNpcList] = useState<NPC[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNpcList(prevNpcs => {
                return prevNpcs.map(npc => ({ ...npc, expiry: npc.expiry - 1 }))
                    .filter(npc => npc.expiry > 0);
            });
        }, 1000);  // decrement every second

        // Clear the interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Initialize with, say, 3 random NPCs
        setNpcList([generateRandomNPC(), generateRandomNPC(), generateRandomNPC()]);
    }, []);
    useEffect(() => {
        if (npcList.length < 3) {  // For instance, if we always want 3 NPCs
            setNpcList(prevNpcs => [...prevNpcs, generateRandomNPC()]);
        }
    }, [npcList]);
    const handleSellProduct = (price: number, product: string) => {
        setResources(prevResources => {
            const newResources = { ...prevResources };

            // Ensure the player has the product in their inventory and the quantity is more than 0.
            if (!newResources[product] || newResources[product].amount <= 0) {
                return newResources;  // Return the current resources without any changes.
            }

            // Ensure currency exists
            if (!newResources.currency) {
                newResources.currency = { amount: 0, type: 'currency' };
            }

            newResources[product].amount -= 1;  // Deduct one product
            newResources.currency.amount += price;  // Increase the currency by the offered price

            return newResources;
        });
    }
    const handleCompleteContract = (npc: NPC) => {
        setNpcList(prevList => {
            const newList = prevList.filter(n => n.name !== npc.name);
            newList.push(generateRandomNPC());
            return newList;
        });
    };

    // This function checks if the player has the product an NPC is interested in.
    const canSellToNPC = (npc: NPC) => {
        return resources[npc.interest] && resources[npc.interest].amount > 0;
    }

    console.log('Player products:', resources);

    return (
        <div className="border p-4 mb-4">
            <h2 className="text-xl mb-2">NPC Buyers</h2>
            <ul>
                {npcList.map((npc) => (
                    <li key={npc.name} className="flex justify-between mb-2">
                        <span>
                            {npc.name} wants to buy: {npc.interest} for {npc.offerPrice} coins.
                            Expires in {npc.expiry} seconds.
                        </span>
                        {canSellToNPC(npc) && (
                            <button onClick={() => {
                                handleSellProduct(npc.offerPrice, npc.interest);
                                handleCompleteContract(npc);
                            }}>Sell</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NPCBuyers;
