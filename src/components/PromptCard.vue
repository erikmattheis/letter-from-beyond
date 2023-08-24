<template>
  <div class="card">
    <input v-model="response" placeholder="What kind of store is this?" @keyup.enter="submitResponse" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    prompt: String,
  },
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

<style scoped>
.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  font: inherit;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}
</style>
