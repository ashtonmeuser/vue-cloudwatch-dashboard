import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './components/App.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
});
