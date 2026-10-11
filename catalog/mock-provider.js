const MOCK_LISTINGS = [
  {
    id: "mock-af1-07",
    retailer: "Nike",
    title: "Nike Air Force 1 '07 Men's Shoes",
    price: { amount: 115, currency: "USD" },
    sizes: ["8", "9", "10", "11"],
    url: "https://www.nike.com/t/air-force-1-07-mens-shoes"
  },
  {
    id: "mock-af1-low",
    retailer: "Nike",
    title: "Nike Air Force 1 Low Retro",
    price: { amount: 140, currency: "USD" },
    sizes: ["9", "10", "12"],
    url: "https://www.nike.com/t/air-force-1-low-retro"
  },
  {
    id: "mock-dunk-low",
    retailer: "Nike",
    title: "Nike Dunk Low Retro Men's Shoes",
    price: { amount: 115, currency: "USD" },
    sizes: ["8", "9", "10"],
    url: "https://www.nike.com/t/dunk-low-retro-mens-shoes"
  }
];

/**
 * Temporary deterministic catalog so Telegram wiring can be tested offline.
 */
export const mockProvider = {
  name: "mock",
  async search({ query, size }) {
    const q = String(query ?? "").toLowerCase();
    return MOCK_LISTINGS.filter((item) => {
      const titleHit = !q || item.title.toLowerCase().includes(q) || q.split(/\s+/).every((part) =>
        item.title.toLowerCase().includes(part)
      );
      const sizeHit = !size || item.sizes.includes(String(size));
      return titleHit && sizeHit;
    });
  }
};
