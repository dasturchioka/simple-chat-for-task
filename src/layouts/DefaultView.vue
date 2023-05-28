<script lang="ts" setup>
import TheProfile from "../components/TheProfile.vue";
import TheChatList from "../components/TheChatList.vue";
</script>

<template>
  <div class="default-layout">
    <nav class="layout-top navbar">
      <a class="navbar-logo" href="/">
        <img src="../assets/icons/logo.svg" alt="logo" />
      </a>
    </nav>
    <div class="wrapper">
      <the-profile></the-profile>
      <the-chat-list></the-chat-list>
      <div class="wrapper-pages">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/__variables.scss";
.navbar {
  width: 100%;
  background: #fff;
  padding: 20px 25px;
  border-bottom: 1px solid $gray;
}

.default-layout {
  height: 100vh;
  overflow: hidden;
  .wrapper {
    display: flex;
    height: 100%;
    &-pages {
      width: 100%;
    }
  }
}
</style>
