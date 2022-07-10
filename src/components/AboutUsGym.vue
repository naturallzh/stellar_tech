<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsGym" v-if="isInit">
      <div class="tip">
        身体是革命的本钱
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
.aboutUsGym {
  width: 100%;
  height: 100%;
  position: absolute;
  //color: red;
}
.tip {
  border-radius: 38px;
  left: 60%;
  top: 20%;
  padding: 18px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 40px;
  color: white;
}
</style>
