import {renderMenu} from "./menu.js";
import {renderSalas} from "./render-salas.js";
import {renderAddSala} from "./modal-add-sala.js";
import {renderModalAddFuncion} from "./modal-add-funcion.js";

export function renderRoomMenu(){
    const app = document.getElementById('app');
    app.innerHTML = `<div  class="bg-gray-100 min-h-screen p-6">
        <div class="max-w-4xl mx-auto">
            <!-- Encabezado -->
            <div class="relative flex justify-between">
                <header class="mb-8 flex gap-2 items-center">
                    <h1 id="render-movies" class="text-sm cursor-pointer ">Películas | </h1>
                    <h2 class="text-3xl pt-2 font-bold text-gray-800" >Proyecciones</h2>                    
                </header>

                <div class="flex justify-between gap-6">                                        
                    <span id="cerrar-session" class=" cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    <span>                                    
                </div>
            </div>            

            <!-- Botón para agregar película -->
            <div class="mb-6 flex justify-between">
                <div class="flex items-center gap-2">    
                <!-- buscador -->                                
                    <form class="flex items-center max-w-sm mx-auto">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">                        
                            <input type="text" id="q-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5" placeholder="Buscar por codigo..." required />
                        </div>
                        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>                    
                    <!-- icono de filtro -->
                    <button id="btn-filtro" class="text-blue-700 cursor-pointer active:bg-blue-700 active:text-white px-1.5 py-1.5 rounded-md">                    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>

                </div>
                                
                <div class="flex gap-2">
                    <button id="btn-add-sala" class="cursor-pointer white active:bg-blue-700 active:text-white text-blue-700 font-medium py-2 px-4 rounded-lg transition duration-200">
                        + Agregar Sala
                    </button>
                    <button id="btn-add-funcion" class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                        + Agregar Funcion
                    </button>
                </div>                
            </div>
            <!-- lista de salas -->
             <div id="rooms-cont" class="space-y-4"></div>
             <!-- modal para agregar las salas --> 
             <div id="modal-add-sala" class="hidden fixed inset-0 bg-black/20  flex items-center justify-center z-50"></div>
            <div id="modal-add-funcion" class="hidden fixed inset-0 bg-black/20  flex items-center justify-center z-50"></div>           
        </div>
    </div>`;

    renderSalas();

    document.getElementById('render-movies').addEventListener('click', (e) => {
        renderMenu();
    })

    document.getElementById('btn-add-sala').addEventListener('click', (e) => {
        renderAddSala();
    })

    document.getElementById('btn-add-funcion').addEventListener('click', (e) => {
        renderModalAddFuncion();
    })
}