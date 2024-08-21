<template>
  <BlockWrapper :title="title" :description="description">
    <div class="flex flex-wrap gap-3">
      <Button
        v-for="(item, i) in items"
        :key="i"
        :variant="selectedItems.includes(item) ? 'default' : 'secondary'"
        size="lg"
        class="h-12 text-lg"
        @click="toggleItem(item)"
      >
        {{ item }}
      </Button>
    </div>
  </BlockWrapper>
</template>

<script setup lang="ts">
import BlockWrapper from '@/components/blocks/block-wrapper/BlockWrapper.vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

defineProps<{
  title: string;
  description?: string;
  items: string[];
}>();

const selectedItems = ref<string[]>([]);

function toggleItem(text: string) {
  if (selectedItems.value.includes(text)) {
    selectedItems.value = selectedItems.value.filter(item => item !== text);
  } else {
    selectedItems.value = [...selectedItems.value, text];
  }
}
</script>
