import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResumable from "vue-resumable";

Vue.config.productionTip = false;

Vue.use(VueResumable);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
