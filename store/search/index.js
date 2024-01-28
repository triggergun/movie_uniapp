import {getSearchMoviesData} from "../../api/search";
export default {
	namespaced: true,
	state: {
		//搜索的关键词
		keywords: "",
        //历史搜索关键词
        historyKeywords:uni.getStorageSync("historyKeywords")?JSON.parse(uni.getStorageSync("historyKeywords")):[],
		searchMovies:[]//搜索菜品的数据
	},
	mutations: {
		//设置搜索关键词
		["SET_KEYWORDS"](state, payload) {
			state.keywords = payload.keywords;
		},
		//设置历史搜索关键词
		["SET_HISTORY_KEYWORDS"](state, payload) {
            if(payload.keywords){
                for(let i=0;i<state.historyKeywords.length;i++){
                    if(state.historyKeywords[i]==payload.keywords){
                        state.historyKeywords.splice(i--,1);
                        break;
                    }
                }
                state.historyKeywords.unshift(payload.keywords);
                uni.setStorageSync("historyKeywords",JSON.stringify(state.historyKeywords))
            }
		},
		//清除历史关键词
		["CLEAR_HISTORY_KEYWORDS"](state){
		    state.historyKeywords=[];
		    uni.removeStorageSync("historyKeywords");
		},
		//设置搜索影视【商品】的数据
		["SET_SEARCH_MOVIES"](state,payload){
		    state.searchMovies=payload.searchMovies;
		},
		
		//设置搜索影视【菜品】的分页数据
		["SET_SEARCH_MOVIES_PAGE"](state,payload){
		    state.searchMovies.push(...payload.searchMovies);
		}
	},
	actions:{
	    //获取搜索的菜品
	    getSearchMovies(conText,payload){
	        getSearchMoviesData(payload).then(res=>{
	            if(res.code==0){
					// 成功 表示
					console.log("电影结果"+JSON.stringify(res.data))
	                conText.commit("SET_SEARCH_MOVIES",{searchMovies:res.data.list});
	                if(payload.success){
						// data属性
	                    payload.success(res.data);
	                }
	            }else{
	                conText.commit("SET_SEARCH_MOVIES",{searchMovies:[]});
	            }
	        })
	    },
	    // 获取搜索菜品分页数据
	    getSearchMoviesPage(conText,payload){
	        getSearchMoviesData(payload).then(res=>{
	            if(res.code==0){
					// 响应的data属性
	                conText.commit("SET_SEARCH_MOVIES_PAGE",{searchMovies:res.data.list});
	            }
	        })
	    }
	
	}
	
	
}