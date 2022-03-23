<template>
  <div class="hello">
    <MfeTwoChildComponent/>
    {{ moment().format('MMMM Do YYYY, h:mm:ss a') }}
    <br />
    <span style="color: #409eff">{{ message }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
import moment from "moment"
import MfeTwoChildComponent from "./MfeTwo-ChildComponent.vue";

export default {
  components: {
    MfeTwoChildComponent,
  },
  props: {},

  setup() {

    const message = ref("");

    window.addEventListener("hello-event", () => {
      message.value = "Hello!";
    });

    // expose to template and other options API hooks
    return {
      message,
      moment
    };
  },

  mounted() {
  },
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
</style>
