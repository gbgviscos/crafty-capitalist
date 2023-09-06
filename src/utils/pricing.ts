export const basePrices = {
    'Stone Axe': 10,  // setting a base price for the stone axe
    'Wooden Spear': 8, // base price for wooden spear
    // ... other items ...
  };
  
  export const calculatePrice = (item: string, supply: number) => {
    // Here's a simple formula to alter the price based on supply.
    // You can adjust the constants to control price elasticity.
    return Math.round(basePrices[item] * (1.0 / (1 + 0.1 * supply)));
  };
  