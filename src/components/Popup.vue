<template>
	<div class="popup">
		<div class="popup-list">
			<div class="popup-title">歌曲：告白气球</div>
			<ul class="popup-menu">
				<li>
					<img src="./../assets/icon-player.png"/>
					下一首播放
				</li>
				<li>
					<img src="./../assets/icon-singer.png"/>
					歌手：周杰伦
				</li>
				<li>
					<img src="./../assets/icon-album.png"/>
					专辑：周杰伦
				</li>
				<li>
					<img src="./../assets/icon-video.png"/>
					查看MV
				</li>
			</ul>
		</div>
		<!-- <div class="popup-mask"></div> -->
	</div>
</template>
<script type="text/ecmascript-6">
	export default{

	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.popup{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 11;
		background: rgba(0,0,0,.4);
		.popup-list{
			background: #f6f7f7;
			opacity: 0.92;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.popup-title{
				color: #5b5858;
				height: 45px;
				line-height: 45px;
				border-bottom: 1px solid #d5d3d2;
				padding-left: 10px;
			}
			.popup-menu{
				padding-left: 48px;
			}
			.popup-menu li{
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #d5d3d2;
				display: flex;
				display: -webkit-flex;
				align-items:center;
				color: #303031;
				img{
					width: 25px;
					height: 25px; 
					margin-left: -36px;
					margin-right: 12px;
				}
			}
			.popup-menu li:last-child{
				border-bottom: none;
			}
		}
	}
</style>