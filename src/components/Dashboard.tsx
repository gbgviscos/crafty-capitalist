import React from 'react';
import { useFactories } from '@/contexts/FactoriesContext';

type DashboardProps = {
  resources: {
    wood: number;
    stone: number;
    iron: number;
    coal: number;
    gold: number;
  };
  products: { [key: string]: number };
};

const Dashboard: React.FC<DashboardProps> = ({ resources, products }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Crafty Capitalist Dashboard</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Resources:</h2>
        <ul>
          {Object.entries(resources).map(([resource, count]) => (
            <li key={resource} className="flex justify-between">
              <span>{resource.charAt(0).toUpperCase() + resource.slice(1)}:</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold">Products:</h2>
        <ul>
          {Object.entries(products).map(([product, count]) => (
            <li key={product} className="flex justify-between">
              <span>{product}:</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
