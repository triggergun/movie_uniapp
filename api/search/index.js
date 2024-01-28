import config from "../../static/js/conf/config";
import {request} from "../../static/js/utils/request";

//获取热门搜索关键词
// export function getHotKeywordsData(){
//     return request(config.baseApi+"/v1/search/hotkeywords");
// }

//获取搜索影视的列表
export function getSearchMoviesData(data){
    return  request(config.baseMovieApi+"/movie/keyword/list","get",data);
}
