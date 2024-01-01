import config from "../../static/js/conf/config";
import {request} from "../../static/js/utils/request";
//显示首页商家列表
export function getMovieData(data){
    return request(config.baseMovieApi+"/movie/page/list","get",data)
}