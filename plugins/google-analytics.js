import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

export default ({app}) => {
  // Configuration VueAnalytics
  Vue.use(VueAnalytics, {
    id: 'G-P2DJCMVZPD',
    router: app.router
  });
}
