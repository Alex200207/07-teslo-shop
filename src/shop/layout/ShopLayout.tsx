import { Outlet } from "react-router";
import CustomHeader from "../components/CustomHeader";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />
    </div>
  );
};

export default ShopLayout;
