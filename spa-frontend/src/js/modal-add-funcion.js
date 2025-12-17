import {renderMoviesToSelect} from "./movies-to-select-fn.js";
import {renderSalasToSelect} from "./sala-to-select-fn,js.js";

export function renderModalAddFuncion() {
    const container = document.getElementById("modal-add-funcion");
    container.classList.remove("hidden");
    let pelicula = setPelicula();
    let sala = setSala();

    container.innerHTML = `
        <div class="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
            <!-- Header -->
            <div class="border-b p-4">
              <h2 class="text-xl font-semibold text-gray-800">Crear Nueva Función</h2>
            </div>
        
            <!-- Formulario -->
            <form class="p-4 space-y-4">
              <div class="flex justify-between">
              <!-- Película -->
                ${pelicula}
                <!-- Sala -->
                ${sala}
              </div>
              
              <!-- Fecha -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
        
              <!-- Hora de inicio -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
                <input type="time" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
        
              <!-- Hora de fin -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hora de fin</label>
                <input type="time" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
        
              <!-- Precio -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
                <input type="number" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. 8.50" />
              </div>
        
              <!-- Tipo -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecciona el tipo</option>
                  <option value="normal">Normal</option>
                  <option value="3d">3D</option>
                  <option value="vip">VIP</option>
                  <option value="imax">IMAX</option>
                </select>
              </div>
        
              <!-- Estado -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Activa (se pueden comprar entradas)</option>
                  <option value="inactive">Inactiva</option>
                </select>
              </div>
        
              <!-- Botones -->
              <div class="flex justify-end space-x-2 pt-2">
                <button id="cancelar-fn" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                  Cancelar
                </button>
                <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Crear Función
                </button>
              </div>
            </form>
          </div>
        </div>

        <div id="modal-select-movie-fn" class="hidden fixed inset-0 bg-black/20  flex items-center justify-center z-50">
           <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h3 class="font-semibold text-gray-900 text-lg">Seleccionar La pelicula</h3>
                <!-- buscador -->
                 <form class="flex justify-start max-w-sm mx-auto pb-4 pt-2">   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">                        
                        <input type="text" id="q-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5" placeholder="Buscar por titulo..." required />
                    </div>
                    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                 </form>     
                <div id="movie-container-fn" class="grid grid-cols-3 gap-4"></div>                
           </div>                     
        </div>

                <!-- modal para seleccionar la sala -->
           <div id="modal-select-sala-fn" class="hidden fixed inset-0 bg-black/20  flex items-center justify-center z-50">
           <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h3 class="font-semibold text-gray-900 text-lg">Seleccionar La Sala</h3>
                <!-- buscador -->
                 <form class="flex justify-start max-w-sm mx-auto pb-4 pt-2">   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">                        
                        <input type="text" id="q-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5" placeholder="Buscar por titulo..." required />
                    </div>
                    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                 </form>                      
                <div id="sala-container-fn" class="grid grid-cols-3 gap-4"></div>                
           </div>`;

    document.getElementById("modal-add-funcion").addEventListener('click', (e) => {
        if(e.target === document.getElementById("modal-add-funcion")){
            sessionStorage.removeItem('movie');
            sessionStorage.removeItem('room');
            document.getElementById("modal-add-funcion").classList.add('hidden');
        }
    })

    document.getElementById('cancelar-fn').addEventListener('click', (e) => {
        sessionStorage.removeItem('movie');
        sessionStorage.removeItem('room');
        document.getElementById("modal-add-funcion").classList.add('hidden');
    })

    if(document.getElementById('select-movie-fn')){
        document.getElementById('select-movie-fn').addEventListener('click', async (e) => {
            renderMoviesToSelect().then();
        })
    }

    if(document.getElementById('deselect-movie')){
        document.getElementById('deselect-movie').addEventListener('click', async (e) => {
            sessionStorage.removeItem('movie');
            renderModalAddFuncion();
        })
    }
    if(document.getElementById('deselect-room')){
        document.getElementById('deselect-room').addEventListener('click', async (e) => {
            sessionStorage.removeItem('room');
            renderModalAddFuncion();
        })
    }

    if(document.getElementById('btn-select-sala-fn')){
        document.getElementById('btn-select-sala-fn').addEventListener('click', async (e) => {
            renderSalasToSelect()
        })
    }

    function setPelicula(){
        let movie = JSON.parse(sessionStorage.getItem('movie'));
        if(movie){
            const categoriesText = movie.categories.map(cat => cat.name).join(', ');
            return  `           
                <div class="relative rounded-lg h-[200px] w-[200px] overflow-hidden  shadow-md">
                    <button id="deselect-movie" type="button" class="absolute cursor-pointer top-0 right-0 z-50 bg-white/70 px-2 font-semibold rounded-lg" > x </button>            
                    <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-3 text-white">
                        <h4 class="font-bold text-sm truncate">${movie.title} ● ${movie.year}</h4>
                        <p class="text-xs opacity-90 mt-1">${categoriesText}</p>
                    </div>                 
                </div>`;
        }else{
            return `
                 <div>              
                    <label class="block text-sm font-medium text-gray-700 mb-1">Película</label>
                    <button id="select-movie-fn" class="bg-blue-700 px-2 py-1 text-white font-semibold rounded-lg cursor-pointer active:bg-blue-600"
                            type="button">Seleccionar Pelicula</button>
                </div>`;
        }
    }

    function setSala(){
        let room = JSON.parse(sessionStorage.getItem('room'));
        if(room){
            return  `
                <div class="relative rounded-lg h-[100px] w-[200px] overflow-hidden shadow-md">                      
                    <button id="deselect-room" type="button" class=" absolute cursor-pointer top-0 right-0 z-50  bg-white/70 px-2 font-semibold rounded-lg" > x </button>
                    <div class="text-black font-semibold absolute inset-0 bg bg-gray-300 flex flex-col p-3 ">
                        <p class="">Numero: ${room.number}</p
                        <p>Capacidad: ${room.capacity}<p>                          
                    </div>
               </div>`;
        }else{
            return `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sala</label>       
                    <button id="btn-select-sala-fn" class=" px-2 py-1 text-blue-700 active:bg-blue-700 active:text-white cursor-pointer font-semibold rounded-lg"
                            type="button">Seleccionar Sala</button>
                </div>`
        }
    }
}