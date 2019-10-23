<template>
  <div class="mm">
     <!--轮播图 -->
     <div class="lb">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <img src="../../img/file_5a715fd6b98e3.png" alt="" class="carousl-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../../img/file_5a715fd6c033a.png" alt="" class="carousl-img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 二楼 -->
      <div class="lou2">
        <div class="two1">
          <router-link to="Syjifen"><div><img src="../../img/file_59c9bba5de7a5.png" alt=""></div></router-link>
          <router-link to="Sy_youhui" @click.native="login123()"><div><img src="../../img/file_59c9bb71c0a3c.png" alt=""></div></router-link>
          
          <router-link to="sypintuan"><div><img src="../../img/file_59c9bbfdcc136.png" alt=""></div></router-link>
          <router-link to="Sy_mszq"><div><img src="../../img/file_59c9bc4703932.png" alt=""></div></router-link>
          <router-link to="Syone"><div><img src="../../img/file_59c9bef16c6bb.png" alt=""></div></router-link>
          <router-link to="syfukuan" @click.native="login123()"><div><img src="../../img/file_59c9c46b006d6.png" alt=""></div></router-link>
          <router-link to="syxinpin"><div><img src="../../img/file_59c9c5d150acf.png" alt=""></div></router-link>
          <a href=""><div><img src="../../img/file_59c9c86f0a4ed.png" alt=""></div></a>
        </div>
      </div>
      <!-- 三楼 -->
      <div class="lou3">
        <div class="miaosha"><img src="../../img/file_59c329ee59316.png" alt=""></div>
        
        <div class="qiang"> 
          <router-link :to="'/Details/'+list.lid" class="qg"  v-for="(list,i) of list" :key="i">
          <img :src="'http://127.0.0.1:4000/'+list.pic" alt="">
          </router-link>
        </div>
        
        <div class="zhuanqu">
          <router-link to="/Sy_cuxiao/">
          <div class="zq"><img src="../../img/file_59c35719ae743.png" alt="" width="100%" height="100%"></div>
          </router-link>
          <router-link to="/Sy_zhipin/">
          <div class="zq"><img src="../../img/file_59c35a06a9c99.png" alt="" width="100%" height="100%"></div>
          </router-link>
        </div>
      </div>
      <!-- 话题标题 -->
      <div class="miaosha"><img src="../../img/file_59c35ebe9a836.png" alt="" width="100%" height="100%"></div>
      <!--四楼话题 -->
      <div class="lou4">
        <div class="container">
          <router-link :to="'/Sy_yuer1/'+a1.mid" @click.native="login123()">
            <div class="leftImg"><img :src="'http://127.0.0.1:4000/'+a1.pic1" alt="" width="100%" height="100%"></div>
              <div class="rightText">
                <p style="background-color:#ffe7ea">{{a1.title}}</p>
                <p>{{a1.content}}</p>
              </div>
          </router-link>
        </div>
        <div class="container">
            <router-link :to="'/Sy_yuer1/'+a2.mid" @click.native="login123()">
               <div class="leftImg"><img :src="'http://127.0.0.1:4000/'+a2.pic1" alt="" width="100%" height="100%"></div>
               <div class="rightText">
                <p style="background-color:#ffe7ea">{{a2.title}}</p>
                <p>{{a2.content}}</p>
                </div>
            </router-link>
        </div>
        <div class="container">
          <router-link :to="'/Sy_yuer1/'+a3.mid" @click.native="login123()">
               <div class="leftImg"><img :src="'http://127.0.0.1:4000/'+a3.pic1" alt="" width="100%" height="100%"></div>
               <div class="rightText">
                <p style="background-color:#ffe7ea">{{a3.title}}</p>
                <p>{{a3.content}}</p>
                </div>
          </router-link>
        </div>
        <div class="container">
          <router-link :to="'/Sy_yuer1/'+a4.mid" @click.native="login123()">
               <div class="leftImg"><img :src="'http://127.0.0.1:4000/'+a4.pic1" alt="" width="100%" height="100%"></div>
               <div class="rightText">
                <p style="background-color:#ffe7ea">{{a4.title}}</p>
                <p>{{a4.content}}</p>
                </div>
          </router-link>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{price:0,pic:"y_1.jpg"}],
            a1:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
            a2:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
            a3:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
            a4:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"},
        }
    },
    created() {
       this.change();
        this.loode();
   },
   methods: {
       change(){
           this.axios.get("product").then(res=>{
               //console.log(res);
               this.list=res.data.data.slice(4,8);
               //console.log(this.list)
           })
       },
       loode(){
         this.axios.get("msg").then(res=>{
               // console.log(res);
                this.a1=res.data.data[0];
                this.a2=res.data.data[1];
               this.a3=res.data.data[2];
                this.a4=res.data.data[3];
            })
       },
            // 登录
    login123(){
      var uid=sessionStorage.uid;
      console.log(uid)
      if(uid==undefined){
        console.log(1)
        this.$messagebox("请登录")
        this.$router.push("/login");
      }
    },
   }
}
</script>
<style scoped>
/*轮播图*/
.lb{
    width:86%;
    height: 120px;
    margin:0 auto;
  }
  .carousl-img{
    width:100%;
    height: 120px;
  }
/*2楼*/
.lou2{
    width:86%;
    height: 120px;
    margin:0 auto;
    margin-top:3px;
    display: flex;
    /* 子元素两端对齐 */
    justify-content:center;
    flex-wrap: wrap;/*换行*/
  }
  .two1{width:100%;height:100%;display: flex;
    /* 子元素两端对齐 */
    justify-content:center;
    flex-wrap: wrap;/*换行*/ margin-left:33px;}
  .two1 a div{width:35px;height:55px;margin-right:30px;
  margin-top:10px;
  }
  .two1 a div img{width:100%}
/*3楼*/
.lou3{
    width:86%;
    height: 250px;
    margin:0 auto;
    margin-top:3px;
  }
  .miaosha{
    width:100%;
    margin-bottom:-36px;
    margin-top:19px; 
  }
  .miaosha img{
    width:100%;
  }
  .qiang{
    width:100%;
    height:98px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .qg{
    width:24%;
    height:98px;
    margin-top:37px;
    border:1px solid rgb(241, 239, 239);
  }
  .qg img{
    width:100%;
    height:100%;
  }
  .zhuanqu{
    width:100%;
    height:100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .zhuanqu a{
     display: block;
     width:48%;
     height:110px;
  }
  .zq{
    width:100%;
    height:103px;
    margin-top:52px;
  }
/*4楼*/
.lou4{
  width:86%;
  height:380px;
  margin: 0 auto;
}
.container{
  position: relative;
  width:100%;
  height:90px;
  top:46px;
}
.leftImg{
  width:32%;
  height:85px;
}
.rightText{
  position: absolute;
  width:63%;
  height:85px;
  top:1px;
  right:1px;
}
.rightText p{
  color:#666;
  font-size: 0.9em;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
}
.mm{
  margin-bottom: 34px;
}
</style>