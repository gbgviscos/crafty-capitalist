export default function Navbar({ resources, currency }) {
  return (
    <div className="bg-gray-200 h-16 flex justify-between items-center px-4">
      <h1 className="text-lg font-bold">Crafty Capitalist</h1>
      <div className="mt-2">
        {Object.entries(resources).map(([key, resourceData]) => (
          <span key={key} className="mr-4">
            {key}: {resourceData.amount}
          </span>
        ))}
        <span>Currency: {currency}</span>
      </div>
    </div>
  );
}
