<script setup lang="ts">
import Canvas from '@/inc/drawing/canvas/Canvas';
import TopLayerCanvas from '@/inc/drawing/canvas/TopLayerCanvas';
import Tool from '@/inc/tools/Tool';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  activeTool: Tool
}>()

const
  bottomLayersCanvasElement = ref<HTMLCanvasElement>(),
  topLayerCanvasElement = ref<HTMLCanvasElement>()

onMounted(() =>
{
  if ( ! bottomLayersCanvasElement.value )
  {
    throw new Error( 'Bottom layers canvas element is not set!' )
  }

  if ( ! topLayerCanvasElement.value )
  {
    throw new Error( 'Top layer canvas element is not set!' )
  }

  const topLayerCanvas = new TopLayerCanvas(
    topLayerCanvasElement.value,
    new Canvas( bottomLayersCanvasElement.value ),
    props.activeTool,
  )

  watch( () => props.activeTool, tool => topLayerCanvas.activeTool = tool )
})
</script>

<template>
  <section>
    <canvas ref="bottomLayersCanvasElement"></canvas>
    <canvas ref="topLayerCanvasElement"></canvas>
  </section>
</template>