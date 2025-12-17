import axios from "axios";
import {showToast, urlApi} from "./utils.js";
import {renderAllCategories} from "./allCategories.js";
import {render} from "./modalAddMovie.js";

export function renderAddCategory(){
    document.getElementById('modal-add-category').classList.remove('hidden');
    document.getElementById('modal-add-category').innerHTML = `
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 ">
            <div class="p-6 block border-b border-gray-200">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Agregar Nueva Categoria</h3>
                <form id="add-category-form">
                <!-- Título -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="name">Nombre</label>
                        <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej. Terror">
                    </div>

                    <div class="flex gap-4 justify-between items-center">
                        <div>
                            <button id="todas-categorias" type="button" class="text-gray-400 text-sm hover:underline hover:text-gray-600 cursor-pointer ">
                                Todas Categorias
                            </button>
                        </div>
                        <div class="flex gap-4">
                            <button id="cancelar-cat" type="button" class="font-semibold cursor-pointer">
                                Cancelar
                            </button>

                            <button type="w" class="cursor-pointer font-semibold bg-blue-500 rounded-md px-2 py-1 text-gray-100">
                                Agregar
                            </button>
                        </div>

                    </div>
                </form>
            </div>

            <div id="all-categories-cont" class="hidden max-h-[60vh] overflow-y-auto" ></div>
        </div>
    `;

    document.getElementById('todas-categorias').addEventListener('click', e => {
        let flag = true
        if (e.target.innerText === 'Todas Categorias') {
            e.target.innerText = 'Ocultar Categorias';
        } else {
            flag = false
            e.target.innerText = 'Todas Categorias';
        }
        document.getElementById('all-categories-cont').classList.toggle('hidden');
        renderAllCategories(flag);
    });


    document.getElementById('modal-add-category').addEventListener('click', (e)=>{
        if(e.target.id === 'modal-add-category'){
            document.getElementById('modal-add-category').classList.add('hidden');
        }
    });

    document.getElementById('cancelar-cat').addEventListener('click', (e)=>{
        document.getElementById('modal-add-category').classList.add('hidden');
    })

    document.getElementById('add-category-form').addEventListener('submit', async (e)=>{
        e.preventDefault();
        try{
            const name = document.getElementById('name').value;
            await axios.post(`${urlApi}/category`, {
                name: name,
            })
            document.getElementById('add-category-form').reset();
            renderAddCategory();
            render();
            showToast('Categoria creada');
        }catch(error){
            console.log(error);
            showToast(`${error.response.data.message}`, 'error');
        }
    })

}
