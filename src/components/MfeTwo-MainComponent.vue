<template>
  <div class="hello" style="position: relative">

<el-row :gutter="50">
      <el-col :span="8"
        ><div class="grid-content bg-purple" />
        <MfeTwoChildComponent />
      </el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple" />
        <div class="shared-comp">
          <SharedComponent />
        </div>
      </el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple" />
        <div class="shared-comp-2">
          <SharedComponentGeneric :steps="store.state.stepsGeneric" />
        </div>
      </el-col>
    </el-row>

    Moment.js <br /> {{ moment().format("MMMM Do YYYY, h:mm:ss a") }}
    <br />
    <span style="color: #409eff">Message from MfeOne: {{ message }}</span>
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
  padding: 20px;
  background-color: lightgray;
  width: 90%;
  /* position: absolute;
  right: 20px;
  top: 150px; */
}
.shared-comp-2 {
  padding: 20px;
  background-color: lightseagreen;
  width: 90%;
  min-height: 199px;

  /* position: absolute;
  right: 20px;
  top: 370px; */
}
</style>
