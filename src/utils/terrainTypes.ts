export const terrainTypes = {
    forest: {
      description: "Dense woods with an abundance of flora.",
      resourcesAvailable: ['wood', 'coal']
    },
    grassland: {
      description: "Open fields with tall grasses and few trees.",
      resourcesAvailable: ['wood', 'stone', 'iron', 'silver', 'copper', 'tin']
    },
    mountain: {
      description: "Elevated land with rocky surfaces and cliffs.",
      resourcesAvailable: ['stone', 'iron', 'coal', 'gold', 'silver', 'diamond', 'emerald', 'copper', 'tin', 'obsidian']
    },
    wetland: {
      description: "Marshy land with a lot of water bodies.",
      resourcesAvailable: ['emerald']
    },
    desert: {
      description: "Arid region with sparse vegetation.",
      resourcesAvailable: ['obsidian']
    }
    // ... other terrains ...
  };
  
  export default terrainTypes;
  