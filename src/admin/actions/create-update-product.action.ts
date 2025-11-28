import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

// product espera un Partial<Product> porque puede ser nuevo o una actualizacion
//pero te va regresar un Product completo
export const createUpdateProductAction = async (
  productLike: Partial<Product>
): Promise<Product> => {
  // simular retardo de red //Todo: quitar luego
  await sleep(1500);

  // extramos id, user, images del productLike
  // el resto de campos los ponemos en rest usando el operador spread
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], ...rest } = productLike;
  // si no hay id es porque es nuevo
  const isCreating = id === "new";
  // sanitizamos los valores de rest
  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;

  // logica para crear o actualizar
  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });
  //recontruir imagenes
  return {
    ...data,
    // si la imagen ya es una url completa la dejamos igual
    // si no lo es, le agregamos la url base
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/products/${image}`;
    }),
  };
};
