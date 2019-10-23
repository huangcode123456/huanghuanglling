<template>
    <div class="app">
        <div class="datu">
            <img :src="'http://127.0.0.1:4000/'+list.pic" alt="" width="100%" height="100%">
        </div>
        <!-- 活动价 开始 -->
        <div class="group-price">
            <div class="curren-price">
                ¥<span>140~140</span>   
            </div>
            <div class="origin-price">¥{{list.price}}.00</div>
            <div class="group-times">
                <div>活动时间</div>
                <div style="line-height:20px;">长期</div>
            </div>
        </div>
        <!-- 活动价 结束 -->
        <!-- ============================ -->
        <div class="goods-header">
            <div class="goods-title">{{list.title}}</div>
            <div class="goods-info">
                <div>库存：{{list.stock}}</div>
                <div>运费：{{list.fare}}</div>
            </div>
        </div>
        <!-- 拼团规则 -->
        <div class="section" style="padding:0px 15px; display:block">
            <div class="group-rule">
                <div class="group-tag">拼团</div>
                <span>查看拼团规则</span>  
                <div class="tb">></div>
            </div>
        <!-- 加入拼团 -->
            <div class="group-step">
                <div class="join">
                    <div>
                        <img src="../../img/lianxi.png" alt="">
                    </div>
                    <span>>></span>
                    <div>
                        <img src="../../img/zhifu.png" alt="">
                    </div>
                    <span>>></span>
                     <div>
                        <img src="../../img/cg.png" alt="">
                    </div>
                </div>
                <div class="wenzi">
                    <span>加入拼团或自己开团</span>
                    <span>支付货款</span>
                    <span>拼团成功分别发货逾期未完成退款</span>
                </div>
            </div>
        <!-- 结束 -->
        <!-- ========================== -->
        <!-- 进行中的拼团 -->
            <div class="groups-wrap">
                <div class="grouping">进行中的拼团：</div>
                <div class="no-group">
                    暂无进行中的拼团
                    <div class="open-group">马上开团</div>
                </div>
            </div>
        </div>
        <!-- 结束-=============== -->
        <!-- 详情 -->
        <div class="dicon">
				<div></div>
				<img src="../../img/xiangqing.png">
				<span>详情</span>
				<div class="lcld"></div>
		</div>
        <!-- 产品详情 -->
        	<div class="prode">
				<div>产品详情</div>
				<div>
					<p>{{list.details}}
					</p>
				</div>
			</div>
    </div>
</template>
<script>
 export default {
 	data(){
 		return{
 			list:{price:0,pic:"y_1.jpg"}
 		}
 	},
  props:["lid"],
 	methods:{
 		toBottom(){
 			this.$router.push("/bottom");
 		},
 		load(){
            var url="details";
            console.log(this.lid)
			this.axios.get(url,{params:{lid:this.lid}})
		.then(res=>{
        	console.log(res);
                 this.list=res.data.data[0];
                  console.log(this.list);
 			})
 		}
 	},
 	created(){
 		this.load();
 	},
 	watch:{
 		lid(){
 			this.load();
 		}
 	}
 }
 </script>
<style scoped>
    .app{width:86%;margin:0 auto;}
    .datu{width:100%;height:720px;text-align: center;overflow: hidden;}
/*活动样式*/
    .group-price{
        position: relative;
        height: 50px;
        line-height: 50px;
        width:100%;
        background: #d0011b;
        color:#fff;
    }
    .group-price .curren-price{
        margin-left:15px;
        height:35px;
        line-height: 45px;
        display: block;
        color:#ff9e6d;
    }
    .curren-price span{
        font-size: 25px;
        font-family: "微软雅黑";
    }
    .origin-price{
        margin-left:15px;
        height:15px;
        line-height: 15px;
        font-size:12px;
        padding-left: 20px;
        text-decoration: line-through;
    }
    .group-times{
        position: absolute;
        bottom:0;
        right:0;
        height:50px;
        background: #ffc617;
        text-align: center;
        background-image: -webkit-gradient(linear, 0 0, right 0, from(#fefa43), to(#ffc114));
    }
    .group-times::before{
        content: '';
        position: absolute;
        left: -25px;
        top: 0;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
        border-right: 25px solid #fefa43;
    }
    .group-times div{
            height: 25px;
            line-height: 35px;
            font-size: 12px;
            min-width: 130px;
            color: #8c2301;
    }
/*标题样式*/
    .goods-header{padding: 1px 10px;}
    .goods-title{font-size: 14px;color:#333;padding-top: 8px;}
    .goods-info div{
        margin:0 20px 6px 0;
        color:#666;
        display: inline-block;
        font-size: 12px;
        line-height: 20px;
    }
/*拼团规则*/
    .group-rule{
        height:45px;
        line-height: 45px;
        border-bottom: 1px solid #ddd;
    }
    .group-tag{
        display: inline-block;
        position: relative;
        height: 15px;
        line-height: 15px;
        background: red;
        font-size: 12px;
        padding: 1px 10px;
        vertical-align: middle;
        color: #fff;
        margin-right: 12px;
        background-image: -webkit-gradient(linear, 0 0, right 0, from(#ff00ea), to(#ff0e18));
    }
    .group-tag::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 3px solid #fff;
    }
    .group-tag::after{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 3px solid #fff;
    }
    .group-rule span{
        vertical-align: middle;
        display: inline-block;
        color:#666;
    }
    .tb{
        color:#999;
        float:right;
        height:45px;
        line-height: 45px;
    }
/*加入拼团*/
    .group-step{margin:0 auto;text-align: center;padding: 25px 0;}
    .join{
        width:100%;
        height:41px;
        display: flex;
    }
    .join div{
        width:40px;
        height:41px;
        margin-left: 16px;
    }
    .join span{
        height:41px;
        line-height: 35px;
        color:#d0011b;
        font-weight: bold;
        text-align: center;
        margin-left:20px;
        }
    .join div img{
        width:100%;
        height:100%;
    }
    .wenzi{
        font-size:12px;
        color:#666;
    }
    .wenzi span{
        color:#666;
        display: inline-block;
        width: 33%;
        text-align: center;
        vertical-align: middle;
        margin-top: 20px;
    }
/*进行中的拼团*/
    .groups-wrap{
        padding: 0px 15px;
        display: block;
    }
    .grouping{
        height: 45px;
        line-height: 45px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }
    .no-group{height: 150px;line-height: 150px;text-align: center;}
    .open-group{
        display: inline-block;
        height: 30px;
        background: #d0011b;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        padding: 0 20px;
        margin-left: 10px;
    }
/*详情*/
    .dicon{
		width:85%;
		padding:3%;
		background:#F4F4F4;
		color:#B2B2B2;
		margin:auto;
		text-align:center;
		font-size:0.9em;
	}
    .dicon div{
		display:inline-block;
		width:45px;
		height:1px;
		margin-right:10px;
		background:#ccc;
		vertical-align:middle;
	}
	.dicon>img{
		width:15px;
		height:15px;
		vertical-align:bottom;
	}
	.dicon>span{
		display:inline-block;
		margin:0 5px 0 5px;
	}
/*产品详情*/
    .prode{
		width:85%;
		padding:10px;
		margin:auto;
		color:#333333;
		font-size:0.9em;
	}
	.prode>div:first-child{
		border-bottom:1px solid #f4f4f4;
	}
	.prode>div:nth-child(2){
		height:50px;
		margin-top:10px;
	}
	.prode>div:nth-child(2)>p{
		height:50px;
	}
</style>
