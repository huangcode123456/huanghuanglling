<template>
	<div class="dall">
		<div class="dall_top">
			<div>
				<div class="bigtu">
					<img :src="'http://127.0.0.1:4000/'+list.pic">
				</div>
				<p class="dtitle">{{list.title}}</p>
				<p class="dprice">￥{{list.price}}</p>
				<p class="dcuc">
					<span>库存：{{list.stock}}</span>
					<span>运费：{{list.fare}}</span>
				</p>
			</div>
			<div class="dicon">
				<div></div>
				<img src="../../img/xiangqing.png">
				<span>详情</span>
				<div class="lcld"></div>
			</div>	
			<div class="prode">
				<div>产品详情</div>
				<div>
					<p>{{list.details}}
					</p>
				</div>
			</div>
		</div>
		<div class="dgwc">
			<div class="dtwo">
				<div>
					<img src="../../img/gouwuche.png">
					<div>购物车</div>
				</div>
				<div @click="toBottom">
					<img src="../../img/dianpu.png">
					<div>店铺</div>
				</div>
			</div>
			<div class="joingw both"><label>加入购物车</label></div>
			<div class="gbn both"><label>立即购买</label></div>
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
			var url="xiangqing";
			this.axios.get(url,{params:{lid:this.lid}})
		.then(res=>{
        	//console.log(res);
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
	.dall_top{
		margin-bottom:18%;
	}
	.bigtu{
		height:100%;
		text-align:center;
		overflow:hidden;
	}
	.bigtu>img{
		width:100%;
		height:100%;
	}
	.dtitle{
		width:80%;
		margin:auto;
		color:#333333;
		font-size:0.9em;
		padding-top:3%;
	}
	.dprice{
		width:80%;
		margin:auto;
		color:#FF7100;
		font-size:0.9em;
		padding:3% 0;
	}
	.dcuc{
		width:80%;
		margin:5% auto;
		color:#666666;
		font-size:0.7em;
	}
	.dcuc>span{
		margin-right:8%;
	}
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
	.dgwc{
		width:100%;
		position:fixed;
		bottom:0;
		margin-top:65px;
		display:flex;
	}
	.dtwo{
		display:flex;
		background:#fff;
	}
	.dtwo>div{
		border:1px solid #ccc;
		border-bottom:0;
		text-align:center;
		padding-top:2px;
		padding-bottom:2px;
	}
	.dtwo>div>img{
		width:20px;
		height:20px;
	}
	.dtwo>div>div{
		width:62px;
		font-size:12px;
	}
	.both{
		width:60%;
		height:44px;
		color:#fff;	
		text-align:center;
		line-height:44px;
	}
	.joingw{
		background:#F5a623;
	}
	.gbn{
		background:#FF7100;
	}
</style>
