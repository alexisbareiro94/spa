import axios from "axios";
import {urlApi} from "./utils.js";
import {renderModalAddFuncion} from "./modal-add-funcion.js";

export async function renderMoviesToSelect() {
    if(document.getElementById('modal-select-movie-fn')){
        document.getElementById('modal-select-movie-fn').classList.remove("hidden");
        const container = document.getElementById('movie-container-fn');
        container.innerHTML = '';
        try{
            const res = await axios.get(`${urlApi}/movie`);
            const data = res.data.data;

            data.forEach(movie => {
                const categoriesText = movie.categories.map(cat => cat.name).join(', ');

                const col = document.createElement('div');
                col.classList.add('relative', 'rounded-lg','h-[200px]', 'overflow-hidden', 'transition-transform', 'hover:scale-105', 'shadow-md');
                col.innerHTML = `
                    <button id="select-movieid" class="select-movieid cursor-pointer" data-id="${movie.id}">                
                        <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover object-center">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-3 text-white">
                            <h4 class="font-bold text-sm truncate">${movie.title} ● ${movie.year}</h4>
                            <p class="text-xs opacity-90 mt-1">${categoriesText}</p>
                        </div>
                    </button>`;
                container.appendChild(col);
            })

            const btns = document.querySelectorAll('.select-movieid');
            btns.forEach(btn => {
                btn.addEventListener('click', async e => {
                    try{
                        const id = btn.dataset.id;
                        const res = await axios.get(`${urlApi}/movie/${id}`);
                        sessionStorage.setItem('movie', JSON.stringify(res.data.data));
                        renderModalAddFuncion();
                        document.getElementById('modal-select-movie-fn').classList.add("hidden");

                    }catch(err){
                        console.log(err);
                    }
                })
            })
        }catch(err){
            console.log(err);
        }

        document.getElementById('modal-select-movie-fn').addEventListener('click', e => {
            if(e.target === document.getElementById('modal-select-movie-fn')) {
                document.getElementById('modal-select-movie-fn').classList.add('hidden');
            }
        })
    }
}
