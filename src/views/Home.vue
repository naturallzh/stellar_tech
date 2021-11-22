<template>
  <div class="home" ref="home">
    <div class="bg-box" ref="bgBox">
      <transition-group name="fadeInOut">
        <div
          v-for="(bgPath, idx) in bgArr"
          :key="bgPath" class="bg"
          :ref="'bg0'+idx"
          v-show="idx===curBgIdx"
        >
        </div>
      </transition-group>
    </div>
    <div class="bg-switch-left" @click="switchBg(1, -1)"></div>
    <div class="bg-switch-right" @click="switchBg(1, 1)"></div>
    <div class="bg-nodes-box">
      <div
        :class="idx===curBgIdx?'bg-node-activated':'bg-node-inactivated'"
        v-for="(bgPath, idx) in bgArr"
        :key="bgPath"
        @click="switchBg(2, idx)"
      >
      </div>
    </div>
    <div class="copyright">Copyright XXXXXX</div>
  </div>
</template>

<script>
import bus from '@/assets/eventBus'
export default {
  name: 'Home',
  path: 'home',
  data () {
    return {
      showBg: true,
      bgArr: [],
      curBgIdx: 0,
      bgScale: 1,
      bgSwitchCounter: null
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    bus.$off('cursorOffsetPerc')
  },
  methods: {
    init () {
      this.initBgBox(this.bgScale)
      window.onresize = () => {
        if (this.$refs.home === undefined) { return }
        this.initBgBox(this.bgScale)
      }
      bus.$on('cursorOffsetPerc', (val) => {
        const offsetPercX = Math.sin(val[0] * Math.PI / 2)
        const offsetPercY = Math.sin(val[1] * Math.PI / 2)
        this.setBgBoxPos(offsetPercX, offsetPercY)
      })
      for (let i = 0; i < 4; i++) {
        this.bgArr[i] = 'homeBg_0' + i
      }
      this.$forceUpdate()
      this.$nextTick(() => {
        for (const i in this.bgArr) {
          this.$refs[`bg0${i}`][0].style.backgroundImage = 'url(homeBg/' + this.bgArr[i] + '.jpg)'
        }
      })
      this.bgSwitchCounter = setTimeout(() => {
        this.switchBg(1, 1)
      }, 5000)
    },
    initBgBox (scale) {
      const viewEle = this.$refs.home
      const bgBoxEle = this.$refs.bgBox
      const width = viewEle.offsetWidth
      const height = viewEle.offsetHeight
      bgBoxEle.style.width = width * scale + 'px'
      bgBoxEle.style.height = height * scale + 'px'
      // this.showBg = true
      this.setBgBoxPos(0, 0)
    },
    setBgBoxPos (offsetPercX, offsetPercY) {
      const viewEle = this.$refs.home
      const bgBoxEle = this.$refs.bgBox
      const deltaWidth = bgBoxEle.clientWidth - viewEle.offsetWidth
      const deltaHeight = bgBoxEle.clientHeight - viewEle.offsetHeight
      bgBoxEle.style.left = (-0.5 + 0.5 * offsetPercX) * deltaWidth + 'px'
      bgBoxEle.style.top = (-0.5 + 0.5 * offsetPercY) * deltaHeight + 'px'
    },
    switchBg (mode, param) {
      clearTimeout(this.bgSwitchCounter)
      // mode 1 --- 相对位置更换; mode 2 --- 绝对位置跳转
      const N = this.bgArr.length
      if (mode === 1 && param % N === 0) { return }
      if (mode === 2 && param === this.curBgIdx) { return }
      if (mode === 1) {
        this.curBgIdx = (this.curBgIdx + param + N) % N
      }
      if (mode === 2) {
        this.curBgIdx = param
      }
      this.bgSwitchCounter = setTimeout(() => {
        this.switchBg(1, 1)
      }, 5000)
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
  display: flex;
  align-items: center;
  .bg-box {
    position: relative;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  }
  .bg-switch-left, .bg-switch-right {
    position: absolute;
    width: 70px;
    height: 140px;
  }
  .bg-switch-left {
    left: 36px;
    background-image: url("../../public/homeBg/bgSwitchLeft.png");
  }
  .bg-switch-right {
    right: 36px;
    background-image: url("../../public/homeBg/bgSwitchRight.png");
  }
  .bg-switch-left:hover {
    cursor: pointer;
    animation: pointToLeft 1.2s infinite;
    @keyframes pointToLeft {
      from { left: 36px; }
      to { left: 20px; }
    }
  }
  .bg-switch-right:hover {
    cursor: pointer;
    animation: pointToRight 1.2s infinite;
    @keyframes pointToRight {
      from { right: 36px; }
      to { right: 20px; }
    }
  }
  .bg-nodes-box {
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 70px;
    justify-content: center;
    align-items: center;
    .bg-node-inactivated, .bg-node-activated {
      border-radius: 50%;
      margin: 0 9px;
    }
    .bg-node-inactivated {
      width: 12px;
      height: 12px;
      background-color: #cccccc;
    }
    .bg-node-activated {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background-color: #007aff;
    }
    .bg-node-inactivated:hover {
      //box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
  .copyright {
    position: absolute;
    bottom: 20px;
    font-size: 20px;
    color: white;
    width: 100%;
    text-align: center;
    text-shadow: 0 0 3px black;
  }
}
</style>
