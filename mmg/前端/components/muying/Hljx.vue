<template>
  <div>
    <router-link :to="'/Xiangqing/'+list1.mid" class="page-head1">
        <div>
        <p>{{list1.title}}</p>
        <span>6评论</span><span>1年前</span><span>#母乳</span>
        </div>
        <img :src="'http://127.0.0.1:4000/'+list1.pic1"  class="right_img1"/>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list2.mid" class="page-head1">
        <div>
        <p>{{list2.title}}</p>
        <span>0评论</span><span>1年前</span><span>#奶瓶</span><span>#清洗</span>
        </div>
        <img :src="'http://127.0.0.1:4000/'+list2.pic1"  class="right_img1"/>
    </router-link>
    <hr>
     <router-link :to="'/Xiangqing/'+list3.mid">
        <div>
       <p>{{list3.title}}</p>
        <span>评论</span><span>1年前</span><span>#发热</span>
       <img :src="'http://127.0.0.1:4000/'+list3.pic1" class="right_img"/>  
       </div>
    </router-link>
    <hr> 
    <router-link :to="'/Xiangqing/'+list4.mid" class="page-head1">
        <div>
        <p>{{list4.title}}</p>
        <span>评论</span><span>1年前</span><span>#玩具</span>
        </div>
        <img :src="'http://127.0.0.1:4000/'+list4.pic1"  class="right_img1"/>
    </router-link>
    <hr>
    <div class="page-head">
        <div>
        <p>{{list5.title}}</p>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list5.pic1"  class="right_img2"/></a>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list5.pic2"  class="right_img2"/></a>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list5.pic3"  class="right_img2"/></a>
        <span>评论</span><span>1年前</span><span>#缺钙</span>
    </div>
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
            //console.log(res);
            this.list1=res.data.data[8];
            this.list2=res.data.data[9];
            this.list3=res.data.data[10];
            this.list4=res.data.data[11];
            this.list5=res.data.data[12];
           
          })
       }
  }
}
</script>
<style scoped>
  .page-head1{
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
    font-size:  1.2rem;
}
.right_img2{
    width:119px;height:80px;
    margin:0px 2px;
  }
.page-head5{
  margin-bottom: 10px;
}
a{
  text-decoration: none;
}
</style>