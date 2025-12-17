//login y register
import axios from "axios";
import {showToast, urlApi} from './utils';
import { initCsrf } from "./boot";
import { renderRegister } from './register';
import { url } from "./utils";
import { renderMenu } from "./menu";

initCsrf().then(() => {
    renderLogin();
})

export function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Iniciar Sesión
            </h2>

            <form id="login-form">                

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                    </label>
                    <input type="email" id="email" name="email" required
                        class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
                </div>

                <!-- Password -->
                <div class="relative">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input type="password" id="password" name="password" required
                        class="w-full mb-4 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
                                            
                        <span id="show-pass" class="absolute px-2 py-1 hover:bg-gray-200 rounded-lg top-7 right-1 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </span>
                        
                        <span id="hide-pass" class="hidden absolute px-2 py-1 hover:bg-gray-200 rounded-lg top-7 right-1 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </span> 
                    
                    
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Entrar
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                ¿No tienes cuenta?
                <button id="register" class="cursor-pointer text-blue-600 hover:underline">
                    Regístrate
                </button>
            </p>
        </div>
    </div>`;

    document.getElementById('register').addEventListener('click', () => {
        renderRegister();
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await axios.post(`${url}/login`, {
                email: email,
                password: password
            })
            console.log(res)
            if(res.data.user.role !== 'admin'){
                await axios.post(`${url}/logout`, {})
                window.location.reload();
                return;
            }
            renderMenu();
            showToast('Inicio de sesion');
        } catch (err) {
            console.log(err)
            showToast(`${err.response.data.error}`, 'error')
        }
    });

    document.getElementById('show-pass').addEventListener('click', (e) => {
        document.getElementById('show-pass').classList.add('hidden')
        document.getElementById('hide-pass').classList.remove('hidden');
        document.getElementById('password').type = 'text'
    })

    document.getElementById('hide-pass').addEventListener('click', (e) => {
        document.getElementById('hide-pass').classList.add('hidden')
        document.getElementById('show-pass').classList.remove('hidden');
        document.getElementById('password').type = 'password'
    })
    
}
