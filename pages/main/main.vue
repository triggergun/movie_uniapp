<template>
	<view class="page">
		<view class="status_bar"></view>
		<view class="header">
			<!--  点击时设置为 true -->
			<view :class="{ 'search-header': true, ipx: false }" @click="isShowSearchComponents = true">
				<view class="search-wrap">
					<view class="icon"></view>
					<view class="text">请输入影视信息</view>
				</view>
			</view>
		</view>
		<view class="shop-main">
			<view class="shop-list" v-for="item in movies" :key="item.id">
				<view class="shop-wrap">
					<view class="image"><image :src="item.imageUrl"></image></view>
					<view class="shop-info">
						<view class="shop-name">{{item.movieName}}</view>
						<view class="distance">{{item.number}}</view>
						<view class="address">{{item.updataTime}}</view>
						<view class="get-time">获取时间{{item.getTime}}</view>
						<view class="source">{{item.source}}</view>
						<view class="pack-btn">详情</view>
					</view>
				</view>
			</view>
		</view>
		<Search :show="isShowSearchComponents" @close="isShowSearchComponents = false"></Search>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Search from '../../components/search';

export default {
	data() {
		return {
			isShowSearchComponents: false
		};
	},

	onLoad() {
		//this.getMovie();
		// console.log('我是onLoad方法');
		this.maxPage = 0; //总页数
		this.curPage = 1; //当前页码
	},
	onShow() {
		// console.log('我是onShow方法');
		this.getMovie({
			currentPage: 1,
			pageSize: 20,
			success: res => {
				this.maxPage = res.page.pages;
			}
		});
	},
	methods: {
		...mapActions({
			// 注入函数
			getMovie: 'movie/getMovie',
			getMoviePage: 'movie/getMoviePage'
		}),
		formatDateTime(dateString) {
			const date = new Date(dateString);
			const options = {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			};

			return new Intl.DateTimeFormat('en-US', options).format(date);
		}
	},
	computed: {
		...mapState({
			isIpx:state => state.system.isIpx,
			movies:state => state.movie.movies,
			isShowStatus:state => state.movie.isShowStatus
		})
	},
	//下拉刷新
	onPullDownRefresh() {
		this.getMovie({
			currentPage: 1,
			pageSize: 20,
			complete: () => {
				uni.stopPullDownRefresh();
			}
		});
	},

	//上拉加载数据
	onReachBottom() {
		if (this.curPage < this.maxPage) {
			this.curPage++;
			this.getMoviePage({ currentPage: this.curPage, pageSize: 20 });
		}
	},
	//分享小程序
	onShareAppMessage(res) {
		return {
			title: '木有木兮小程序',
			path: '/pages/main/main'
		};
	},
	// 组件
	components: {
		Search
	}
};
</script>

<style scoped>
.page {
	width: 100%;
	min-height: 100vh;
	orverflow: hidden;
}
.header {
	width: 100%;
	background-color: red;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 90;
}
.header .search-header {
	width: 80%;
	height: 170rpx;
	padding-left: 40rpx;
	display: flex;
	align-items: center; // 交叉轴
}
.header .search-header.ipx {
	height: 210rpx;
}
.header .search-wrap {
	width: 80%;
	height: 52rpx;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 5px;
	display: flex;
	align-items: center;
}
.header .icon {
	width: 44rpx;
	height: 44rpx;
	background-image: url('https://movie-info-1320192491.cos.ap-guangzhou.myqcloud.com/mian_page%2Fsearch_icon.png');
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	margin: 0 20rpx;
}
.header .text {
	color: #999999;
	font-size: 28rpx;
}

.shop-main {
	width: 100%;
	margin-top: 220rpx;
}
.shop-main .shop-list {
	width: 100%;
	border-bottom: 1px solid #efefef;
	box-sizing: border-box;
	padding: 20rpx 0;
}
.shop-main .shop-list .shop-wrap {
	width: 92%;
	margin: 0 auto;
	display: flex;
}
.shop-main .shop-list .shop-wrap .image {
	width: 193rpx;
	height: 257rpx;
	margin-right: 20rpx;
}
.shop-main .shop-list .shop-wrap .image image {
	width: 100%;
	height: 100%;
	border-radius: 5px;
}
.shop-main .shop-list .shop-info {
	width: 72%;
	clear: both;
}
.shop-main .shop-list .shop-info .shop-name {
	width: 100%;
	height: 44rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 32rpx;
	font-weight: bold;
}
.shop-main .shop-list .shop-info .distance {
	font-size: 28rpx;
	margin-top: 10rpx;
	color: #666666;
}
.shop-main .shop-list .shop-info .address {
	font-size: 28rpx;
	margin-top: 10rpx;
	color: #666666;
	width: 100%;
	height: 44rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.shop-main .shop-list .shop-info .get-time {
	font-size: 28rpx;
	margin-top: 10rpx;
	color: #666666;
	width: 100%;
	height: 44rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.shop-main .shop-list .shop-info .source {
	float: left;
	font-size: 32rpx;
	margin-top: 10rpx;
	color: #666666;
	width: 50%;
	height: 44rpx;
	overflow: hidden;
	white-space: nowrap;
	font-weight: bold;
	text-overflow: ellipsis;
}

.shop-main .shop-list .shop-info .pack-btn {
	padding: 10rpx 20rpx;
	background-color: #eb1625;
	font-size: 28rpx;
	color: #ffffff;
	display: table;
	border-radius: 5px;
	float: right;
	font-weight: bold;
	margin-top: 10rpx;
}

/*   lyp  */

.show-loading view {
	text-align: center;
}
.show-loading {
	text-align: center;
	width: 100%;
	position: fixed;
	top: 300rpx;
}

/* 行高 == 高垂直居中对齐 */
/* .load-text{
	width: 100%;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	background-color: #F0AD4E;
} */
</style>
