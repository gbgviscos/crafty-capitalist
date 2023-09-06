import React, { useState, useEffect } from 'react';
import ItemProduction from '../components/ItemProduction'


import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import ResourceGathering from '@/components/ResourceGathering';
import FactoryManagement from '@/components/FactoryManagement';
import Marketplace from '@/components/Marketplace';
import Products from '@/components/Products';
import NPCBuyers from '@/components/NPCBuyers';
import { items } from '@/utils/items';
import { calculatePrice } from '@/utils/pricing';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFactories } from '@/contexts/FactoriesContext';

const HomePage: React.FC = () => {
  const [npcListings, setNpcListings] = useState({});
  const [playerListings, setPlayerListings] = useState<{ [key: string]: number }>({});
  const [currency, setCurrency] = useState(100);  // Starting with 100 as an example
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const { factories, setFactories } = useFactories();
  const { resources, setResources } = useFactories();





  useEffect(() => {
    const npcAction = setTimeout(() => {
      // Here's a simple NPC action that occasionally adds items for sale.
      const productNames = Object.keys(items);
      const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];

      setNpcListings(prevListings => {
        return { ...prevListings, [randomProduct]: (prevListings[randomProduct] || 0) + 1 };
      });
    }, Math.random() * 5000 + 5000); // Random time between 5-10 seconds

    return () => {
      clearTimeout(npcAction);
    };
  }, []);




  const [products, setProducts] = useState({
    'Stone axe': 0,
    'Wooden spear': 0,
    'Stone pickaxe': 0,
    // ... add other products with initial counts of 0
  });

  const handleProduceItem = (itemName: string) => {
    // Check if the item can be produced.
    const canProduce = Object.keys(items[itemName]).every(resource => {
      return resources[resource] && resources[resource].amount >= items[itemName][resource];
    });

    if (!canProduce) {
      // Handle the scenario where the item cannot be produced.
      return;
    }

    setResources(prevResources => {
      const newResources = { ...prevResources };

      // Deduct the required resources.
      for (let resource in items[itemName]) {
        if (newResources[resource]) {
          newResources[resource].amount -= items[itemName][resource];
        }
      }

      // Increase the product count.
      const currentItemAmount = (newResources[itemName] && newResources[itemName].amount) || 0;
      newResources[itemName] = {
        amount: currentItemAmount + 1,
        type: 'crafted' // Set the "crafted" type for the produced item
      };

      return newResources;
    });
};


  const handleBuyFromNPC = (itemName: string) => {
    // Deduct player's currency and transfer the item.
    // ...

    setNpcListings(prevListings => {
      return { ...prevListings, [itemName]: prevListings[itemName] - 1 };
    });
  };
  const handleSellToNPC = (price: number, product: string) => {
    // Deduct the product from player's resources
    setResources(prevResources => {
      if (!prevResources[resources] || prevResources[resources].amount <= 0) {
        // Handle the scenario where the product is not available or is at zero count
        // You can show an alert or update some UI state.
        toast.error(`You don't have enough ${resources} to sell!`);
        return prevResources;
      }
  
      const currentProductAmount = prevResources[resources].amount;
      return { 
        ...prevResources, 
        [resources]: {
          ...prevResources[resources],
          amount: currentProductAmount - 1
        } 
      };
    });
    
    // Add the sale amount to player's currency
    setCurrency(prevCurrency => prevCurrency + price);
  
    // Display a toast message or some notification to inform the player of the successful sale
    toast.success(`Sold ${product} to NPC for ${price} coins!`);
  };
  

  const handleSellItem = (itemName: string) => {
    if (products[itemName] > 0) {
      // Calculate the selling price
      const sellingPrice = calculatePrice(itemName, products[itemName]);

      // Update currency
      setCurrency(prevCurrency => prevCurrency + sellingPrice);

      // Reduce the item count from the player's inventory
      setProducts(prevProducts => {
        return { ...prevProducts, [itemName]: prevProducts[itemName] - 1 };
      });
    } else {
      alert("You don't have this item to sell!");
    }
  };
  const handleListItem = (itemName: string) => {
    if (products[itemName] > 0) {
      setProducts(prevProducts => {
        return { ...prevProducts, [itemName]: prevProducts[itemName] - 1 };
      });

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

      // Choose a random item from the player's listings
      const randomItem = listedItems[Math.floor(Math.random() * listedItems.length)];

      // Check if the item exists in the listings and if so, process the sale
      if (playerListings[randomItem] > 0) {
        const sellingPrice = calculatePrice(randomItem, playerListings[randomItem]);

        setCurrency(prevCurrency => prevCurrency + sellingPrice);

        setPlayerListings(prevListings => {
          return { ...prevListings, [randomItem]: prevListings[randomItem] - 1 };
        });

        // Notify the player that an item was sold
        toast.success(`${randomItem} was sold for ${sellingPrice}!`);
      }
    }, Math.random() * 5000 + 5000);  // Random time between 5-10 seconds

    return () => {
      clearTimeout(npcPurchase);
    };
  }, [playerListings, currency]);

  return (
    <div className="flex">
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container ml-64 px-4 w-full">
        <Navbar resources={resources} currency={currency} />

        {activeTab === 'dashboard' && (
          <>
            <h1 className="text-2xl font-bold mb-6">Welcome to Crafty Capitalist!</h1>
            {/* <Dashboard resources={resources} products={products} /> */}
          </>
        )}

        {activeTab === 'factory' && (
          <>
            <ResourceGathering />
            <Products products={resources} />
            <FactoryManagement  />
          </>
        )}

        {activeTab === 'itemProduction' && (
          <ItemProduction />
        )}

        {activeTab === 'npcBuyers' && (
          <NPCBuyers />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            products={products}
            npcListings={npcListings}
            onSell={handleSellItem}
            onList={handleListItem}
            onBuyFromNPC={handleBuyFromNPC}
            playerListings={playerListings}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
