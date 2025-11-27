import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const getproductByIdAction = async (id: string): Promise<Product> => {
  // si id no existe lanzas error
  if (!id) throw new Error("El ID del producto es obligatorio");

  // si id es "new" retornas un producto vacio
  if (id === "new") {
    return {
      id: "new",
      title: "",
      price: 0,
      description: "",
      slug: "",
      stock: 0,
      sizes: [],
      gender: "men",
      tags: [],
      images: [],
    } as unknown as Product; // casteo temporal para que el tipado no de error
  }

  // caso : Si tenemos entonces una idhacemos fetch al producto
  const { data } = await tesloApi.get<Product>(`/products/${id}`);
  // transformar las imagenes debido al formato del backend
  const images = data.images.map((image) => {
    // si la imagen ya es una url completa la retornas tal cual
    if (image.includes("http")) return image;
    // si no es una url completa la construyes aqui y la retornas
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  // regresar el producto con las imagenes transformadas
  return {
    ...data, // spread del producto original es como una copia superficial
    images,
  };
};
