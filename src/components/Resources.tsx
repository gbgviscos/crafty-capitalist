import React from 'react';

interface Resource {
  name: string;
  amount: number;
}

interface ResourcesProps {
  resources: Record<string, Resource>;
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl mb-2">Resources</h2>
      <ul>
        {Object.entries(resources).map(([resourceName, resource]) => (
          <li key={resourceName} className="flex justify-between mb-2">
            <span>{resource.name}:</span>
            <span>{resource.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
