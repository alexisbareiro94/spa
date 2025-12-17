import axios from "axios";
import {showToast, urlApi} from "./utils.js";
import {renderMenu} from "./menu.js";

export function modalEditMovie(data){
    document.getElementById('edit-movie-cont').classList.remove('hidden');
    const container =  document.getElementById('edit-movie-cont');
    container.innerHTML = `
        <form 
          id="edit-movie" q
          class="relative p-4 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 h-[90vh] overflow-y-auto"
        >  
          <!-- Título -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              id="title-e"
              name="title-e"
              value="${data.title}"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>               
          <!-- Descripción -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              id="description-e"
              name="description-e"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            > ${data.description}</textarea>
          </div>
        
          <!-- Duración -->
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
            <input
              type="number"
              id="duration-e"
              name="duration-e"
              value="${ data.duration }"
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        
          <!-- Póster -->
          <div>
            <label for="poster" class="block text-sm font-medium text-gray-700 mb-1">Póster</label>
            <input
              type="file"
              id="poster-e"
              name="poster-e"
              accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            >
            <div class="flex justify-between ">            
            <!-- Imagen actual -->    
              <div  class="mt-2 max-w-64">
                <p class="font-semibold" >Poster actual</p>
                <div class="relative">      
                    <img 
                      src="${data.image}" 
                      alt="Póster actual" 
                      class="max-w-64 h-auto rounded-md border border-gray-200 shadow-sm"
                    >                 
                </div>
              </div>
              <!-- preview -->
              <div id="poster-preview-cont" class="hidden relative mt-2 max-w-64">
                <p class="font-semibold" >Preview de la imagen</p>
                <div class="relative">      
                    <img id="preview-porster"
                      src= ""
                      alt="Póster actual" 
                      class="max-w-64 h-auto rounded-md border border-gray-200 shadow-sm"
                    >                 
                </div>
                    <button id="cerrar-preview" type="button" class="top-6 right-0 absolute px-2  bg-white rounded-lg active:bg-red-500 active:text-white">
                        x
                    </button>
              </div>
            </div>            
          </div>
        
          <!-- Productor -->
          <div>
            <label for="producer" class="block text-sm font-medium text-gray-700 mb-1">Productor</label>
            <input
              type="text"
              id="producer-e"
              name="produceer-e"
              value="${ data.producer }"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        
           <!-- categorias -->
           <div >
               <label for="categories" class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
               <button id="drop-edit-categories" type="button" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    Agregar o cambiar
               </button> 
               
               <div id="movie-category" class="hidden absolute z-50 top-42 right-10 left-10 shadow-lg rounded-lg bg-gray-200 border border-gray-300 p-2">
                    <div class="relative">
                       <h3 class="font-semibold">Seleccionar Categorias</h3>
                          <span id="cerrar-e" class="absolute z-50 top-0 right-0 font-semibold cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded-full">X</span>                                                                        
                   </div>                      
                    <div class="flex">                            
                        <input id="q-input-cat-edit" class="border py-0.5 px-3 border-gray-500 rounded-l-md" type="text" name="" >
                        <button class="border  border-blue-700 px-0.5 rounded-r-md bg-blue-700 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>    
                    <div id="movie-category-cont"></div>          
               </div>
               
               <span class="text-sm font-semibold bg-gray-300 px-1 rounded-md mt-1" >${data.categories.map(item => item.name).join(', ')}</span>

           </div>
          <!-- Fecha de lanzamiento -->
          <div>
            <label for="release" class="block text-sm font-medium text-gray-700 mb-1">Fecha de lanzamiento</label>
            <input
              type="date"
              id="release-e"
              name="release-e"
              value="${ data.release }"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        
          <!-- Botón de envío -->
          <div class="pt-4">
            <button
              id="movie-id"
              data-id="${data.id}"
              type="submit"
              class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Actualizar Película
            </button>
          </div>
        </form>`;

    document.getElementById('edit-movie-cont').addEventListener('click', (e) => {
        if(e.target.id === 'edit-movie-cont') {
            document.getElementById('edit-movie-cont').classList.add('hidden');
        }
    })

    let timerCatEdit;
    document.getElementById('q-input-cat-edit').addEventListener('input', (e) => {
        const value = e.target.value;

        clearTimeout(timerCatEdit);
        timerCatEdit = setTimeout(async ()=>{
            try{
                const res = await axios.get(`${urlApi}/category?q=${value}`)
                categoriesE(res.data.data).then()
            }catch (err){
                console.log(err);
            }
        },300)
    })

    document.getElementById('drop-edit-categories').addEventListener('click', async (e) => {
        const container = document.getElementById('movie-category');
        container.classList.toggle('hidden');
    })
    document.getElementById('cerrar-e').addEventListener('click', (e) => {
        document.getElementById('movie-category').classList.toggle('hidden');
    })
    categoriesE().then()
    async function categoriesE(query = null){
        const container = document.getElementById('movie-category-cont');
        container.innerHTML = '';
        try{
            const res = await axios.get(`${urlApi}/category`)
            let categories;
            if(query){
                categories = query;
            }else{
                categories = res.data.data;
            }
            const div = document.createElement('div');
            div.classList.add('grid', 'grid-cols-3', 'gap-2', 'px-4', 'py-2');
            console.log(data)
            categories.forEach((item) => {
                const label = document.createElement('label');
                const input = document.createElement('input');

                input.type = 'checkbox';
                input.id = item.id;
                input.value = item.id;
                input.name = item.name;
                input.classList.add('cursor-pointer', 'm-2', 'categories_id-e');

                data.categories.forEach((item) => {
                    if(input.id == item.id) {
                        input.checked = true;
                    }
                })

                label.classList.add('cursor-pointer');
                label.textContent = item.name;
                label.appendChild(input);
                div.appendChild(label);
            });
            container.appendChild(div);
        }catch(err){
            console.log(err);
        }
    }


    document.getElementById('poster-e').addEventListener('change', (e)=>{
        const file = e.target.files[0];
        const preview = document.getElementById('preview-porster');
        const contPreview = document.getElementById('poster-preview-cont');

        if(file){
            const reader = new FileReader();

            reader.onload = (e) => {
                preview.src = e.target.result;
                contPreview.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        }else{
            preview.src = "";
        }
    })

    document.getElementById('cerrar-preview').addEventListener('click', (e)=>{
        const preview = document.getElementById('preview-porster');
        const contPreview = document.getElementById('poster-preview-cont');
        const image = document.getElementById('poster-e');

        contPreview.classList.add('hidden');
        image.value = "";
        preview.src = "";
    })

    document.getElementById('edit-movie').addEventListener('submit', async (e)=>{
        e.preventDefault();
        const title = document.querySelector('#title-e').value;
        const description = document.querySelector('#description-e').value;
        const producer = document.querySelector('#producer-e').value;
        const release = document.querySelector('#release-e').value;
        const movieId = document.querySelector('#movie-id').dataset.id;
        const poster = (document.getElementById('poster-e').files[0] == undefined ? '' : document.getElementById('poster-e').files[0]);
        const duration = document.querySelector('#duration-e').value;

        let categories = [];
        const checks = document.querySelectorAll('.categories_id-e');
        checks.forEach(check => {
            if (check.checked) {
                categories.push(check.id);
            }
        });

        const editData = new FormData();
        editData.append('title', title);
        editData.append('description', description);
        editData.append('producer', producer);
        editData.append('release', release);
        editData.append('poster', poster);
        editData.append('duration', duration);
        editData.append('category_id', categories);

        console.log(editData.get('poster'));

        try{
            const res = await axios.post(`${urlApi}/movie/${movieId}`, editData);
            console.log(res);

            document.getElementById('edit-movie-cont').classList.remove('hidden');
            renderMenu();
            showToast('Pelicula actualizada')
        }catch(err){
            console.log(err);
        }

    })
}



