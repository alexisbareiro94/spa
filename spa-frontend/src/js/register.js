import { renderLogin } from './login';
import axios from "axios";
import { showToast } from './utils';

const url = 'http://127.0.0.1:8000';
export function renderRegister() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Crear Cuenta
            </h2>

            <form id="register-form" >                
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input type="text" id="name" name="name" required
                        class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
                </div>

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
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input type="password" id="password" name="password" 
                            class="mb-6 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" />
                    </div>

                    <div id="show-p" class="absolute top-7 right-1 cursor-pointer px-2 py-1 rounded-lg font-semibold hover:bg-gray-200">                    
                        < o >
                    </div>   
                    <div id="hidden-p" class="hidden absolute top-7 right-1 cursor-pointer px-2 py-1 rounded-lg font-semibold hover:bg-gray-200">                    
                        < / >
                    </div>                                
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Registrarse
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?
                <a id="login" class="cursor-pointer text-blue-600 hover:underline">
                    Inicia Sesión
                </a>
            </p>
        </div>
    </div>
`
    document.getElementById('login').addEventListener('click', () => {
        renderLogin();
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await axios.post(`${url}/register`, {
                name: name,
                email: email,
                password: password
            })
            showToast('Registro completado');
            renderLogin();
        } catch (err) {
            console.log(err)
        }
    })

    document.getElementById('show-p').addEventListener('click', () => {
        document.getElementById('hidden-p').classList.remove('hidden')
        document.getElementById('show-p').classList.add('hidden')

        document.getElementById('password').type = "text";

    });

    document.getElementById('hidden-p').addEventListener('click', () => {
        document.getElementById('show-p').classList.remove('hidden')
        document.getElementById('hidden-p').classList.add('hidden')

        document.getElementById('password').type = "password";

    });

}