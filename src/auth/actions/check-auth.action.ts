import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  //obtener el token
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");

    localStorage.setItem("token", data.token);
    return data;
  } catch (e) {
    //remover el token si esta expirado
    localStorage.removeItem("token");
    console.log(e);
    throw new Error("token expired or not valid");
  }
};
