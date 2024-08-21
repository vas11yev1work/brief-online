<template>
  <div class="w-full py-12">
    <div class="mx-auto w-full max-w-screen-md">
      <h2 class="text-4xl font-bold">{{ title }}</h2>
      <p v-if="description" class="mt-4 text-xl text-muted-foreground">{{ description }}</p>
      <div class="mt-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
