import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    //loading: '/loading.gif',
    lazyComponent: true,
    attempt: 3,
})
