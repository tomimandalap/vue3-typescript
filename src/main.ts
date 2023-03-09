import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router/index";
import { storeUser } from "./stores/users";
import { storePosts } from "./stores/posts";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());

const userStore = storeUser();
const postsStore = storePosts();

Promise.all([userStore.authenticate(), postsStore.fetchPosts()]).then(() => {
  app.use(router);
  app.mount("#app");
});
