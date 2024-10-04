import fetchData from '@/shared/api/fetchData';

async function getIdols(gender, rank = 1, pageSize = 10) {
  const url = 'https://fandom-k-api.vercel.app/10-3/charts/gender';
  const query = { gender, rank, pageSize };

  const { data, error } = await fetchData(url, query);

  if (error) {
    return [];
  }

  return data?.idols || [];
}

export default getIdols;
