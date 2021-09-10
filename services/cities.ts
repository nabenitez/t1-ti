export type City = {
  id: string;
  name: string;
  country: string;
  users: number[];
};

export const getCities = async (page: number): Promise<{ cities: City[]; totalCount: number }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities?_page=${page}}`);
  return { cities: await res.json(), totalCount: Number(res.headers.get("x-total-count")) };
};

export const getCityById = async (name: string): Promise<City> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities/${name}`);
  return await res.json();
};

export const findCities = async (query: string): Promise<{ cities: City[]; totalCount: number }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities?q=${query}`);

  return { cities: await res.json(), totalCount: Number(res.headers.get("x-total-count")) };
};
