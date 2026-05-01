export interface IGUser {
  username: string;
  href: string;
}

export interface ProcessResult {
  followingCount: number;
  followersCount: number;
  notFollowingBack: IGUser[];
}

export function processFiles(followersJson: unknown, followingJson: unknown): ProcessResult {
  const followers = followersJson as { string_list_data: { value: string }[] }[];
  const following = (followingJson as { relationships_following: { title: string }[] }).relationships_following;

  const followerUsernames = new Set(followers.map(u => u.string_list_data[0].value));

  const notFollowingBack = following
    .filter(u => !followerUsernames.has(u.title))
    .map(u => ({
      username: u.title,
      href: `https://www.instagram.com/${u.title}`,
    }));

  return {
    followingCount: following.length,
    followersCount: followers.length,
    notFollowingBack,
  };
}