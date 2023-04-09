import { API_URL } from "@env";

export const getUserById = async (userId: number) => {
  const url = API_URL + "/user/" + userId;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return error;
  }
};
