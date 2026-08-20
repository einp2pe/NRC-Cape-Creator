const PROXY = "https://api.codetabs.com/v1/proxy/?quest=";

const proxied = (url: string) => `${PROXY}${encodeURIComponent(url)}`;

export class SkinLookupError extends Error {}

async function getJson<T>(url: string, notFoundMessage: string): Promise<T> {
  const response = await fetch(proxied(url), { cache: "no-store" });

  if (response.status === 429) {
    throw new SkinLookupError("Too many lookups — try again in a moment");
  }
  if (!response.ok) {
    throw new SkinLookupError(notFoundMessage);
  }

  return (await response.json()) as T;
}

export async function resolveSkinUrl(username: string): Promise<string> {
  const profile = await getJson<{ id?: string }>(
    `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`,
    "No player with that name"
  );

  if (!profile.id) throw new SkinLookupError("No player with that name");

  const session = await getJson<{
    properties?: { name: string; value: string }[];
  }>(
    `https://sessionserver.mojang.com/session/minecraft/profile/${profile.id}`,
    "Could not read that player's profile"
  );

  const textures = session.properties?.find(
    (property) => property.name === "textures"
  );
  if (!textures) throw new SkinLookupError("That player has no skin set");

  const decoded = JSON.parse(atob(textures.value)) as {
    textures?: { SKIN?: { url?: string } };
  };

  const skinUrl = decoded.textures?.SKIN?.url;
  if (!skinUrl) throw new SkinLookupError("That player has no skin set");

  return skinUrl;
}
