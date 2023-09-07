import React, { useState, useEffect } from 'react';
import { items, resources } from '../utils/items';

const ItemProduction: React.FC = () => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemResources, setNewItemResources] = useState({
    wood: 0,
    stone: 0,
    iron: 0,
    coal: 0,
    gold: 0,
  });
  const [complexity, setComplexity] = useState(1);
  const [productionSpeed, setProductionSpeed] = useState(5000);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    let totalComplexity = 0;
    let attributesSet = new Set();

    for (let resource in newItemResources) {
      if (newItemResources[resource] > 0) {
        totalComplexity += resources[resource].complexity * newItemResources[resource];
        resources[resource].attributes.forEach(attr => attributesSet.add(attr));
      }
    }

    setComplexity(totalComplexity);
    setProductionSpeed(5000 + (totalComplexity * 500));
    setAttributes(Array.from(attributesSet));
  }, [newItemResources]);

  const handleAddItem = () => {
    if (newItemName.trim() === '') return;

    // Only include resources with values greater than zero
    const filteredResources = Object.entries(newItemResources)
      .filter(([_, value]) => value > 0)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    items[newItemName] = {
      resources: filteredResources,
      type: "crafted",
      value: complexity,  // For simplicity, using complexity as value here
      complexity,
      attributes,
      productionSpeed
    };

    setNewItemName('');
    setNewItemResources({
      wood: 0,
      stone: 0,
      iron: 0,
      coal: 0,
      gold: 0,
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Item Management</h2>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Add New Item</h3>

        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
          className="p-1 mb-2 border"
        />

        <div className="grid grid-cols-2 gap-2 mb-2">
          {Object.keys(newItemResources).map((resource) => (
            <div key={resource}>
              <label className="mr-2">{resource}:</label>
              <input
                type="number"
                min="0"
                value={newItemResources[resource]}
                onChange={(e) =>
                  setNewItemResources({
                    ...newItemResources,
                    [resource]: parseInt(e.target.value),
                  })
                }
                className="p-1 border"
              />
            </div>
          ))}
        </div>

        <div className="mb-2">
          <strong>Calculated Complexity:</strong> {complexity}
        </div>
        <div className="mb-2">
          <strong>Calculated Production Speed (ms):</strong> {productionSpeed}
        </div>
        <div className="mb-2">
          <strong>Attributes:</strong> {attributes.join(', ')}
        </div>

        <button onClick={handleAddItem} className="p-2 bg-blue-500 text-white rounded">Add Item</button>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Existing Recipes</h3>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Item</th>
              {Object.keys(newItemResources).map(resource => (
                <th key={resource} className="border p-2">{resource}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(items).map(item => (
              <tr key={item}>
                <td className="border p-2">{item}</td>
                {Object.keys(newItemResources).map(resource => (
                  <td key={resource} className="border p-2">{items[item].resources[resource] || 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemProduction;
