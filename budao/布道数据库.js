#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS bd;
#创建数据库，设置编码
CREATE DATABASE bd CHARSET=UTF8;
#进入创建的数据库
USE bd;
#创建用户信息表
create table bd_user(
  uid smallint primary key,#编号
  uname varchar(32) not null,#姓名
  sex bool,					#性别
  birthday varchar(32),		#生日
  sfz varchar(18),			#身份证
  qqnumber varchar(15),		#qq号码
  youbian int,				#邮编
  xueli varchar(8),			#学历
  upwd varchar(32),			#密码
  lxdz varchar(100),		#联系地址
  gxqm varchar(100),		#个性签名
  avatar varchar(128),		#头像
  phone varchar(11)			#电话
);
#商品表
create table bd_laptop(
	lid int primary key,		#商品编号
	family_id int,			
	product_id int,
	title varchar(128),		#产品编号
	price decimal(10,2),	#价格
	xprice decimal(10,2),	#销售价格
	name varchar(32),		#产品名称
	category varchar(32),	#所属分类
	details varchar(1024)	#产品详细说明
);
#用户收货地址
create table bd _receiver_address(
	rid int primary key,	#地址编号
	user_id int,			#用户编号
	rname varchar(6),		#收件人姓名
	ssdz varchar(128),		#所属地区
	xxdz varchar(128),		#详细地址
	rphone Int(11),			#收件人电话
	name varchar(32),		#产品名称
	email varchar(32),		#收件人邮箱
	ryzbm varchar(16)		#收件人邮政编码
);
#购物车
create table bd_shopping_cart(
	cid int primary key,	
	user_id int,			#用户编号
	product_id  int,		#商品编号
);
#用户订单表
create table bd_order(
	aid int primary key,	
	user_id int,			#用户编号
	address_id  int,
	status int,				#订单状态  1-等待付款  2-等待发货  3-	运输中  4-已签收  5-已取消
	order_time Bigint,      #下单时间
	pay_time Bigint,		#付款时间
);