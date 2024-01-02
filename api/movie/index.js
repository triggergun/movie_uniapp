import config from "../../static/js/conf/config";
import {request} from "../../static/js/utils/request";
// show movie list
export function getMovieData(data){
    return request(config.onLineMovieApi+"/movie/page/list","get",data)
}