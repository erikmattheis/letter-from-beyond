<template>
  <div class="surface">
    <ChatLog :chatHistory="chatHistory" :showTypingIndicator="typingIndicator" />
    <PromptCard @response-submitted="handleUserResponse" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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
        "content": "Chat game: You ('assistant') are John Waters playing funny shopkeeper Quintin, user ('user') is customer. Goal: sell something. Not clear what. Give info each time. Explain game little when you greet customer. If 2 or more serious attempts to buy, 40% prob you sell. Otherwise, tease, add how you're a portfolio piece for Erik and players have played better. If plays 8-9 responses, give item free."
      }]);

    const getRecentMessages = (messages) => {
      const systemMessages = [...messages.value[0]]
      const recentMessages = messages.value.slice(-10);
      return [...systemMessages, ...recentMessages];
    };

    const functions = [
      {
        name: "getRecentMessages",
        description: "Get the system messages plus the ten most recent messages",
        parameters: {
          type: "object",
          properties: {
            messages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  role: { type: "string" },
                  content: { type: "string" },
                },
                required: ["role", "content"],
              },
            },
          },
          required: ["messages"],
        },
      },
    ];

    const getBotResponse = async (messages) => {
      let retries = 0;
      let response = null;

      while (retries < 2 && !response) {
        showTypingIndicator.value = true;

        if (retries === 0) {
          const mutteringPhrases = [
            "Hmm, let me think...",
            "Just a moment, please...",
            "I'm working on it...",
            "Hold on, I'm almost there...",
          ];
          const mutteringPhrase = mutteringPhrases[Math.floor(Math.random() * mutteringPhrases.length)];

          // Add the muttering phrase to the chat history
          messages.value.push({ role: "none", content: mutteringPhrase });
        }
        const sliced = [messages.value[0], ...messages.value.filter((o) => o.role !== "none").slice(-4)];
        try {
          const { data } = await axios.post('/.netlify/functions/ask', {
            messages: sliced
          });
          console.log('data', data);
          response = data.answer;

        } catch (error) {
          console.log('now error', error);
          if (error.errorType === "TimeoutError" || error.err === 'ECONNABORTED') {
            // Timeout error, retry the request
            console.log('retrying...')
            retries++;
          } else {
            console.log('then error', error);
            // Other error, throw it
            throw new Error(error);
          }
        } finally {

          showTypingIndicator.value = false;
        }


        if (!response) {
          // If all retries failed, add an error message to the chat history
          messages.value.push({ role: "assistant", content: "Sorry, I'm having trouble connecting to the server. Please try again later." });
        } else {
          // If a response was received, add it to the chat history
          messages.value.push({ role: "assistant", content: response });
        }
      };

      //getBotResponse(messages);


    }
    const handleUserResponse = (response) => {
      showTypingIndicator.value = true;
      messages.value.push({ role: "user", content: response });
      getBotResponse(messages);
    };

    const chatHistory = computed(() => {
      return messages.value || [];
    });

    const typingIndicator = computed(() => {
      return showTypingIndicator.value || false;
    });
    return {
      chatHistory,
      typingIndicator,
      handleUserResponse,
    };
  }
};
</script>