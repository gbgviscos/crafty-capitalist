import { useEffect, useRef } from 'react';
import { useFactories } from '../contexts/FactoriesContext';
import { utilityItems, resources as rs} from '@/utils/items';

const FactoryProductionManager: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { factories, setFactories, resources, setResources, land, setLand} = useFactories();

  const factoriesRef = useRef(factories);
  const resourcesRef = useRef(resources);
  const landRef = useRef(land);

  useEffect(() => {
    factoriesRef.current = factories;
    resourcesRef.current = resources;
    landRef.current = land;
    // console.log(items)
  }, [factories, resources, land]);

  const hasRequiredResources = (recipeName) => {
    // console.log(recipeName)
    
    const recipeRequirements = utilityItems && utilityItems[recipeName] ? utilityItems[recipeName].resources : null;
    for (let resource in recipeRequirements) {
      if (!resourcesRef.current[resource] || resourcesRef.current[resource].amount < recipeRequirements[resource]) {
        return false;
      }
    }
    return true;
  };

  const deductResourcesForRecipe = (recipeName, currentResources) => {
    const recipeRequirements = utilityItems && utilityItems[recipeName] ? utilityItems[recipeName].resources : null;
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

  const addResourcesToLandPlot = (location, resourceType, additionAmount = 1) => {
    const landPlotIndex = landRef.current.findIndex(plot => plot.name === location);

    if (landPlotIndex === -1) return false;

    if (!landRef.current[landPlotIndex].resources[resourceType]) {
      landRef.current[landPlotIndex].resources[resourceType] = 0;
    }

    landRef.current[landPlotIndex].resources[resourceType] += additionAmount;
    return true;
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
    // console.log("HandleProdcution!")
    // console.log(utilityItems)
    let updatedLand = [...landRef.current];

    const newFactories = factoriesRef.current.map(factory => {
      // If the recipe is 'none', return the factory without any production
      if (!factory.recipe || factory.recipe === 'none' || factory.recipe === 'null') {
        return factory;
      }


      if (factory.type === 'production') {
        if (!hasRequiredResources(factory.recipe)) {
          return factory;
        }
        const recipeProductionSpeed = 0;
        let productionTime = factory.productionRate * recipeProductionSpeed;
        let updatedResources = deductResourcesForRecipe(factory.recipe, resourcesRef.current);
        if (!updatedResources[factory.recipe]) {
          console.log(utilityItems)
          updatedResources[factory.recipe] = {
            amount: 0,
            name: utilityItems[factory.recipe].name,
            type: utilityItems[factory.recipe].type
          };
        }
        updatedResources[factory.recipe].amount += factory.productionRate;
        resourcesRef.current = updatedResources;
        factory.productionTime = productionTime;
        return { ...factory, lastProduced: Date.now() };
      } else if (factory.type === 'extraction') {
        // Check if the factory has upgrades (tools)
        if (factory.upgrades && factory.upgrades.length > 0) {
          factory.upgrades.forEach(upgrade => {
            // Find the tool in items
            const tool = utilityItems[upgrade];
            if (
              tool &&
              tool.type === 'tool' &&
              tool.enhancements.type.includes(factory.type)
            ) {
              // Apply productivity increase for each tool
              if (deductResourcesFromLandPlot(factory.location, factory.recipe)) {
                if (!resourcesRef.current[factory.recipe]) {
                  resourcesRef.current[factory.recipe] = {
                    amount: 0,
                    type: rs[factory.recipe]?.type,
                    name: rs[factory.recipe]?.name
                  };
                }
                // Apply the productivity increase to the production time
                factory.productionTime /= tool.enhancements.productivityIncrease;
              }
            }
          });
        }

        // Proceed with default extraction logic (without upgrades)
        if (deductResourcesFromLandPlot(factory.location, factory.recipe)) {
          if (!resourcesRef.current[factory.recipe]) {
            resourcesRef.current[factory.recipe] = {
              amount: 0,
              name: rs[factory.recipe]?.name || utilityItems[factory.recipe],
              type: rs[factory.recipe]?.type || 'unknown',
            };
          }
          resourcesRef.current[factory.recipe].amount += factory.productionRate;
        }

        return { ...factory, lastProduced: Date.now() };
      }
      else if (factory.type === 'farm') {
        const landPlot = landRef.current.find(plot => plot.name === factory.location);
        if (!landPlot) return factory;

        const fertilityRate = landPlot.fertility; // You might want to re-evaluate this logic. If fertility is 50, then factory.productionRate + 50 might not be what you want.
        const productionAmount = factory.productionRate + fertilityRate;

        addResourcesToLandPlot(factory.location, factory.recipe, productionAmount);

        if (!resourcesRef.current[factory.recipe]) {
          resourcesRef.current[factory.recipe] = {
            amount: 0,
            name: rs[factory.recipe]?.name || utilityItems[factory.recipe].name,
            type: rs[factory.recipe]?.type || utilityItems[factory.recipe].type
          };
        }
        // resourcesRef.current[factory.recipe].amount += productionAmount;
        return { ...factory, lastProduced: Date.now() };
      }
      return factory;
    });

    setLand(updatedLand);
    setResources(resourcesRef.current);
    setFactories(newFactories);
  };

  useEffect(() => {
    // Delay the first run of handleProduction by 2000 milliseconds (2 seconds)
    const initialDelay = 2000;
  
    // Start the interval after the initial delay
    const productionInterval = setInterval(() => {
      handleProduction();
    }, 1000);
  
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(productionInterval);
    };
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs only once

  return <>{children}</>;
};

export default FactoryProductionManager;
