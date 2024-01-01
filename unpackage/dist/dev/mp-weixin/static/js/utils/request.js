function request(url,method="get",data={}){
    return new Promise(((resolve, reject) => {
        uni.request({
            url: url,
            data: data,
            method:method.toLocaleUpperCase(),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
				console.log(res.data)
                resolve(res.data)
            },
            fail:(res)=>{
                reject(res)
            }
        });
    }))
}
export {
    request
}
