import { tesloApi } from "@/api/tesloApi";

export const getProductsActions = async () => {
  const { data } = await tesloApi.get("/products");

  return data;
};
