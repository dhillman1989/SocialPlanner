export async function getEvents() {
  const res = await fetch(`/api/event`);
  if (!res.ok) {
    return { error: "Couldn't retrieve Data from API" };
  }
  const data = await res.json();

  return { data: data };
}

export async function getOneEvent(id) {
  const res = await fetch(`/api/event/${id}`);
  if (!res.ok) {
    return { error: "Couldn't retrieve Data from API" };
  }
  const data = await res.json();

  return { data: data };
}

export async function searchEvents(query) {
  const res = await fetch(`/api/event?search=` + query);
  if (!res.ok) {
    return { error: "Search Failed" };
  }
  const data = await res.json();
  return { data: data };
}
