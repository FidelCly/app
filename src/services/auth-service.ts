import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * login
 * @param email
 * @param password
 * @returns
 */
export const login = async (email: string, password: string) => {
  const url = process.env.API_URL + "/auth/login";

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const body = await response.json();
    return Promise.resolve({ data: body, status: response.status });
  } catch (error) {
    return error;
  }
};

/**
 * register
 * @param email
 * @param password
 * @returns
 */
export const register = async (email: string, password: string) => {
  const url = process.env.API_URL + "/auth/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: "User",
      }),
    });
    const body = await response.json();
    return Promise.resolve({ data: body, status: response.status });
  } catch (error) {
    return error;
  }
};

/**
 * logout
 * @returns
 */
export const logout = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem("token"),
      AsyncStorage.removeItem("userId"),
    ]);
    return true;
  } catch (error) {
    return error;
  }
};
