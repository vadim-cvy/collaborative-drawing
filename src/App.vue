<script lang="ts" setup>
import Tools from '@/components/tools/Tools.vue';
import Board from '@/components/board/Board.vue';
import { ref } from 'vue';
import Tool from './inc/tools/Tool';

const activeTool = ref<Tool>()
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
    <Tools @active-tool-updated="tool => activeTool = tool"></Tools>

    <Board v-if="activeTool" :active-tool="activeTool"></Board>
  </aside>
</template>