import { Navigate, useParams } from "react-router";
import useProduct from "../hooks/useProduct";
import CustomFullScreenLoading from "@/components/custom/CustomFullScreenLoading";
import ProductForm from "./ui/ProductForm";

export const AdminProductPage = () => {
  // con useparams podes obtener parametros de la url
  const { id } = useParams();

  //trae los datos del producto si no es nuevo
  const { isLoading, isError, data: product } = useProduct(id || "");

  console.log({ isLoading, product });
  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

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
    />
  );
};
