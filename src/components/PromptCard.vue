<template>
  <div class="card bottom">
    <input v-model="response" placeholder="What kind of store is this?" @keyup.enter="submitResponse" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup(props, { emit }) {
    const response = ref('');

    const submitResponse = () => {
      emit('response-submitted', response.value);
      response.value = '';
    };



    return {
      response,
      submitResponse,
    };
  },
};
</script>

<style scoped></style>
