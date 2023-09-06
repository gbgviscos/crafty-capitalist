export const resources = {
  wood: {
    value: 2,
    complexity: 1,
    attributes: ['flexible', 'flammable'],
    rarity: 'common'
  },
  stone: {
    value: 3,
    complexity: 2,
    attributes: ['hard', 'durable'],
    rarity: 'common'
  },
  iron: {
    value: 5,
    complexity: 3,
    attributes: ['durable', 'malleable'],
    rarity: 'uncommon'
  },
  coal: {
    value: 4,
    complexity: 2,
    attributes: ['combustible'],
    rarity: 'uncommon'
  },
  gold: {
    value: 10,
    complexity: 2,
    attributes: ['ductile', 'non-corrosive'],
    rarity: 'rare'
  },
  silver: {
    value: 8,
    complexity: 2,
    attributes: ['ductile', 'conductive'],
    rarity: 'uncommon'
  },
  diamond: {
    value: 20,
    complexity: 5,
    attributes: ['hard', 'lustrous'],
    rarity: 'very rare'
  },
  emerald: {
    value: 15,
    complexity: 4,
    attributes: ['lustrous'],
    rarity: 'very rare'
  },
  copper: {
    value: 4,
    complexity: 2,
    attributes: ['ductile', 'conductive'],
    rarity: 'common'
  },
  tin: {
    value: 3,
    complexity: 1,
    attributes: ['malleable'],
    rarity: 'common'
  },
  obsidian: {
    value: 6,
    complexity: 3,
    attributes: ['sharp', 'glassy'],
    rarity: 'uncommon'
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
  // ... other item definitions ...
};
