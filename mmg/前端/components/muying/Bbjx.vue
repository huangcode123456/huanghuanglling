<template>
  <div>
    <router-link :to="'/Xiangqing/'+list1.mid" class="page-head1">
        <div>
        <p>{{list1.title}}</p>
        <span>评论</span><span>1年前</span><span>#敏感</span>
        </div>
        <img :src="'http://127.0.0.1:4000/'+list1.pic1"  class="right_img1"/>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list2.mid" class="page-head">
        <div>
        <a href="javascript:;"><p>{{list2.title}}</p></a>

        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list2.pic1"  class="right_img"/></a>
        <span>评论</span><span>1年前</span><span>#长高</span>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list3.mid" class="page-head3">
        <div>
        <a href="javascript:;"><p>{{list3.title}}</p></a>
         <span>评论</span><span>1年前</span><span>#认生</span>
        </div>
        <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list3.pic1"  class="right_img3"/></a>
    </router-link>
    <hr>
    <router-link :to="'/Xiangqing/'+list4.mid" class="page-head2">
        <div>
        <a href="javascript:;"><p>{{list4.title}}</p></a>
       
        <span>评论</span><span>1年前</span><span>#遗传</span>
        </div>
         <a href="javascript:;"><img :src="'http://127.0.0.1:4000/'+list4.pic1" class="right_img2"/></a>
   </router-link>
    <hr>
    <div class="footer">没有更多了</div>
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
            this.list1=res.data.data[18];
            this.list2=res.data.data[19];
            this.list3=res.data.data[20];
            this.list4=res.data.data[21];
           
           
          })
       }
  }
}
</script>
<style scoped>
  .page-head1,.page-head2,.page-head3{
      display: flex;
      height:110px;
  }
  hr{
      margin:0px 0px 3px 0px;
  }
  .footer{
      text-align: center;
      color:dimgrey;
      line-height: 30px;
  }
  .right_img1,.right_img2,.right_img3{
       width:115px;height:90px;
       margin:5px 0px;
  }
span{
    color: #333;
    margin:20px 7px 0px 0px;
    font-size:0.9rem;
}
.right_img{
    width:100%;

    overflow: hidden;
}
p{
    margin:3px 0px 10px 0px;
    color:#333;
    font-size: 1.2rem;
}
a{
  text-decoration:none;
}
</style>