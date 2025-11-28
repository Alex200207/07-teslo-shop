import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getproductByIdAction } from "../actions/get-products-by-id.actions";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";

const useProduct = (id: string) => {
  // query client para manejar la cache
  const queryClient = useQueryClient();
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
    mutationFn: createUpdateProductAction, // la funcion que hace la mutacion
    onSuccess: (data: Product) => {
      // cuando se crea o actualiza el producto
      queryClient.invalidateQueries({ queryKey: ["products"] }); // invalidamos la cache de los productos para que se actualice
      queryClient.invalidateQueries({ queryKey: ["product", {id:data.id}] });
      console.log("Producto creado/actualizado", data);
      //ahorro para no tener que volver a hacer fetch y ver el producto actualizado
      queryClient.setQueryData(["products", data.id], data); // actualizamos la cache del producto creado/actualizado
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };
  return { ...query, mutation };
};

export default useProduct;
