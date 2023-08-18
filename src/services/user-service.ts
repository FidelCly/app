import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Luxon from "luxon";
import { IUser } from "store/interfaces";

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

export const getAllUserCards = async () => {
  const url = process.env.API_URL + "/user/cards";

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

export const updateUser = async (user: IUser) => {
  const url = process.env.API_URL + "/user/" + user.id;

  try {
    const [day, month, year] = user.birthday.split("/");

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
        birthday:
          day && month && year
            ? new Date(
                Luxon.DateTime.local(
                  Number(year),
                  Number(month),
                  Number(day)
                ).toISODate() as string
              )
            : null,
      }),
    });

    return response.json();
  } catch (error) {
    return error;
  }
};
