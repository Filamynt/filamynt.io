import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/landing/Landing'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior(to, from) {
        return { x: 0, y: 0 }
    },
    routes: [{
        path: '/',
        name: 'Landing',
        component: Landing,
    }],
})
