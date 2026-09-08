export const normalizeUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed; // already has a protocol
  if (!trimmed.includes(".")) return trimmed; // doesn't look like a domain
  return `https://${trimmed}`;
};

const isValidHostname = (hostname: string): boolean =>
  /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))*$/i.test(hostname);

// Validate URLs, throw errors if interface fails
export const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(normalizeUrl(value));
    if (url.hostname && !isValidHostname(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
};
