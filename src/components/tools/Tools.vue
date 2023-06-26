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
  <section class="tools">
    <div class="wrapper">
      <ul>
        <li
          v-for="(tool, i) in tools"
          :key="i"
          @click="activeTool = tool"
          :class="{
            tools__item: true,
            tools__item_active: activeTool.label === tool.label,
          }"
        >
          {{ tool.label }}
        </li>
      </ul>

      <ul class="tools__active-tool-settings">
        <li
          v-for="(setting, settingKey) in activeTool.settings"
          :key="setting.label"
          class="tools__active-tool-settings__setting"
        >
          <label
            class="tools__active-tool-settings__setting__label"
            :for="'tools__active-tool-settings__setting__input_' + settingKey"
          >
            {{ setting.label }}
          </label>

          <select
            v-model="setting.selectedOptionIndex"
            class="tools__active-tool-settings__setting__input"
            :id="'tools__active-tool-settings__setting__input_' + settingKey"
          >
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
    </div>
  </section>
</template>

<style lang="scss">
.tools
{
  min-width: 4em;
  padding: .5em 0 1em;

  .wrapper
  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__item
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

  &__active-tool-settings__setting
  {
    margin-bottom: .5em;

    &:last-child
    {
      margin-bottom: 0;
    }

    &__label
    {
      display: block;
      margin-bottom: .2em;
    }

    &__input
    {
      width: 100%;
    }
  }
}
</style>