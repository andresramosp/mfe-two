import { createApp } from 'vue'
import MfeTwoApp from './MfeTwo-App.vue'
import { createRouter, createWebHashHistory } from "vue-router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import store from './store/store'

import RouteOne from './views/MfeTwo-RouteOne'
import RouteTwo from './views/MfeTwo-RouteTwo'

const routes = [
    { path: '/', component: RouteOne },
    { path: '/mfetwo-route2', component: RouteTwo },
  ]

  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

const mount = (el) => {
    const app = createApp(MfeTwoApp)
    app.use(router)
    app.use(store)
    app.use(ElementPlus)
    app.mount(el)
};

export { mount }
