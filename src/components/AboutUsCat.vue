<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsCat" v-if="isInit">
      <div style="position: absolute;left: 45%;bottom: 50%;font-weight: bold;font-size: 100px;color: black">
        <span>猫</span>
        <span style="font-size: 30px">们</span>
      </div>
      <div style="position: absolute;left: 50%;top: 47%;font-weight: bold;font-size: 90px;color: white">
        <span>CAT</span>
        <span style="font-size: 40px">s</span>
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
.aboutUsCat {
  width: 100%;
  height: 100%;
  position: absolute;
  color: red;
}

</style>
