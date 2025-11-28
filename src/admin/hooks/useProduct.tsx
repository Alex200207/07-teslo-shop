import { useMutation, useQuery } from "@tanstack/react-query";
import { getproductByIdAction } from "../actions/get-products-by-id.actions";
import { createUpdateProductAction } from "../actions/create-update-product.action";

const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", id], //indicaa que cuando cambie hacer peticion
    queryFn: () => getproductByIdAction(id), //llama a la accion que hace la peticion
    retry: false, //no reintenta en caso de error
    staleTime: 1000 * 60 * 5, //5 minutos de cache
    enabled: !!id, //solo se ejecuta si hay id
  });

  //Todo: Mutacion
  // useMutation para crear o actualizar producto viene de react query
  const mutation = useMutation({
    mutationFn: createUpdateProductAction,// la funcion que hace la mutacion
    onSuccess: (data) => {// cuando se crea o actualiza el producto
      console.log("Producto creado/actualizado", data);
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };
  return { ...query, mutation };
};

export default useProduct;
