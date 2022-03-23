<template>
  <div>
  <h1>{{ "Micro Frontend Two (Vue 3 + Prime Faces)" }}</h1>
    <div class="login-info">
      <div class="logged" v-if="logged">Logged in as {{ userLabel }}</div>
      <div class="not-logged" v-else>Not Logged</div>
    </div>
    <router-link to="/">Route 1</router-link>
    <br />
    <router-link to="/mfetwo-route2">Route 2</router-link>
    <br />
    <div v-if="logged" style="margin-top: 20px">
        <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { auth$ } from "ModuleAuth/ModuleAuth";
import { computed } from 'vue'
import { useStore } from "vuex";

export default {
  name: "MfeTwo-App",
  components: {
  },
  setup() {
    const store = useStore();

    const logged = computed(() => store.getters.getLoggedIn)
    const userLabel = computed(() => store.getters.getUserLabel)

    auth$.subscribe((payload) => {
      store.dispatch('setAuth', payload)
    });

    return {
      logged,
      userLabel
    }
  },
};
</script>

<style scoped>
.not-logged {
  background-color: pink;
  width: 100px;
}
.logged {
  background-color: greenyellow;
  width: 250px;
}
</style>
