<script>
	export default {
		onLaunch: function() {
            uni.getSystemInfo({
                success: res=> {
                    if(res.model.indexOf('iPhone X')>-1){
                        this.$store.commit("system/SET_IPX",{isIpx:true});
                    }
                }
            });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
