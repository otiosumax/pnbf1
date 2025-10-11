<script setup>
import * as mdi from '@mdi/js'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }, // например: "mdiAccount"
  size: { type: Number, default: 24 }
})

const path = computed(() => mdi[props.name])
</script>

<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
  >
    <path :d="path" />
  </svg>
</template>