import React, { createContext, useContext, useState } from 'react';

const FactoriesContext = createContext();

export const useFactories = () => {
  return useContext(FactoriesContext);
};

export const FactoriesProvider = ({ children }) => {
  const [factories, setFactories] = useState([]);
  const [resources, setResources] = useState({
    wood: { amount: 0, type: 'raw' },
    stone: { amount: 0, type: 'raw' },
    gold: { amount: 0, type: 'raw' },
    land: { amount: 2, type: 'land'}
  });

  const handleGatherResource = (resource) => {
    setResources(prevResources => {
      if (!prevResources[resource]) {
          console.error(`Resource "${resource}" not found.`);
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
    <FactoriesContext.Provider value={{ factories, setFactories, resources, setResources, gatherResource: handleGatherResource }}>
      {children}
    </FactoriesContext.Provider>
  );
};
