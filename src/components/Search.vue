<template>
	<div id="search">
		<!-- 搜索 -->
		<div class="search">
			<div class="search-input">
				<img src="./../assets/icon-search.png" alt="搜索"/>
				<form @submit.prevent="search(key)">
					<input type="text" placeholder="搜索 歌曲/专辑/歌手" @focus="focus()" v-model="key" />
				</form>
			</div>
			<div class="search-cancel" :class="{'search-cancel-show':searchShow}" @click="searchCancel()" @touchend="searchCancel()">
				取消
			</div>
		</div>

		<!-- 历史纪录 -->
		<div class="hotkey" v-if="searchRes==null&&searchShow">
			<p class="hotkey-title">热门搜索</p>
			<div class="search-hot">
				<div class="search-hot-item" v-for="item in hotkey" @click="search(item.k)">{{item.k}}</div>
			</div>
			<ul  class="search-history">
				<li v-for="(item,index) in searchHistory" @click="search(item)"><img src="./../assets/clock.png" class="clock" /><div class="search-history-name">{{item}}</div><img src="./../assets/close.png" class="close" @click="removeHistory(index)" /></li>
			</ul>
		</div>
		<!-- 搜索结果 -->
		<div class="result-swiper" v-if="searchRes!=null&&searchShow">  
	        <swiper :options="swiperOption">  
	            <!-- 这部分放你要渲染的那些内容 -->  
	            <!-- 单曲 -->
	            <swiper-slide>  
	            	<div class="result-song"  v-if="searchRes.song!=null&&searchShow">
	            		<ul class="song-list">
	            			<li v-for="item in searchRes.song.itemlist">
	            				<div class="result-left">
	            					<h2>{{item.name}}</h2>
	            					<p>{{item.singer}}-{{item.name}}</p>
	            				</div>
	            				<img src="./../assets/icon-btn.png" />
	            			</li>
	            		</ul>
	            	</div>
	            	<div class="noData" v-else>
						无结果
					</div>
	            </swiper-slide>
	            <!-- 专辑 -->
	            <swiper-slide>  
	            	<div class="result-song"  v-if="searchRes.album!=null&&searchShow">
	            		<ul class="album-list">
	            			<li v-for="item in searchRes.album.itemlist">
	            				<img v-lazy="item.pic" />
	            				<div class="result-left">
	            					<h2>{{item.name}}</h2>
	            					<p>{{item.singer}}</p>
	            				</div>
	            				
	            			</li>
	            		</ul>
	            	</div>
	            	<div class="noData" v-else>
						无结果
					</div>
	            </swiper-slide>   
	             <!-- 歌手 -->
	            <swiper-slide>  
	            	<div class="result-song"  v-if="searchRes.singer!=null&&searchShow">
	            		<ul class="singer-list">
	            			<li v-for="item in searchRes.singer.itemlist">
	            				<img v-lazy="item.pic" />
	            				<div class="result-left">
	            					<p>{{item.singer}}</p>
	            				</div>
	            			</li>
	            		</ul>
	            	</div>
	            	<div class="noData" v-else>
						无结果
					</div>
	            </swiper-slide>   
	             <!-- MV -->
	            <swiper-slide>  
	            	<div class="result-song"  v-if="searchRes.mv!=null&&searchShow">
	            		<ul class="song-list">
	            			<li v-for="item in searchRes.mv.itemlist">
	            				<div class="result-left">
	            					<h2>{{item.name}}</h2>
	            					<p>{{item.singer}}-{{item.name}}</p>
	            				</div>
	            				<img src="./../assets/vido.png" />
	            			</li>
	            		</ul>
	            	</div>
	            	<div class="noData" v-else>
						无结果
					</div>
	            </swiper-slide>    
	            <!-- 这是轮播的小圆点 -->  
	            <div class="swiper-pagination" slot="pagination"></div>  
	        </swiper>  
	    </div>  
	</div>
</template>

