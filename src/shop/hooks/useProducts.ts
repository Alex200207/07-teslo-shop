import { useQuery } from "@tanstack/react-query";
import { getProductsActions } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";

const useProducts = () => {
  //obtener  parametros obligatorios de la url
  const { gender } = useParams();

  //logica de manejo de cambio de pagina
  //extraer objeto del searchParams
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || undefined;
  //extrae el gender de los parametros

  // calcular el offset
  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    //indicaa que cuando cambie hacer peticion
    queryKey: ["products", { offset, limit, sizes, gender }],
    queryFn: () =>
      getProductsActions({
        limit: isNaN(+limit) ? 0 : limit,
        // si no es un numero entonces 0 o el offset
        offset: isNaN(offset) ? 0 : offset,
        sizes: sizes,
        //gracias a ecma script podes pasarlo asi
        gender,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos cacheado
  });
};

export default useProducts;
