<script lang="ts" setup></script>

<template>
  <div class="profile">
    <div class="profile-info">
      <div class="profile-info__img">
        <img src="../assets/icons/avatar.webp" alt="avatar" />
      </div>
      <div class="profile-info__name">
        <p class="name">Sardor Aminov</p>
      </div>
    </div>
    <div class="profile-settings">
      <button class="profile-settings__button">
        <img src="../assets/icons/home.svg" alt="home-icon" />
        Home page
      </button>
      <button class="profile-settings__button">
        <img src="../assets/icons/chat.svg" alt="chat-icon" />
        Chat
      </button>
      <button class="profile-settings__button">
        <img src="../assets/icons/settings.svg" alt="settings-icon" />
        Settings
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables";
.profile {
  background: #fff;
  border-right: 1px solid $gray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  &-info {
    text-align: center;
    font-size: $text-md;
    font-weight: 600;
    color: $gray-darker;
    &__img {
      margin-bottom: 5px;
      img {
        border-radius: 100%;
        width: 100px;
      }
    }
  }
  &-settings {
    width: 100%;
    margin-top: 20px;
    &__button {
      margin: 15px 0;
      width: 100%;
      background: white;
      padding: 10px 15px;
      font-size: $text-md;
      border-radius: 5px;
      transition: all .2s ease;
      img {
        width: 25px;
        margin-right: 7px;
      }
      &:hover {
        background: $gray;
      }
    }
  }
}
</style>
