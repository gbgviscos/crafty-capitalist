
export default (req, res) => {
    res.status(200).json({
      factories: [],  // Your initial factories data
      resources: {
        wood: { amount: 10, type: 'raw' },
        stone: { amount: 0, type: 'raw' },
        gold: { amount: 0, type: 'raw' },
        land: { amount: 2, type: 'land' },
        currency: {amount: 100}
      }  // Your initial resources data
    });
  }