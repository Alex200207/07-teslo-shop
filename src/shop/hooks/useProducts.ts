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

  // manejo en el filtrado por rango de precios
  const price = searchParams.get("price") || "any";
  // variables cambiantes vacias
  let minPrice = undefined;
  let maxPrice = undefined;

  // evaluando el pricio por casos
  switch (price) {
    case "any":
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
  }

  return useQuery({
    //indicaa que cuando cambie hacer peticion
    queryKey: [
      "products",
      { offset, limit, sizes, gender, minPrice, maxPrice },
    ],
    queryFn: () =>
      getProductsActions({
        limit: isNaN(+limit) ? 0 : limit,
        // si no es un numero entonces 0 o el offset
        offset: isNaN(offset) ? 0 : offset,
        sizes: sizes,
        //gracias a ecma script podes pasarlo asi
        gender,
        minPrice,
        maxPrice,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos cacheado
  });
};

export default useProducts;
