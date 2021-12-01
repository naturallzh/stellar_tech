<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsOverview" v-if="isInit">
      321
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
  color: red;
}

</style>
