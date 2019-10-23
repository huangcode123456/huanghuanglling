//在public/js/下新建login.js
//专门支持登录所有功能
//在public/login.html中<body>底部引入js/login.js
$(function(){
    function callback(result){
            // DOM四步
            // 1.查找要绑定的元素
            var input=document.getElementsById("ip");
            var tp=input.value;
            // 2.绑定事件函数
            input.onblur=function(){
                // 3.查找需要修改的元素
                var dp=document.getElementById("dp")
                // 4.修改元素
                if(/^1[3-9]{10}$/.test(tp)){
                    if(result.length>0){
                        dp.innerHTML="用户名重复"
                    }else{
                        dp.innerHTML="用户名可用"
                    }
                }else{
                    dp.innerHTML="用户名格式错误"
                }
            }
        }
    funs.getlogin(callback);
})