import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  // extraemos el estado de autenticación
  const { authStatus } = useAuthStore();
  // si el estado de autenciacion es checking no renderizamos nada
  if (authStatus === "checking") return null;
  // verficas si el auth estatus es igual a no-authenticated y redirigimos al login
  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;

  // si esta autenticado, renderizamos los hijos
  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  // extraemos el estado de autenticación
  const { authStatus } = useAuthStore();
  // si el estado de autenciacion es checking no renderizamos nada
  if (authStatus === "checking") return null;
  // verficas si el auth estatus es igual a authenticated y redirigimos al home
  if (authStatus === "authenticated") return <Navigate to="/" replace />;
  return children;
};

export const AdminRoutes = ({ children }: PropsWithChildren) => {
  // extraemos el estado de autenticación y el isAdmin
  const { authStatus, isAdmin } = useAuthStore();
  // si el estado de autenciacion es checking no renderizamos nada
  if (authStatus === "checking") return null;

  //verficas si el auth estatus es igual a not-authenticated y redirigimos al login
  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;

  // verificamos si el usuario no es admin y redirigimos al home
  if (!isAdmin()) return <Navigate to="/" replace />;
  return children;
};
