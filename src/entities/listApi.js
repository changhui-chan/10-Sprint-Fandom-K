export async function getIdols(gender) {
  const response = await fetch(
    `https://fandom-k-api.vercel.app/10-3/charts/{gender}?gender=${gender}&pageSize=10`
  );
  const body = await response.json();
  return body;
}

export default getIdols;
