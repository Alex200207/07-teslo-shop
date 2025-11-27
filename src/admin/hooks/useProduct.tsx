import { useQuery } from "@tanstack/react-query";
import { getproductByIdAction } from "../actions/get-products-by-id.actions";

const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", id], //indicaa que cuando cambie hacer peticion
    queryFn: () => getproductByIdAction(id), //llama a la accion que hace la peticion
    retry: false, //no reintenta en caso de error
    staleTime: 1000 * 60 * 5, //5 minutos de cache
    enabled: !!id, //solo se ejecuta si hay id
  });
  return { ...query };
};

export default useProduct;
