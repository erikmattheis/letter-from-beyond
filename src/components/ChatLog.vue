<template>
  <div class="chat scroll">
    <template v-for="(message, index) in chatHistory" :key="index">
      <div
        v-if="message.role !== 'system'"
        class="messages"
        :class="message.role === 'user' ? 'mine' : 'yours'">
        <div
          class="message last">
          {{ message.content }}
        </div>
      </div>

      <div v-if="showTypingIndicator" class="messages yours">
        <div class="message last">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    chatHistory: Array,
    showTypingIndicator: Boolean,
  },
  methods: {
    handleScroll() {
      // Logic to remove items out of view to improve performance
    },
  },
};
</script>

<style scoped>
.chat {
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 0px;
}

.messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.yours .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}

.yours .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: #fff;
  border-bottom-right-radius: 10px;
}

.mine {
  align-items: flex-end;
}

.mine .message {
  color: #fff;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.mine .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: #fff;
  border-bottom-left-radius: 10px;
}
</style>
