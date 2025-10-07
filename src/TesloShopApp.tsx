import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

const TesloShopApp = () => {
  return <RouterProvider router={appRouter} />;
};

export default TesloShopApp;
