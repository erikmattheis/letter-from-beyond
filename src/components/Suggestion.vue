<template>
  <fieldset>
    <button type="button" @click="$emit('ask', { prompt: suggestion1 })">{{ suggestion1 }}</button>
    <button type="button" @click="$emit('ask', { prompt: suggestion2 })">{{ suggestion2 }}</button>
  </fieldset>
</template>
<script>

</script>