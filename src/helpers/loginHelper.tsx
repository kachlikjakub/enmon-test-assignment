import axios from "axios";

export const logIn = (
  email: string,
  password: string
): Promise<{ status: number; data: any }> => {
  return axios
    .post("https://tools.dev.enmon.tech/api/auth/local", {
      identifier: email,
      password: password,
    })
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return error;
    });
};
