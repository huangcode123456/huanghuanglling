<template>
  <div>
     <!-- <h1>分类</h1>  -->
     <!-- 分类栏 五个按钮 -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click="search">全部</mt-tab-item>
      <mt-tab-item id="2" @click="search">纸品</mt-tab-item>
      <mt-tab-item id="3" @click="search">童装</mt-tab-item>
      <mt-tab-item id="4" @click="search">玩具</mt-tab-item>
      <mt-tab-item id="5" @click="search">孕妈用品</mt-tab-item>
    </mt-navbar>
   <!-- 搜索栏 -->
    <div class="outerd">
        <a href="javascript:;">
          <img src="../../img/sousuo.png">
        </a>
       <input  @click="toSearch" type="text" placeholder="请输入搜索内容" >
    </div>
    <!-- 分类栏控制的面板 -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <fl_all  v-for="(list,i) of list5" :key="i" :i="i" :list="list"></fl_all>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <fl_paper v-for="(list,i) of list1" :key="i" :i="i" :list="list"></fl_paper>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       <fl_child  v-for="(list,i) of list2" :key="i" :i="i" :list="list"></fl_child>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <fl_toy  v-for="(list,i) of list3" :key="i" :i="i" :list="list"></fl_toy>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
         <fl_mom  v-for="(list,i) of list4" :key="i" :i="i" :list="list"></fl_mom>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
//引入一：全部内容
import Fl_All from "./Fl_All.vue"
import Fl_Paper from "./Fl_Paper.vue"
import Fl_Toy from "./Fl_Toy.vue"
import Fl_Mom from "./Fl_Mom.vue"
import Fl_Child from "./Fl_Child.vue"
export default {
  data(){
    return{
     selected:"1",
      list1:[{price:0,pic:"y_1.jpg"}],
      list2:[{price:0,pic:"y_1.jpg"}],
      list3:[{price:0,pic:"y_1.jpg"}],
      list4:[{price:0,pic:"y_1.jpg"}],
      list5:[{price:0,pic:"y_1.jpg"}]
    }
  },
  created(){
    this.search();
  },
  methods:{
		toSearch(){
			this.$router.push("/Search");
    },
    search(){
      this.axios.get("bottom")
      .then(res=>{
        //console.log(res.data.data);
        this.list1=res.data.data.slice(8,18);
        this.list2=res.data.data.slice(18,22);
        this.list3=res.data.data.slice(22,26);
        this.list4=res.data.data.slice(26,29);
        this.list5=res.data.data.slice(8,30);
      })
    }
  },
  components:{
    "fl_all":Fl_All,
    "fl_paper":Fl_Paper,
    "fl_toy":Fl_Toy,
    "fl_mom":Fl_Mom,
    "fl_child":Fl_Child
  }
}
</script>
<style scoped>
  /*顶部导航条 */
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom:3px solid pink!important;
    color:pink!important;
  }
   /* 搜索栏 注释*/
   	div.outerd{
    width:249px;
    height:0;
    margin:auto;
    border-top:14px solid;
    border-bottom:14px solid;
    border-left:14px solid;
    border-right:30px solid;
    border-color:rgba(225, 220, 220, 0.503);
    padding-bottom:30px;
   } 
  div.outerd>a>img{
    width:17px;
    height:17px;
    margin-top:6px;
    margin-left:10px;
   }
  div.outerd>input{
    display:block;
    width:203px;
    height:21px;
    outline:none;
    border:0;
    color:#000;
    font-size:12px;
    padding-left:17px;
    margin-left:27px;
    margin-top:-24px;
    line-height:20px;
  }
</style>