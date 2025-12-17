<script setup>
import { useToast } from "@/composables/useToast";

const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="px-4 py-2 rounded shadow text-white"
      :class="{
        'bg-green-500': t.type === 'success',
        'bg-red-500': t.type === 'error',
        'bg-blue-500': t.type === 'info',
      }"
    >
      <div class="flex items-center gap-2">
        <span class="font-semibold">{{ t.message }}</span>
        <button @click="removeToast(t.id)">✖</button>
      </div>
    </div>
  </div>
</template>
