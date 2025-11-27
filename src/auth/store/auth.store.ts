import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.actions";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.actions";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  //Propiedades
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //Getters
  //forma recomendad en ves de propiedades computadas
  isAdmin: () => boolean;

  //Acciones
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<boolean>;
  logout: () => void;
  // agregar accion para verificar estado de autenticacion
  checkAuthStatus: () => Promise<boolean>;
};

const initialState: Omit<
  AuthState,
  "login" | "register" | "logout" | "checkAuthStatus" | "isAdmin"
> = {
  user: null,
  token: null,
  authStatus: "checking",
};

export const useAuthStore = create<AuthState>()((set, get) => ({
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

  // register

  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerAction(email, password, fullName);
      localStorage.setItem("token", data.token);
      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });

      return true;
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },

  //logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      // si todo sale bien obetenemos usuario y token
      const { user, token } = await checkAuthAction();

      // pasamos a estado autenticado
      set({
        user,
        token,
        authStatus: "authenticated",
      });

      return true;
    } catch (e) {
      // si sale mal pasamos a no autenticado
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      console.log(e);
      return false;
    }
  },

  isAdmin: () => {
    // extraer roles del usuario del estado
    const roles = get().user?.roles || [];
    // verificar si los roles incluyen 'admin'
    return roles.includes("admin");
  },
}));
