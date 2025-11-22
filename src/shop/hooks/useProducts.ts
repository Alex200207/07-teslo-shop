import { useQuery } from "@tanstack/react-query";
import { getProductsActions } from "../actions/get-products.action";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsActions,
  });
};

export default useProducts;
