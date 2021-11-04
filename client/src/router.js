import Vue from "vue";
import Router from "vue-router";
import Gallery from "./views/Gallery.vue";
import Authorization from "./views/Authorization.vue";
import User from "./views/User.vue";
import UserList from "./views/UserList.vue";
import UserAccount from "./views/UserAccount.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/gallery",
    },
    {
      path: "/gallery",
      name: "gallery",
      component: Gallery,
    },
    {
      path: "/authorization",
      name: "authorization",
      component: Authorization, 
    },
    {
      path: "/user/:id",
      name: "user",
      redirect: "/user/:id/list",
      component: User,
      children: [
        {
          path: 'list',
          name: 'userList',
          component: UserList,
        },
        {
          path: 'account',
          name: 'userAccount',
          component: UserAccount,
        },
      ],
    },
  ]
});
