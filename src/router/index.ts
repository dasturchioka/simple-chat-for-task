import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "default",
      component: () => import("../layouts/DefaultView.vue"),
      children: [
        {
          path: "",
          name: "default-home-page",
          component: () => import("../pages/HomeView.vue"),
        },
        {
          path: "chat/:id",
          name: "default-chat-page",
          component: () => import("../pages/ChatView.vue"),
        },
      ],
    },
  ],
});

export default router
