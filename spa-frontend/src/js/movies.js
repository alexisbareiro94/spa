import axios from "axios";
import {urlApi} from "./utils.js";
import {modalEditMovie} from "./moda-edit-movie.js";

export async function loadMovies(movies = null) {
    try{
        const cont =  document.getElementById('movies-cont')
        cont.innerHTML = '';
        let data;
        if(movies){
            data = movies;
        }else{
           const res = await axios.get(`${urlApi}/movie`);
           data = res.data.data;
        }

       data.forEach(movie => {
           const categories = movie.categories.map(item => item.name).join(', ');

           const div = document.createElement('div');
           div.classList.add('bg-white',  'rounded-lg', 'shadow-sm', 'border', 'border-gray-200', 'flex', 'justify-between', 'items-center');
            div.innerHTML = `                                    
                    <div class="flex items-center gap-4 relative">                                                                   
                         <div>                        
                            <img  class="w-full h-32" src="${movie.image}" alt="portada de la pelicula" srcset="">   
                        </div>
                         <div>                         
                            <h2 id="m-title" class="text-2xl font-semibold text-gray-800">${movie.title}</h2>
                            <div id="m-categories" class="flex gap-1">                       
                                <p  class="text-gray-900 px-1.5 bg-gray-200 text-xs rounded-lg font-semibold">${categories}</p>                           
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 p-5">
                        <button data-movieid="${movie.id}" class="edit-movie cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium">Editar</button>
                        <button data-movieid="${movie.id}" class="delete-movie cursor-pointer text-red-600 hover:text-red-800 text-sm font-medium">Eliminar</button>
                    </div>                                        
                    `
            cont.appendChild(div);
       })
    }catch(err){
        console.log(err);
    }
    const editBtns = document.querySelectorAll('.edit-movie')
    editBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            try{
                const res = await axios.get(`${urlApi}/movie/${btn.dataset.movieid}`);
                const data = res.data.data;
                modalEditMovie(data);
            }catch(err){
                console.log(err);
            }
        })
    })

    const deleteBtns = document.querySelectorAll('.delete-movie');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const modal = document.querySelector('#modal-delete-movie');
            const id = btn.dataset.movieid;
            modal.classList.remove('hidden');
            modal.innerHTML = ` 
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow-sm ">
                            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center >
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this product?</h3>
                                <button id="confirm-delete-movie" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button id="cancel-delete-movie" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                            </div>
                        </div>
                    </div>`
            document.getElementById('cancel-delete-movie').addEventListener('click', e => {
                modal.classList.add('hidden');
            })

            document.getElementById('confirm-delete-movie').addEventListener('click', async e => {
                try{
                    const res = await axios.delete(`${urlApi}/movie/${id}`)
                    console.log(res)
                }catch (err){
                    console.log(err);
                }
            })
        })

    })
}

