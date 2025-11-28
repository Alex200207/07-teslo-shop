import { Link } from "react-router";
import AdminTtile from "../components/AdminTtile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import useProducts from "@/shop/hooks/useProducts";
import CustomFullScreenLoading from "@/components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "@/lib/currency-formatter";

const AdminProductPage = () => {
  const { data, isLoading } = useProducts();

  const products = data?.products || [];

  if (isLoading) return <CustomFullScreenLoading />;
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTtile
          title="Productos"
          subtitle="aqui puedes ver y administrar tus productos"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to={"/admin/products/new"}>
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-sx border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <Link
                className="hover:text-blue-500 underline"
                to={`/admin/products/${p.id}`}
              >
                {p.title}
              </Link>
              <TableCell>{currencyFormatter(p.price)}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.stock} stock</TableCell>
              <TableCell>{p.sizes.join(", ")}</TableCell>
              <TableCell>
                <Link to={`/admin/products/${p.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};

export default AdminProductPage;
