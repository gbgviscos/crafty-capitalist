export const terrainTypes = {
  forest: {
    description: "Dense woods with an abundance of flora.",
    resourcesAvailable: ['Wood', 'Coal'],
    cost: {
      resources: {
        curreny: 400,
      },
    },
  },
  grassland: {
    description: "Open fields with tall grasses and few trees.",
    resourcesAvailable: ['Wood', 'Stone', 'Iron', 'Silver', 'Copper', 'Tin'],
    cost: {
      resources: {
        curreny: 400,
      },
    },
  },
  mountain: {
    description: "Elevated land with rocky surfaces and cliffs.",
    resourcesAvailable: ['stone', 'iron', 'coal', 'gold', 'silver', 'diamond', 'emerald', 'copper', 'tin', 'obsidian'],
    cost: {
      resources: {
        curreny: 400,
      },
    },
  },
  wetland: {
    description: "Marshy land with a lot of water bodies.",
    resourcesAvailable: ['emerald'],
    cost: {
      resources: {
        curreny: 400,
      },
    },
  },
  desert: {
    description: "Arid region with sparse vegetation.",
    resourcesAvailable: ['obsidian'],
    cost: {
      resources: {
        curreny: 400,
      },
    },
    // ... other terrains ...
  },
}

export default terrainTypes;
