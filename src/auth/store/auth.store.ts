import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.actions";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  //Propiedades
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //Getters

  //Acciones
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const initialState: Omit<AuthState, "login" | "logout"> = {
  user: null,
  token: null,
  authStatus: "checking",
};

export const useAuthStore = create<AuthState>()((set) => ({
  //implementacion del store
  ...initialState,

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      //hacemso persistente la informacion en este caso el token
      localStorage.setItem("token", data.token);
      //si todo sale bien guarda la informacion en el estado de zustand
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      //retorna true si todo esta bien
      return true;
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
      //si sale mal manda null
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

  //logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
}));
