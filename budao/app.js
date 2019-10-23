const express=require("express");
//引入bodyparser中间件
const bodyParser=require("body-parser");
//引入路由器
const userRouter=require("./router/user.js");
var app=express();
app.listen(8080);
//使用中间件bodyparser
app.use(bodyParser.urlencoded({
    extended:false
}));
//托管静态资源到public下
app.use(express.static("./public"));
//挂载路由器
app.use("/user",userRouter)