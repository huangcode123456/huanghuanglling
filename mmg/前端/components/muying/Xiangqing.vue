<template>
<div>
<h3>{{lists.title}}</h3>
<div class="top">
    <div>
    <span>产期</span><span>顺产</span>
    </div>
    <div>2018-02-02</div>
</div>
<div>
    <p>
       {{lists.content}}
   </p>
  <div>{{lists.comment}}</div>    
</div>
</div>
</template>
<script>
export default {
   data(){
    return{
      lists:[]
    }
  },
  props:["mid"],
   methods:{
     load(){
         var url="xiang";
         this.axios.get(url,{params:{mid:this.mid}}).then(res=>{
             this.lists=res.data.data[0];
            console.log(this.lists);
         })
     }
  },
  created(){
    this.load();
  } 
}
</script>
<style>
.top{
    display: flex;
    justify-content: space-between;
}
span{
    margin-left: 10px;
}
</style>
