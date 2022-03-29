<template>
  <div>
    <div class="login-info">
      <div class="logged" v-if="logged">Logged in as {{ userLabel }}</div>
      <div class="not-logged" v-else>Not Logged</div>
    </div>
    <router-link to="/">Route 1</router-link>
    <router-link style="margin-left: 10px" to="/mfetwo-route2"
      >Route 2</router-link
    >
    <h1>{{ "Micro Frontend Two (Vue 3 + Vuex + Element Plus)" }}</h1>
    <br />
    <div v-if="logged">
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
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "MfeTwo-App",
  components: {},
  setup() {
    const store = useStore();

    const logged = computed(() => store.getters.getLoggedIn);
    const userLabel = computed(() => store.getters.getUserLabel);

    auth$.subscribe((payload) => {
      store.dispatch("setAuth", payload);
    });

    store.dispatch("getStepsGeneric");
    store.dispatch("getPets");

    return {
      logged,
      userLabel,
    };
  },
};
</script>

<style scoped>

</style>
