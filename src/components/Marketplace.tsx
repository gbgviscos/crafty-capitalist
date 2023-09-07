import React, { useState, useEffect } from 'react';
import { items } from '@/utils/items';
// import { calculatePrice } from '@/utils/pricing';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFactories } from '@/contexts/FactoriesContext';

type MarketplaceProps = {
  initialNpcListings: { [key: string]: number };
  initialPlayerListings: { [key: string]: number };
  initialResources: {
    wood: { amount: number, type: string },
    stone: { amount: number, type: string },
    gold: { amount: number, type: string },
    currency: { amount: number },
  };
};

const Marketplace: React.FC<MarketplaceProps> = ({ initialNpcListings, initialPlayerListings, initialResources }) => {
  const [npcListings, setNpcListings] = useState(initialNpcListings);
  const [playerListings, setPlayerListings] = useState(initialPlayerListings);
  const {resources, setResources} = useFactories();

  const handleBuyFromNPC = (itemName: string) => {
    setNpcListings(prevListings => {
      return { ...prevListings, [itemName]: prevListings[itemName] - 1 };
    });
  };

  const handleSellItem = (itemName: string) => {
    if (resources[itemName] && resources[itemName].amount > 0) {
      const sellingPrice = calculatePrice(itemName, resources[itemName].amount);
  
      // Update currency and reduce the item count
      setResources(prevResources => ({
        ...prevResources,
        currency: { amount: prevResources.currency.amount + sellingPrice },
        [itemName]: { ...prevResources[itemName], amount: prevResources[itemName].amount - 1 }
      }));
    } else {
      alert("You don't have this item to sell!");
    }
  };
  
  const calculatePrice = (item: string, supply: number) => {
      let basePrice = items[item]?.value;
      // If not found in items, check in resources
      if (!basePrice) {
          basePrice = resources[item]?.value;
      }

      if (!basePrice) {
          console.error(`Price not found for item/resource: ${item}`);
          return 0;  // Default to 0 if price not found
      }

      return Math.round(basePrice * (1.0 / (1 + 0.01 * supply)));
  };

  const handleListItem = (itemName: string) => {
    if (resources[itemName] && resources[itemName].amount > 0) {
      setResources(prevResources => ({
        ...prevResources,
        [itemName]: { ...prevResources[itemName], amount: prevResources[itemName].amount - 1 }
      }));
      setPlayerListings(prevListings => {
        return { ...prevListings, [itemName]: (prevListings[itemName] || 0) + 1 };
      });
    } else {
      alert("You don't have this item to list!");
    }
  };

  useEffect(() => {
    const npcPurchase = setTimeout(() => {
      const listedItems = Object.keys(playerListings);
      if (listedItems.length === 0) return;

      const randomItem = listedItems[Math.floor(Math.random() * listedItems.length)];

      if (playerListings[randomItem] > 0 && resources[randomItem] && resources[randomItem].amount > 0) {
        const sellingPrice = calculatePrice(randomItem, playerListings[randomItem]);
        console.log(sellingPrice)
        console.log(randomItem)

        // Update currency
        console.log(resources)
        setResources(prevResources => ({
          ...prevResources,
          currency: { amount: prevResources.currency.amount + sellingPrice },
          [randomItem]: { ...prevResources[randomItem], amount: prevResources[randomItem].amount - 1 }
        }));

        setPlayerListings(prevListings => {
          return { ...prevListings, [randomItem]: prevListings[randomItem] - 1 };
        });

        // Notify the player that an item was sold
        toast.success(`${randomItem} was sold for ${sellingPrice}!`);
      }
    }, Math.random() * 5000 + 5000);

    return () => {
      clearTimeout(npcPurchase);
    };
  }, [playerListings]);
  return (
    <div className="p-4 bg-white rounded shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Marketplace</h2>
      {/* Player Listings */}
      <div className="border p-4 mb-4">
        <h2 className="text-xl mb-2">My Listings</h2>
        <ul>
          {Object.entries(playerListings).map(([item, count]) => (
            <li key={item} className="flex justify-between mb-2">
              <span>{item}:</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>

{/* NPC Listings */}
<ul>
  {Object.entries(resources).filter(([product]) => items[product] && product !== "currency").map(([product, resourceInfo]) => (  // Filtering to ensure only items from utils/items are shown and not the currency
    <li key={product} className="flex justify-between mb-2">
      <span>{product} (Price: {calculatePrice(product, resourceInfo.amount)}):</span>
      <div>
        <span className="mr-2">{resourceInfo.amount}</span>
        <button
          className="py-1 px-3 bg-blue-500 text-white rounded mr-2"
          onClick={() => handleListItem(product)}
        >
          List
        </button>
        <button
          className="py-1 px-3 bg-red-500 text-white rounded"
          onClick={() => handleSellItem(product)}
        >
          Sell
        </button>
      </div>
    </li>
  ))}
      </ul>
    </div>
  );
};

export default Marketplace;
