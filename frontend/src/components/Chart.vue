<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const props = defineProps<{
  data: Record<string, number>
  title?: string
}>()

const chartData = {
  labels: Object.keys(props.data),
  datasets: [
    {
      data: Object.values(props.data),
      backgroundColor: ['#f87171', '#99a1af'],
      borderWidth: 1
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' as const },
    title: {
      display: !!props.title,
      text: props.title || ''
    }
  }
}
</script>

<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>