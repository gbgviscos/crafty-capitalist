import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const FactoriesContext = createContext();

export const useFactories = () => {
  return useContext(FactoriesContext);
};

export const FactoriesProvider = ({ children }) => {
  const [factories, setFactories] = useState([]);
  const [land, setLand] = useState([]);
  const [items, setItems] = useState({});
  const [resources, setResources] = useState({
    wood: { name: "Wood", amount: 150,},
    stone: { name: "Stone", amount: 150,},
    gold: { name: "Gold", amount: 0,},
    currency: {name: "Money", amount: 1450}
  });
  const oak='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'

  const handleGatherResource = (resource) => {
    setResources(prevResources => {
      if (!prevResources[resource]) {
          toast.error(`Resource "${resource}" not found.`);
          return prevResources; // No changes
      }

      const updatedResource = {
          ...prevResources[resource],
          amount: prevResources[resource].amount + 1,
          name: prevResources[resource].name
      };

      return { ...prevResources, [resource]: updatedResource };
    });
  };

  const assignToolToBuilding = (buildingId, toolName) => {
    // Find the building with the provided ID and update it
    const updatedFactories = factories.map((building) => {
      if (building.id === buildingId) {
        // Check if toolName already exists in the upgrades
        if (building.upgrades.includes(toolName)) {
          toast.error(`Tool ${toolName} is already assigned to this building.`);
          return building; // return the original building without modifying
        }
  
        const tool = items[toolName];
        if (!tool || !tool.enhancements) {
          toast.error(`Tool ${toolName} is not recognized or doesn't have enhancements.`);
          return building;
        }
  
        const productivityIncrease = tool.enhancements.productivityIncrease || 0;
        const abilities = tool.attributes;
        // Join the tool attributes into a comma-separated string
        const joinedAbilities = abilities.join(', ');
  
        // Update the upgrades property by adding the toolName
        const updatedBuilding = { ...building, abilities: building.abilities || [] };
        updatedBuilding.upgrades.push(toolName);
        updatedBuilding.abilities.push(joinedAbilities); // Push the joined attributes
        console.log(joinedAbilities)
        // Update the productionRate of the building based on the tool's productivityIncrease
        updatedBuilding.productionRate *= (1 + productivityIncrease);
        return updatedBuilding;
      }
      return building;
    });
  
    // Update the factories state with the modified buildings
    setFactories(updatedFactories);
  };
  



  return (
    <FactoriesContext.Provider
      value={{
        items,
        setItems,
        land,
        setLand,
        factories,
        setFactories,
        resources,
        setResources,
        gatherResource: handleGatherResource,
        assignToolToBuilding, // Add the function to the context value
        oak
      }}
    >
      {children}
    </FactoriesContext.Provider>
  );
};
