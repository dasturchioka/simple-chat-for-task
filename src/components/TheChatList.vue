<script lang="ts" setup>
import { computed, ref } from "vue";
import { useChatStore } from "../store/chat";

const chatStore = useChatStore();

const term = ref("");

const filteredList = computed(() => {
  if (!term.value) return chatStore.chatList;

  return chatStore.chatList.filter(chat => {
    return chat.name.toLowerCase().includes(term.value.toLowerCase())
  })
});
</script>

<template>
  <div class="chat-list">
    <div class="chat-list__search">
      <input
        class="chat-list__search-input"
        type="text"
        v-model="term"
        placeholder="Search..."
      />
    </div>
    <div class="chat-list__users">
      <div v-for="chat in filteredList" :key="chat.id" class="user">
        <router-link class="user-link" :to="`/chat/${chat.id}`">
          <div class="user-img">
            <img :src="chat.image" alt="img" />
          </div>
          <div class="user-details">
            <div class="user-details__name-message">
              <h4 class="name">{{ chat.name }}</h4>
              <p class="message">
                {{ chat.messages[chat.messages.length - 1].text }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables";

.chat-list {
  padding: 20px;
  border-right: 1px solid $gray;
  display: flex;
  flex-direction: column;
  width: 680px;
  &__search {
    input {
      width: 100%;
      border: 2px solid $gray;
      outline: none;
      padding: 10px 20px;
      border-radius: 8px;
    }
  }
  &__users {
    margin: 20px 0;
    .user {
      border-radius: 8px;
      padding: 10px 15px;
      background: $gray;
      margin-bottom: 15px;
      &-link {
        display: flex;
        align-items: center;
        justify-content: start;
        .user-img {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 60px;
            border-radius: 100%;
          }
        }

        .user-details {
          margin-left: 10px;
          p {
            font-size: $text-sm;
            color: $gray-darker;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 37ch;
            white-space: nowrap;
          }
        }
      }
      &:has(> a.router-link-active.router-link-exact-active) {
        background: $active;
      }
    }
  }
}
</style>
