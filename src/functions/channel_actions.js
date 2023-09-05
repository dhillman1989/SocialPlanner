export async function getChannels() {
  const res = await fetch(`/api/channel`);
  if (!res.ok) {
    return { error: "Couldn't retrieve Data from API" };
  }
  const data = await res.json();
  return { data: data };
}
