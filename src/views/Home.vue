<template>
  <div class="home">
    <ChatLog :chatHistory="messages" :showTypingIndicator="showTyping" />
    <PromptCard :prompt="prompt" @response-submitted="handleUserResponse" />
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

    let showTyping = ref(false);
    const greeting = 'Well, well, well, if it isn\'t my favorite persistent customer. What brings you back to my little den of oddities and eccentricities? Can\'t get enough of my charming company, I presume? Oh, don\'t roll your eyes at me, darling. I see that look you\'re giving me.';
    const messages = ref([{ text: greeting, isUser: false }]);
    const handleUserResponse = (response) => {
      showTyping = true;
      messages.value.push({ text: response, isUser: true });
      getBotResponse(response);
    };

    const getBotResponse = async (userResponse) => {
      try {
        const { data } = await axios.post('/.netlify/functions/ask', {
          prompt: userResponse,
        });
        messages.value.push({ text: data.answer, isUser: false });
      } catch (error) {
        throw new error;
      }
    };

    return {
      messages,
      prompt,
      handleUserResponse,
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: initial;
}

.chat-log {
  margin-top: 20px;
}

body {
  font-family: helvetica;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>