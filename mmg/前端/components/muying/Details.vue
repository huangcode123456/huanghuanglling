<template>
	<div class="dall">
		<div class="dall_top">
			<div>
				<div class="bigtu">
					<img :src="'http://127.0.0.1:4000/'+list.pic">
				</div>
				<p class="dtitle">{{list.title}}</p>
				<p class="dprice">￥{{list.price.toFixed(2)}}</p>
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
		<div  class="dgwc">
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
			<div  @click="toGwc"  class="joingw both"><label>加入购物车</label></div>
			<div @click="toBuy" class="gbn both"><label>立即购买</label></div>
		</div>
		<!-- 隐藏的部分 -->
		<div v-show="bt">
			<div  class="bottom">
				<!-- 下一部分 -->
				<div class="bo1" >
					<!-- 左边小图片 -->
					<div class="boim">
						<img :src="'http://127.0.0.1:4000/'+list.pic">
					</div>
					<p class="botit">{{list.title}}</p>
					<p class="boprice">￥{{list.price.toFixed(2)}}</p>
					<span @click="close">x</span>
				</div>
				<div class="bo2">
					<span>数量</span>
					<div>
						<span>库存{{list.stock}}</span>
						<button @click="reduce">-</button>
						<input type="text" :value="n">
						<button @click="add" class="btnj">+</button>
					</div>
				</div>
				<div class="bo22"></div>
				<div @click="jcart" class="bo3" :data-lid="list.lid" :data-pic="list.pic" :data-title="list.title" :data-price="list.price" :data-fare="list.fare">加入购物车
				</div>
			</div>
			<div class="mask">
			</div>
		</div>
		<gobuy :list="list"></gobuy>
	</div>
</template>
<script>
//引入立即购买组件
import Gobuy from "./Gobuy.vue"
export default {
	data(){
		return{
			n:1,
			list:{price:0,pic:"y_1.jpg"},
			bt:false
		}
	},
	props:["lid"],
	methods:{
		reduce(){
			if(this.n>1){
			this.n--;
			}
		},
		add(){
				this.n++;
			if(this.n>=this.list.stock){
			   this.n=this.list.stock
				 this.$toast("已达到库存最高")
			}
		},
		toBottom(){
			this.$router.push("/bottom");
		},
		toGwc(){
			this.bt=true;
		},
		toBuy(){
			this.$store.commit("setOpen");
		},
		close(){
			this.bt=false;
			console.log(this.bt)
		},
		load(){
			var url="details";
			this.axios.get(url,{params:{lid:this.lid}})
			.then(res=>{
			//console.log(res);
				this.list=res.data.data[0];
			})
		},
		jcart(event){
			var n=this.n;
			var lid=event.target.dataset.lid;
			var pic=event.target.dataset.pic;
			var title=event.target.dataset.title;
			var price=event.target.dataset.price;
			var fare=event.target.dataset.fare;
			var obj={lid,pic,title,price,n,fare};
			//console.log(n,lid,pic,title,price,obj)
		  var url="addcart";
			this.axios.get(url,{params:obj})
			.then(res=>{
				console.log(res);
				if(res.data.code==-1){
					this.$router.push("/login");
				}else{
					this.$toast("添加成功");
				}
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
	},
	components:{
		"gobuy":Gobuy
	}
}
</script>
<style scoped>
	.dall_top{
		margin-bottom:38px;
		z-index:1;
	}
	.bigtu{
		height:720px;
		text-align:center;
		overflow:hidden;
	}
	.bigtu>img{
		width:100%;
		height:100%;
	}
	.dtitle{
		width:300px;
		margin:auto;
		color:#333333;
		font-size:13px;
		padding-top:8px;
	}
	.dprice{
		width:300px;
		margin:auto;
		color:#FF7100;
		font-size:14px;
		padding:8px 0;
	}
	.dcuc{
		width:300px;
		margin:8px auto;
		color:#666666;
		font-size:12px;
	}
	.dcuc>span{
		margin-right:20px;
	}
	.dicon{
		width:320px;
		padding:8px;
		background:#F4F4F4;
		color:#B2B2B2;
		margin:auto;
		text-align:center;
		font-size:12px;
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
		width:320px;
		padding:10px;
		margin:auto;
		color:#333333;
		font-size:14px;
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
		width:124px;
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
	/*隐藏部分注释*/
	.bottom{
		width:100%;
		height:120px;
		background:#fff;
		position:fixed;
		bottom:66px;
		left:0px;
		z-index:3;
	}
	.bo1{
		width:100%;
		height:60px;
		border-bottom:1px solid #eee;
	}
	.boim{
		position:relative;
	}
	.boim>img{
		width:85px;
		height:85px;
		position:fixed;
		left:12px;
		bottom:119px;
		border:1px solid #eee;
		border-radius:6px;
	}
	.botit{
		width:218px;
		height:20px;
		margin-left:100px;
		margin-top:6px;
		white-space:nowrap;
		text-overflow: ellipsis;
		overflow:hidden;
		color:#353535;
		font-size:14px;
	}
	.boprice{
		margin-left:100px;
		color:#ff7610;
		font-size:14px;
		font-weight:bold;
	}
	.bo1>span{
		float:right;
		width:22px;
		height:22px;
		text-align:center;
		line-height:17px;
		font-size:20px;
		font-weight:bold;
		color:#67666F;
		margin:-39px 8px 0 0;
		border:1px solid #000;
		border-radius:50%;
	}
	.bo2{
		height:62px;
		display:flex;
		justify-content:space-between; 
	  align-items:center;
		background:#fff;
	}
	.bo2>div>input{
		width:26px;
		height:22px;
		text-align:center;
		background:#eee;
		outline:none;
		border:0;
		margin:0 2px 0 2px; 
	}
	.bo2>div>button{
		width:22px;
		height:22px;
		background:#eee;
		border:0;
		border-radius:2px;
	}
	.btnj{
		margin-right:5px;
	}
	.bo2>div>span{
		margin-right:5px;
	}
	.bo22{
		width:100%;
		height:10px;
		background:#fff;
		border-top:1px solid #eee;
	}
	.bo3{
		width:100%;
		height:46px;
		padding-right:5px;
		background:#F5a623;
		text-align:center;
		color:#fff;
		line-height:46px;
	}
	/* 遮罩层 */
	.mask{
		position:absolute;
		top:0px;
		bottom:0px;
		background:rgb(110, 107, 107);
		opacity:0.8;
		width:375px;
		height:1000px;
		z-index:2;
	}
</style>
