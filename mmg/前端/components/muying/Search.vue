<template>
	<div>
		<div class="out">
			<table></table>
			<div class="ine">
				<img src="../../img/sousuo.png">
				<input type="text" placeholder="搜索" v-model="kw" @keydown.13="chax">
				<span @click="chax">搜索</span>
			</div>
		</div>
		<div v-for="(list,i) of lists" :key="i" class="all">
      <router-link :to="'/details/'+list.lid">
        <div>
          <img :src="'http://127.0.0.1:4000/'+list.pic">
          <p class="ptitle">{{list.title}}</p>
          <p class="psale">
            <span class="sprice">￥{{list.price.toFixed(2)}}</span>
            <span class="ssale">销量：{{list.sales}}</span>
          </p> 
          </div>
      </router-link>
    </div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			kw:"",
			lists:[]
		}
	},
	methods:{
		chax(){
				this.axios.get("search",{params:{kw:this.kw}})
				.then(res=>{
				//console.log(res);
        this.lists=res.data.data;
			 })
		}
	}
}
</script>
<style scoped>
	.out{
		background:#EFEFF4;
		width:320px;
		height:50px;
		position:relative;
		margin:auto;
		margin-bottom:20px;
	}
	.ine{
		width:248px;
		height:27px;
		border-radius:5px;
		background:#fff;
		margin-left:10px;
		margin-top:10px;	
		font-size:12px;
		padding-top:6px;
		padding-left:12px;
	}
	.ine>img{
		width:15px;
		height:15px;
		vertical-align: middle;
	}
	.ine>input{
		width:220px;
		height:20px;
		border:0;
		outline:none;
		line-height:20px;
		margin-left:8px;
	}
	.ine>span{
		position:absolute;	
		top:17px;
		left:276px;
		font-size:14px;
	}
	 a{text-decoration:none;
  color:black;}
  .all{
     display:inline-block; 
     margin-right:8px;
     margin-left:15px;
  }
  .all div{ 
    font-size:12px;
    color:rgb(66, 53, 53);
    width:159px;
    height:207px;
  }
  .all div img{
    width:159px;
    height:160px;
  }
  .ptitle{
    text-align:center;
    white-space:nowrap;
    overflow:hidden;
  }
  .psale{
    margin-top:-5px;
    text-align:center;
  }
  .sprice{
    color:red;
  }
  .ssale{
    color:#a8a8a8;
    margin-left:27px;
  }
</style>