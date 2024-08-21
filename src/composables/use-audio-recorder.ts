import { ref, computed, onUnmounted } from 'vue';

export function useAudioRecorder() {
  const mediaRecorder = ref<MediaRecorder | null>(null);
  const audioChunks = ref<Blob[]>([]);
  const isRecording = ref(false);
  const audioUrl = ref<string | null>(null);

  const secondsElapsed = ref<number>(0);
  const playbackPosition = ref<number>(0);
  const isPlaying = ref(false);
  const isInPlayingProcess = ref(false);

  let timerId: number | null = null;
  let audioElement: HTMLAudioElement | null = null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.value = new MediaRecorder(stream);
      audioChunks.value = [];

      mediaRecorder.value.ondataavailable = event => {
        audioChunks.value.push(event.data);
      };

      mediaRecorder.value.start();
      isRecording.value = true;
      startTimer();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.value) {
      mediaRecorder.value.stop();
      isRecording.value = false;

      mediaRecorder.value.onstop = () => {
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
        audioUrl.value = URL.createObjectURL(audioBlob);

        // Останавливаем все дорожки, чтобы выключитьА  микрофон
        if (mediaRecorder.value?.stream) {
          mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
        }

        audioElement = new Audio(audioUrl.value);
      };

      stopTimer();
    }
  };

  const resetRecording = () => {
    // Останавливаем все дорожки в mediaStream, если они есть
    if (mediaRecorder.value?.stream) {
      mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
    }

    if (isPlaying.value) {
      stopPlaying();
    }

    // Сбрасываем все состояния в начальные значения
    mediaRecorder.value = null;
    audioChunks.value = [];
    isRecording.value = false;
    audioUrl.value = null;
    secondsElapsed.value = 0;
    isPlaying.value = false;
    isInPlayingProcess.value = false;
    playbackPosition.value = 0;

    stopTimer();
  };

  const startTimer = () => {
    timerId = window.setInterval(() => {
      secondsElapsed.value++;
    }, 1000);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedElapsedTime = computed(() => {
    return formatTime(secondsElapsed.value);
  });

  const formattedPlaybackTime = computed(() => {
    return formatTime(playbackPosition.value);
  });

  const startPlaying = () => {
    if (audioUrl.value && audioElement) {
      audioElement.play();
      isPlaying.value = true;
      isInPlayingProcess.value = true;
      audioElement.ontimeupdate = () => {
        playbackPosition.value = Math.floor(audioElement!.currentTime);
      };
      audioElement.onended = () => {
        window.setTimeout(() => {
          isPlaying.value = false;
          isInPlayingProcess.value = false;
          playbackPosition.value = 0;
        }, 100);
      };
    }
  };

  const stopPlaying = () => {
    if (audioElement) {
      audioElement.pause();
      isPlaying.value = false;
      playbackPosition.value = Math.floor(audioElement.currentTime);
    }
  };

  const playbackPercent = computed(() => {
    return (playbackPosition.value / secondsElapsed.value) * 100;
  });

  onUnmounted(() => {
    resetRecording();
  });

  return {
    isRecording,
    audioUrl,
    secondsElapsed,
    formattedElapsedTime,
    formattedPlaybackTime,
    startRecording,
    stopRecording,
    resetRecording,
    startPlaying,
    stopPlaying,
    isPlaying,
    playbackPercent,
    isInPlayingProcess,
  };
}
