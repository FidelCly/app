import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserById = async (userId: string) => {
  const url = process.env.API_URL + "/user/" + userId;

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateUser = async (user: any) => {
  const url = process.env.API_URL + "/user/" + user.id;

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        sexe: user.sexe,
        // birthday: user.birthday
      }),
    });

    return response.json();
  } catch (error) {
    return error;
  }
};
