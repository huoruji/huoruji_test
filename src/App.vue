<template>
  <div id="app">
    <!-- <action-sheet></action-sheet> -->
    <transition :name="routerViewAnimation">
    <router-view v-show="!blurBgShow"></router-view>
    </transition>
    <search @searchshow="rankshow=false" @searchhide="rankshow=true" v-show="!blurBgShow"></search>
    <swiper :options="swiperOptions" class="content-box" v-show="rankshow&&!blurBgShow">  
        <!-- 个性推荐 -->  
        <swiper-slide>  
           <recommand></recommand>
        </swiper-slide>
        <!-- 排行榜 -->
        <swiper-slide>  
          <rank></rank>
        </swiper-slide>   
        <div class="swiper-paginationIn" slot="pagination"></div>  
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import Search from './components/Search'
import Recommand from './components/Recommand'
import Rank from './components/Rank'

const TAB_NAMES = ['个性推荐','排行榜']  

export default {
   
  name: 'app',
  components: {
    Search,
    Recommand,
    Rank,
    swiper,  
    swiperSlide  
  },
   data () {
    return {
        blurBgShow:false,
        rankshow:true,
        routerViewAnimation:'page-slide',
        swiperOptions: {
              pagination: '.swiper-paginationIn',
              paginationClickable: true,
              paginationBulletRender(swiper, index, className) {
                return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAMES[index]}</span>`
              }
        }
      }
   },
   methods:{
    showBlurBg:function(){
      this.routerViewAnimation = 'fade';
      this.blurBgShow = true;
    }
   }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;
    background: #EEEEEE;
    height: 100%;
  }

  body {
    display: flex;
    overflow-x: hidden;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
    .content-warper {
    margin-top: 60px;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-item {
    height: 100%;
  }

  .swiper-pagination-bullet-custom {
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    text-align: center;
    line-height: 40px;
    color: #323133;
    border-radius: 0 !important;
    background: #f8f8f8 !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #0e51a8;
    border-bottom: 1px solid #0e51a8;
  }

  .swiper-pagination {
    top: 0;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    background: #f8f8f8;
  }
  .main{
    margin-top: 60px;
  }
  .content-box{
    margin-top: 60px;
    /*height: 100%;*/
    width: 100%;
    background: #fff;
  }
  .swiper-paginationIn {
    top: 0;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    background: #f8f8f8;
    position: absolute;
    text-align: center;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 10;
  }
  img[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  img[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  .page-slide-enter-active {
    transition: all .3s ease;
  }

  .page-slide-leave-active {
    transition: all .3s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    transform: translateX(100%);
  }

  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .3s ease-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .play-slide-enter-active {
    transition: all .3s ease;
  }

  .play-slide-leave-active {
    transition: all .3s ease-out;
  }

  .play-slide-enter, .play-slide-leave-active {
    transform: translateY(100vh);
  }

  .bar-slide-enter-active {
    transition: all .3s ease;
  }

  .bar-slide-leave-active {
    transition: all .3s ease-out;
  }

  .bar-slide-enter, .bar-slide-leave-active {
    margin-bottom: -50px;
  }
  

</style>
