<template>
  <div class="ossVideo">
    <div class="videoSize">
      <video :src="$route.query.link" controls autoplay></video>
    </div>
    <div>
      <el-button type="primary" @click="goHome()">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.ossVideo {
  height: 100vh;
  position: relative;
  .videoSize {
    video {
      width: 100vw;
    }
  }
  /deep/ .el-button {
    width: 40vw;
    height: 10vw;
    position: absolute;
    bottom: 10vw;
    left: calc(50% - 20vw);
  }
}
</style>