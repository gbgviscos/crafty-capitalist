export const resources = {
  wood: {
    value: 2,
    complexity: 1,
    attributes: ['flexible', 'flammable'],
    rarity: 'common',
    spawnLocations: ['forest', 'grassland']
  },
  stone: {
    value: 3,
    complexity: 2,
    attributes: ['hard', 'durable'],
    rarity: 'common',
    spawnLocations: ['mountain', 'grassland']
  },
  iron: {
    value: 5,
    complexity: 3,
    attributes: ['durable', 'malleable'],
    rarity: 'uncommon',
    spawnLocations: ['mountain', 'grassland']
  },
  coal: {
    value: 4,
    complexity: 2,
    attributes: ['combustible'],
    rarity: 'uncommon',
    spawnLocations: ['mountain', 'forest']
  },
  gold: {
    value: 10,
    complexity: 2,
    attributes: ['ductile', 'non-corrosive'],
    rarity: 'rare',
    spawnLocations: ['mountain']
  },
  silver: {
    value: 8,
    complexity: 2,
    attributes: ['ductile', 'conductive'],
    rarity: 'uncommon',
    spawnLocations: ['mountain', 'grassland']
  },
  diamond: {
    value: 20,
    complexity: 5,
    attributes: ['hard', 'lustrous'],
    rarity: 'very rare',
    spawnLocations: ['mountain']
  },
  emerald: {
    value: 15,
    complexity: 4,
    attributes: ['lustrous'],
    rarity: 'very rare',
    spawnLocations: ['mountain', 'wetland']
  },
  copper: {
    value: 4,
    complexity: 2,
    attributes: ['ductile', 'conductive'],
    rarity: 'common',
    spawnLocations: ['mountain', 'grassland']
  },
  tin: {
    value: 3,
    complexity: 1,
    attributes: ['malleable'],
    rarity: 'common',
    spawnLocations: ['mountain', 'grassland']
  },
  obsidian: {
    value: 6,
    complexity: 3,
    attributes: ['sharp', 'glassy'],
    rarity: 'uncommon',
    spawnLocations: ['mountain', 'desert']
  }
  // ... other resources ...
};


export const items = {
  'Stone axe': {
      resources: {
          wood: 1,
          stone: 2
      },
      type: "tool",
      value: 5,
      complexity: 3,
      productionSpeed: 10000,  // assuming it takes 1000ms (1 second) to produce
      attributes: ["blunt", "durable"],
      enhancements: {
          type: "lumberyard",
          productivityIncrease: 0.1,  // 10% increase in productivity
          consumed: false              // not consumed during production
      }
  },
  'Wooden spear': {
      resources: {
          wood: 3
      },
      type: "weapon",
      value: 4,
      complexity: 2,
      productionSpeed: 8000,  // assuming it takes 800ms to produce
      attributes: ["pointy"],
      enhancements: {
          type: "hunting lodge",   // assuming spears enhance a hunting lodge
          productivityIncrease: 0.15,  // 15% increase in productivity
          consumed: true                // consumed during production/hunting
      }
  },
  'Cart': {
    resources: {
        wood: 4,
        iron: 2,
        wheels: 4, // Assuming you need wheels
    },
    type: "vehicle", // Categorized as a vehicle
    value: 12, // Value in your game's currency
    complexity: 6, // Represents the complexity of making a cart
    capacity: 500, // The maximum load capacity of the cart in kilograms or your game's equivalent
    attributes: ["durable", "transport"],
    enhancements: {
        type: "reinforcement", // An enhancement related to vehicle reinforcement
        durabilityIncrease: 0.2, // 20% increase in durability
        speedIncrease: 0.1, // 10% increase in movement speed when pulled
        consumed: false // Not consumed during production
    }
},
  // ... other item definitions ...
};
