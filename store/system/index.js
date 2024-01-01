export default {
    namespaced:true,
    state:{
        isIpx:false, //是否iPhoneX
        platform:1//平台类型。值：1:微信小程序，2:微信公众号
    },
    mutations:{
        //设置isIpx
        ["SET_IPX"](state,payload){
			console.log(payload.isIpx);
            state.isIpx=payload.isIpx;
        }
    }
}
