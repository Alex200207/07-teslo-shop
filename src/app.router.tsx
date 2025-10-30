import { createBrowserRouter, Navigate } from "react-router";
import ShopLayout from "./shop/layout/ShopLayout";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import GenderPage from "./pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/register/RegisterPage";
import DashboardPage from "./admin/pages/DashboardPage";
import AdminProductsPage from "./admin/products/AdminProductsPage";
import {AdminProductPage} from "./admin/product/AdminProductPage";
import { lazy } from "react";

const AuthLayout = lazy(() => import("./auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));

export const appRouter = createBrowserRouter([
  // public
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
