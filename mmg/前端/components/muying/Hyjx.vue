<template>
  <div>
    <router-link :to="'/Xiangqing/'+list.mid" class="page-head">
        <div>
       <p>{{list.title}}</p>
        <span>评论</span><span>1年前</span><span>#备孕</span>
        </div>
       <img :src="'http://127.0.0.1:4000/'+list.pic1"  class="right_img"/>
    </router-link>
    <hr>
  </div>
</template>
<script>
export default {
   props:["list","i"]
}
</script>
<style scoped>
  .page-head{
      display: flex;
      width:100%;
      height:110px;
  }
  hr{
      margin:0px 0px 3px 0px;
  }
  
  .right_img{
       width:125px;height:90px;
       margin:5px 0px;
  }
span{
    color: #333;
    margin:20px 7px 0px 0px;
    font-size:0.9rem;
}

p{
    margin:2% 0% 12% 0%;
    color:#333;
    font-size:1.2rem;
}
a{
  text-decoration:none;
}
</style>