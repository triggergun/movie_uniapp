(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"5d6e":function(e,t,n){"use strict";n.r(t);var o=n("e017");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("eeba");var c,u,a,i,l=n("f0c5"),f=Object(l["a"])(o["default"],c,u,!1,null,null,null,!1,a,i);t["default"]=f.exports},9487:function(e,t,n){},cd45:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){var t=this;e.getSystemInfo({success:function(e){e.model.indexOf("iPhone X")>-1&&t.$store.commit("system/SET_IPX",{isIpx:!0})}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=n}).call(this,n("543d")["default"])},e017:function(e,t,n){"use strict";n.r(t);var o=n("cd45"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},eeba:function(e,t,n){"use strict";var o=n("9487"),r=n.n(o);r.a},fac2:function(e,t,n){"use strict";(function(e,t){n("c57e");var o=u(n("66fd")),r=u(n("5d6e")),c=u(n("1426"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.config.productionTip=!1,r.default.mpType="app";var f=new o.default(i(i({},r.default),{},{store:c.default}));e(f).$mount();var s="http://localhost:8080/emos-wx-api";o.default.prototype.url={register:s+"/user/register",login:s+"/user/login"},o.default.prototype.ajax=function(e,n,o,r){t.request({url:e,method:n,header:{token:t.getStorageSync("token")},data:o,success:function(e){if(401==e.statusCode)t.redirectTo({url:"/pages/login/login.vue"});else if(200==e.statusCode&&200==e.data.code){var n=e.data;if(n.hasOwnProperty("token")){var o=n.token;console.log("获取的token保存到本地"+o),t.setStorageSync("token",o)}r(e)}else t.showToast({icon:"none",title:e.data})}})}}).call(this,n("543d")["createApp"],n("543d")["default"])}},[["fac2","common/runtime","common/vendor"]]]);