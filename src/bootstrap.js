import { createApp } from 'vue'
import App from './MfeTwo-App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// const app = createApp(App)
// app.mount('#app')

const mount = (el) => {
    const app = createApp(App)
    app.use(ElementPlus)
    app.mount(el)
    // createApp(App).mount(el);
};

export { mount }
