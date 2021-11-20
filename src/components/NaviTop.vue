<template>
  <div class="naviTop">
    <Button to="/" ghost>首页</Button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
}

</script>

<style scoped lang="scss">
.naviTop {
  width: 100%;
  height: 64px;
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  //border-bottom: 2px solid rgba(128, 128, 128, 0.7);
  background-color: rgba(24, 24, 24, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
