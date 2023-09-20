export const resources = {
  "wood":{
    "name":"Wood",
    "value":2,
    "complexity":1,
    "attributes":[
       "flexible",
       "flammable",
       "plantable"
    ],
    "rarity":"common",
    "spawnLocations":[
       "forest",
       "grassland"
    ]
 },
 "stone":{
  "name":"Stone",
  "value":3,
  "complexity":2,
  "attributes":[
     "hard",
     "durable"
  ],
  "rarity":"common",
  "spawnLocations":[
     "mountain",
     "grassland",
     "forest"
  ]
},
"ironOre":{
  "name":"Iron Ore",
  "value":5,
  "complexity":3,
  "attributes":[
     "durable",
     "malleable"
  ],
  "rarity":"uncommon",
  "spawnLocations":[
     "mountain",
     "grassland"
  ]
},
"coal":{
  "name":"Coal",
  "value":4,
  "complexity":2,
  "attributes":[
     "combustible"
  ],
  "rarity":"uncommon",
  "spawnLocations":[
     "mountain",
     "forest"
  ]
},
"gold":{
  "name":"Gold",
  "value":10,
  "complexity":2,
  "attributes":[
     "ductile",
     "non-corrosive"
  ],
  "rarity":"rare",
  "spawnLocations":[
     "mountain"
  ]
},
"silver":{
  "name":"Silver",
  "value":8,
  "complexity":2,
  "attributes":[
     "ductile",
     "conductive"
  ],
  "rarity":"uncommon",
  "spawnLocations":[
     "mountain",
     "grassland"
  ]
},
"diamond":{
  "name":"Diamond",
  "value":20,
  "complexity":5,
  "attributes":[
     "hard",
     "lustrous"
  ],
  "rarity":"very rare",
  "spawnLocations":[
     "mountain"
  ]
},
"emerald":{
  "name":"Emerald",
  "value":15,
  "complexity":4,
  "attributes":[
     "lustrous"
  ],
  "rarity":"very rare",
  "spawnLocations":[
     "mountain",
     "wetland"
  ]
},
"copper":{
  "name":"Copper",
  "value":4,
  "complexity":2,
  "attributes":[
     "ductile",
     "conductive"
  ],
  "rarity":"common",
  "spawnLocations":[
     "mountain",
     "grassland"
  ]
},
"tin":{
  "name":"Tin",
  "value":3,
  "complexity":1,
  "attributes":[
     "malleable"
  ],
  "rarity":"common",
  "spawnLocations":[
     "mountain",
     "grassland"
  ]
},
"obsidian":{
  "name":"Obsidian",
  "value":6,
  "complexity":3,
  "attributes":[
     "sharp",
     "glassy"
  ],
  "rarity":"uncommon",
  "spawnLocations":[
     "mountain",
     "desert"
  ]
}
  // ... other resources ...
};


export let utilityItems = {
  "stone_axe":{
    "name":"Stone Axe",
    "resources":{
       "wood":1,
       "stone":2
    },
    "type":"tool",
    "value":5,
    "complexity":3,
    "productionSpeed":10000,
    "attributes":[
       "blunt",
       "durable"
    ],
    "requirements":[     
    ],
    "enhancements":{
       "type":[
          "extraction"
       ],
       "productivityIncrease":0.1,
       "consumed":"false"
    }
 },
  'ironbar': {
    'name': "Iron Bar",
    'resources': {
      'ironOre': 2, 
      'coal': 1,
    },
    'type': "material",
    'value': 14,
    'complexity': 3,
    'productionSpeed': 8000,
    'attributes': [],
    'requirements': ['smelting'],
    'enhancements': {
      'type': [],
      'productivityIncrease': 0,
      'consumed': true
    },
  },
  'wrench': {
    'name': "Wrench",
    'resources': {
      'wood': 2,
      'iron': 3
    },
    'type': 'tool',
    'value': 5,
    'complexity': 2,
    'productionSpeed': 8000,
    'attributes': ['adjustable', 'grip'],
    'requirements': ['Workbench'],
    'enhancements': {
      'type': ['repair', 'construction'],
      'productivityIncrease': 0.15,
      'consumed': true
    }
  },
  'hammer': { 
    'name': "Hammer",
    'resources': { 
      'wood': 2, 
      'iron': 1 
    }, 
    'type': 'tool', 
    'value': 2, 
    'attributes': ['hammering'], 
    'requirements': [], 
    'enhancements': { 
      'type': ['production'], 
      'productivityIncrease': 0.1, 
      'consumed': false } 
    },
  'furnace': {
    'name': "Furnace",
    'resources': {
      'stone': 10,
      'wood': 5
    },
    'type': "machine",
    'value': 15,
    'complexity': 5,
    'productionSpeed': 15000,
    'attributes': ["smelting"],
    'enhancements': {
      'type': ["workshop", "production"],
      'productivityIncrease': 0.15,
      'consumed': true
    },
  },
  'wooden_spear': {
    'name': "Wooden Spear",
    'resources': {
      'wood': 3
    },
    'type': "weapon",
    'value': 4,
    'complexity': 2,
    'productionSpeed': 8000,
    'attributes': ["pointy"],
    'requirements': [],
    'enhancements': {
      'type': ["extraction",],
      'productivityIncrease': 0.15,
      'consumed': true
    }
  },

}

export const objectStructure = {
  'hammer': { 
    'name': "Hammer",
    'resources': { 
      'wood': 2, 
      'iron': 1 
    }, 
    'type': 'tool', 
    'value': 2, 
    'attributes': ['hammering'], 
    'requirements': [], 
    'enhancements': { 
      'type': ['production'], 
      'productivityIncrease': 0.1, 
      'consumed': false } 
    },
}

export const updateUtilityItems = (newItems) => {
  console.log("Utilites!")
  console.log(newItems)
  utilityItems = newItems;
};