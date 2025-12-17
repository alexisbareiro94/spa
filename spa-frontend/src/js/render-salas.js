import axios from "axios";

export function renderSalas() {
    const container = document.getElementById('rooms-cont');
    container.innerHTML = `
<div class="bg-gray-100 p-4 md:p-6">
  <div class="max-w-6xl mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Salas de Cine</h1>
      <p class="text-gray-600">Resumen general de todas las salas</p>
    </header>

    <!-- Lista de salas -->
    <div class="space-y-5">
      <!-- Sala 1 -->
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Sala 1 — Estándar</h2>
          <p class="text-gray-700"><span class="font-medium">Película:</span> Barbie</p>
          <p class="text-gray-600 text-sm">09/10/2025 • 18:00</p>
        </div>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-center">
            <p class="text-gray-600">Total</p>
            <p class="font-bold text-gray-800">60</p>
          </div>
          <div class="text-center">
            <p class="text-green-600">Disponibles</p>
            <p class="font-bold text-green-700">42</p>
          </div>
          <div class="text-center">
            <p class="text-red-600">Ocupados</p>
            <p class="font-bold text-red-700">18</p>
          </div>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Ver detalles
        </button>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Sala 5 — Estándar</h2>
            <p class="text-gray-500 italic">Sin película asignada</p>
            <p class="text-gray-400 text-sm">—</p>
          </div>
          <div class="flex flex-wrap gap-4 text-sm">
            <div class="text-center">
              <p class="text-gray-600">Total</p>
              <p class="font-bold text-gray-800">60</p>
            </div>
            <div class="text-center">
              <p class="text-green-600">Disponibles</p>
              <p class="font-bold text-green-700">60</p>
            </div>
            <div class="text-center">
              <p class="text-red-600">Ocupados</p>
              <p class="font-bold text-red-700">0</p>
            </div>
          </div>
          <button class="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg cursor-not-allowed" disabled>
            Sin función
          </button>
        </div>

      <!-- Sala 2 -->
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Sala 1 — 3D</h2>
          <p class="text-gray-700"><span class="font-medium">Película:</span> Oppenheimer</p>
          <p class="text-gray-600 text-sm">09/10/2025 • 21:15</p>
        </div>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-center">
            <p class="text-gray-600">Total</p>
            <p class="font-bold text-gray-800">70</p>
          </div>
          <div class="text-center">
            <p class="text-green-600">Disponibles</p>
            <p class="font-bold text-green-700">12</p>
          </div>
          <div class="text-center">
            <p class="text-red-600">Ocupados</p>
            <p class="font-bold text-red-700">58</p>
          </div>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Ver detalles
        </button>
      </div>

      <!-- Sala 3 -->
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Sala 3 — IMAX Premium</h2>
          <p class="text-gray-700"><span class="font-medium">Película:</span> Avatar: El Sentido del Agua</p>
          <p class="text-gray-600 text-sm">09/10/2025 • 20:30</p>
        </div>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-center">
            <p class="text-gray-600">Total</p>
            <p class="font-bold text-gray-800">80</p>
          </div>
          <div class="text-center">
            <p class="text-green-600">Disponibles</p>
            <p class="font-bold text-green-700">52</p>
          </div>
          <div class="text-center">
            <p class="text-red-600">Ocupados</p>
            <p class="font-bold text-red-700">25</p>
          </div>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Ver detalles
        </button>
      </div>

      <!-- Sala 4 -->
      <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Sala 4 — VIP</h2>
          <p class="text-gray-700"><span class="font-medium">Película:</span> Dune: Parte Dos</p>
          <p class="text-gray-600 text-sm">09/10/2025 • 19:45</p>
        </div>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-center">
            <p class="text-gray-600">Total</p>
            <p class="font-bold text-gray-800">40</p>
          </div>
          <div class="text-center">
            <p class="text-green-600">Disponibles</p>
            <p class="font-bold text-green-700">5</p>
          </div>
          <div class="text-center">
            <p class="text-red-600">Ocupados</p>
            <p class="font-bold text-red-700">35</p>
          </div>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Ver detalles
        </button>
      </div>
    </div>
  </div>
</div>`;
}