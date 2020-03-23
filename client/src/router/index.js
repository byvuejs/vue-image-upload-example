import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/components/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/resumable",
    name: "resumable",
    component: () =>
      import(/* webpackChunkName: "resumable" */ "@/components/resumable.vue")
  },
  {
    path: "/upload-component",
    name: "upload-component",
    component: () =>
      import(
        /* webpackChunkName: "upload-component" */ "@/components/upload-component.vue"
      )
  },
  {
    path: "/file-upload",
    name: "file-upload",
    component: () =>
      import(
        /* webpackChunkName: "file-upload" */ "@/components/file-upload.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
