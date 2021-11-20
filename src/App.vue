<template>
  <div id="app">
    <navi-top />
    <div class="router-view">
      <div class="top-blank"></div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import NaviTop from '@/components/NaviTop'

export default {
  components: {
    NaviTop
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

#app {
  width: 100%;
  height: 100%;
  user-select: none;
  .router-view {
    width: 100%;
    min-height: 100%;
    max-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top-blank {
      height: 64px;
      flex-shrink: 0;
    }
    .content {
      flex-shrink: 0;
      flex-grow: 1;
      height: 0;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
