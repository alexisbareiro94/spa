//
// <div class="bg-gray-100 p-4 md:p-6">
//     <div class="max-w-6xl mx-auto">
//         <!-- Encabezado -->
//         <header class="mb-8">
//             <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Salas de Cine</h1>
//             <p class="text-gray-600 text-sm md:text-base">Vista administrativa - Sala 3</p>
//         </header>
//
//         <!-- Información de la sala y película -->
//         <div class="bg-white rounded-xl shadow-md p-5 md:p-6 mb-6">
//             <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div>
//                     <h2 class="text-xl md:text-2xl font-semibold text-gray-800">Sala 3 — IMAX Premium</h2>
//                     <p class="text-gray-600 text-sm md:text-base">
//                         Capacidad total: <span class="font-medium">80 asientos</span>
//                     </p>
//                 </div>
//                 <div class="bg-blue-50 p-4 rounded-lg w-full md:w-auto">
//                     <h3 class="font-bold text-gray-800">Película en proyección</h3>
//                     <p class="text-gray-800 font-medium">Avatar: El Sentido del Agua</p>
//                     <p class="text-gray-600 text-sm">
//                         09/10/2025 • 20:30
//                     </p>
//                 </div>
//             </div>
//         </div>
//
//         <!-- Estado de asientos -->
//         <div class="bg-white rounded-xl shadow-md p-5 md:p-6 mb-6">
//             <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
//                 <h3 class="text-lg md:text-xl font-semibold text-gray-800">Distribución de Asientos</h3>
//                 <div class="flex flex-wrap gap-4 text-sm">
//                     <div class="flex items-center gap-2">
//                         <div class="w-4 h-4 bg-green-500 rounded-sm"></div>
//                         <span>Disponible</span>
//                     </div>
//                     <div class="flex items-center gap-2">
//                         <div class="w-4 h-4 bg-red-500 rounded-sm"></div>
//                         <span>Ocupado</span>
//                     </div>
//                     <div class="flex items-center gap-2">
//                         <div class="w-4 h-4 bg-gray-300 rounded-sm"></div>
//                         <span>No disponible</span>
//                     </div>
//                 </div>
//             </div>
//
//             <!-- Simulación de asientos (5 filas x 10 columnas) -->
//             <div class="space-y-3">
//                 <!-- Fila A -->
//                 <div class="flex justify-center gap-2">
//                     <span class="w-6 text-center text-gray-500 self-end text-sm">A</span>
//                     <div class="grid grid-cols-10 gap-2">
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">1</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">2</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">3</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">4</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">5</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">6</div>
//                         <div class="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs">7</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">8</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">9</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">10</div>
//                     </div>
//                 </div>
//
//                 <!-- Fila B -->
//                 <div class="flex justify-center gap-2">
//                     <span class="w-6 text-center text-gray-500 self-end text-sm">B</span>
//                     <div class="grid grid-cols-10 gap-2">
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">1</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">2</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">3</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">4</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">5</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">6</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">7</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">8</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">9</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">10</div>
//                     </div>
//                 </div>
//
//                 <!-- Fila C -->
//                 <div class="flex justify-center gap-2">
//                     <span class="w-6 text-center text-gray-500 self-end text-sm">C</span>
//                     <div class="grid grid-cols-10 gap-2">
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">1</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">2</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">3</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">4</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">5</div>
//                         <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">6</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">7</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">8</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">9</div>
//                         <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">10</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//         <!-- Resumen de disponibilidad -->
//         <div class="bg-white rounded-xl shadow-md p-5 md:p-6">
//             <h3 class="text-lg font-semibold text-gray-800 mb-3">Resumen de Disponibilidad</h3>
//             <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div class="bg-green-50 p-4 rounded-lg">
//                     <p class="text-green-800 font-medium">Asientos disponibles</p>
//                     <p class="text-2xl font-bold text-green-700">52</p>
//                 </div>
//                 <div class="bg-red-50 p-4 rounded-lg">
//                     <p class="text-red-800 font-medium">Asientos ocupados</p>
//                     <p class="text-2xl font-bold text-red-700">25</p>
//                 </div>
//                 <div class="bg-gray-50 p-4 rounded-lg">
//                     <p class="text-gray-800 font-medium">No disponibles / mantenimiento</p>
//                     <p class="text-2xl font-bold text-gray-700">3</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>