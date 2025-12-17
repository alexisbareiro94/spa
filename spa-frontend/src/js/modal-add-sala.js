import axios from "axios";
import {showToast, urlApi} from "./utils.js";

export function renderAddSala(){
    const container = document.getElementById("modal-add-sala");
    container.classList.remove("hidden");
    container.innerHTML = `  
            <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 h-auto overflow-y-auto">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Agregar Nueva Sala</h3>
            
                    <form id="add-sala-form">                        
                        <div class="mb-4">
                          <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Numero</label>
                          <input type="text" id="numero" name="numero" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej.: 01 o A1">
                        </div>
                        
                        <div class="mb-4">
                          <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Estado</label>
                          <select name="status" id="status"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                               <option value="" disabled selected>Seleccionar una opcion</option>
                               <option value="available">Activo</option>
                               <option value="unavailable">Inactivo</option>
                          </select>                         
                        </div>
                        
                        <div class="mb-4">
                          <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Capacidad</label>
                          <input type="text" id="capacity" name="capacity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej.: 60">
                        </div>
                        
                         <div class="flex justify-between space-x-3 items center">
                             <button type="button" data-value="ver-salas" id="ver-salas" class="text-gray-500 font-semibold cursor-pointer" >Ver salas</button>
                             <div>                             
                                 <button  id="cancelar" type="button" class="px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition">
                                    Cancelar
                                 </button>
                                 <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                                    Guardar
                                 </button>
                              </div>
                        </div>
                    </form>
                </div>
                <div id="table-rooms-cont" class="hidden">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left  text-gray-500 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" class="px-2 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Capacidad
                                    </th>                                    
                                    <th scope="col" class="px-2 py-3">
                                        Estado
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="rooms-table-body"></tbody>
                        </table>
                    </div>
                </div>
             </div>`;

    container.addEventListener('click', (e) => {
        if(e.target === container) {
            container.classList.add("hidden");
        }
    })

    document.getElementById('add-sala-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const number = document.getElementById('numero').value;
        const status = document.getElementById('status').value;
        const capacity = document.getElementById('capacity').value;

        const formData = new FormData();
        formData.append('number', number);
        formData.append('status', status);
        formData.append('capacity', capacity);

        try{
            const res = await axios.post(`${urlApi}/room`, formData);
            document.getElementById('add-sala-form').reset();
            container.classList.add("hidden");
            showToast('Sala agregado con exito')
        }catch(error){
            console.log(error);
        }
    })

    document.getElementById('ver-salas').addEventListener('click', async (e) => {
        document.getElementById('table-rooms-cont').classList.toggle("hidden");
        const btn = e.target;

        if(btn.dataset.value === 'ver-salas'){
            btn.innerHTML = 'Ocultar tabla';
            btn.dataset.value = 'ocultar-salas';
        }else{
            btn.innerHTML = 'Ver salas';
            btn.dataset.value = 'ver-salas';
        }

        try{
            const bodyTable = document.getElementById('rooms-table-body');
            const res = await axios.get(`${urlApi}/room`);
            const data = res.data.data;
            bodyTable.innerHTML = '';

            data.forEach(room => {
            const status = room.status === 'available' ? 'Disponible' : 'NO Disponible';
                const tr = document.createElement('tr');
                tr.classList.add("bg-white", "border-b", "border-gray-200");

                tr.innerHTML = `
                        <td scope="row" class="px-2 py-4 font-medium text-gray-900 ">
                            <div class="input-cont flex gap-1 relative">
                                <input class="names" name="number-${room.id}" id="${room.id}" type="text" value="${room.number}" disabled>
                                <div id="acept-${room.id}" class="hidden flex gap-2 z-50"></div>
                            </div>
                        </td>
                        <td scope="row" class="px-2 py-4 font-medium text-gray-900 ">
                            <div class="input-cont flex gap-1 relative">
                                <input class="names" name="input-${room.id}" id="${room.id}" type="text" value="${room.capacity}" disabled>
                                <div id="acept-${room.id}" class="hidden flex gap-2 z-50"></div>
                            </div>
                        </td>                        
                        <td scope="row" class="px-2 py-4 font-medium text-gray-900 ">
                            <div class="input-cont flex gap-1 relative">
                                <input class="names" name="input-${room.id}" id="${room.id}" type="text" value="${status}" disabled>
                                <div id="acept-${room.id}" class="hidden flex gap-2 z-50"></div>
                            </div>
                        </td>
                        <td class="px-2 py-4 flex gap-4">
                            <button data-edit="${room.id}" type="button" class="edit-button cursor-pointer transition-colors duration-200 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>

                            <button data-delete="${room.id}" type="button" class="delete-button cursor-pointer transition-colors duration-200 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>`
                bodyTable.appendChild(tr);
            })
            console.log(data);
        }catch(error){
            console.log(error);
        }

    })
}