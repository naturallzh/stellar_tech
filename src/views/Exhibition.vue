<template>
  <transition name="fadeInOut">
    <div class="exhibition" v-if="isInit">
      <div class="bg"></div>
      <div class="class-cover-box" v-show="curClassIdx === -1">
        <template v-for="(item, idx) in dataArr">
          <transition :key="item.name" :name="idx%2===0?'fadeInOutDown':'fadeInOutUp'">
            <div
              class="class-cover"
              :style="coverStyleArr[idx]"
              :ref="'cover' + idx"
              @click="showExhibitionDetail(idx)"
              @mouseover="mouseoverCover(idx)"
              @mouseout="mouseoutCover"
              v-show="showCover"
            >
              <div class="title-bg">{{item.name}}</div>
            </div>
          </transition>
        </template>
      </div>
      <transition name="fadeInOut">
        <div class="class-detail-box" v-if="curClassIdx !== -1">
          <div class="upper-box">
            <transition name="fadeInOut">
              <div class="display-box" v-show="switchClass">
                <template v-for="(item, idx) in dataArr[curClassIdx].children">
                  <div class="item-box" :key="item+idx" @click="displayPic(idx)">
                    <div
                      class="pic-box"
                      :style="'background-image: url(exhibition/' + dataArr[curClassIdx].children[idx] + ')'"
                    >
                      <div class="name-box">{{item}}</div>
                    </div>
                    <div class="glass-effect"></div>
                  </div>
                </template>
                <div class="item-box" style="opacity: 0" v-show="dataArr[curClassIdx].children.length%3>0"></div>
                <div class="item-box" style="opacity: 0" v-show="dataArr[curClassIdx].children.length%3===1"></div>
              </div>
            </transition>
          </div>
          <div class="bottom-box">
            <div class="tab-box">
              <template v-for="(item, idx) in dataArr">
                <div
                  :key="item.name"
                  :class="idx===curClassIdx?'bottom-tab-activated':'bottom-tab-inactivated'"
                  @click="switchClassTab(idx)"
                >{{item.name}}</div>
              </template>
            </div>
            <div class="back-btn" @click="backToCover"></div>
          </div>
        </div>
      </transition>
      <transition name="fadeInOut">
        <div class="pic-view-box" @click="showPic=false" v-show="showPic">
          <div class="pic-view" @click.stop ref="picView"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Exhibition',
  path: 'exhibition',
  data () {
    return {
      isInit: false,
      showCover: false,
      dataArr: [],
      coverStyleArr: [],
      curClassIdx: -1,
      switchClass: 1,
      showPic: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isInit = true
      setTimeout(() => { this.showCover = true }, 400)
      this.dataArr = [
        {
          name: '角色原画',
          cover: 'cover1.jpg',
          icon: '1',
          children: [
            'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg', 'pic7.jpg', 'pic8.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        },
        {
          name: '场景原画',
          cover: 'cover2.jpg',
          icon: '2',
          children: [
            'pic1.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        },
        {
          name: '3D角色',
          cover: 'cover3.jpg',
          icon: '3',
          children: [
            'pic1.jpg', 'pic2.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        },
        {
          name: '3D场景',
          cover: 'cover4.jpg',
          icon: '4',
          children: [
            'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        },
        {
          name: '2D动作',
          cover: 'cover5.jpg',
          icon: '5',
          children: [
            'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        },
        {
          name: '3D动作',
          cover: 'cover6.jpg',
          icon: '6',
          children: [
            'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic7.jpg', 'pic8.jpg'
          ]
        }
      ]
      for (const i in this.dataArr) {
        this.coverStyleArr[i] = 'background-image: url(exhibition/' + this.dataArr[i].cover + ');' +
          'margin-top: ' + (i % 2 - 0.5) * 80 + 'px'
      }
    },
    showExhibitionDetail (idx) {
      this.mouseoutCover()
      this.showCover = false
      setTimeout(() => {
        this.curClassIdx = idx
      }, 650)
    },
    switchClassTab (idx) {
      if (idx === this.curClassIdx) { return }
      this.switchClass = 0
      setTimeout(() => {
        this.curClassIdx = idx
        this.switchClass = 1
      }, 300)
    },
    displayPic (idx) {
      this.showPic = true
      this.$refs.picView.style.backgroundImage = 'url(exhibition/' + this.dataArr[this.curClassIdx].children[idx] + ')'
    },
    backToCover () {
      this.curClassIdx = -1
      setTimeout(() => {
        this.showCover = true
      }, 650)
    },
    mouseoverCover (idx) {
      if (!this.showCover) { return }
      for (const i in this.dataArr) {
        if (parseInt(i) === idx) {
          this.$refs[`cover${i}`][0].className = 'class-cover-hover'
        } else {
          this.$refs[`cover${i}`][0].className = 'class-cover-hover-else'
        }
      }
    },
    mouseoutCover () {
      if (!this.showCover) { return }
      for (const i in this.dataArr) {
        this.$refs[`cover${i}`][0].className = 'class-cover'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.exhibition {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("~@/../public/homeBg/exhibitionBg.jpg");
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: brightness(60%) blur(5px);
  }
  .class-cover-box {
    position: absolute;
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .class-cover, .class-cover-hover, .class-cover-hover-else {
      position: relative;
      flex-shrink: 0;
      width: 160px;
      height: 500px;
      margin-right: 5px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      //background-color: rgba(0,0,0,0.8);
      clip-path: polygon(0 10%, 50% 0, 100% 10%, 100% 90%, 50% 100%, 0 90%);
      //background-image: linear-gradient(rgba(0,0,0,0), black, black, rgba(0,0,0,0));
      //background-image: radial-gradient(black 20%, rgba(0, 0, 0, 0) 60%);
      filter: brightness(100%);
      transition: all 0.5s;
      .title-bg {
        position: absolute;
        bottom: 15%;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 25px;
      }
    }
    .offset-odd {
      top: -30px;
    }
    .offset-even {
      top: 30px;
    }
    .class-cover-hover {
      filter: brightness(110%);
    }
    .class-cover-hover-else {
      filter: brightness(60%);
    }
  }
  .class-detail-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    .upper-box::-webkit-scrollbar {
      display: none;
    }
    .upper-box {
      position: relative;
      flex-grow: 1;
      flex-shrink: 0;
      background-color: rgba(128, 128, 128, 0.2);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
      .display-box {
        padding: 70px 30px 50px 30px;
        position: absolute;
        top: 0;
        min-height: 100%;
        width: 1000px;
        display: flex;
        align-content: flex-start;
        justify-content: space-evenly;
        flex-wrap: wrap;
        .item-box {
          position: relative;
          margin: 20px 0;
          width: 220px;
          height: 150px;
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          transition: all 0.3s;
          .pic-box {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            position: relative;
            .name-box {
              border-radius: 0 0 10px 10px;
              position: absolute;
              bottom: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-grow: 1;
              font-size: 20px;
              line-height: 35px;
              font-weight: bold;
              width: 100%;
              background-color: rgba(196, 196, 196, 0.8);
              box-shadow: 0 -4px 5px rgba(32, 32, 32, 0.5);
            }
          }
          .glass-effect {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.4) 15%, rgba(255, 255, 255, 0) 25%);
            clip-path: polygon(0 0, 0 0, 0 0);
            transition: all 0.3s;
          }
        }
        .item-box:hover {
          filter: brightness(110%);
          transition: all 0.3s;
          cursor: pointer;
          box-shadow: 10px 10px 15px black;
        }
        .item-box:hover .glass-effect {
          clip-path: polygon(0 0, 50% 0, 0 50%);
          transition: all 0.3s;
        }
      }
    }
    .bottom-box {
      flex-shrink: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tab-box {
        width: 1000px;
        display: flex;
        justify-content: space-evenly;
        height: 70px;
        .bottom-tab-activated, .bottom-tab-inactivated {
          width: 150px;
          box-sizing: border-box;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          color: white;
          transition: all 0.2s;
        }
        .bottom-tab-activated {
          font-size: 25px;
          height: 50px;
          background-color: rgba(128, 128, 128, 0.2);
        }
        .bottom-tab-inactivated {
          font-size: 22px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .bottom-tab-inactivated:hover {
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      }
      .back-btn {
        cursor: pointer;
        left: 50px;
        position: absolute;
        width: 30px;
        height: 30px;
        background-image: url("../../public/homeBg/bgSwitchLeft.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }
  .pic-view-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    .pic-view {
      width: 960px;
      height: 540px;
      border: 3px solid silver;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}
</style>
