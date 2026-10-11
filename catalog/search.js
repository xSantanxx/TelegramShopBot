import { mockProvider } from "./mock-provider.js";

/**
 * Minimal stub: one mock provider, cheapest-first.
 */
export async function searchCatalog({ query, size }) {
  const results = await mockProvider.search({ query, size });
  return [...results].sort((a, b) => a.price.amount - b.price.amount);
}
