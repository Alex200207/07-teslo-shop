import { Navigate, useNavigate, useParams } from "react-router";
import useProduct from "../hooks/useProduct";
import CustomFullScreenLoading from "@/components/custom/CustomFullScreenLoading";
import ProductForm from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const navigate = useNavigate();
  // con useparams podes obtener parametros de la url
  const { id } = useParams();

  //trae los datos del producto si no es nuevo
  const { isLoading, isError, data: product, mutation } = useProduct(id || "");
  const isPendign = mutation.isPending;

  console.log({ isLoading, product });
  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  // manejar el submit del formulario
  const handleSubmit = async (productLike: Partial<Product>) => {
    // llama a la mutacion
    await mutation.mutateAsync(productLike, {
      // cuando se crea o actualiza el producto
      onSuccess: (data) => {
        // mostrar toast
        toast.success(
          `Producto ${id === "new" ? "creado" : "actualizado"} correctamente`,
          { position: "top-center" }
        );
        //mandas al usuario despues de crerar o actualizar
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log({ error });
        toast.error("Error al crear/actualizar el producto", {
          position: "top-center",
        });
      },
    });
  };

  // redireccion
  if (isError) {
    return <Navigate to={"/admin/products"} replace />;
  }

  //maneja loading
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  // si no hay producto, redirecciona a la lista de productos
  if (!product) {
    // sacar a usuario a la lista de productos
    return <Navigate to={"/admin/products"} replace />;
  }

  return (
    <ProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={isPendign}
    />
  );
};
