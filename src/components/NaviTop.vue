<template>
  <div class="naviTop">
    <div class="left-box" @click="gotoPath('/home')">
      <div class="logo"></div>
      <div class="title-box">
        <div class="title-1">HW</div>
        <div class="title-2">HW</div>
      </div>
    </div>
    <div
      v-for="item in routerParam"
      :key="item.path"
      :class="$route.path===item.path?'navi-button-activated':'navi-button-inactivated'"
      @click="gotoPath(item.path)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerParam: [
        { path: '/home', title: '园区掠影' },
        { path: '/requirements', title: '岗位需求' },
        { path: '/aboutUs', title: '关于我们' },
        { path: '/contactUs', title: '联系我们' }
      ]
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    gotoPath (routerPath) {
      if (this.$route.path !== routerPath) {
        this.$router.push(routerPath)
      }
    }
  }
}

</script>

<style scoped lang="scss">
.naviTop {
  width: 100%;
  height: 64px;
  position: fixed;
  min-width: 1000px;
  z-index: 900;
  top: 0;
  left: 0;
  //border-bottom: 2px solid rgba(128, 128, 128, 0.7);
  background-color: rgba(25, 25, 25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  .navi-button-inactivated, .navi-button-activated {
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px solid white;
    border-radius: 8px;
    padding: 10px 18px;
    margin: 0 25px;
  }
  .navi-button-inactivated:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(52, 52, 52, 1);
    box-shadow: 0 0 8px rgba(173, 216, 230, 0.4);
    cursor: pointer;
  }
  .navi-button-activated {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(52, 52, 52, 1);
    filter: brightness(120%);
  }
  .navi-button-inactivated {
    color: rgba(148, 148, 148, 1);
    transition: background-color 0.2s, color 0.2s;
  }
  .left-box {
    position: absolute;
    left: 36px;
    display: flex;
    height: 40px;
    cursor: pointer;
    //background-color: red;
    .logo {
      height: 40px;
      width: 40px;
      margin-right: 5px;
      background-image: url("~@/../public/logo/logo.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .title-box {
      height: 100%;
      color: white;
      .title-1 {
        font-weight: bold;
        font-size: 19px;
      }
      .title-2 {
        font-weight: bold;
        font-size: 13px;
      }
    }
  }
}

</style>
