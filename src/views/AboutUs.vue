<template>
  <transition name="fadeInOut">
    <div class="aboutUs" v-if="isInit" @mousewheel="scrollSwitch" ref="aboutUs">
      <template v-for="(bg, idx) in bgArr">
        <div
          :key="bg"
          class="pageBg"
          :ref="'bg0' + idx"
        >
          <div class="bg" :style="'background-image: url(' + bg + ')'"></div>
          <transition name="fadeInOutDown">
            <div class="text-box" v-show="idx === activeTextIdx">
              <div class="title">{{textArr[idx].title}}</div>
              <div class="desc">{{textArr[idx].desc}}</div>
            </div>
          </transition>
        </div>
      </template>
      <div class="bg-nodes-box">
        <div
          :class="idx===curPageIdx?'bg-node-activated':'bg-node-inactivated'"
          v-for="(bgPath, idx) in bgArr"
          :key="bgPath"
          @click="curPageIdx = idx"
        >
        </div>
      </div>
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
      activeTextIdx: 0,
      bgArr: [],
      textArr: []
    }
  },
  watch: {
    curPageIdx (newVal, oldVal) {
      setTimeout(() => {
        this.activeTextIdx = newVal
      }, 1100)
      const step = (oldVal - newVal) * 1
      const scoll = setInterval(() => {
        let factor = 1
        const dist = Math.abs(parseFloat(this.$refs.bg00[0].style.top) / 100 + newVal)
        if (dist < 0.005) {
          for (const i in this.bgArr) {
            this.$refs[`bg0${i}`][0].style.top = (i - newVal) * 100 + '%'
          }
          clearInterval(scoll)
          return
        }
        if (dist < 0.5) {
          factor = dist * 2 / Math.abs(step)
          if (factor < 0.1) { factor = 0.1 }
        }
        for (const i in this.bgArr) {
          const pos = parseFloat(this.$refs[`bg0${i}`][0].style.top)
          this.$refs[`bg0${i}`][0].style.top = (pos + step * factor) + '%'
        }
      }, 5)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const bgArr = [
        'homeBg/homeBg_00.jpg',
        'homeBg/homeBg_01.jpg',
        'homeBg/homeBg_02.jpg',
        'homeBg/homeBg_03.jpg'
      ]
      this.bgArr = bgArr
      const textArr = [
        {
          title: '标题1',
          desc: '正文1正文1正文1正文1正文1正文1'
        },
        {
          title: '标题2',
          desc: '正文2正文2正文2正文2正文2正文2'
        },
        {
          title: '标题3',
          desc: '正文3正文3正文3正文3正文3正文3'
        },
        {
          title: '标题4',
          desc: '正文4正文4正文4正文4正文4正文4'
        }
      ]
      this.textArr = textArr
      this.isInit = true
      this.$nextTick(() => {
        for (const i in this.bgArr) {
          this.$refs[`bg0${i}`][0].style.top = i * 100 + '%'
        }
      })
    },
    scrollSwitch (event) {
      // console.log(event.deltaY)
      if (!this.ableToScroll) { return }
      if (!this.scrollTimer) {
        this.scrollTimer = setTimeout(() => {
          if (this.scrollCount >= 3 && this.curPageIdx < this.bgArr.length - 1) {
            this.curPageIdx++
          }
          if (this.scrollCount <= -3 && this.curPageIdx > 0) {
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
  background-color: black;
  overflow: hidden;
  .pageBg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(5px) brightness(60%);
    }
    .text-box {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      color: white;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 50px;
        line-height: 75px;
        max-width: 60%;
      }
      .desc {
        font-size: 25px;
        max-width: 60%;
      }
    }
  }
  .bg-nodes-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    right: 70px;
    justify-content: center;
    align-items: center;
    .bg-node-inactivated, .bg-node-activated {
      border-radius: 50%;
      margin: 9px 0;
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
}
</style>
