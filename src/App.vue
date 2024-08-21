<template>
  <div>
    <div v-for="item in items" :key="item.title">
      <component :is="blocks[item.type]" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckboxBlock from '@/components/blocks/checkbox-block/CheckboxBlock.vue';
import ImageSelectorBlock from '@/components/blocks/image-selector-block/ImageSelectorBlock.vue';
import PaletteBlock from '@/components/blocks/palette-block/PaletteBlock.vue';
import AudioRecorderBlock from '@/components/blocks/audio-recorder-block/AudioRecorderBlock.vue';

const blocks = {
  checkbox: CheckboxBlock,
  imageSelector: ImageSelectorBlock,
  palette: PaletteBlock,
  audioRecorder: AudioRecorderBlock,
};

const items: { title: string; description?: string; type: keyof typeof blocks; [x: string]: any }[] = [
  {
    title: 'Какое настроение должен передавать логотип?',
    description: 'Выберите один или несколько вариантов',
    type: 'checkbox',
    items: ['Серьезный', 'Строгий', 'Детский', 'Дружелюбный', 'Романтичный', 'Молодежный', 'Динамичный'],
  },
  {
    title: 'Архетип бренда',
    description: 'Ну тут можно будет сделать красиво с картинками как на примере, пока чисто как тестовая реализация',
    type: 'checkbox',
    items: ['Любовник', 'Ребенок', 'Герой', 'Искатель'],
  },
  {
    title: 'Референсы',
    description: 'Выберите один или несколько логотипов, которые вам нравятся',
    type: 'imageSelector',
    class: 'bg-blue-200',
    items: [
      'https://logokurs.ru/img/logo/SVG-19.svg',
      'https://logokurs.ru/img/logo/SVG-20.svg',
      'https://logokurs.ru/img/logo/SVG-21.svg',
      'https://logokurs.ru/img/logo/SVG-22.svg',
      'https://logokurs.ru/img/logo/SVG-23.svg',
      'https://logokurs.ru/img/logo/SVG-24.svg',
      'https://logokurs.ru/img/logo/SVG-25.svg',
      'https://logokurs.ru/img/logo/SVG-26.svg',
      'https://logokurs.ru/img/logo/SVG-27.svg',
      'https://logokurs.ru/img/logo/SVG-28.svg',
      'https://logokurs.ru/img/logo/SVG-30.svg',
      'https://logokurs.ru/img/logo/SVG-31.svg',
    ],
  },
  {
    title: 'Цветовая палитра',
    type: 'palette',
    palettes: [
      { id: 1, palette: ['#C5AFA4', '#CC7E85', '#CF4D6F', '#A36D90'] },
      { id: 2, palette: ['#802392', '#9A98B5', '#CF4D6F', '#A0B9C6', '#A5F8D3'] },
      { id: 3, palette: ['#909CC2', '#084887', '#F58A07'] },
      { id: 4, palette: ['#FFAC81', '#FF928B', '#FEC3A6', '#EFE9AE', '#CDEAC0'] },
      { id: 5, palette: ['#D36135', '#7FB069', '#ECE4B7', '#E6AA68'] },
      { id: 6, palette: ['#7C6C77', '#AAA694', '#D1D0A3', '#EBF8B8'] },
      { id: 7, palette: ['#E3E7D3', '#BDC2BF', '#989C94', '#25291C'] },
      { id: 8, palette: ['#D8A47F', '#EF8354', '#EE4B6A', '#DF3B57', '#0F7173'] },
    ],
    class: 'bg-blue-100',
  },
  {
    title: 'Запишите свои пожелания',
    type: 'audioRecorder',
  },
];
</script>
