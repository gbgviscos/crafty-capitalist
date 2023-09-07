import { useEffect, useRef } from 'react';
import { useFactories } from '../contexts/FactoriesContext';
import { items } from '@/utils/items';

const FactoryProductionManager: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { factories, setFactories, resources, setResources, land, setLand } = useFactories();

  const factoriesRef = useRef(factories);
  const resourcesRef = useRef(resources);
  const landRef = useRef(land);

  useEffect(() => {
    factoriesRef.current = factories;
    resourcesRef.current = resources;
    landRef.current = land;
  }, [factories, resources, land]);

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
    const recipeRequirements = items[recipeName].resources;
    for (let resource in recipeRequirements) {
      if (!resourcesRef.current[resource] || resourcesRef.current[resource].amount < recipeRequirements[resource]) {
        return false;
      }
    }
    let updatedResources = { ...currentResources };
    for (let resource in recipeRequirements) {
      updatedResources[resource].amount -= recipeRequirements[resource];
    }
    return updatedResources;
  };

  const deductResourcesFromLandPlot = (location, resourceType) => {

    const landPlotIndex = landRef.current.findIndex(plot => {
        return plot.name === location;
    });

    if (landPlotIndex === -1 || !landRef.current[landPlotIndex].resources[resourceType] || landRef.current[landPlotIndex].resources[resourceType] <= 0) {
      return false;
    }
    landRef.current[landPlotIndex].resources[resourceType]--;
    return true;
};



  const handleProduction = () => {
    let updatedLand = [...landRef.current];

    const newFactories = factoriesRef.current.map(factory => {
      if (factory.type === 'production') {
        if (!factory.recipe || !hasRequiredResources(factory.recipe)) {
          return factory;
        }
        let updatedResources = deductResourcesForRecipe(factory.recipe, resourcesRef.current);
        if (!updatedResources[factory.recipe]) {
          updatedResources[factory.recipe] = {
            amount: 0,
            type: items[factory.recipe].type
          };
        }
        updatedResources[factory.recipe].amount += factory.productionRate;
        resourcesRef.current = updatedResources;
        return { ...factory, lastProduced: Date.now() };
      } else if (factory.type === 'extraction') {
        if (deductResourcesFromLandPlot(factory.location, factory.recipe)) {
          if (!resourcesRef.current[factory.recipe]) {
            resourcesRef.current[factory.recipe] = {
              amount: 0,
              type: items[factory.recipe]?.type || 'unknown'
            };
          }
          resourcesRef.current[factory.recipe].amount += factory.productionRate;
          return { ...factory, lastProduced: Date.now() };
        }
      }
      return factory;
    });

    setLand(updatedLand);
    setResources(resourcesRef.current);
    setFactories(newFactories);
  };

  useEffect(() => {
    const productionInterval = setInterval(() => {
      handleProduction();
    }, 1000);

    return () => {
      clearInterval(productionInterval);
    };
  }, []);

  return <>{children}</>;
};

export default FactoryProductionManager;
