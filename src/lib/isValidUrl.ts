export const normalizeUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed; // already has a protocol
  if (!trimmed.includes(".")) return trimmed; // doesn't look like a domain
  return `https://${trimmed}`;
};

// Validate URLs, throw errors if interface fails
export const isValidUrl = (value: string): boolean => {
  try {
    new URL(normalizeUrl(value));
    return true;
  } catch {
    return false;
  }
};
