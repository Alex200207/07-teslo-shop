export const currencyFormatter = (value: number) => {
  // toLocaleString permite formatear números según la configuración regional
  return value.toLocaleString("es-ES", {
    style: "currency",// Formatear como moneda
    currency: "EUR",// Moneda Euro
    minimumFractionDigits: 2,// Mínimo de decimales
  });
};
