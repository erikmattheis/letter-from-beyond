<template>
  <div class="card">
    <p>{{ response }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  response: String,
});
</script>
