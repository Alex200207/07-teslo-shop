import { useQuery } from "@tanstack/react-query";
import { getProductsActions } from "../actions/get-products.action";
import { useSearchParams } from "react-router";

const useProducts = () => {
  //logica de manejo de cambio de pagina
  //extraer objeto del searchParams
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;

  // calcular el offset
  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    //indicaa que cuando cambie hacer peticion
    queryKey: ["products", { offset, limit }],
    queryFn: () =>
      getProductsActions({
        limit: isNaN(+limit) ? 0 : limit,
        // si no es un numero entonces 0 o el offset
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos cacheado
  });
};

export default useProducts;