<script type="text/ecmascript-6">
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
 	const TAB_NAME = ['单曲','专辑','歌手', 'MV']  
	export default{
		components: {  
            swiper,  
            swiperSlide  
        },  
		data(){
			return {
				key: '',
				searchShow:false,
				hotkey: null,
				searchHistory:[],
				searchRes:null,
				swiperOption: {
		          pagination: '.swiper-pagination',
		          paginationClickable: true,
		          paginationBulletRender(swiper, index, className) {
		            return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
		          }
		        }
			}
		},

		methods:{
			search:function(key){
				this.key = key;
				this.$store.dispatch('search', key).then((response) => {
					// console.log(response);
					this.searchRes = response.body.data;
					console.log(this.searchRes);
					var index = this.searchHistory.indexOf(key);
					if(index>-1){
						this.searchHistory.splice(index,1);
					}
					this.searchHistory.unshift(key);
					this.searchHistory = this.searchHistory.slice(0,6);
					localStorage.searchHistory = JSON.stringify(this.searchHistory);
				})
			},

			//删除搜索记录
			removeHistory:function(index){
				this.searchHistory.splice(index,1);
				localStorage.searchHistory = JSON.stringify(this.searchHistory);
			},

			//输入框聚焦
			focus:function(){
				this.searchShow = true;
				this.searchRes = null;
				this.$emit("searchshow");
			},

			//取消按钮
			searchCancel:function(){
				this.searchShow = false;
				this.key='';
				this.$emit('searchhide')
			}
		},
		created: function () {
			if(localStorage.searchHistory){
				this.searchHistory = JSON.parse(localStorage.searchHistory);
			}
			this.$store.dispatch("getHotKey").then((response)=>{
				 // console.log(response);
				this.hotkey = response.body.data.hotkey;
				// console.log(this.hotkey);
			})
		}
	}
</script>

<style scoped>
	*{
		padding: 0;
		margin: 0;
	}
	body{
		font-family: PingFangSC-Regular;
	}
	ul ,li{
		list-style: none;
	}
	h2{
		font-weight: normal;
	}
	.search{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
		height: 60px;
		display: flex;
		flex-direction: row;
		background: #fff;
	}

	.search-input{
		background: #eee;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items:center;
		margin: 10px;
		width: 100%;
	}

	.search-input img{
		width: 30px;
		height: 30px;
		margin: 0 5px;

	}

	.search-input form{
		width: 100%;
		height: 100%;
	}

	.search-input input{
		background: none;
		width: 100%;
		height: 100%;
		border:none;
		-webkit-appearance: none;
	}

	.search-cancel{
		width: 0;
		height: 40px;
		line-height: 40px;
		transition:width 0.3s;
		margin: 10px 0;

	}

	.search-cancel-show{
		width: 55px;
	}

	.hotkey{
		position: fixed;
		top: 60px;
		left: 0;
		width: 100%;
		bottom: 50px;
		background: #fff;
		padding-left: 10px;
		/*padding-right: 10px;*/
		display: flex;
		flex-direction: column;
		color:#323233;
		z-index: 100;

	}

	.hotkey-title{
		padding-top: 10px;
		font-size: 10px;
		color:#bfbfbf;
		margin-bottom: 10px;
	}

	.search-hot{
		display: flex;
		flex-wrap: wrap;
	}

	.search-hot-item{
		padding: 3px 10px;
		border-radius: 15px;
		border:1px solid #d3d4da;
		margin-right: 10px;
		margin-bottom: 10px;
		font-size: 12px;
	}

	.clock,.close{
		width: 15px;
		height: 15px;
	}
	.clock{
		margin-right: 10px;
	}
	.close{
		margin-right: 20px;
	}

	.search-history li{
		display: flex;
		justify-content:space-between;
		height: 35px;
		align-items: center;
		border-bottom: 1px solid #e2e2e3;
	}

	.search-history-name{
		width: 100%;
		font-size: 12px;
	}

	.result-swiper{
		margin-top: 60px;
		background: #fbfcfd;
	}
	.result-song{
		margin-top: 40px;
	}
	.song-list{
		display: flex;
		flex-direction: column;
		padding-left: 20px;
	}
	.song-list li{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 14px 10px 0;
		border-bottom: 1px solid #e2e2e3;
		align-items: center;
	}
	.song-list li .result-left{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		font-size: 12px;
	}
	.song-list li h2{
		color:#323333;
		font-size: 14px;
		line-height: 20px;
	}
	.song-list li p{
		color: #969798;
		font-size: 12px;
	}
	.song-list li img{
		width: 20px;
		height: 20px;
	}
	.singer-list,.album-list{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		padding-left: 10px;
	}
	.singer-list li,.album-list li{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		padding: 5px 0;
		border-bottom: 1px solid #e2e2e3;
	}
	.singer-list li{
		align-items: center;
	}
	.singer-list li img,.album-list li img{
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}
	.singer-list li h2,.album-list li h2{
		font-size: 14px;
		line-height: 20px;
		color: #323333;
	}
	.album-list li p{
		font-size: 12px;
	    color: #929292;
	    line-height: 20px;
	}
	.noData{
		margin-top: 90px;
		text-align: center;
		font-size: 12px;
	}
</style>