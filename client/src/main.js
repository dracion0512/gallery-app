import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* import all bootstrap modules */ /* 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Make BootstrapVue available throughout your project
*/

import { 
  BadgePlugin,
  ButtonPlugin,
  PaginationNavPlugin,
  ImagePlugin,
  LayoutPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  InputGroupPlugin,
  TabsPlugin, 
  FormPlugin,
  IconsPlugin,
  NavPlugin,
  NavbarPlugin,
  LinkPlugin,
} from 'bootstrap-vue'

Vue.use(BadgePlugin)
Vue.use(ButtonPlugin)
Vue.use(PaginationNavPlugin)
Vue.use(ImagePlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(InputGroupPlugin)
Vue.use(TabsPlugin)
Vue.use(FormPlugin)
Vue.use(IconsPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)
Vue.use(LinkPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
