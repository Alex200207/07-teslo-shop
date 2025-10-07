import { Outlet } from "react-router";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default ShopLayout;
