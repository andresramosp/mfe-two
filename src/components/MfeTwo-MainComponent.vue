<template>
  <div class="hello" style="position: relative">
    <div><MfeTwoChildComponent /></div>
    <div class="shared-comp">
      <SharedComponent />
    </div>
    <div class="shared-comp-2">
      <SharedComponentGeneric :steps="store.state.stepsGeneric" />
    </div>

    {{ moment().format("MMMM Do YYYY, h:mm:ss a") }}
    <br />
    <span style="color: #409eff">{{ message }}</span>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import { useStore } from 'vuex'
import moment from "moment";
import MfeTwoChildComponent from "./MfeTwo-ChildComponent.vue";

export default {
  components: {
    MfeTwoChildComponent,
    SharedComponent: defineAsyncComponent(() =>
      import("MfeOne/SharedComponent")
    ),
    SharedComponentGeneric: defineAsyncComponent(() =>
      import("MfeOne/SharedComponentGeneric")
    ),
  },
  props: {},

  setup() {
    const store = useStore()

    const message = ref("");

    window.addEventListener("hello-event", () => {
      message.value = "Hello!";
    });

    // expose to template and other options API hooks
    return {
      message,
      moment,
      store
    };
  },

  mounted() {},
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.shared-comp {
  background-color: lightgray;
  padding: 10px;
  width: 400px;
  margin-top: 10px;
  margin-left: 40%;

}
.shared-comp-2 {
  background-color: lightseagreen;
  padding: 10px;
  width: 400px;
  margin-top: 10px;
  margin-left: 40%;

}
</style>
