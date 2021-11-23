<template>
  <transition name="fadeInOut">
    <div class="aboutUs" v-if="isInit" @mousewheel="scrollSwitch">
      <div class="pageBg" style="background-image: url('homeBg/homeBg_00.jpg')"></div>
      <div class="pageBg" style="background-image: url('homeBg/homeBg_01.jpg')"></div>
      <div class="pageBg" style="background-image: url('homeBg/homeBg_02.jpg')"></div>
      <div class="pageBg" style="background-image: url('homeBg/homeBg_03.jpg')"></div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'AboutUs',
  path: 'aboutUs',
  data () {
    return {
      isInit: false,
      scrollCount: 0,
      scrollTimer: null,
      ableToScroll: true,
      curPageIdx: 0,
      bgArr: ['homeBg_00', 'homeBg_01', 'homeBg_02', 'homeBg_03']
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isInit = true
    },
    scrollSwitch (event) {
      // console.log(event.deltaY)
      if (!this.ableToScroll) { return }
      if (!this.scrollTimer) {
        this.scrollTimer = setTimeout(() => {
          if (this.scrollCount >= 3) {
            this.curPageIdx++
          }
          if (this.scrollCount <= -3) {
            this.curPageIdx--
          }
          this.scrollTimer = null
          this.scrollCount = 0
          this.ableToScroll = false
          setTimeout(() => {
            this.ableToScroll = true
          }, 1000)
          // console.log(this.curPageIdx)
        }, 300)
      }
      if (event.deltaY > 0) {
        this.scrollCount++
      }
      if (event.deltaY < 0) {
        this.scrollCount--
      }
    }
  }
}
</script>

<style scoped lang="scss">
.aboutUs {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: lightblue;
  overflow: hidden;
  .pageBg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
