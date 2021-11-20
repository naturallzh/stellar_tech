<template>
  <transition name="fadeInOut">
    <div class="home" ref="home" v-if="isInit">
      <div class="bg" ref="bg"></div>
    </div>
  </transition>
</template>

<script>
import bus from '@/assets/eventBus'
export default {
  name: 'Home',
  path: 'home',
  data () {
    return {
      isInit: false,
      bgScale: 1.04
    }
  },
  mounted () {
    this.isInit = true
    this.$nextTick(this.init)
    bus.$on('cursorOffsetPerc', (val) => {
      const offsetPercX = Math.sin(val[0] * Math.PI / 2)
      const offsetPercY = Math.sin(val[1] * Math.PI / 2)
      this.setBgPos(offsetPercX, offsetPercY)
    })
  },
  beforeDestroy () {
    bus.$off('cursorOffsetPerc')
  },
  methods: {
    init () {
      this.initBg(this.bgScale)
      window.onresize = () => {
        if (this.$refs.home === undefined) { return }
        this.initBg(this.bgScale)
      }
    },
    initBg (scale) {
      const viewEle = this.$refs.home
      const bgEle = this.$refs.bg
      const width = viewEle.offsetWidth
      const height = viewEle.offsetHeight
      bgEle.style.width = width * scale + 'px'
      bgEle.style.height = height * scale + 'px'
      this.setBgPos(0, 0)
    },
    setBgPos (offsetPercX, offsetPercY) {
      const viewEle = this.$refs.home
      const bgEle = this.$refs.bg
      const deltaWidth = bgEle.clientWidth - viewEle.offsetWidth
      const deltaHeight = bgEle.clientHeight - viewEle.offsetHeight
      bgEle.style.left = (-0.5 + 0.5 * offsetPercX) * deltaWidth + 'px'
      bgEle.style.top = (-0.5 + 0.5 * offsetPercY) * deltaHeight + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  //flex-grow: 1;
  overflow: hidden;
  position: absolute;
  .bg {
    position: relative;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/homeBg.jpg');
  }
}
</style>
