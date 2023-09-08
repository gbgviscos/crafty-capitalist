import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const FactoriesContext = createContext();

export const useFactories = () => {
  return useContext(FactoriesContext);
};

export const FactoriesProvider = ({ children }) => {
  const [factories, setFactories] = useState([]);
  const [land, setLand] = useState([]);
  const [resources, setResources] = useState({
    wood: { amount: 50, type: 'raw' },
    stone: { amount: 50, type: 'raw' },
    gold: { amount: 0, type: 'raw' },
    currency: {amount: 450}
  });

  const handleGatherResource = (resource) => {
    setResources(prevResources => {
      if (!prevResources[resource]) {
          toast.error(`Resource "${resource}" not found.`);
          return prevResources; // No changes
      }

      const updatedResource = {
          ...prevResources[resource],
          amount: prevResources[resource].amount + 1
      };

      return { ...prevResources, [resource]: updatedResource };
    });
  };

  return (
    <FactoriesContext.Provider value={{ land, setLand, factories, setFactories, resources, setResources, gatherResource: handleGatherResource }}>
      {children}
    </FactoriesContext.Provider>
  );
};
