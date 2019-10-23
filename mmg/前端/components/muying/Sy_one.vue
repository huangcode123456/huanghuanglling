<template>
  <ul class="u1">
      <!--商品 s-->
      <li class="Sy_sp" v-for="(item,index) of list" :key="index">
        <router-link :to="'/Details/'+item.lid">
          <img class="Sy_one_img" :src="'http://127.0.0.1:4000/'+item.pic"/>
          <!--标题 s-->
          <div class="Sy_title">
            <p class="Sy_title_name">{{item.title}}</p>
            <p>
              <span class="Sy_title_body">￥{{item.price}}.00</span>
              <span class="Sy_title_footer">销量：{{item.sales}}</span>
            </p>
          </div>
          <!--标题 e-->
         </router-link>
      </li>
      <!--商品 e-->
    </ul>
</template>
<script>
export default {
  data() {
    return {
      list:[]
    }
  },
  created() {
    this.loadMore();
  },
  methods: {
    loadMore(){
      this.axios.get("oneSearch")
      .then(res=>{
        this.list=res.data.data
      })
    }
  },
}
</script>
<style scoped>
*{margin:0;padding:0;}
.u1{list-style: none;padding:5%;}
ul .Sy_sp{margin-bottom: 10px;background-color: rgb(255, 255, 255);height: 210px;}
.Sy_sp{float:left;width:50%;}
.Sy_title{width:100%;font-size:13px;}
.Sy_title_name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color: rgb(102, 102, 102);}
.Sy_title_body{color: #f60;}
.Sy_title_footer{color: #a8a8a8;}
.Sy_one_img{width: 159px;height: 160px;}
</style>