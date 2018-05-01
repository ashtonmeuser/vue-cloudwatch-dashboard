import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import App from './components/App.vue';

Vue.config.productionTip = false;

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
});
