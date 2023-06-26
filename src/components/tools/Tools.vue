<script lang="ts" setup>
import DrawingBoard from '@/inc/board/DrawingBoard';
import Pencil from '@/inc/tools/drawing-tools/Pencil';
import Line from '@/inc/tools/drawing-tools/shape-tools/Line';
import Tool from '@/inc/tools/Tool';
import { ref, watch } from 'vue';
import ActiveToolSettings from './active-tool-settings/ActiveToolSettings.vue';

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
  <section class="tools">
    <div class="wrapper">
      <ul>
        <li
          v-for="(tool, i) in tools"
          :key="i"
          @click="activeTool = tool"
          :class="{
            tool: true,
            tool_active: activeTool.label === tool.label,
          }"
        >
          {{ tool.label }}
        </li>
      </ul>

      <ActiveToolSettings v-if="activeTool" :active-tool="activeTool"></ActiveToolSettings>
    </div>
  </section>
</template>

<style lang="scss">
.tools
{
  min-width: 4em;
  padding: .5em 0 1em;

  & > .wrapper
  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
}

.tool
{
  margin-bottom: .5em;
  cursor: pointer;

  &:last-child
  {
    margin-bottom: 0;
  }

  &:hover,
  &_active
  {
    color: var(--accent-color);
  }
}
</style>