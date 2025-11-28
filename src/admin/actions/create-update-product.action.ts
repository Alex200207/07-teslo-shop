import type { Product } from "@/interfaces/product.interface";


// product espera un Partial<Product> porque puede ser nuevo o una actualizacion
//pero te va regresar un Product completo
export const createUpdateProductAction = async (
  productLike: Partial<Product>
): Promise<Product> => {
    // extramos id, user, images del productLike
    // el resto de campos los ponemos en rest usando el operador spread
  const { id, user, images = [] , ...rest} = productLike;
  // si no hay id es porque es nuevo
  const isCreating = id === 'new' 

};
