<template>
  <transition name="fadeInOut">
    <div class="aboutUs" v-if="isInit">
      about us page
      关于我们页面
    </div>
  </transition>
</template>

<script>

export default {
  name: 'AboutUs',
  path: 'aboutUs',
  data () {
    return {
      isInit: false
    }
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
.aboutUs {
}
</style>

<style scoped lang="scss">
.aboutUs {
  position: absolute;
}
</style>
