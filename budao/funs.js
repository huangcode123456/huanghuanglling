var funs={
    getHeader:function(callback){
        return new Promise(function(resolve,reject){
            ajax({
                url:"header.html",
                type:"get",
                success: function(result){
                    resolve(result)
                }
            })
        })
    },
    getIndex:function(callback){
        ajax({
            url:"",
            type:"get",
            dataType:"json",
            success: function(result) {
                callback(result)
            }
        })
    },
    getDetails:function(lid,callback){
        ajax({
            url:"",
            type:"get",
            data:{lid},
            dataType:"json",
            success: function(result) {
                callback(result)
            }
        })
    },
    getlogin:function(uname,upwd,callback){
        $.ajax({
            url:"",
            type:"get",
            data:{uname,upwd},
            success: function(result) {
                callback(result)
            }
        })
    },
    getReg1:function(phone,callback){
        $.ajax({
            url:"http://localhost:3301/user",
            type:"get",
            data:{phone},
            success: function(result) {
                console.log(result)
                callback(result)
            }
        })
    },
}