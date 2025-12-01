import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

// product espera un Partial<Product> porque puede ser nuevo o una actualizacion
//pero te va regresar un Product completo
export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
  // simular retardo de red //Todo: quitar luego
  await sleep(1500);

  // extramos id, user, images del productLike
  // el resto de campos los ponemos en rest usando el operador spread
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...rest } = productLike;
  // si no hay id es porque es nuevo
  const isCreating = id === "new";
  // sanitizamos los valores de rest
  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;

  //preparar imagenes
  // si hay archivos para subir
  if (files.length > 0) {
    // subir archivos y obtener los nombres de los archivos subidos
    const newImageName = await uploudFiles(files);
    // agregar los nuevos nombres de imagen al arreglo de imagenes
    images.push(...newImageName);
  }

  // si la imagen incluyeel http es porque ya es una url completa
  const imagesToSave = images.map((image) => {
    //si la imagen ya es una url completa, extraemos solo el nombre del archivo
    if (image.includes("http")) return image.split("/").pop() || "";
    return image;
  });

  // logica para crear o actualizar
  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...rest,
      //nuestras imagenes es nuestro arreglo de imagenes
      images: imagesToSave,
    },
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

export interface FileUploudReponse {
  secureUrl: string;
  fileName: string;
}

// funcion helper para carga de archivos
const uploudFiles = async (files: File[]) => {
  const uploudPromises = files.map(async (file) => {
    const formData = new FormData();
    // agregar el archivo al formdata
    formData.append("file", file);

    const { data } = await tesloApi<FileUploudReponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });
    // regresar el nombre del archivo
    return data.fileName;
  });
  // Promise.all espera un arreglo de promesa y hasta que terminen todas
  //se resuelve
  const uploudedFiles = await Promise.all(uploudPromises);
  // regresar los nombres de los archivos subidos
  return uploudedFiles;
};
