<template>
 <div class="demo-progress">
    <el-progress :percentage="50" />
    <el-progress :percentage="100" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div>
</template>

<script>
import { ElProgress } from "element-plus";
export default {
  components: {
    ElProgress,
  },
  setup() {
    
  },
};
</script>