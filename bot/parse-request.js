/**
 * Minimal stub: strip a leading /find and optional "size N".
 * Replace with real parsing when you build Milestone 1.
 */
export function parseSearchRequest(text) {
  const trimmed = String(text ?? "").trim();
  const withoutCommand = trimmed.replace(/^\/find(?:@\w+)?\s*/i, "").trim();
  let size;
  let query = withoutCommand;
  const sizeMatch = withoutCommand.match(/\bsize\s+(\S+)\s*$/i);
  if (sizeMatch) {
    size = sizeMatch[1];
    query = withoutCommand.slice(0, sizeMatch.index).trim();
  }

  return { query: query || withoutCommand || trimmed, size };
}
