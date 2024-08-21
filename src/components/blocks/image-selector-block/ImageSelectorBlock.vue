<template>
  <BlockWrapper :title="title" :description="description">
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(image, i) in items"
        :key="i"
        class="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white p-8 transition-all hover:p-6"
        @click="toggleItem(image)"
      >
        <div
          v-if="selectedItems.includes(image)"
          class="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary"
        >
          <Check class="size-4 text-white" />
        </div>
        <img :src="image" alt="logo" />
      </div>
    </div>
  </BlockWrapper>
</template>

<script setup lang="ts">
import BlockWrapper from '@/components/blocks/block-wrapper/BlockWrapper.vue';
import { Check } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
  title: string;
  description?: string;
  items: string[];
}>();

const selectedItems = ref<string[]>([]);

function toggleItem(image: string) {
  if (selectedItems.value.includes(image)) {
    selectedItems.value = selectedItems.value.filter(item => item !== image);
  } else {
    selectedItems.value = [...selectedItems.value, image];
  }
}
</script>
