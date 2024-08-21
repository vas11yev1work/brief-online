<template>
  <BlockWrapper :title="title" :description="description">
    <div class="relative">
      <div ref="emblaRef" class="embla overflow-hidden rounded-lg">
        <div class="embla__container">
          <div v-for="(block, i) in palettes" :key="i" class="embla__slide grid grid-cols-2 gap-4">
            <div
              v-for="palette in block"
              :key="palette.id"
              class="palette rounded-xl bg-white"
              @click="toggleItem(palette.id)"
            >
              <div class="relative cursor-pointer items-center px-14 py-10">
                <div class="palette__items flex w-full gap-2 transition">
                  <div
                    v-for="color in palette.palette"
                    :key="color"
                    class="h-32 w-full rounded-lg"
                    :style="{ backgroundColor: color }"
                  />
                </div>
                <div
                  v-if="selectedItems.includes(palette.id)"
                  class="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary"
                >
                  <Check class="size-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="absolute -left-14 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center"
        @click="emblaApi?.scrollPrev()"
      >
        <ChevronLeft class="size-8" />
      </button>
      <button
        class="absolute -right-14 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center"
        @click="emblaApi?.scrollNext()"
      >
        <ChevronRight class="size-8" />
      </button>
    </div>
  </BlockWrapper>
</template>

<script setup lang="ts">
import BlockWrapper from '@/components/blocks/block-wrapper/BlockWrapper.vue';
import { computed, ref } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  title: string;
  description?: string;
  palettes: { id: number; palette: string[] }[];
}>();

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true });

const selectedItems = ref<number[]>([]);

const palettes = computed<{ id: number; palette: string[] }[][]>(() => {
  const result = [];
  for (let i = 0; i < props.palettes.length; i += 4) {
    result.push(props.palettes.slice(i, i + 4));
  }
  return result;
});

function toggleItem(palette: number) {
  if (selectedItems.value.includes(palette)) {
    selectedItems.value = selectedItems.value.filter(item => item !== palette);
  } else {
    selectedItems.value = [...selectedItems.value, palette];
  }
}
</script>

<style scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
  gap: 1rem;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.palette {
  &:hover {
    .palette__items {
      transform: scale(1.05);
    }
  }
}
</style>
