export const clearanceSectionIds = {
  "clearance-01": "hero",
  "clearance-02": "identity",
  "clearance-03": "capabilities",
  "clearance-04": "security",
  "clearance-05": "archive",
  "clearance-06": "infrastructure",
  "clearance-07": "search-performance",
  "clearance-08": "research",
  "clearance-09": "classified",
  "clearance-10": "contact",
} as const;

type ClearanceAlias = keyof typeof clearanceSectionIds;

const sectionClearanceAliases = Object.fromEntries(
  Object.entries(clearanceSectionIds).map(([alias, sectionId]) => [sectionId, alias])
) as Record<string, ClearanceAlias>;

export function normalizeHash(hash: string) {
  const value = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    return decodeURIComponent(value).trim().toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
}

export function resolveHomeHash(hash: string) {
  const normalized = normalizeHash(hash);

  if (!normalized) return null;

  return clearanceSectionIds[normalized as ClearanceAlias] ?? normalized;
}

export function getClearanceHash(sectionId: string) {
  const alias = sectionClearanceAliases[sectionId];
  return alias ? `#${alias}` : `#${sectionId}`;
}

export function buildPublicUrl(pathname: string, hash = "") {
  if (typeof window === "undefined") return `${pathname}${hash}`;
  return `${window.location.origin}${pathname}${hash}`;
}

export async function copyPublicText(value: string) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the DOM copy path.
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  input.style.top = "0";
  document.body.appendChild(input);
  input.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  input.remove();
  return copied;
}
