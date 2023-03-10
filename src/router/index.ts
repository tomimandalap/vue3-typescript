import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NewPost from "../views/NewPost.vue";
import ShowPost from "../views/ShowPost.vue";
import EditPost from "../views/EditPost.vue";
import LayoutDefault from "../layouts/default.vue";
import LayoutError from "../layouts/error.vue";
import { storeUser } from "../stores/users";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LayoutDefault,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
          meta: { auth: false },
        },
        {
          path: "posts/new",
          name: "Create Post",
          component: NewPost,
          meta: { auth: true },
        },
        {
          path: "posts/:id",
          name: "Detail Post",
          component: ShowPost,
          meta: { auth: true },
        },
        {
          path: "posts/:id/edit",
          name: "Edit Post",
          component: EditPost,
          meta: { auth: true },
        },
      ],
    },
    {
      path: "/404",
      component: LayoutError,
      children: [
        {
          path: "",
          name: "Page not Found",
          component: () => import("../views/404.vue"),
          meta: { auth: false },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: LayoutError,
      beforeEnter: (to, from, next) => {
        next("/404");
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const userStore = storeUser();
  const { auth } = to.meta;

  if (auth) {
    if (!userStore.userId) return next({ path: "/" });
    else next();
  } else {
    next();
  }
});

type TITLE = "vue";
let Maker: string = "@tomimandalap";

router.afterEach((to) => {
  let nameTitle = to.name as TITLE;
  document.title = `🚀 ${nameTitle} - ${Maker}`;
});
