// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW';


import App from "./App";
import router from "./router";
import './bus';
import CurrencyFilter from './filters/currency';

Vue.use(VueAxios, axios);

// VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n);
// const i18n = new VueI18n({
//   locale: 'zhTW'
// });
// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// });

Vue.component('loading', Loading);
Vue.filter('currency', CurrencyFilter);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  // i18n,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/signin"
        });
      }
    });
  } else {
    next();
  }
});
