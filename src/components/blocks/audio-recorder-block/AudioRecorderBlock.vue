<template>
  <BlockWrapper :title="title" :description="description">
    <div class="flex h-12 w-full items-center gap-2 rounded-lg bg-blue-100 px-3">
      <button v-if="!isRecording && !audioUrl" class="flex size-8 items-center justify-center" @click="startRecording">
        <Mic class="size-5" />
      </button>
      <button
        v-if="!isRecording && audioUrl && !isPlaying"
        class="flex size-8 items-center justify-center"
        @click="startPlaying"
      >
        <CirclePlay class="size-5" />
      </button>
      <button
        v-if="!isRecording && audioUrl && isPlaying"
        class="flex size-8 items-center justify-center"
        @click="stopPlaying"
      >
        <CircleStop class="size-5" />
      </button>
      <button v-if="isRecording" class="flex size-8 items-center justify-center" @click="stopRecording">
        <CircleStop class="size-5" />
      </button>
      <span v-if="!audioUrl && !isRecording" class="grow">Нажмите, чтобы начать запись</span>
      <div v-if="isRecording" class="flex grow items-center gap-2">
        <span>Запись идет</span>
        <div class="size-3 animate-pulse rounded-full bg-red-500" />
      </div>
      <div v-if="!isRecording && audioUrl" class="grow">
        <div class="h-2 w-full overflow-hidden rounded-full bg-blue-300">
          <div class="h-full bg-primary" :style="{ width: `${playbackPercent}%` }" />
        </div>
      </div>
      <span v-if="!isPlaying && !isInPlayingProcess" class="flex w-14 justify-end">{{ formattedElapsedTime }}</span>
      <span v-if="isPlaying || isInPlayingProcess" class="flex w-14 justify-end">{{ formattedPlaybackTime }}</span>
      <button v-if="isPlaying || isInPlayingProcess" class="flex size-8 items-center justify-center" @click="seek(-5)">
        <Undo class="size-5" />
      </button>
      <button v-if="isPlaying || isInPlayingProcess" class="flex size-8 items-center justify-center" @click="seek(5)">
        <Redo class="size-5" />
      </button>
      <button v-if="!isRecording && audioUrl" class="flex size-8 items-center justify-center" @click="resetRecording">
        <Trash class="size-5" />
      </button>
    </div>
  </BlockWrapper>
</template>

<script setup lang="ts">
import BlockWrapper from '@/components/blocks/block-wrapper/BlockWrapper.vue';
import { useAudioRecorder } from '@/composables/use-audio-recorder.ts';
import { Mic, CircleStop, CirclePlay, Trash, Undo, Redo } from 'lucide-vue-next';

defineProps<{
  title: string;
  description?: string;
}>();

const {
  isRecording,
  startRecording,
  stopRecording,
  audioUrl,
  formattedElapsedTime,
  formattedPlaybackTime,
  resetRecording,
  startPlaying,
  stopPlaying,
  isPlaying,
  playbackPercent,
  isInPlayingProcess,
  seek,
} = useAudioRecorder();
</script>
