<script lang="ts" setup>
import Tools from '@/components/tools/Tools.vue';
import Board from '@/components/board/Board.vue';
import { ref } from 'vue';
import DrawingBoard from './inc/board/DrawingBoard';

const drawingBoard = ref<DrawingBoard>()
</script>

<template>
  <div class="app-inner">
    <main class="hero">
      <div class="wrapper">
        <h1 class="hero__title">
          Collaborative Drawing App by <a href="https://github.com/vadim-cvy" target="_blank">Vadim Cherepenichev</a>
        </h1>

        <p class="hero__about">
          <!-- todo -->
          App description goes here
        </p>
      </div>
    </main>

    <aside class="scene">
      <Board @drawing-board-inited="board => drawingBoard = board"></Board>

      <Tools v-if="drawingBoard" :drawing-board="drawingBoard"></Tools>
    </aside>
  </div>
</template>

<style lang="scss">
$border: 1px solid #4b4b4b;

.app-inner
{
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto;
}

.wrapper
{
  padding-left: .5em;
  padding-right: .5em;
}

.hero
{
  text-align: center;
  border-bottom: $border;
  padding: .7em 0;

  &__title
  {
    margin-bottom: .5em;
  }
}

.scene
{
  display: flex;
}

.tools
{
  order: 1;
  border-right: $border;
}

.board
{
  order: 2;
}
</style>