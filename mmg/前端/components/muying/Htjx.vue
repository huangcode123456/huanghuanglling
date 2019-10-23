<template>
  <div>
    <router-link :to="'/Xiangqing/'+list1.mid" class="page-head1">
        <div>
       <p>{{list1.title}}</p>
        <span>8评论</span><span>1年前</span><span>#产期</span><span>#顺产</span>
        </div>
       <img :src="'http://127.0.0.1:4000/'+list1.pic1"  class="right_img1"/>  
    </router-link>
    <hr> 
    <router-link :to="'/Xiangqing/'+list2.mid" class="page-head2" >
        <div>
       <p>{{list2.title}}</p>
        <span>评论</span><span>1年前</span><span>#怀孕</span><span>#营养</span>
        </div>
       <img :src="'http://127.0.0.1:4000/'+list2.pic1"  class="right_img1"/>  
    </router-link>
    <hr> 
     <router-link :to="'/Xiangqing/'+list3.mid" class="page-head1" >
        <div>
       <p>{{list3.title}}</p>
        <span>3评论</span><span>1年前</span><span>#辅食</span>
        </div>
       <img :src="'http://127.0.0.1:4000/'+list3.pic1"  class="right_img1"/>  
    </router-link>
    <hr> 
     <router-link :to="'/Xiangqing/'+list4.mid">
        <div>
       <p class="wenben">{{list4.title}}</p>
        <span>4评论</span><span>1年前</span><span>#亲情</span><span>#绘本</span>  
       <img :src="'http://127.0.0.1:4000/'+list4.pic1"  class="right_img"/>  
       </div>
    </router-link>
    <hr> 
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:"tab",
      list1:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
      list2:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
      list3:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
      list4:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"}
    }
  },
  created(){
    this.change();
  },
  methods:{
       change(){
          this.axios.get("msg").then(res=>{
            //console.log(res);
            this.list1=res.data.data[4];
            this.list2=res.data.data[5];
            this.list3=res.data.data[6];
            this.list4=res.data.data[7];
           
          })
       }
  }
}
</script>
<style scoped>
  .page-head1,.page-head2{
      display: flex;
      height:25%;
  }
  hr{
      margin:1% 0% 1% 0%;
  }
  
  .right_img1{
       width:32%;
       height:90px;
       margin:2% 0%;
  }
span{
    color: #333;
    margin:0% 2% 0% 0%;
    font-size:0.9rem;
}
.right_img{
    width:100%;
    overflow: hidden;
}
p{
    margin:2% 0% 12% 0%;
    color:#333;
    font-size: 1.2rem;
}
.wenben{
  margin:2% 0% 3% 0%;
}
a{
  text-decoration:none;
}
</style>