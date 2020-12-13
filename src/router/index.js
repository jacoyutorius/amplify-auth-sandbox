import Vue from 'vue'
import VueRouter from 'vue-router'
import { Auth, Hub } from 'aws-amplify';
import store from '../store'

// views
import Home from '../views/Home.vue';
import About from "../views/About";
import Signin from "../views/Signin";

Vue.use(VueRouter)

async function fetchUserToSave() {
  const data = await Auth.currentAuthenticatedUser().catch(error => {
    console.error(error);
  });

  if (data && data.signInUserSession) {
    store.commit("setUser", data);
  }

  return data;
}

Hub.listen("auth", async (data) => {
  console.log({ data })
  switch (data.payload.event) {
    case "signIn":
      await fetchUserToSave();
      router.push({ path: "/" });
      break;
    case "signOut":
      store.commit("setUser", null);
      // router.push({ path: "/signin" });
      break;
  }
});

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await fetchUserToSave();
    // console.log(user);
    if (!user) {
      return next({
        path: "/signin",
        query: {
          redirect: to.fullPath,
        },
      });
    }
    return next();
  }
  return next();
});

export default router
