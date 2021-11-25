<template>
  <transition name="fadeInOut">
    <div class="contactUs" v-if="isInit">
      <div class="bg"><div class="deco"></div></div>
      <div class="tab-box">
        <template v-for="(item, idx) in contentArr">
          <div class="tab-item-box" :key="item.tabTitle">
            <div :class="idx === curTabIdx?'tab-active':'tab-inactive'" @click="switchTab(idx)">{{item.tabTitle}}</div>
          </div>
        </template>
      </div>
      <div class="border"></div>
      <div class="content-box">
        <transition name="fadeInOut">
          <div class="map" v-show="curTabIdx === 0" key="0" id="map">
            <template>
              <baidu-map class="baiduMap" :ak="baiduMapParam.ak" :center="baiduMapParam.center" :zoom="baiduMapParam.zoom" @ready="setBaiduMap"></baidu-map>
<!--              <baidu-map :ak="baiduMapParam.ak" class="baiduMap" :center="center" :zoom="zoom" @ready="handler"></baidu-map>-->
            </template>
          </div>
        </transition>
        <transition name="fadeInOut">
          <div class="text" v-show="curTabIdx === 1" key="1">
            {{contentArr[1].content}}
          </div>
        </transition>
        <transition name="fadeInOut">
          <div class="text" v-show="curTabIdx === 2" key="2">
            {{contentArr[2].content}}
          </div>
        </transition>
        <transition name="fadeInOut">
          <div class="text" v-show="curTabIdx === 3" key="3">
            {{contentArr[3].content}}
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  components: {
    BaiduMap
  },
  name: 'ContactUs',
  path: 'contactUs',
  data () {
    return {
      isInit: false,
      curTabIdx: 0,
      contentArr: [],
      baiduMapParam: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.isInit = true
      this.contentArr = [
        {
          tabTitle: '标签1',
          content: '内容1内容1内容1内容1内容1'
        },
        {
          tabTitle: '标签2',
          content: '内容2内容2内容2内容2内容2'
        },
        {
          tabTitle: '标签3',
          content: '内容3内容3内容3内容3内容3'
        },
        {
          tabTitle: '标签4',
          content: '内容4内容4内容4内容4内容4'
        }
      ]
      this.baiduMapParam = {
        ak: '79jP7w5CXIT5dhzTAf1rYplgHQGDCyb0',
        center: { lng: 0, lat: 0 },
        zoom: 3
      }
    },
    setBaiduMap ({ BMap, map }) {
      // https://dafrok.github.io/vue-baidu-map/#/zh/index
      // console.log(BMap)
      this.baiduMapParam.center.lng = 114.31789
      this.baiduMapParam.center.lat = 30.66161
      this.baiduMapParam.zoom = 18
      const point = new BMap.Point(114.31789, 30.66161)
      // map.centerAndZoom(point, 18)
      const marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      const circle = new BMap.Circle(point, 4, {
        strokeColor: 'Red',
        strokeWeight: 6,
        strokeOpacity: 0.3,
        Color: 'Red',
        fillColor: '#f03'
      })
      map.addOverlay(circle)
      map.enableScrollWheelZoom(true)
    },
    switchTab (idx) {
      if (idx === this.curTabIdx) { return }
      this.curTabIdx = idx
    }
  }
}
</script>

<style scoped lang="scss">
.contactUs {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("~@/../public/homeBg/contactUsBg.jpg");
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    .deco {
      width: 100%;
      height: 600px;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .tab-box {
    //background-color: red;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .tab-item-box {
      width: 100%;
      height: 50px;
      //background-color: lightblue;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .tab-inactive, .tab-active {
        background-color: rgb(2, 138, 196);
        color: #ccc;
      }
      .tab-inactive {
        opacity: 0.8;
        font-size: 16px;
        padding: 3px 5px 3px 15px;
        //border-radius: 6px 0 0 6px;
        transition: all 0.2s;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      .tab-inactive:hover {
        opacity: 1;
        font-size: 20px;
        padding: 5px 7px 5px 20px;
        transition: all 0.2s;
        cursor: pointer;
      }
      .tab-active {
        font-size: 20px;
        padding: 5px 7px 5px 42px;
        //border-radius: 10px 0 0 10px;
        transition: all 0.2s;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);
      }
    }
  }
  .border {
    width: 3px;
    height: 400px;
    background-image: linear-gradient(to bottom, rgba(196, 196, 196, 0), rgba(0, 122, 196, 1), rgba(0, 122, 196, 1), rgba(0, 122, 196, 1), rgba(196, 196, 196, 0));
  }
  .content-box {
    margin-left: 30px;
    //background-color: green;
    width: 600px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    .map {
      width: 100%;
      height: 70%;
      .baiduMap {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      position: absolute;
      color: white;
    }
  }
}
</style>
