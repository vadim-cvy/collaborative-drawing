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
  <section class="board">
    <canvas ref="underlyingCanvasElement" class="canvas canvas_uderlying"></canvas>
    <canvas ref="topCanvasElement" class="canvas canvas_top"></canvas>
  </section>
</template>

<style lang="scss">
.board
{
  position: relative;
  width: 100%;
  overflow: hidden;
}

.canvas
{
  position: absolute;
  left: 0;
  top: 0;

  &_uderlying
  {
    background-color: #fff;
  }
}
</style>