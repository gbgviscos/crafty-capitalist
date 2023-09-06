import React from 'react';
import { calculatePrice } from '@/utils/pricing';

type MarketplaceProps = {
  products: { [key: string]: number };
  npcListings: { [key: string]: number };
  onSell: (itemName: string) => void;
  onList: (itemName: string) => void;
  onBuyFromNPC: (itemName: string) => void;
  playerListings: { [key: string]: number };
};

const Marketplace: React.FC<MarketplaceProps> = ({ products, npcListings, onSell, onList, onBuyFromNPC, playerListings }) => {
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
        {Object.entries(products).map(([product, count]) => (
          <li key={product} className="flex justify-between mb-2">
            <span>{product} (Price: {calculatePrice(product, count)}):</span>
            <div>
              <span className="mr-2">{count}</span>
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded mr-2"
                onClick={() => onList(product)}
              >
                List
              </button>
              <button
                className="py-1 px-3 bg-red-500 text-white rounded"
                onClick={() => onSell(product)}
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
