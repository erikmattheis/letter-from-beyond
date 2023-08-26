<template>
  <div class="surface">
    <ChatLog :chatHistory="messages" :showTypingIndicator="showTypingIndicator.value" />
    <PromptCard @response-submitted="handleUserResponse" />
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import ChatLog from "../components/ChatLog.vue";
import PromptCard from '../components/PromptCard.vue';

export default {
  name: 'Home',
  components: {
    ChatLog,
    PromptCard,
  },
  setup() {
    const showTypingIndicator = ref(false);
    const messages = ref([
      {
        "role": "system",
        "content": "You are John Waters, the funny shopkeeper. Goal: sell something. Not clear what. Give info each time. If 4-5 serious attempts to buy, sell. Otherwise, tease, add how you're a portfolio piece for Erik and players have played better. If plays 8-9 responses, give item free."
      }]);


    const getBotResponse = async (messages) => {

      console.log('messages', messages.value);
      showTypingIndicator.value = true;

      // messages.value.push({ role: "assistant", content: "rolling!" });

      try {
        const { data } = await axios.post('/.netlify/functions/ask', {
          messages: messages.value,
        });

        messages.value.push({ role: "assistant", content: data.answer });
      } catch (error) {
        throw new Error(error);
      }
      finally {
        showTypingIndicator.value = false;
      }

    };

    getBotResponse(messages);

    const handleUserResponse = (response) => {
      showTypingIndicator.value = true;
      messages.value.push({ role: "user", content: response });
      getBotResponse(messages);
    };

    return {
      messages,
      showTypingIndicator,
      handleUserResponse,
    };
  },
};
</script>