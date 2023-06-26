<script lang="ts" setup>
import Tool from '@/inc/tools/Tool';
import Color from '@/inc/tools/tool-settings/Color';

defineProps<{
  activeTool: Tool
}>()

const
  baseClass = 'active-tool-settings',
  cssPrefix = baseClass + '__'
</script>

<template>
  <ul :class="baseClass">
    <li
      v-for="(setting, settingName) in activeTool.settings"
      :key="setting.label"
      :class="{
        [`${cssPrefix}setting`]: true,
        [`${cssPrefix}setting_${settingName}`]: true,
        [`${cssPrefix}setting_type_color`]: setting instanceof Color,
      }"
    >
      <label :class="`${cssPrefix}setting__label`">
        {{ setting.label }}
      </label>

      <ul
        v-if="(setting instanceof Color)"
        :class="`${cssPrefix}setting__options`"
      >
        <li
          v-for="(option, optionIndex) in setting.options"
          :key="optionIndex"
          :class="{
            [`${cssPrefix}setting__option`]: true,
            [`${cssPrefix}setting__option_active`]: setting.selectedOptionIndex === optionIndex,
          }"
          :style="{
            backgroundColor: option.value,
            color: option.value,
          }"
          @click="setting.selectedOptionIndex = optionIndex"
        ></li>
      </ul>

      <select
        v-else
        v-model="setting.selectedOptionIndex"
      >
        <option
          v-for="(option, optionIndex) in setting.options"
          :key="optionIndex"
          :value="optionIndex"
        >
          {{ option.label }}
        </option>
      </select>
    </li>
  </ul>
</template>

<style lang="scss">
.active-tool-settings
{
  &__setting
  {
    margin-bottom: 1.5em;

    &:last-child
    {
      margin-bottom: 0;
    }

    &__label
    {
      display: block;
      margin-bottom: .2em;
    }

    select
    {
      width: 100%;
    }

    &__options
    {
      .active-tool-settings__setting_type_color &
      {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .2em .2em;
      }
    }

    &__option
    {
      .active-tool-settings__setting_type_color &
      {
        $border-width: 2px;

        padding-top: calc( 100% - $border-width * 2 );
        border: $border-width solid currentColor;
        cursor: pointer;

        &:hover,
        &_active
        {
          border-color: var(--accent-color);
        }
      }
    }
  }
}
</style>