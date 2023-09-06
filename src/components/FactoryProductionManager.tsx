import { useEffect, useRef } from 'react';
import { useFactories } from '../contexts/FactoriesContext';
import { items } from '@/utils/items';

const FactoryProductionManager: React.FC = ({ children }) => {
  const { factories, setFactories, resources, setResources } = useFactories();

  const factoriesRef = useRef(factories);
  const resourcesRef = useRef(resources);

  useEffect(() => {
    factoriesRef.current = factories;
    resourcesRef.current = resources;
  }, [factories, resources]);

  const hasRequiredResources = (recipeName) => {
    const recipeRequirements = items[recipeName].resources;
    for (let resource in recipeRequirements) {
      if (!resourcesRef.current[resource] || resourcesRef.current[resource].amount < recipeRequirements[resource]) {
        return false;
      }
    }
    return true;
  };

  const deductResourcesForRecipe = (recipeName, currentResources) => {
    const recipeRequirements = items[recipeName].resources;  // Adjusted this line
    for (let resource in recipeRequirements) {
      if (!resourcesRef.current[resource] || resourcesRef.current[resource].amount < recipeRequirements[resource]) {
        return false;
      }
   }
   if (!items[recipeName]) {
    console.error(`Error: Recipe "${recipeName}" does not exist in the items list.`);
    return;
}
    let updatedResources = { ...currentResources };
    for (let resource in recipeRequirements) {
      updatedResources[resource].amount -= recipeRequirements[resource];
    }
    return updatedResources;
  };

  const handleProduction = () => {
    const currentTime = Date.now();
    let updatedResources = { ...resourcesRef.current };

    const newFactories = factoriesRef.current.map(factory => {
      if (!factory.recipe || !hasRequiredResources(factory.recipe)) {
        console.log("factory does not have required items")
        return factory;
      }

      // Check if the factory can produce the item based on the item's production speed
      if (currentTime - factory.lastProduced >= items[factory.recipe].productionSpeed) {
        updatedResources = deductResourcesForRecipe(factory.recipe, updatedResources);

        if (!updatedResources[factory.recipe]) {
          updatedResources[factory.recipe] = {
            amount: 0,
            type: items[factory.recipe].type
          };
        }
        
        updatedResources[factory.recipe].amount += factory.productionRate;

        return { ...factory, lastProduced: currentTime };
      }

      return factory;
    });

    setResources(updatedResources);
    setFactories(newFactories);
  };

  useEffect(() => {
    const productionInterval = setInterval(() => {
      handleProduction();
    }, 1000);

    return () => {
      clearInterval(productionInterval);
    };
  }, []);  // Empty dependency array ensures the effect runs once when the component mounts

  return <>{children}</>;
};

export default FactoryProductionManager;