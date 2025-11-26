import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { type PropsWithChildren } from "react";
import CustomFullScreenLoading from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

//custom provider
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  //obtenemos la accion de verificar estado de autenticacion
  const { checkAuthStatus } = useAuthStore();

  //peticion http con tankstack react query
  // traer informacion del usuario authenticado y almacenar en zustand
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false, // que no siga intentando en caso de error
    refetchInterval: 1000 * 60 * 60 * 1.5, // refrescar cada hora y media
    refetchOnWindowFocus: true, // cada vez que la ventana recupere el foco
  });

  // mientras carga mostramos un loading
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return children;
};
//pxq hacemos asi esto pues porque el query client provider debe estar en la raiz de la app
// asi cuando rederize verficamos estado de la autenticacion

const TesloShopApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TesloShopApp;
