<template>
  <div id="app" @mousemove="cursorListener" ref="app">
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
import bus from '@/assets/eventBus'

export default {
  components: {
    NaviTop
  },
  data () {
    return {
    }
  },
  methods: {
    cursorListener (event) {
      const appEle = this.$refs.app
      const width = appEle.offsetWidth
      const height = appEle.offsetHeight
      const X = event.clientX
      const Y = event.clientY
      bus.$emit('cursorOffsetPerc', [2 * X / width - 1, 2 * Y / height - 1])
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
      width: 100%;
      flex-shrink: 0;
      flex-grow: 1;
      height: 0;
      overflow: auto;
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }
}
</style>
