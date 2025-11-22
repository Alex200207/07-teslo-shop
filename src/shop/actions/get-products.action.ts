import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.reponse";

export const getProductsActions = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    //extraer el url de la imagen para mapear la imagen
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  }));

  return {
    ...data,// regresar el spread de la data 
    products: productsWithImageUrl,// aqui transofrmar los productos pero con la imagemn
  };
};
