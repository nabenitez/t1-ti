export type User = {
  avatar: string;
  birthdate: string;
  email: string;
  id: number;
  lastName: string;
  name: string;
};

export type Card = {};
export type Address = {};

export const getUsersByIds = async (users: number[]): Promise<User[]> => {
  const res = users.map(async (user) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user}`);
    return res.json();
  });
  const results = await Promise.all(res);
  return results;
};

export const getUsers = async (page: number): Promise<{ users: User[]; totalCount: number }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?_page=${page}`);
  return { users: await res.json(), totalCount: Number(res.headers.get("x-total-count")) };
};

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  return await res.json();
};

export const getUserCards = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/credit-cards`);
  return await res.json();
};

export const getUserAddresses = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/addresses`);
  return await res.json();
};
