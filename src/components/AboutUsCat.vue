<template>
  <transition name="fadeInOutDown">
    <div class="aboutUsCat" v-if="isInit">
      <div style="position: absolute;left: 42%;bottom: 50%;font-weight: bold;font-size: 100px;color: black">
        <span>猫</span>
        <span style="font-size: 30px">们</span>
      </div>
      <div style="position: absolute;left: 52%;top: 47%;font-weight: bold;font-size: 90px;color: white">
        <span>CAT</span>
        <span style="font-size: 40px">s</span>
      </div>
      <div style="width: 200px;height: 200px;left:250px;top:150px;position:absolute;border-radius: 50%;background-size: cover;background-position: center center;background-repeat: no-repeat;background-image: url('aboutUs/aboutUsCat_1.jpg')">
        <div style="position: absolute;width: 200px;color: white;right: 20px;top: 220px;font-size: 25px;font-weight: bold">
          它们有可能会刷新在没人坐的椅子上
        </div>
      </div>
      <div style="width: 200px;height: 200px;right:250px;bottom:150px;position:absolute;border-radius: 50%;background-size: cover;background-position: center center;background-repeat: no-repeat;background-image: url('aboutUs/aboutUsCat_2.jpg')">
        <div style="position: absolute;width: 200px;color: black;left: 20px;top: 220px;font-size: 25px;font-weight: bold">
          不过最好还是不要让它们碰面
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
.aboutUsCat {
  width: 100%;
  height: 100%;
  position: absolute;
  //color: red;
}

</style>
