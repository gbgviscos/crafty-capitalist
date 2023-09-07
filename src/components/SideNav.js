export default function SideNav({ activeTab, setActiveTab }) {
    return (
      <div className="bg-gray-200 h-screen fixed top-0 left-0 p-4 w-64">
        <ul>
          <li className={`mb-2 ${activeTab === 'BuyLand' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('BuyLand')}>
            Buy Land
          </li>
          <li className={`mb-2 ${activeTab === 'factory' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('factory')}>
            Factory
          </li>
          <li className={`mb-2 ${activeTab === 'itemProduction' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('itemProduction')}>
            Create Items
          </li>
          <li className={`mb-2 ${activeTab === 'npcBuyers' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('npcBuyers')}>
            NPC Buyers
          </li>
          <li className={`mb-2 ${activeTab === 'marketplace' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('marketplace')}>
            Marketplace
          </li>
          {/* You can continue to add more navigation items here as needed */}
        </ul>
      </div>
    );
  }
  