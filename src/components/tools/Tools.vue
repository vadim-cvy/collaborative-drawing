<script lang="ts" setup>
import DrawingBoard from '@/inc/board/DrawingBoard';
import Pencil from '@/inc/tools/drawing-tools/Pencil';
import Line from '@/inc/tools/drawing-tools/shape-tools/Line';
import Tool from '@/inc/tools/Tool';
import { ref, watch } from 'vue';

const props = defineProps<{
  drawingBoard: DrawingBoard
}>()

const tools: Tool[] = [
  new Pencil( props.drawingBoard ),
  new Line( props.drawingBoard ),
]

const activeTool = ref( tools[0] )

watch( activeTool,
  ( newTool, oldTool ) =>
  {
    if ( oldTool )
    {
      oldTool.isSelected = false
    }

    newTool.isSelected = true
  },
  { immediate: true }
)
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

        <select v-model="setting.selectedOptionIndex">
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