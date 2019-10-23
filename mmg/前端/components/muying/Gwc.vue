<template>
  <div>
    <!-- 上部 显示开始-->
    <div v-show="hid">
      <div class="toxian">
        <span></span>
        <span class="cart">购物车</span>
        <span @click="edit" class="adit">编辑</span>
      </div>
    </div>
    <div v-show="show" class="toyin">
      <div class="toxian">
        <span></span>
        <span class="cart">购物车</span>
        <span class="adit" @click="close">完成</span>
      </div>
    </div>
    <!-- 上部 显示结束-->
    <!-- 隐藏部分开始 -->
    <div v-show="show" class="yica">
      <div class="yicz">
        <input @change="selectAll" type="checkbox" v-model="allcb"> 
        <span>全选</span>  
        <button @click="delm">删除所选</button>
      </div>
    </div>
    <!-- 隐藏部分结束 -->
    <!-- 商品部份开始 -->
    <div v-for="(item,i) of list" :key="i" class="cait">
      <input @change="selectItem" type="checkbox" v-model="item.cb">
      <img :src="'http://127.0.0.1:4000/'+item.pic">
      <div class="ptp">
        <p class="ptit">{{item.title}}</p>
        <p class="ppric">￥{{item.price.toFixed(2)}}</p>
      </div>
      <a @click="reduce(i)" class="jian aniu" href="javascript:;">-</a>
      <input class="goods" type="text" v-model="item.count">
      <a @click="add(i)" class="jia aniu" href="javascript:;">+</a>
    </div>
    <!-- 商品部份 结束-->
    <!-- 底部开始 -->
    <div v-show="hid" class="botm">
      <div class="bole">
        <div>
          <input type="checkbox">
          全选
        </div>
        <div class="bomi">
          合计：
          <span class="hjq">￥{{sum.toFixed(2)}}</span> 
        </div>
      </div>
      <a href="javascript:;">结算</a>
    </div>
    <!-- 底部结束 -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false,
      hid:true,
      list:[{price:0,pic:"p_1.jpg"}],
      allcb:false//全选按钮状态
    }
  },
  created(){
    this.load();
  },
  methods:{
    edit(){
      this.show=true;
      this.hid=false;
    },
    close(){
      this.show=false;
      this.hid=true;
    },
    add(i){
      if(this.list[i].count){
        this.list[i].count++;
      }
    },
    reduce(i){
      if(this.list[i].count>1){
        this.list[i].count--;
      }
    },
     selectItem(){
      //累加商品状态
      //创建变量
      var sum=0;
      //创建循环遍历商品状态
      if(this.list!==undefined){
        for(var item of this.list){
          if(item.cb){
            sum++;
          }
        }
      }
      console.log(sum);
      console.log(this.list.length);
      //如果选中数量与数组相同，将全选
      //allcb=true;
      if(sum==this.list.length){
        this.allcb=true;
      }else{
        this.allcb=false;
      }
    },
    //删除指定商品
    delm(){
      //显示交互提示框，请用户再次确认是否删除指定商品
      this.$messagebox.confirm("是否删除指定的商品")
      .then(res=>{
        //选择确认  创建空字符串
        var str="";
      //创建遍历list数组判断如果当前cb值为true将对象编号拼接
      for(var item of this.list){
        if(item.cb){
          str+=item.lid+","
        }
      }
      console.log(str);
      //判断用户是否选择选中商品提示请选择要删除商品
      if(str.length==0){
        this.$messagebox("请选择要删除的商品");
        console.log(111)
        return;
      }
      //0 起始下标  str.length-1 保存几个字符串
      str=str.substring(0,str.length-1);
      console.log(222);
      //创建url
      var url="delm";
      var obj={lid:str};
      this.axios.get(url,{params:obj})
      .then(res=>{
        //console.log(res);
        //再重新加载购物车
        console.log(333)
        this.load();
        //提示删除成功
        this.$toast("删除成功");
      })
      }).catch(err=>{})
    },
     selectAll(event){
       //添加参数event
       //获取当前全选按钮状态
       var all=event.target.checked;
      // console.log(all);
      for(var item of this.list){
        item.cb=all;
      }//赋值所有商品cb
     },
     //查找购物车列表加载的数据
    load(){
      console.log(123)
      var url="findcart";
      this.axios.get(url).then(res=>{
        //console.log(res);
        if(res.data.data==-1){
          //提示交互信息
          this.$messagebox("消息","请登录")
          .then(res=>{
            this.$router.push("/login");
          })
        }else{
          //为每个商品添加属性状态
           var list=res.data.data;
           if(list!==undefined){
             for(var item of list){
               item.cb=false;
             }
           }
           this.list=list;
          console.log(this.list)
          
        }
      })
    }
  },
  computed:{
    sum(){
      var total=0;
      for(var i=0;i<this.list.length;i++){
        total+=parseFloat(this.list[i].price)*parseFloat(this.list[i].count);
      }
      return total;//计算总价
    }
  }
}
</script>

<style scoped>
/* 上部 注释 */
  .toxian{
    width:100%;
    height:42px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    background:#fff;
    border-bottom:1px solid #ccc;
    font-size:14px;
    color:#444;
  }
   .toyin{
    width:100%;
    position:relative;
  }
  /*隐藏部分 */
  .yica{
    width:100%;
  }
  .yicz{
    width:90%;
    margin:auto;
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding-top:20px;
  }
  .yicz>span{
   position:absolute;
   left:25px;
  font-size:14px;
  color:#444;
  }
  .yicz>button{
    width:72px;
    height:33.6px;
    border-radius:5px;
    background:#D20E10;
    color:#fff;
    font-size:14px;
    outline:none;
    border:0;
  }
  /*商品部分注释*/
  .cait{
    width:100%;
    height:30px;
    margin:10px auto;
    border-top:1px solid #eee;
    border-bottom:2px solid #eee;
    padding:20px 0;
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  /*图片注释*/
  .cait>img{
    width:60px;
    height:60px;
  }
  /*商品标题 价格注释*/
  .ptit{
    width:120px;
    height:18px;
    font-size:12px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .ppric{
    font-size:12px;
    color:#ff7223;
  }
  /*加减按钮注释*/
  .aniu{
    width:20px;
    height:20px;
    background:#eee;
    text-align:center;
    font-size:20px;
    line-height:18px;
    font-weight:bold;
    color:#878787;
    text-decoration:none;
    }
  .jian{
    margin-right:-21px;
  }
   .jia{
    margin-left:-21px;
  }
  .goods{
    width:30px;
    height:20px;
    background:#eee;
    text-align:center;
    outline:none;
    border:0;
    color:#878787;
  }
  /*底部注释*/
  .botm{
    width:100%;
    height:55px;
    position:fixed;
    bottom:0;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:16px;
    color:#444444;
  }
  .hjq{
    margin-left:-10px;
    color:#ff7223;
  }
  .botm>a{
    width:30%;
    height:49px;
    background:#ff7223;
    text-align:center;
    line-height:47px;
    color:#fff;
    font-size:16px;
    padding:5px 0;
    text-decoration:none;
  }
  .bole{
    width:70%;
    height:55px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    border:1px solid #eee;
  }
  .bomi{
    padding-right:10px;
    margin-left:40px;
  }
  /*动画效果*/
  .do-none{
    display:none;
  }
</style>