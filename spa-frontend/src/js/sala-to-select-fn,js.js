import axios from "axios";
import {urlApi} from "./utils.js";
import {renderModalAddFuncion} from "./modal-add-funcion.js";

export async function renderSalasToSelect(){
    if(document.getElementById('modal-select-sala-fn')){
        document.getElementById('modal-select-sala-fn').classList.remove('hidden');
        const container = document.getElementById('sala-container-fn');
        container.innerHTML = '';
        try{
            const res = await axios.get(`${urlApi}/room`);
            const data = res.data.data;
            console.log(data);
            data.forEach(room => {
                const col = document.createElement('div');
                col.classList.add('relative', 'rounded-lg','h-[100px]', 'overflow-hidden', 'transition-transform', 'hover:scale-105', 'shadow-md');
                col.innerHTML = `  
                    <button id="select-room-id" class="select-room-id cursor-pointer" data-id="${room.id}">                                        
                        <div class="text-black font-semibold absolute inset-0 bg-gray-300 flex flex-col justify-end p-3 ">
                            <p class="">Numero: ${room.number}</p
                            <p>Capacidad: ${room.capacity}<p>                          
                        </div>
                    </button>`;

                container.appendChild(col);
            })
        }catch(err){
            console.error(err);
        }

        const btns = document.querySelectorAll('.select-room-id');
        btns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                try{
                    const res = await axios.get(`${urlApi}/room/${id}`);
                    const data = res.data.data;
                    sessionStorage.setItem('room', JSON.stringify(data));
                    renderModalAddFuncion();
                    document.getElementById('modal-select-sala-fn').classList.add('hidden')
                }catch(err){
                    console.error(err);
                }
            })
        })

        document.getElementById('modal-select-sala-fn').addEventListener('click', e => {
            if(e.target === document.getElementById('modal-select-sala-fn')){
                e.target.classList.add('hidden')
            }
        })
    }
}