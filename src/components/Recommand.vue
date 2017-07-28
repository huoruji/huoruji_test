<template>
	<div id="recommand">
		<swiper :options="swiperOptionIn"  ref="mySwiper">  
            <!-- 这部分放你要渲染的那些内容 -->  
            <swiper-slide v-for="item in slider">  
            	<img v-lazy="item.pic" class="img-rec" width="300" height="150" @click="jumUrl(item)"/>
            </swiper-slide>  
            <!-- 这是轮播的小圆点 -->  
            <div class="swiper-pagination-white swiper-pagination-position" slot="pagination"></div>  
        </swiper>
        <div class="hotlist">
        	<div class="list-title"><div><span>推荐歌单</span></div><div class="list-more"></div></div>
        	<ul class="list-content">
        		<li v-for="item in hotlist">
        			<img v-lazy="item.imgurl" />
        			<p>{{item.dissname}}</p>
        			<div class="earphone"><span></span> {{item.listennum|listenCount}}</div>
        		</li>
        	</ul>
        	<div class="list-title"><div><span>推荐MV</span></div><div class="list-more"></div></div>
        	<ul class="list-mv">
        		<li v-for="item in mvlist">
        			<img v-lazy="item.picurl"/>
        			<p>{{item.mvtitle}}</p>
        			<div class="earphone"><span></span> {{item.listennum|listenCount}}</div>
        		</li>
        	</ul>
        </div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
		    swiper,  
		    swiperSlide  
		 },
		 data() {  
            return { 
            	loadingState: '正在加载...', 
            	slider:[],
            	hotlist:[],
            	mvlist:[],
                swiperOptionIn: {  
	                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
	                autoplay: 3000, 
	                pagination: '.swiper-pagination-white',  
	                paginationClickable: true
                }  
            }  
        },
        methods:{
        	jumUrl:function(item){
        		window.open(item.jumpurl);
        	}
        },
        created: function(){
         	//定义这个sweiper对象  
			this.$store.dispatch('getRecommands').then((response) => {
				// console.log(response);
		        this.slider = response.data.data.focus//轮播图片
		        this.hotlist = response.data.data.hotdiss.list.splice(0,6)//热门歌曲
		        this.mvlist = response.data.data.shoubomv.all.splice(0,6)//热门歌曲
		      }, (responce) => {
		        this.loadingState = '加载失败'
		      })
        },
        filters: {
	      listenCount: num => Math.round(num / 1000) / 10 + '万'
	    },
        computed: {  
  
        },  
        mounted () {  
           
        }  
  

	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	#recommand{
		margin-top: 40px;
	}
	.swiper-pagination-position {
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    .img-rec{
    	width: 100%;
    	display: block;
    }
    #recommand .swiper-container-horizontal{
    	cursor: pointer;
    }
    .list-title{
    	height: 45px;
    	line-height: 45px;
    	display: flex;
    	flex-direction: row;
    	align-items:center;
    	font-size: 13px;
    	color: #323233;
    	span{
    		border-left: 2px solid #0e51a8;
    		padding-left: 10px;
    	}
    	.list-more{
    		width: 16px;
    		height: 16px;
    		background: url(./../assets/more.png) no-repeat;
    		background-size: 100% 100%;
    	}
    }

    .list-content {
    	display: flex;
    	display: -webkit-flex;
    	flex-direction: row;
    	flex-wrap:wrap;
    	justify-content:space-between;
    	li{
    		width: 33%;
    		position: relative;
    		img{
    			height: 123px;
    		}
    		p{
    			padding: 0px 6px 10px 6px;
    			color: #323233;
    			display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				line-height: 20px;
				height: 35px;
    		}
    		.earphone{
    			position: absolute;
    			top: 3px;
    			right: 5px;
    			display: flex;
    			display: -webkit-flex;
    			flex-direction: row;
    			align-items:center;
    			color: #fff;
    			font-size: 10px;
    			span{
    				width: 12px;
    				height: 12px;
    				background: url(./../assets/ear.png) no-repeat;
    				background-size: 100% 100%;
    				margin-right: 5px;
    			}
    		}
    	}
    }
    .list-mv {
    	display: flex;
    	display: -webkit-flex;
    	flex-direction: row;
    	flex-wrap:wrap;
    	justify-content:space-between;
    	li{
    		width: 49.5%;
    		position: relative;
    		img{
    			width: 100%;
    			height: 123px;
    		}
    		p{
    			padding: 0px 6px 10px 6px;
    			color: #323233;
    			display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				line-height: 20px;
				height: 35px;
    		}
    		.earphone{
    			position: absolute;
    			top: 3px;
    			right: 5px;
    			display: flex;
    			display: -webkit-flex;
    			flex-direction: row;
    			align-items:center;
    			color: #fff;
    			font-size: 10px;
    			span{
    				width: 12px;
    				height: 9px;
    				background: url(./../assets/video1.png) no-repeat;
    				background-size: 100% 100%;
    				margin-right: 5px;
    			}
    		}
    	}
    }


</style>