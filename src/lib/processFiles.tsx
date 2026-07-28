export interface IGUser {
  username: string;
  href: string;
}

export interface ProcessResult {
  followingCount: number;
  followersCount: number;
  notFollowingBack: IGUser[];
}

function normalizeUsername(username: string): string {
  return username.toLowerCase().replace(/[._-]/g, "");
}

function isDeletedAccount(username: string): boolean {
  return username.startsWith("__deleted__");
}

function extractUsernameFromHref(href: string): string | null {
  if (!href || typeof href !== "string") return null;

  let clean = href.replace(/^https?:\/\/(www\.)?instagram\.com\//, "");
  clean = clean.replace(/^_u\//, "");
  clean = clean.replace(/\/$/, "");
  clean = clean.split("/")[0];
  clean = clean.split("?")[0];

  return clean || null;
}

function extractUsernamesFromEntries(entries: { value?: string; href?: string }[]): string[] {
  const usernames: string[] = [];
  for (const entry of entries) {
    const extracted = entry.value || extractUsernameFromHref(entry.href || "");
    if (extracted) usernames.push(extracted);
  }
  return usernames;
}

function buildNormalizedSet(usernames: string[]): Set<string> {
  const normalized = new Set<string>();
  for (const username of usernames) {
    if (!isDeletedAccount(username)) {
      normalized.add(normalizeUsername(username));
    }
  }
  return normalized;
}

function extractFromFollowerArray(data: unknown[]): string[] {
  const usernames: string[] = [];
  for (const item of data) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (Array.isArray(record.string_list_data)) {
      const entries = record.string_list_data as { value?: string; href?: string }[];
      for (const entry of entries) {
        const extracted = entry.value || extractUsernameFromHref(entry.href || "");
        if (extracted) {
          usernames.push(extracted);
          break;
        }
      }
    }
  }
  return usernames;
}

function extractFollowerUsernames(data: unknown): Set<string> {
  if (Array.isArray(data)) {
    const usernames = extractFromFollowerArray(data);
    if (usernames.length > 0) return buildNormalizedSet(usernames);
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.string_list_data)) {
      const entries = record.string_list_data as { value?: string; href?: string }[];
      const usernames = extractUsernamesFromEntries(entries);
      if (usernames.length > 0) return buildNormalizedSet(usernames);
    }
  }

  const deepScan = (obj: unknown, depth: number): { value?: string; href?: string }[] => {
    if (depth > 20) return [];
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = deepScan(item, depth + 1);
        if (result.length > 0) return result;
      }
    } else if (obj && typeof obj === "object") {
      const record = obj as Record<string, unknown>;
      if (Array.isArray(record.string_list_data)) {
        return record.string_list_data as { value?: string; href?: string }[];
      }
      for (const val of Object.values(record)) {
        const result = deepScan(val, depth + 1);
        if (result.length > 0) return result;
      }
    }
    return [];
  };

  const entries = deepScan(data, 0);
  if (entries.length > 0) {
    return buildNormalizedSet(extractUsernamesFromEntries(entries));
  }

  throw new Error("Could not extract follower usernames from the provided JSON");
}

function extractFollowingUsers(data: unknown): IGUser[] {
  let entries: unknown[];

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.relationships_following)) {
      entries = record.relationships_following;
    } else {
      entries = [];
    }
  } else if (Array.isArray(data)) {
    entries = data;
  } else {
    entries = [];
  }

  if (entries.length === 0) {
    throw new Error("Could not extract following usernames from the provided JSON");
  }

  const users: IGUser[] = [];
  const seenNormalized = new Set<string>();

  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const rec = entry as Record<string, unknown>;
    let username: string | null = null;

    if (typeof rec.title === "string" && rec.title) {
      username = rec.title;
    } else if (Array.isArray(rec.string_list_data) && rec.string_list_data.length > 0) {
      const item = rec.string_list_data[0] as Record<string, unknown>;
      if (typeof item.value === "string" && item.value) {
        username = item.value;
      } else if (typeof item.href === "string") {
        username = extractUsernameFromHref(item.href);
      }
    }

    if (!username) continue;
    if (isDeletedAccount(username)) continue;

    const normalized = normalizeUsername(username);
    if (seenNormalized.has(normalized)) continue;
    seenNormalized.add(normalized);

    users.push({
      username: normalized,
      href: `https://www.instagram.com/${normalized}`,
    });
  }

  if (users.length === 0) {
    throw new Error("Could not extract following usernames from the provided JSON");
  }

  return users;
}

export function processFiles(followersJson: unknown, followingJson: unknown): ProcessResult {
  const followerUsernames = extractFollowerUsernames(followersJson);
  const followingUsers = extractFollowingUsers(followingJson);

  const notFollowingBack = followingUsers.filter(
    (u) => !followerUsernames.has(u.username)
  );

  return {
    followingCount: followingUsers.length,
    followersCount: followerUsernames.size,
    notFollowingBack,
  };
}
