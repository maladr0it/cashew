import { request } from "./request";
import { API_URL } from "./config";

export type User = {
  username: string;
};

export const login = async () => {
  const loginPayload = await request(`${API_URL}/login`, {
    method: "POST",
  });
  if (loginPayload instanceof Error) {
    return loginPayload;
  }

  const userPayload = await request<User>(`${API_URL}/user`);

  if (userPayload instanceof Error) {
    return userPayload;
  }
  return userPayload;
};
