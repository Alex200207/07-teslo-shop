import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import CustomJumbotron from "@/shop/components/CustomJumbotron";

import ProductsGrid from "@/shop/components/ProductsGrid";

const HomePage = () => {
  return (
    <>
      <CustomJumbotron title="Todos los Productos" />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={7} />
    </>
  );
};

export default HomePage;
