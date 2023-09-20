import React, { useState, useEffect } from 'react';
import ItemProduction from '../components/ItemProduction'
import BuyLand from '@/components/land/BuyLand';
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import ResourceGathering from '@/components/ResourceGathering';
import FactoryManagement from '@/components/FactoryManagement';
import Marketplace from '@/components/Marketplace';
import Products from '@/components/Products';
import NPCBuyers from '@/components/NPCBuyers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFactories } from '@/contexts/FactoriesContext';
import OwnedLand from '@/components/land/OwnedLand';
import { updateUtilityItems } from '@/utils/items';

const HomePage: React.FC = () => {
  const [npcListings, setNpcListings] = useState({});
  const [playerListings, setPlayerListings] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = React.useState('factory');
  const { items, setItems, factories, setFactories, resources, setResources } = useFactories();
  // const [items, setItems] = useState(["empty"]);

  useEffect(() => {
    fetch('/api/getItems') // This will route to your API route
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        updateUtilityItems(data); // Call updateUtilityItems with fetched data
        console.log(data); // Log the fetched data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);



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
