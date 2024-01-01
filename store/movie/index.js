import {
	getMovieData
} from "../../api/movie";
export default {
	namespaced: true,
	state: {
		movies: []
	},
	mutations: {
		//设置  电影list
		["SET_MOVIES"](state, payload) {
			console.log(payload.movies)
			// 设置本地的变量
			state.movies = payload.movies;
		},

		//设置商铺分页数据
		["SET_MOVIES_PAGE"](state, payload) {
			state.movies.push(...payload.movies)  // 数组的方法
		}
	},

	//  payload  是行为方法的  参数对象。
	actions: {
		//显示首页   电影列表,是mian页面的方法
		getMovie(conText, payload) {
			// /api/movie的方法
			getMovieData(payload).then(res => {
				if (res.code == 0) {
					conText.commit("SET_MOVIES", {
						movies: res.data.list
					});
					if (payload.success) {
						console.log("结果是" + res.data)
						payload.success(res.data)
					}
				}

				// 执行结束
				if (payload.complete) {
					payload.complete()
				}

			})
		},

		//mian页面的方法，显示首页分页电影数据
		getMoviePage(conText, payload) {
			getMovieData(payload).then(res => {
				if (res.code == 0) {
					conText.commit("SET_MOVIES_PAGE", {
						movies: res.data.list  // 获取数组
					});
				}
			})
		}


	}
}
