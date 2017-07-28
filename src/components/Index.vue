<template>

    <swiper :options="swiperOptions" class="swiper-box">  
        <!-- 个性推荐 -->  
        <swiper-slide>  
            
        </swiper-slide>
        <!-- 排行榜 -->
        <swiper-slide>  
        
        </swiper-slide>   
        <div class="swiper-paginationIn" slot="pagination"></div>  
    </swiper>

</template>

<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  const TAB_NAME = ['个性推荐','排行榜']  

  export default {
    components: {  
      swiper,  
      swiperSlide  
    },  
    data () {
      return {
        swiperOptions: {
              pagination: '.swiper-paginationIn',
              paginationClickable: true,
              paginationBulletRender(swiper, index, className) {
                return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
              }
        }
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin-top: 60px;
  }
  .swiper-box{
    width: 100%;
    height: 100%;
    margin-top: 60px;
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
</style>
