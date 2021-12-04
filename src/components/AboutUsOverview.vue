<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsOverview" v-if="isInit">
      <div class="info-box">
        <div class="logo-box">
          <div class="logo"></div>
          <div class="title-1">星碑科技</div>
          <div class="title-2">Stellar Tech</div>
        </div>
        <div class="text-box">
          <div class="title">
            公司介绍
          </div>
          <div class="white-line"></div>
          <div class="desc">
            武汉星碑科技有限公司是一个专注游戏美术设计的团队。公司核心成员均有多年的国内顶尖游戏公司美术、研发、外包及管理经验，参与了多款知名项目，包括 《海神》、《神曲》、《神将三国》、《众社之神》、《奇迹》、《仙语》、《大主室》、《丧戶之战》、《列王的纷争》、《坦克2》等页游、手游及端游项目。在游戏领域有丰富的美术制作经验和成功案例。
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isInit: false
    }
  },
  watch: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isInit = true
    }
  }
}

</script>

<style scoped lang="scss">
.aboutUsOverview {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  .info-box {
    width: 100%;
    height: 600px;
    background-color: rgba(16, 16, 16, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    .logo-box {
      width: 300px;
      //background-color: red;
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 280px;
        height: 280px;
        background-image: url("~@/../public/logo/logo-white.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .title-1, .title-2 {
        font-weight: bold;
        width: 280px;
        text-align: center;
      }
      .title-1 {
        font-size: 60px;
      }
      .title-2 {
        font-size: 42px;
      }
    }
    .text-box {
      margin-left: 50px;
      width: 650px;
      height: 80%;
      //background-color: lightblue;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -25px;
      .title {
        width: 100%;
        font-size: 50px;
        text-align: center;
        font-weight: bold;
      }
      .white-line {
        width: 100%;
        height: 3px;
        background-color: white;
        margin: 25px 0;
      }
      .desc {
        width: 100%;
        font-size: 25px;
        line-height: 35px;
      }
    }
  }
}

</style>
