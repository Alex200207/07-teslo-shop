import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (
  email: string,
  fullName: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      email,
      fullName,
      password,
    });
    return data;
  } catch (er) {
    console.log(er);
    throw new Error("no se puedo procesar el registro");
  }
};
