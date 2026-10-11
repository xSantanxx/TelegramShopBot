/**
 * Minimal stub: turn listings into a plain Telegram message.
 */
export function formatSearchResults(results) {
  // if (!Array.isArray(results) || results.length === 0) {
  //   return "No matching offers found.";
  // }

  return results
    .map((item, index) => {
      const price = item.price
        ? `${item.price.currency} ${item.price.amount}`
        : "price n/a";
      const sizes = item.sizes?.length ? `sizes: ${item.sizes.join(", ")}` : "";
      return [
        `${index + 1}. ${item.title}`,
        `   ${item.retailer} — ${price}`,
        sizes ? `   ${sizes}` : null,
        `   ${item.url}`
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}
