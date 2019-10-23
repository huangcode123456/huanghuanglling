<template>
  <div class="aa">
    <router-link :to="'/Xiangqing/'+list1.mid" class="page-head">
        <div>
        <p>{{list1.title}}</p>
        <span>评论</span><span>1年前</span><span>#挑食</span>
        </div>
      <img :src="'http://127.0.0.1:4000/'+list1.pic1"  class="right_img"/>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list2.mid" class="page-head2">
        <div>
        <a href="javascript:;"><p>{{list2.title}}</p></a>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list2.pic1"  class="right_img2"/></a>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list2.pic2"  class="right_img2"/></a>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list2.pic3"  class="right_img2"/></a>
        <span>评论</span><span>1年前</span><span>#缺钙</span>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list3.mid" class="page-head">
        <div>
        <a href="javascript:;"><p>{{list3.title}}</p></a>
         <span>评论</span><span>1年前</span><span>#水果</span>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list3.pic1"  class="right_img"/></a>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list4.mid" class="page-head">
        <div>
        <a href="javascript:;"><p>{{list4.title}}</p></a>
         <span>评论</span><span>1年前</span><span>#喂饭</span>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list4.pic1"  class="right_img"/></a>
   </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list5.mid" class="page-head">
        <div>
        <a href="javascript:;"><p>{{list5.title}}</p></a>
         <span>评论</span><span>1年前</span><span>#喂养</span>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list5.pic1"  class="right_img"/></a>
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
      list4:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
      list5:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"}
    }
  },
  created(){
    this.change();
  },
  methods:{
       change(){
          this.axios.get("msg").then(res=>{
           // console.log(res);
            this.list1=res.data.data[22];
            this.list2=res.data.data[23];
            this.list3=res.data.data[24];
            this.list4=res.data.data[25];
            this.list5=res.data.data[26];
           
          })
       }
  }
}
</script>
<style scoped>
  .page-head{
      display: flex;
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
    margin:3px 0px 10px 0px;
    color:#333;
    font-size:1.2rem;
}
a{
  text-decoration:none;
}
.right_img2{
    width:119px;height:80px;
    margin:0px 2px;
  }
  .aa{
    margin-bottom: 20px;
  }
</style>