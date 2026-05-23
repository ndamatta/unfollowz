export interface IGUser {
  username: string;
  href: string;
}

export interface ProcessResult {
  followingCount: number;
  followersCount: number;
  notFollowingBack: IGUser[];
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

function findStringListData(obj: unknown): { value?: string; href?: string }[] {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (item && typeof item === "object" && Array.isArray(item.string_list_data)) {
        return item.string_list_data;
      }
    }
  }

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const record = obj as Record<string, unknown>;
    if (Array.isArray(record.string_list_data)) {
      return record.string_list_data as { value?: string; href?: string }[];
    }
  }

  return [];
}

function extractFollowerUsernames(data: unknown): Set<string> {
  // Strategy 1: Array of objects with string_list_data[].value
  if (Array.isArray(data)) {
    const usernames: string[] = [];
    for (const item of data) {
      const entries = findStringListData(item);
      for (const entry of entries) {
        if (entry.value) {
          usernames.push(entry.value);
          break;
        }
      }
    }
    if (usernames.length > 0) return new Set(usernames);
  }

  // Strategy 2: Single object with top-level string_list_data
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const entries = findStringListData(data);
    if (entries.length > 0) {
      const usernames: string[] = [];
      for (const entry of entries) {
        if (entry.value) {
          usernames.push(entry.value);
        }
      }
      if (usernames.length > 0) return new Set(usernames);
    }
  }

  // Strategy 3: Fall back to extracting from href where value is missing
  if (Array.isArray(data)) {
    const usernames: string[] = [];
    for (const item of data) {
      const entries = findStringListData(item);
      for (const entry of entries) {
        const extracted = entry.value || extractUsernameFromHref(entry.href || "");
        if (extracted) {
          usernames.push(extracted);
          break;
        }
      }
    }
    if (usernames.length > 0) return new Set(usernames);
  }

  // Strategy 3b: Single object format, fall back to href
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const entries = findStringListData(data);
    if (entries.length > 0) {
      const usernames: string[] = [];
      for (const entry of entries) {
        const extracted = entry.value || extractUsernameFromHref(entry.href || "");
        if (extracted) {
          usernames.push(extracted);
        }
      }
      if (usernames.length > 0) return new Set(usernames);
    }
  }

  // Strategy 4: Deep scan for any string_list_data arrays
  const deepScan = (obj: unknown): { value?: string; href?: string }[] => {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = deepScan(item);
        if (result.length > 0) return result;
      }
    } else if (obj && typeof obj === "object") {
      const record = obj as Record<string, unknown>;
      if (Array.isArray(record.string_list_data)) {
        return record.string_list_data as { value?: string; href?: string }[];
      }
      for (const val of Object.values(record)) {
        const result = deepScan(val);
        if (result.length > 0) return result;
      }
    }
    return [];
  };

  const entries = deepScan(data);
  if (entries.length > 0) {
    const usernames: string[] = [];
    for (const entry of entries) {
      const extracted = entry.value || extractUsernameFromHref(entry.href || "");
      if (extracted) usernames.push(extracted);
    }
    if (usernames.length > 0) return new Set(usernames);
  }

  throw new Error("Could not extract follower usernames from the provided JSON");
}

function extractFollowingUsers(data: unknown): IGUser[] {
  let entries: unknown[];

  // Strategy 1: Standard format with relationships_following wrapper
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.relationships_following)) {
      entries = record.relationships_following;
    } else {
      // Strategy 4: Data itself might be the array (no wrapper)
      entries = Array.isArray(data) ? data : [];
    }
  } else if (Array.isArray(data)) {
    // Strategy 4: Data is an array directly
    entries = data;
  } else {
    entries = [];
  }

  if (entries.length === 0) {
    throw new Error("Could not extract following usernames from the provided JSON");
  }

  const users: IGUser[] = [];

  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const rec = entry as Record<string, unknown>;

    // Try title first
    if (typeof rec.title === "string" && rec.title) {
      users.push({
        username: rec.title,
        href: `https://www.instagram.com/${rec.title}`,
      });
      continue;
    }

    // Strategy 2: string_list_data[].value
    if (Array.isArray(rec.string_list_data) && rec.string_list_data.length > 0) {
      const item = rec.string_list_data[0] as Record<string, unknown>;
      if (typeof item.value === "string" && item.value) {
        users.push({
          username: item.value,
          href: `https://www.instagram.com/${item.value}`,
        });
        continue;
      }

      // Strategy 3: Extract from href
      if (typeof item.href === "string") {
        const username = extractUsernameFromHref(item.href);
        if (username) {
          users.push({
            username,
            href: `https://www.instagram.com/${username}`,
          });
          continue;
        }
      }
    }
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