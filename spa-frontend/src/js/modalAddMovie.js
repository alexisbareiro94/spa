import axios from "axios";
import {showToast, urlApi} from "./utils.js";
import {loadMovies} from "./movies.js";
import {renderMenu} from "./menu.js";
import {renderAddCategory} from "./modalAddCategory.js";

export function render() {
    const addMovie = document.getElementById('add-movie');
    addMovie.innerHTML = `
            <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 h-[90vh] overflow-y-auto">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Agregar Nueva Película</h3>
        
              <form id="add-movie-form">
                <!-- Título -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Título</label>
                  <input type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej. Interestelar">
                </div>
                   
                 <!-- Lanzamiento -->
                 <div class="mb-4">
                    <label for="release" class="block text-sm font-medium text-gray-700 mb-1">Lanzamiento</label>
                    <input type="date" name="release" id="release" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                   
                <!-- Productor -->
                 <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="producer">Productor</label>
                  <input type="text" id="producer" name="producer" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej. Warner">
                </div>
        
                <!-- Categoría (como select) -->
                <div class="mb-4 ">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="category_id">Categoría</label>
                 <div class="flex gap-2">                               
                      <button id="select-category" class="border border-gray-300  px-2 py-1 rounded-md font-semibold cursor-pointer" type="button">Seleccionar Categorias</button>                      
                      <div id="drop-categories" class="hidden absolute z-50  inset-12 shadow-lg rounded-lg bg-gray-200 border border-gray-300 p-2">
                        <div class="relative">
                            <h3 class="font-semibold">Seleccionar Categorias</h3>
                            <!-- buscador -->
                            <div class="flex">                            
                                <input id="q-input-cat" class="border py-0.5 px-3 border-gray-500 rounded-l-md" type="text" name="" >
                                <button class="border  border-blue-700 px-0.5 rounded-r-md bg-blue-700 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                            <span id="cerrar" class="absolute z-50 top-0 right-0 font-semibold cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded-full">X</span>                                                                        
                        </div>
                        
                        <div id="categories-cont"></div>
                      </div>        
                                    
                       <button id="btn-add-category" type="button" class="px-3 py-1 font-semibold text-white cursor-pointer bg-blue-500 rounded-md">
                            +
                      </button>
                   </div>
                    <div id="categories-selected" class="flex"></div>
                </div>  
        
                <!-- Descripción -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Descripción</label>
                  <textarea id="description" name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Breve sinopsis de la película..."></textarea>
                </div>
        
                <!-- Duración (en minutos) -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="duration">Duración (minutos)</label>
                  <input type="number" id="duration" name="duration" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ej. 120">
                </div>
        
                <!-- imagen -->
                <div id="cont-image" class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="image">Portada</label>
                  <input type="file" id="image" name="image" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://ejemplo.com/imagen.jpg">
                </div>
                
                <div id="cont-preview" class="hidden max-w-full mb-5 relative">
                    <img class="rounded-md"
                         id="preview" src="" alt="" srcset="">
                     <span id="quitar-preview" class="absolute top-3 right-3 z-50 px-2 py-0.5 bg-red-500 rounded-full font-semibold text-gray-200 cursor-pointer hover:bg-red-300"> X </span>
                </div>
        
                <!-- Botones -->
                <div class="flex justify-end space-x-3">
                  <button id="cancelar" type="button" class="px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition">
                    Cancelar
                  </button>
                  <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                    Guardar Película
                  </button>
                </div>
              </form>
            </div>
          </div>`

    if(document.getElementById('btn-add-category')){
        document.getElementById('btn-add-category').addEventListener('click', (e)=>{
            renderAddCategory();
        })
    }

    let timerCat;
    document.getElementById('q-input-cat').addEventListener('input', (e)=>{
        const value = e.target.value;
        clearTimeout(timerCat);
        timerCat = setTimeout(async () => {
            try{
                const res = await axios.get(`${urlApi}/category?q=${value}`);
                categories(res.data.data).then();
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }, 300)
    })

    async function categories(query = null) {
        try {
            const dropCategories = document.getElementById('categories-cont');
            dropCategories.innerHTML = '';
            const res = await axios.get(`${urlApi}/category`);
            let data;
            if(query){
                data = query;
            }else{
                data = res.data.data;
            }

            const div = document.createElement('div');
            div.classList.add('grid', 'grid-cols-3', 'gap-2', 'px-4', 'py-2');
            data.forEach((item) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = item.id;
                input.value = item.id;
                input.name = item.name;
                input.classList.add('cursor-pointer', 'm-2', 'categories_id');

                label.classList.add('cursor-pointer');
                label.textContent = item.name;
                label.appendChild(input);
                div.appendChild(label);
            });
            dropCategories.appendChild(div);
        } catch (err) {
            console.log(err)
        }
    }
    categories().then();
    document.getElementById('select-category').addEventListener('click', async (e) => {
        document.getElementById('drop-categories').classList.toggle('hidden');
       // categoriesSelected();
    })

    document.getElementById('cerrar').addEventListener('click', (e) => {
        document.getElementById('drop-categories').classList.add('hidden');
       // categoriesSelected();
    })

    document.getElementById('add-movie-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        let categories = [];
        const checks = document.querySelectorAll('.categories_id');
        checks.forEach(check => {
            if (check.checked) {
                categories.push(check.id);
            }
        });
        const title = document.querySelector('#title').value;
        const release = document.querySelector('#release').value;
        const producer = document.querySelector('#producer').value;
        const description = document.querySelector('#description').value;
        const duration = document.querySelector('#duration').value;
        const image = document.querySelector('#image').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category_id', categories);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('poster', image);
        formData.append('producer', producer);
        formData.append('release', release);
        console.log(formData.get('producer'));

        try{
            const res = await axios.post(`${urlApi}/movie`, formData);

            document.getElementById('add-movie-form').reset();
            document.getElementById('preview').src = "";
            document.getElementById('cont-preview').classList.add('hidden');
            document.getElementById('cont-image').classList.remove('hidden');
            renderMenu();
            showToast('Pelicula Agregada Correctamente', );
            console.log(res)
        }catch(error){
            console.log(error)
            showToast(`${error.response.data.message}`, 'error');
        }
    })
}
