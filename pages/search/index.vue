<template>
	<view class="page">
		<view class="status_bar bg-color"></view>
		<view :class="{ nav: true, wechat: true, ipx: isIpx }">
			<view class="back" @click="back()"></view>
			<view class="title">搜索电视剧</view>
		</view>
		<view :class="{ header: true, ipx: isIpx }">
			<view :class="{ 'search-header': true }" @click="isShow = true">
				<view class="search-wrap">
					<view class="icon"></view>
					<view class="search">输入影视名称或上映时间</view>
				</view>
			</view>
		</view>
		<view :class="{ main: true, ipx: isIpx }">
			<view class="goods-wrap" v-for="(item, index) in searchMovies" :key="item.gid" v-if="searchMovies.length > 0">
				<view class="shop">
					<view class="shop-name">{{ item.movieName }}</view>
					<view class="distance">{{ item.source }}</view>
				</view>
				<view class="goods-list">
					<view class="image"><image :src="item.imageUrl"></image></view>
					<view class="goods-info">
						<view class="goods-title">{{ item.getTime }}</view>
						<view class="sales">关注度：{{ item.number }}</view>
						<view class="price-wrap">
							<view class="price">上映时间:{{ item.updataTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-data" v-if="searchGoods.length <= 0">没有相关菜品！</view>
		<Search :show="isShow" @close="isShow = false" :isLocal="true"></Search>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Search from '../../components/search';
export default {
	name: 'search',
	data() {
		return {
			isShow: false
		};
	},
	onLoad(opts) {
		//接收搜索关键词
		this.keywords = opts.keywords ? decodeURIComponent(opts.keywords) : '';
		console.log(this.keywords);
		// this.lng=0;//经度
		// this.lat=0;//纬度
		this.maxPage = 0; //总页码数
		this.curPage = 1; //当前页码
	},

	onShow() {
		// 显示执行一次
		this.getSearchMovies({
			currentPage: 1,
			pageSize: 20,
			keyword: this.keywords,
			success: res => {
				this.maxPage = res.page.pages;
			}
		});
	},
	computed: {
		...mapState({
			isIpx: state => state.system.isIpx,
			searchMovies: state => state.search.searchMovies
		})
	},
	methods: {
		...mapActions({
			getSearchMovies: 'search/getSearchMovies',
			getSearchMoviesPage: 'search/getSearchMoviesPage'
		}),
		back() {
			uni.navigateBack({
				delta: 1
			});
		}
	},
	components: {
		Search
	},
	//上拉加载数据
	onReachBottom() {
		if (this.curPage < this.maxPage) {
			this.curPage++;
			this.getSearchMoviesPage({ currentPage: this.curPage, pageSize: 20, keyword: this.keywords });
		}
	}
};
</script>

<style scoped>
.page {
	width: 100%;
	background-color: #ffffff;
	overflow: hidden;
}
.status_bar.bg-color {
	background-color: #e30019;
}
.nav {
	width: 100%;
	height: 88rpx;
	background-color: rgb(227, 0, 25);
	position: fixed;
	z-index: 91;
	left: 0;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.nav .back {
	width: 40rpx;
	height: 40rpx;
	background-image: url('https://movie-info-1320192491.cos.ap-guangzhou.myqcloud.com/search_components_page%2Fback2.png');
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center;
}
.nav .title {
	position: absolute;
	z-index: 1;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: #ffffff;
	font-size: 28rpx;
}
.header {
	width: 100%;
	background-color: #eb1625;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 88rpx;
	z-index: 90;
}
.search-header {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-top: 88rpx;
	box-sizing: border-box;
	padding-bottom: 20rpx;
}
.header .search-wrap {
	width: 80%;
	height: 52rpx;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 5px;
	display: flex;
	justify-content: start;
	align-items: center;
}
.header .search-wrap .icon {
	width: 44rpx;
	height: 44rpx;
	background-image: url('https://movie-info-1320192491.cos.ap-guangzhou.myqcloud.com/mian_page%2Fsearch_icon.png');
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center;
	margin: 0 20rpx;
}
.header .search-wrap .search {
	font-size: 28rpx;
	color: #999999;
}

.main {
	width: 100%;
	margin: 0 auto;
	margin-top: 280rpx;
	overflow: hidden;
}
.goods-wrap {
	width: 100%;
	overflow: hidden;
	margin-bottom: 40rpx;
	border-bottom: 1px solid #efefef;
	box-sizing: border-box;
	padding-left: 50rpx;
	padding-right: 50rpx;
	padding-bottom: 50rpx;
}
.shop {
	width: 100%;
	height: 36rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}
.shop .shop-name {
	font-size: 36rpx;
	font-weight: bold;
	width: 80%;
	height: 54rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.shop .distance {
	font-size: 24rpx;
	color: #666666;
}
.goods-list {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}
.goods-list .image {
	/**
	 * 修改图片的尺寸
	 */
	width: 193rpx;
	height: 257rpx;
	margin-right: 20rpx;
	border-radius: 6px;
}
.goods-list .image image {
	width: 100%;
	height: 100%;
	border-radius: 6px;
}
.goods-list .goods-info {
	width: 62%;
	height: auto;
	margin-right: 20rpx;
}
.goods-list .goods-title {
	width: 100%;
	height: 80rpx;
	overflow: hidden;
	font-size: 28rpx;
	color: #333333;
	font-weight: bold;
}
.goods-list .sales {
	font-size: 24rpx;
	color: #999999;
	margin-top: 10rpx;
}
.goods-list .price {
	font-size: 28rpx;
	color: #fb4e44;
	font-weight: bold;
}
.goods-list .price-wrap {
	width: 100%;
	margin-top: 10rpx;
	display: flex;
	justify-content: space-between;
}

/*#ifdef MP-WEIXIN*/
.nav.wechat {
	padding-top: 70rpx;
}
.nav.wechat.ipx {
	padding-top: 90rpx;
}
.nav.wechat .title {
	top: 65%;
}
.nav.wechat.ipx .title {
	top: 75%;
}
.header.ipx {
	top: 170rpx;
}
.main.ipx {
	margin-top: 330rpx;
}
/*#endif*/
</style>
