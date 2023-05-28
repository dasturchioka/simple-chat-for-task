<script setup lang="ts">
import { useRoute } from "vue-router";
import { useChatStore } from "../store/chat";
import { computed, ref, nextTick, onMounted } from "vue";

const chatStore = useChatStore();
const route = useRoute();

const message = ref("");
const chatBody = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

const selectedChat = computed(() => {
  return chatStore.getChat(route.params.id.toString());
});

const getLastOnlineText = (lastOnline: Date) => {
  const currentTime = new Date();
  const diffInMinutes = Math.floor(
    (currentTime.getTime() - lastOnline.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 5) {
    return "Online";
  } else if (diffInMinutes < 60) {
    return `last seen ${diffInMinutes} minutes ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `last seen ${diffInHours} hours ago`;
  }
};

const sendMessage = () => {
  if (message.value.trim().length === 0) {
    alert("Type something before you send");
    return;
  }

  chatStore.addMessage(
    selectedChat.value?.id as string,
    "Sardor Aminov",
    message.value
  );

  nextTick(() => {
    scrollToBottom();
    message.value = "";
  });
};
</script>

<template>
  <div class="chat-page">
    <header class="page-header">
      <h4 class="header-name">{{ selectedChat?.name }}</h4>
      <p>{{ getLastOnlineText(selectedChat?.lastOnline as Date) }}</p>
    </header>
    <div ref="chatBody" class="page-messages">
      <div
        v-for="message in selectedChat?.messages"
        :class="[
          'message',
          message?.from !== 'Sardor Aminov' ? 'others' : 'mine',
        ]"
      >
        <div class="message-text-content">
          <h4 class="from">{{ message.from }}</h4>
          <p class="text">{{ message.text }}</p>
        </div>
        <div class="message-options">
          <button
            @click="
              chatStore.deleteMessage(selectedChat?.id as string, message.id)
            "
            class="option delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                fill="none"
                stroke="#6c757d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="52"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="52"
                d="M80 112h352"
              />
              <path
                d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
                fill="none"
                stroke="#6c757d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          </button>
          <button
            @click="
              chatStore.likeMessage(selectedChat?.id as string, message.id)
            "
            class="option like"
          >
            <svg
              v-if="!message.liked"
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                fill="none"
                stroke="#6c757d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="52"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="red"
                d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage()" class="page-form">
      <input
        v-model="message"
        class="form-input"
        type="text"
        placeholder="Type and hit the Enter"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables";
.chat-page {
  padding: 10px;
  position: relative;
  height: 80%;
  .page-header {
    width: 100%;
    background: $gray;
    padding: 10px;
    border-radius: 4px;
    p {
      font-size: $text-sm;
      color: $gray-darker;
    }
  }
  .page-messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    .message {
      min-width: 262px;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      &-options {
        display: flex;
        align-items: center;
        button {
          margin: 0 5px;
          width: 20px;
        }
      }
      &-text-content {
        width: 100%;
        max-width: 70%;
        margin: 10px 0;
        h4 {
          margin-bottom: 4px;
        }
        p {
          word-wrap: break-word;
        }
      }
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .message.others {
      align-self: flex-start;
      align-items: flex-start;
      .message-text-content {
        background: $gray;
        border-radius: 6px;
        padding: 15px 20px;
      }
    }
    .message.mine {
      align-self: flex-end;
      align-items: flex-end;
      margin-right: 10px;
      .message-text-content {
        background: $green;
        border-radius: 6px;
        padding: 15px 20px;
      }
    }
  }
  .page-form {
    margin-top: 10px;
    input {
      width: 100%;
      background: #fff;
      outline: none;
      border: 2px solid $gray;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>
