import axios from "axios";
import { showToast, urlApi } from "./utils.js";

export function renderAllCategories(flag) {
  const allCategoriesCont = document.getElementById("all-categories-cont");
  if (flag === false) {
    return;
  }
  allCategoriesCont.classList.remove("hidden");
  allCategoriesCont.innerHTML = `
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left  text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-4 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody id="category-table-body"></tbody>
            </table>
        </div>`;

  async function getCategories() {
    try {
      const res = await axios.get(`${urlApi}/category`);
      const data = await res.data.data;
      const body = document.getElementById("category-table-body");
      body.innerHTML = "";
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.classList.add("bg-white", "border-b", "border-gray-200");
        tr.innerHTML = `
                        <td scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <div class="input-cont flex gap-1 relative">
                                <input class="names" name="input-${item.id}" id="${item.id}" type="text" value="${item.name}" disabled>
                                <div id="acept-${item.id}" class="hidden flex gap-2 z-50"></div>
                            </div>
                        </td>
                        <td class="px-2 py-4 flex gap-4">
                            <button data-edit="${item.id}" type="button" class="edit-button cursor-pointer transition-colors duration-200 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>

                            <button data-delete="${item.id}" type="button" class="delete-button cursor-pointer transition-colors duration-200 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>`;
        body.appendChild(tr);
      });

      const btns = document.querySelectorAll(".delete-button");
      btns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          try {
            const res = await axios.delete(
              `${urlApi}/category/${btn.dataset.delete}`,
            );
            showToast("Categoria eliminada corretamente!");
            await getCategories();
          } catch (err) {
            console.log(err);
          }
        });
      });

      const editButtons = document.querySelectorAll(".edit-button");
      editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const inputs = document.querySelectorAll(".names");
          inputs.forEach((input) => {
            if (input.id === btn.dataset.edit) {
              input.disabled = false;
              input.focus();
              input.target = true;
              const cont = document.getElementById(`acept-${input.id}`);
              cont.classList.remove("hidden");
              cont.innerHTML = `
                                    <span id="update" class="bg-green-400 px-1 py-0.5 rounded-md items-center text-white cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>

                                    </span>
                                    <span  id="cancel-edit" class="bg-red-400 px-1 py-0.5 rounded-md items-center text-white cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </span>`;

              document
                .getElementById(`acept-${input.id}`)
                .addEventListener("click", (e) => {
                  getCategories();
                });

              document
                .getElementById("update")
                .addEventListener("click", async (e) => {
                  const name = document.getElementsByName(
                    `input-${input.id}`,
                  )[0].value;
                  try {
                    const res = await axios.put(`${urlApi}/category/${input.id}`,{
                        name: name,
                      },
                    );
                    showToast("Categoria actualizada corretamente!");
                    getCategories().then();
                  } catch (err) {
                    console.log(err);
                  }
                });
            }
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  getCategories().then((res) => {});
}
