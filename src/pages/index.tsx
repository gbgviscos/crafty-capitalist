import React, { useState, useEffect } from 'react';
import ItemProduction from '../components/ItemProduction'

import BuyLand from '@/components/land/BuyLand';
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
import OwnedLand from '@/components/land/OwnedLand';

const HomePage: React.FC = () => {
  const [npcListings, setNpcListings] = useState({});
  const [playerListings, setPlayerListings] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = React.useState('factory');
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

  return (
    <div className="flex">
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container ml-64 px-4 w-full">
        <Navbar resources={resources} />

        {activeTab === 'BuyLand' && (
          <>
            <BuyLand />
          </>
        )}

        {activeTab === 'factory' && (
          <>
            <ResourceGathering />
            <Products products={resources} />
            <FactoryManagement />
            <OwnedLand />
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
            initialNpcListings={npcListings}
            initialPlayerListings={playerListings}
            initialResources={resources}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
