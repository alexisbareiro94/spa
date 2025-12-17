export const url = 'http://127.0.0.1:8000';
export const urlApi = 'http://127.0.0.1:8000/api';

export function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const bgColor = type === 'success' ? 'bg-green-300' : 'bg-red-300';
    const icon = type === 'success' ?
        `<svg class="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
        </svg>`  :
        `<svg class="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
        </svg>`;

    const toast = document.createElement('div');
    toast.className = `${bgColor} font-semibold text-gray-600 px-5 py-4 rounded-lg shadow-lg flex items-center space-x-2 opacity-0 transition-opacity duration-300`;
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => toast.classList.remove('opacity-0'), 10);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

export const renderCerrarSesionModal = () => {
    return `
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">¿Estás seguro?</h3>
            <p class="text-gray-600 mb-6">Estas seguro de cerrar sesion?</p>
            <div class="flex justify-end space-x-3">
                <button id="cancelBtn" class="cursor-pointer px-4 py-2 text-gray-700 font-medium rounded hover:bg-gray-100 transition">
                No, cancelar
                </button>
                <button id="confirmBtn" class="cursor-pointer px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition">
                Si, estoy seguro
                </button>
            </div>
        </div>`;
}
