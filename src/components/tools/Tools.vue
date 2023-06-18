<script lang="ts" setup>
import Line from '@/inc/tools/Line';
import Pencil from '@/inc/tools/Pencil';
import Tool from '@/inc/tools/Tool';
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'activeToolUpdated', tool: Tool): void
}>()

const tools: Tool[] = [
  new Pencil(),
  new Line(),
]

const activeTool = ref( tools[0] )

watch( activeTool, tool => emit( 'activeToolUpdated', tool ) )
</script>

<template>
  <section>
    <ul>
      <li
        v-for="(tool, i) in tools"
        :key="i"
        @click="activeTool = tool"
      >
        {{ tool.label }}
      </li>
    </ul>

    <ul>
      <li v-for="setting in activeTool.settings" :key="setting.label">
        {{ setting.label }}

        <select v-model="setting.selectedOption">
          <option
            v-for="(option, i) in setting.options"
            :key="i"
            :value="i"
          >
            {{ option.label }}
          </option>
        </select>
      </li>
    </ul>
  </section>
</template>