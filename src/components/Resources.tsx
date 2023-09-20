import React from 'react';

interface ResourcesProps {
  resources: Record<string, number>;
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl mb-2">Resources</h2>
      <ul>
        {Object.entries(resources).map(([resource, count]) => (
          <li key={resource} className="flex justify-between mb-2">
            <span>{resource.name}:</span>
            <span>{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
