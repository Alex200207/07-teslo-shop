import axios from "axios";

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Todo: Interceptores
// interceptan la peticion y la pueden modificar
// use es un middleware
tesloApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
// cada reques va verificar el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //siempre retornar configuracion
  return config;
});
export { tesloApi };
