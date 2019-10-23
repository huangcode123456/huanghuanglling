<template>
  <div>
    <!-- 商品栏 -->
     <div class="sp-01">
       <ul>
         <li>
           <div>
             <img src="../assets/img/file_59c9cdc9bcfa2.png">
           </div>
           <div class="sp-02">
             <span>欧洲进口纸尿裤</span>
             <div>￥25.00</div>
           </div>
           <div class="sp-03">
             <van-stepper v-model="value"/>
           </div>
         </li>
       </ul>
     </div>
     <!-- 留言 -->
     <div class="sp-04">
       <textarea placeholder="买家留言"></textarea>
       <div>
         <span>0</span>
         /30
       </div>
     </div>
     <!-- 添加地址 -->
     <div class="sp-05">
       <span>添加地址</span>
       <span>></span>
     </div>
     <!-- 商品金额 -->
    <div class="sp-06">
       <span>商品金额</span>
       <span>￥549.00</span>
     </div>
    <!-- 运费 -->
    <div class="sp-06">
       <span>运费</span>
       <span style="color:#444;">￥0.00</span>
     </div>
     <!-- 支付 -->
     <div class="sp-07">
       <div>
         <img src="../assets/img/weixin.jpg" class="img-1">
         <span @click="btnss(1)" :class="xzys"><img src="../assets/img/checked.png" class="img-2"></span>
       </div>
       <div>
         <img src="../assets/img/zhifubao.jpg" class="img-1">
         <span @click="btnss(2)" :class="xzys2"><img src="../assets/img/checked.png" class="img-2"></span>
       </div>
     </div>
     <div class="sp-09"></div>
     <!-- 结算 -->
     <div class="sp-10">
       <div>
         合计:
         <span>￥549.00</span>
         <span>去付款</span>
       </div>
     </div>
  </div>
</template>
<script>
export default {
      data(){
        return{
            value:1,
            xzys:"sp-08",
            xzys2:"sp-11"
        }
      },
      methods:{
        btnss(e){
         if(e==1){
            this.xzys="sp-08"
          }else{
            this.xzys="sp-11"
          }
          if(e==2){
            this.xzys2="sp-08"
          }else{
            this.xzys2="sp-11"
          }
        }
      }
}
</script>
<style scoped>
.sp-01{
  border-bottom:1px solid #ddd;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  
  
}
 .sp-01 img{
    width: 50px;
    height: 50px;
 }
 .sp-01>ul>li{
   display: flex;
   justify-content: space-around;
 }
 .sp-01>ul{
   padding: 13px;
   
 }
 .sp-02{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 5px;
  line-height: 20px;
 }
 .sp-02>span{
   font-size: 14px;
   color: #444;
 }
 .sp-02>div{
   font-size:14px;
   color:#ff7100;
   text-align: left;
 }
 /* .van-stepper__plus{
   background-color: #ffcc01;
   border-radius: 50%;
   color: #fff;
 } */
 /* .van-stepper__input{
   background: #fff;
 } */
 /* .van-stepper__minus{
   border-radius: 50%;
   background: #fff;
   border:1px solid #999;
   color: #666;
 } */
 .sp-03{
   padding-top: 10px
 }

 /* 留言 */
 .sp-04{
   width: 100%;
   padding: 15px;
   margin-bottom: 2px;
   margin: 0 auto;
   box-sizing: border-box;
 }
 .sp-04>textarea{
   width: 100%;
   height:95px;
   padding: 8px;
   background: #e9e7e8;
   border: 0;
   font-size: 14px;
   box-sizing: border-box;
 }
 .sp-04>div{
   background: #e9e7e8;
   width: 100%;
   margin: 0 auto;
   text-align: right;
   margin-top:-10px;
   font-size: 12px;
 }
 /* 添加地址 */
 .sp-05{
   width: 100%;
   margin: 0 auto;
   line-height: 30px;
   padding: 13px;
   border-top:1px solid #ddd;
   border-bottom: 10px solid #f4f4f4;
   box-sizing: border-box;
   text-align: left;
}
.sp-05>span:last-child{
  float: right;
  font-size: 30px;
  color:darkgray;
}
/* 商品金额 */
.sp-06{
   width: 100%;
   margin: 0 auto;
   line-height: 30px;
   padding: 13px;
   border-bottom: 1px solid #f4f4f4;
   box-sizing: border-box;
   text-align: left;
}
.sp-06>span:last-child{
  float: right;
  font-size: 16px;
  color:#f15a0c;
}
/* 支付 */
.img-1{
  width: 80px;
}
.sp-07{
   width: 100%;
   margin: 0 auto;
   padding: 13px;
   box-sizing: border-box;
   text-align: left;
}
.img-2{
    width: 15px;
    height: 12px;
    /* float: right; */
}
.sp-08{
    background: #ff7100;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 25px;
    margin-right: 30px;
    float: right;
}
.sp-11{
    background: #c7c4c4;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 25px;
    margin-right: 30px;
    float: right;

  
  }
.sp-07>div{padding: 5px;}

.sp-09{
  width: 100%;
  height: 110px;
  background: #e9e7e8;
}
/* 结算 */
.sp-10{
  line-height: 60px;
  border-top:1px solid #eee;
}
.sp-10>div:first-child{
  width: 100%;
  text-align: left;
  padding-left:13px ;
  box-sizing: border-box;
  
}
.sp-10>div:first-child>span:last-child{
  float:right;
  width: 35%;
  height: 59px;
  background: #ff7100;
  text-align: center;
  color: #fff;
}
.sp-10>div:first-child>span:first-child{
      color: #f15a0c;
}
</style>