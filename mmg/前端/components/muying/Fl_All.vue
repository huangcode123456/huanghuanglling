<template>
		<div class="all">
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
</template>

<script>
export default {
  props:["list","i"]
}
</script>
<style>
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
    margin-bottom:10px;
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