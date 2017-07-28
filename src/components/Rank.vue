<template>
	<div class="rank">
		<div class="list-title"><div><span>云音乐官方榜</span></div><div class="list-more"></div></div>
		<ul class="rank-media">
			<li v-for="item in ranklist" @click="showRank(item.id)">
				<img v-lazy="item.picUrl"/>
				<div class="rank-info">
					<p v-for="(items, index) in item.songList">{{index+1}}.{{items.songname}}-{{items.singername}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
    import RankList from './RankList'
	export default{
        components: {RankList},
		 data() {  
		 	return{
		 		loadingState: '正在加载...',
		 		ranklist:[]
		 	}
		 },
         methods:{
            showRank:function(id){
                this.$router.push({name:"rank",params:{id:id}});
            }
         },
		  created: function(){
		  	this.$store.dispatch('getRankList').then((response) => {
				console.log(response);
		        this.ranklist = response.data.data.topList.splice(0,9)//排行榜
		      }, (responce) => {
		        this.loadingState = '加载失败'
		      })
		  }
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.rank{
		margin-top: 40px;
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
    .rank-media{
    	li{
    		display: flex;
    		display: -webkit-flex;
    		flex-direaction:column;
    		border-bottom: 1px solid #e2e2e3;
    		justify-content:flex-start;
    		img{
    			width: 123px;
    			height: 123px;
    			margin-right: 10px;
    			flex-shrink:0;
    		}
    		.rank-info {
    			padding-top: 16px;
    			line-height: 30px;
    			p{
    				white-space:nowrap;
					text-overflow:ellipsis;
					-o-text-overflow:ellipsis;
					overflow: hidden;
					max-width: 220px;
					color: #646566;
    			}
    		}
    	}
    }
</style>