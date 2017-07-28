<template>
	
	<div class ="ranklist">
		<popup></popup>
		<div class="ranklist-top"><span class="back" @click="goBack"></span>排行榜</div>
		<div class="ranklist-bg">
			<img v-lazy="imgurl"/>
		</div>
		<div class="ranklist-content">
			<div class="ranklist-opracity">
				
			</div>
			<div class="ranklist-info">
				<h2>巅峰榜·流行指数</h2>
			</div>
			<div class="ranklist-play"><div class="play-info"><img src="./../assets/play.png">播放全部</div><div class="ranklist-all"></div></div>
			<ul class="songlist" v-if="ranklist.songlist!=null">
				<li v-for="(item,index) in ranklist.songlist">
					<span>{{index+1}}</span>
					<div class="songlist-left">
						<div>
							<h2>{{item.data.songname}}</h2>
							<p>{{item.data.singer[0].name}}-{{item.data.albumname}}</p>
						</div>
						<img src="./../assets/icon-btn.png"/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Popup from './Popup' 
	export default{
		components : {
			Popup
		},
		data(){
			return {
				ranklist:[],
				imgurl:null,
				topid:this.$route.params.id
			}
		},

		methods:{
			goBack:function(){
				this.$router.go(-1);
			}
		},
		created:function(){
			this.$store.dispatch('getRankSongs',this.topid).then((response) => {
				console.log(response.data);
        		this.ranklist = response.data
        		this.imgurl = this.ranklist.topinfo.pic_album
        		// console.log(this.imgurl);
      		})
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.ranklist{
		position:absolute;
		top: 0;
		width: 100%;
		min-height: 100%;
		z-index: 2;
		background: #fbfcfd;
		font-size: 14px;
		color: #929292;
		.ranklist-top{
			height: 50px;
			line-height: 50px;
			text-align: center;
			position: fixed;
			width: 100%;
			z-index: 10;
			top: 0;
			left: 0;
		}
		.back{
			width: 25px;
			height: 25px;
			position: absolute;
			top: 10px;
			left: 15px;
			background: url(./../assets/back.png) no-repeat;
    		background-size: 100% 100%;
		}
		.ranklist-bg{
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 2;
			// background-color: rgba(7,17,27,.5);
		}
		.ranklist-bg img{
			width: 100%;
		}
		.ranklist-content{
			// padding-top: 335px;
			position: absolute;
			top: 0;
			width: 100%;
			left: 0;
			z-index: 3;

		}
		.ranklist-info{
			padding-left: 10px;
		}
		.ranklist-play{
			display: flex;
			display: -webkit-flex;
			// flex-direction:row;
			justify-content:space-between ;
			align-items:center;
			padding-top: 10px;
			padding-left: 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #e2e2e3;
			background: #fbfcfd;
			.play-info{
				display: flex;
				display: -webkit-flex;
				align-items:center;
			}
			img{
				width: 20px;
				height: 20px;
				margin-right: 8px;
			}
			.ranklist-all{
				width: 18px;
				height: 18px;
				background: url(./../assets/list.png) no-repeat;
				background-size: 100% 100%;
				margin-right: 10px;
			}
		} 
		.songlist{
			background: #fbfcfd;
		}

		.songlist li{
			display: flex;
			display: -webkit-flex;
			// justify-content:space-between ;
			flex-direction:row;
			align-items:center;
			margin-left: 44px;
			border-bottom: 1px solid #e2e2e3;
			height: 60px;
			span{
				width: 50px;
				text-align: center;
				margin-left: -44px;
			}
		}
		.songlist-left{
			display: flex;
			display: -webkit-flex;
			justify-content:space-between;
			align-items:center;
			width: 100%;
			h2{
				color: #333;
				font-size: 15px;
				white-space:nowrap;
				text-overflow:ellipsis;
				-o-text-overflow:ellipsis;
				overflow: hidden;
				max-width: 250px;
			}
			p{
				font-size: 10px;
				max-width: 250px;
				white-space:nowrap;
				text-overflow:ellipsis;
				-o-text-overflow:ellipsis;
				overflow: hidden;
			}
			img{
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}
		}
	}
	.ranklist-opracity{
		height: 335px;
	}
</style>