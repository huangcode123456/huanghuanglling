const express=require("express");
//引入连接池
const pool=require("../pool.js");
//建立路由器对象
var router=express.Router();
//添加路由
//1.用户注册
