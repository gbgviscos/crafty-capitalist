import React from 'react';

interface ProductsProps {
  products: Record<string, { amount: number, type: string }>;
}

const Products: React.FC<ProductsProps> = ({ products, onCraft }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">My Items</h2>
      <ul>
        {Object.entries(products).map(([product, productData], index) => (
          <li 
            key={product} 
            className={`flex justify-between items-center p-2 rounded-lg ${index % 2 ? 'bg-gray-100' : 'bg-white'}`}
          >
            <span className="font-medium flex-1">{product}:</span>
            <span className="w-16 text-center">{productData.amount}</span>

            {/* Only show the Craft button if the resource is NOT raw */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

