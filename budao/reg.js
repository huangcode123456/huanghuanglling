//在public/js/下新建reg.js
//专门支持注册所有功能
//在public/login.html中<body>底部引入js/reg.js
var ipv=$("#ip").val()
$("#ip").on("input",function(){
    console.log(ipv)
})