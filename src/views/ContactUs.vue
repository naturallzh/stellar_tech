<template>
  <transition name="fadeInOut">
    <div class="contactUs" v-if="isInit">
      contact us page
      联系我们页面
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ContactUs',
  path: 'contactUs',
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
.contactUs {
  position: absolute;
}
</style>
