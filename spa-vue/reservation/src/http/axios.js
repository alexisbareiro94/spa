import axios from 'axios';

const api = axios.create({
    // Asegúrate de que esta URL base apunte a tu backend Laravel
    baseURL: 'http://127.0.0.1:8000',

    // Habilita el envío de cookies a través de dominios (CORS)
    withCredentials: true,

    // Indica a Axios que maneje el token XSRF para nosotros
    withXSRFToken: true,
});

export default api;
