<script lang="ts" setup>
import Line from '@/inc/tools/Line';
import Pencil from '@/inc/tools/Pencil';
import Tool from '@/inc/tools/Tool';
import { ref, watch } from 'vue';

const tools: Tool[] = [
  new Pencil(),
  new Line(),
]

const selectedTool = ref( tools[0] )

watch( selectedTool, ( newTool, oldTool ) =>
{
  oldTool.isSelected = false
  newTool.isSelected = true
})
</script>

<template>
  <section>
    <ul>
      <li
        v-for="(tool, i) in tools"
        :key="i"
        @click="selectedTool = tool"
      >
        {{ tool.label }}
      </li>
    </ul>

    <ul>
      <li v-for="setting in selectedTool.settings" :key="setting.label">
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