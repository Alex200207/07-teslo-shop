import axios from "axios";

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Todo: Interceptores
// interceptan la peticion y la pueden modificar
export { tesloApi };
