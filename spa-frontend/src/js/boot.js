import axios from 'axios';
import { renderMenu } from './menu';
import {showToast, url} from './utils';
import { renderLogin } from './login';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.defaults.headers.common['Accept'] = 'application/json';

export async function initCsrf(){
    try{
        const res =  await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');        
        console.log('token cookie inicializada', res)
    }catch(err){
        console.error('error al inicializar el token: ', err)
    }
}

const apiUrl = 'http://127.0.0.1:8000'; 

export async function checkAuthAndLoadApp() {
    try {
        const response = await axios.get(`${apiUrl}/api/user`);
        const userData = response.data;
        if(userData.role !== 'admin'){
            renderLogin();
            await axios.post(`${url}/logout`);
            return;
        }
        window.Auth.isAuthenticated = true;
        window.Auth.user = userData;
        renderMenu();
    } catch (error) {
        console.log(error);
        renderLogin();
    }
}