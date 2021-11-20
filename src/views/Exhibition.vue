<template>
  <transition name="fadeInOut">
    <div class="exhibition" v-if="isInit">
      exhibition page
      作品展示页面
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Exhibition',
  path: 'exhibition',
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
.exhibition {
  position: absolute;
}
</style>
