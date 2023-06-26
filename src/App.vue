<script lang="ts" setup>
import Tools from '@/components/tools/Tools.vue';
import Board from '@/components/board/Board.vue';
import { ref } from 'vue';
import DrawingBoard from './inc/board/DrawingBoard';

const drawingBoard = ref<DrawingBoard>()
</script>

<template>
  <header>
    <h1>
      Collaborative Drawing App by <a href="https://github.com/vadim-cvy" target="_blank">Vadim Cherepenichev</a>
    </h1>
  </header>

  <main>
    <!-- todo -->
    App description goes here
  </main>

  <aside>
    <Board @drawing-board-inited="board => drawingBoard = board"></Board>

    <Tools v-if="drawingBoard" :drawing-board="drawingBoard"></Tools>
  </aside>
</template>