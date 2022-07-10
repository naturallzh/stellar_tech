<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsOverview" v-if="isInit">
      <div class="info-box">
        <div class="logo-box">
          <div class="logo"></div>
          <div class="title-1">HW</div>
        </div>
        <div class="text-box">
          <div class="title">
            公司介绍
          </div>
          <div class="white-line"></div>
          <div class="desc">
            华为创立于1987年，是全球领先的ICT（信息与通信）基础设施和智能终端提供商。目前华为约有19.5万员工，业务遍及170多个国家和地区，服务全球30多亿人口。
          </div>
          <div class="desc">
            更多描述...
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
        background-image: url("~@/../public/logo/logo.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .title-1 {
        font-weight: bold;
        width: 280px;
        text-align: center;
        font-size: 60px;
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
