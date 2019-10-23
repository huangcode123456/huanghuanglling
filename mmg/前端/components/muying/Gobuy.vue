<template>
  <div v-show="$store.getters.getBt">
    <!-- 隐藏的部分 -->
		<div>
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
				<div @click="jcart" class="bo3" :data-lid="list.lid" :data-pic="list.pic" :data-title="list.title" :data-price="list.price" :data-fare="list.fare">立即购买
				</div>
			</div>
			<div class="mask">
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			n:1
		}
	},
	props:["list"],
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
		close(){
			this.$store.commit("setClose")
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
	}
}
</script>

<style scoped>
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