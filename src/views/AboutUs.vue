<template>
  <transition name="fadeInOut">
    <div class="aboutUs" v-if="isInit" @mousewheel="scrollSwitch" ref="aboutUs">
      <template v-for="(item, idx) in contentArr">
        <div
          :key="item.bg"
          class="pageBg"
          :ref="'bg0' + idx"
        >
          <div class="bg" :style="'background-image: url(' + item.bg + ')'"></div>
          <about-us-overview key="0" v-if="activeTextIdx === idx && idx === 0"></about-us-overview>
          <about-us-cat key="1" v-if="activeTextIdx === idx && idx === 1"></about-us-cat>
          <about-us-cat key="2" v-if="activeTextIdx === idx && idx === 2"></about-us-cat>
          <about-us-cat key="3" v-if="activeTextIdx === idx && idx === 3"></about-us-cat>
        </div>
      </template>
      <div class="bg-nodes-box">
        <template v-for="(item, idx) in contentArr">
          <div class="node-item-box" :key="item.bg" @click="clickSwitch(idx)">
            <div class="node-box">
              <div :class="idx===curPageIdx?'bg-node-activated':'bg-node-inactivated'">
              </div>
            </div>
            <div :class="idx===curPageIdx?'text-activated':'text-inactivated'">{{item.title}}</div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import AboutUsCat from '@/components/AboutUsCat'
import AboutUsOverview from '@/components/AboutUsOverview'
export default {
  components: {
    AboutUsCat,
    AboutUsOverview
  },
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
      contentArr: []
    }
  },
  watch: {
    curPageIdx (newVal, oldVal) {
      const step = (oldVal - newVal) * 1
      const scoll = setInterval(() => {
        if (!this.$refs.aboutUs) {
          clearInterval(scoll)
          return
        }
        let factor = 1
        const dist = Math.abs(parseFloat(this.$refs.bg00[0].style.top) / 100 + newVal)
        if (dist < 0.005) {
          for (const i in this.contentArr) {
            this.$refs[`bg0${i}`][0].style.top = (i - newVal) * 100 + '%'
          }
          clearInterval(scoll)
          setTimeout(() => {
            this.activeTextIdx = newVal
          }, 200)
          return
        }
        if (dist < 0.5) {
          factor = dist * 2 / Math.abs(step)
          if (factor < 0.05) { factor = 0.05 }
        }
        for (const i in this.contentArr) {
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
      const contentArr = [
        {
          title: '公司概况',
          bg: 'aboutUs/aboutUsOverviewBg.jpg'
        },
        {
          title: '另一些"同事"',
          bg: 'aboutUs/aboutUsCatBg.jpg'
        }
      ]
      this.contentArr = contentArr
      this.isInit = true
      this.$nextTick(() => {
        for (const i in this.contentArr) {
          this.$refs[`bg0${i}`][0].style.top = i * 100 + '%'
        }
      })
    },
    scrollSwitch (event) {
      // console.log(event.deltaY)
      if (!this.ableToScroll) { return }
      if (!this.scrollTimer) {
        this.scrollTimer = setTimeout(() => {
          if (this.scrollCount >= 3 && this.curPageIdx < this.contentArr.length - 1) {
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
          }, 1300)
          // console.log(this.curPageIdx)
        }, 300)
      }
      if (event.deltaY > 0) {
        this.scrollCount++
      }
      if (event.deltaY < 0) {
        this.scrollCount--
      }
    },
    clickSwitch (idx) {
      if (!this.ableToScroll) { return }
      this.ableToScroll = false
      this.curPageIdx = idx
      setTimeout(() => {
        this.ableToScroll = true
      }, 1300)
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
  background-color: rgba(0, 0, 0, 1);
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
      border: 5px solid rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(3px) brightness(90%);
    }
  }
  .bg-nodes-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    right: 50px;
    width: 210px;
    justify-content: center;
    align-items: flex-start;
    .node-item-box {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .node-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        .bg-node-inactivated, .bg-node-activated {
          border-radius: 50%;
          margin: 9px 0;
          position: relative;
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
          background-color: rgba(0, 122, 196, 1);
        }
        .bg-node-inactivated:hover {
          //box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      }
      .text-inactivated {
        font-size: 24px;
        color: rgba(204, 204, 204, 1);
        cursor: pointer;
      }
      .text-activated {
        font-size: 28px;
        color: rgba(0, 122, 196, 1);
        font-weight: bold;
        //text-shadow: 2px 2px 5px rgba(196, 196, 196, 0.4);
      }
    }
  }
}
</style>
