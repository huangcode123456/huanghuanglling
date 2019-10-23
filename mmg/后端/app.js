const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session"); 
// const bodyParser = require('body-parser');
//3:创建数据库连接池(池 提高效率)
var pool = mysql.createPool({
    host:"127.0.0.1", //数据库地址
    user:"root",      //数据库用户名
    password:"",      //数据库密码
    port:3306,      //数据库端口
    database:"mmg",//库名
    connectionLimit:15//15连接
})
var server = express();
server.use(cors({
  //允许程序列表
  origin:["http://127.0.0.1:3001","http://localhost:3001","http://127.0.0.1:3002",],
  credentials:true//每次请求需要验证
}))
//5:配置session模块?????????
server.use(session({
   secret:"128位字符串",//安全字符串
   resave:true,//请求时更新数据
   saveUninitialized:true//保存初始数据
}))
// server.use(bodyParser.urlencoded({
//     extended: false
// }));
//6:配置项目静态目录 public
server.use(express.static("public"))
//7:创建express对象绑定4000端口
server.listen(4000);

//路由
//查询地址
server.get("/getaddress",(req,res)=>{
  var uid=req.session.uid;
  console.log(uid)
  var sql="select *from mmg_address where user_id=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result})
    }else{
      res.send({code:0})
    }
  })
})
//添加地址
server.get("/address",(req,res)=>{
  var name=req.query.name;
  var phone=req.query.phone;
  var uid=req.session.uid;
  var address1=req.query.address;
  var sql="insert into mmg_address values (null,?,?,?,?)";
  pool.query(sql,[uid,name,address1,phone],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1})
    }else{
      res.send({code:0})
    }
  })
})
//用户注册
server.get("/reg",(req,res)=>{
  var phone=req.query.phone;
  var sql="insert into mmg_user values(null,?)";
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1})
    }else{
      res.send({code:0})
    }
  })
})
//用户登录
server.get("/login",(req,res)=>{
  var phone=req.query.phone;
  var sql="select * from mmg_user where phone=?";
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      // console.log(result);
      req.session.uid=result[0].uid;
      // console.log(req.session.uid)
      res.send({code:1,data:result})
    }else{
      res.send({code:0})
    }
  })
})
//一元抢购
server.get("/oneSearch",(req,res)=>{
  var sql="select * from mmg_product where price=1"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result})
    }else{
      res.send({code:0})
    }
  })
})
// 首页商品列表
server.get("/product",(req,res)=>{
  var sql="SELECT * FROM mmg_product";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:0});
    }
  })
})
server.get("/xiangqing",(req,res)=>{
  var lid=req.query.lid;
  var sql="SELECT * FROM mmg_product WHERE lid=?"
  pool.query(sql,[lid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:0});
    }
  })
})
//精选信息加载
server.get("/msg",(req,res)=>{
  //(2)创建sql语句查询
  var sql = "select * from mmg_msg";
  //(3)执行sql语句
  pool.query(sql,(err,result)=>{
    if(err)throw err;
	if(result.length>0){
	 res.send({code:1,msg:"查询成功",data:result});
	}else{
	 res.send({code:-1,msg:"查询失败"});
	}
  })
})
//详情页面加载
server.get("/xiang",(req,res)=>{
  //获取mid参数
  var mid=req.query.mid;
  //创建sql语句查询
  var sql="select * from mmg_msg where mid = ?";
  //执行sql语句
  pool.query(sql,[mid],(err,result)=>{
    if(err)throw err;
    //(4)获取执行结果
    //(5)判断查询是否成功 result.length
    if(result.length>0){
      res.send({code:1,msg:"查询成功",data:result})
    }else{
      res.send({code:-1,msg:"查询失败"})
    }
   })
 })
//商品分类分页列表数据加载
server.get("/bottom",(req,res)=>{
  var sql="SELECT lid,pic,title,price,sales FROM mmg_product";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:0});
    }
  })
})
//分类商品详情
server.get("/details",(req,res)=>{
  var lid=req.query.lid;
  var sql="SELECT  lid,pic,title,price,stock,fare,details FROM mmg_product WHERE lid=?";
  pool.query(sql,[lid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:0});
    }
  })
})
//模糊查询
server.get("/search",(req,res)=>{
  var kw=req.query.kw;
  var sql=`SELECT lid,pic,title,price,sales,stock FROM mmg_product WHERE title like '%${kw}%'`;
  pool.query(sql,[kw],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:1,data:result})
    }else{
      res.send({code:0})
    }
  })
})
//详情商品点击加入购物车加入购物车
server.get("/addcart",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){res.send({code:-1,msg:"请登录"});return;}
  var lid=req.query.lid;//获取商品的编号
  var pic=req.query.pic;//获取商品的图片
  var title=req.query.title; //获取商品的标题
  var price=req.query.price;  //获取商品的价格
  var count=req.query.n; //获取商品的数量
  var fare=req.query.fare;//获取商品的运费
  console.log(uid,lid,pic,title,price,count,fare);
  //查询用户是否买过此商品
  var sql="SELECT iid FROM  mmg_shoppingcart_item WHERE uid=? AND lid=?";
  pool.query(sql,[uid,lid],(err,result)=>{
    if(err) throw err;
    //在回调函数之前判断是否购买过
    if(result.length==0){
      //没买过，添加数据
      console.log(0000)
      var sql=`INSERT INTO  mmg_shoppingcart_item VALUES(null,${uid},${lid},'${pic}','${title}',${price},${count},'${fare}',null)`;
    }else{
      //买过，数量加
      var sql=`UPDATE  mmg_shoppingcart_item SET count=${count} WHERE uid=${uid} AND lid=${lid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result)
      res.send({code:1,msg:"添加成功"})
    })
  })
})
//查询购物车数据
server.get("/findcart",(req,res)=>{
  //获取当前用户uid
  var uid=req.session.uid;
  console.log(uid)
  if(!uid){res.send({code:-1,msg:"请登录"});return;}
  var sql="SELECT lid,pic,title,price,count,fare FROM mmg_shoppingcart_item";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result)
    res.send({code:1,msg:"查询成功",data:result});
  
  })
})
//删除多个指定购物车商品
server.get("/delm",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){res.send({code:-2,msg:"请登录"});return;}
  //获取一组lid
  var lid=req.query.lid;
  var sql=`DELETE FROM mmg_shoppingcart_item WHERE lid IN(${lid})`;
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:'删除失败'})
    }
  })
})
