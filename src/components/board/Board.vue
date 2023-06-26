<script setup lang="ts">
import DrawingBoard from '@/inc/board/DrawingBoard';
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'drawingBoardInited', drawingBoard: DrawingBoard): void
}>()

const
  underlyingCanvasElement = ref<HTMLCanvasElement>(),
  topCanvasElement = ref<HTMLCanvasElement>()

onMounted(() =>
{
  if ( ! underlyingCanvasElement.value )
  {
    throw new Error( 'Bottom layers canvas element is not set!' )
  }

  if ( ! topCanvasElement.value )
  {
    throw new Error( 'Top layer canvas element is not set!' )
  }

  const drawingBoard = new DrawingBoard( topCanvasElement.value, underlyingCanvasElement.value )

  emit( 'drawingBoardInited', drawingBoard )
})
</script>

<template>
  <section>
    <canvas ref="underlyingCanvasElement"></canvas>
    <canvas ref="topCanvasElement"></canvas>
  </section>
</template>