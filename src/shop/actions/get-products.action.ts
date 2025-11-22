import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.reponse";

//implementacion de opciones de filtrado aqui
// limite y salto que seria el offset
interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getProductsActions = async (
  options: Options
): Promise<ProductsResponse> => {
  //aqui se desestructura las opciones
  const { limit, offset } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    //recibir el limite y offset como parametro
    params: {
      limit,
      offset,
    },
  });

  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    //extraer el url de la imagen para mapear la imagen
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  }));

  return {
    ...data, // regresar el spread de la data
    products: productsWithImageUrl, // aqui transofrmar los productos pero con la imagemn
  };
};
