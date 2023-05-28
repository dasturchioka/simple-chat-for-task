<script setup lang="ts"></script>

<template>
  <div class="chat-select chat-not-found">
    <p class="chat-not-found__text">No chat selected yet...</p>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables";

.chat-not-found {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &__text {
    width: auto;
    background: $gray-darker;
    color: white;
    border-radius: 90px;
    padding: 2px 12px;
  }
}
</style>
