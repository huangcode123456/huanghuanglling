<template>
  <div class="shdzstyle">
    <!--默认地址 start-->
    <div>
    <!--header-->
    <div class="dz">
      <span>默认地址</span>
    </div>
    <!--footer-->
    <div class="shdzstyle1">
      <ul class="uldz" v-for="(item, index) in list" :key="index">
        <li ref="zwdz">
          <!--地址-->
          <p class="address_content">收件人：{{item.name}}</p>
          <p class="address_content">手机号：{{item.cellphone}}</p>
          <p class="address_content">详细地址：{{item.address}}</p>
        </li>
      </ul>
    </div>
    </div>
    <!--默认地址 end-->
    <!--其他地址 start-->
    <div>
    <!--header-->
    <div class="dz">
      <span>其他地址</span>
    </div>
    <!--footer-->
    <div class="shdzstyle1">
      <ul class="uldz">
        <li>暂无默认地址</li>
      </ul>
    </div>
    </div>
    <!--其他地址 end-->
    <!--添加地址 s-->
    <div @click="addnowdz" class="addndz">
      <span style="font-size:30px;margin-right:11px;vertical-align:top;color:#aaa;">+</span>添加新地址
    </div>
    <!--添加地址 e-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[],
    }
  },
  created() {
    this.load_shzd();
  },
  methods: {
    load_shzd(){
      this.axios.get("getaddress").then(res=>{
        if(res.data.code=="1"){
          this.list=res.data.data;
          this.list[0].address="湖南省-长沙市-雨花区-dncode"
          console.log(this.list)
        }else if(res.data.code=0){
          this.$refs.value="暂无地址"
        }
      })
    },
    addnowdz(){
      this.$router.push("/shdzadd")
    }
  },
}
</script>
<style scope>
*{margin:0;padding:0}
.shdzstyle{width:75%;margin-left:5%;font-size:10px;}
.shdzstyle1{border-top:1px solid #ddd;border-bottom:10px solid #ddd;}
.dz{padding:5px;}
.uldz li{width:100%;color:#aaa;height:200px;}
.addndz{
    position: fixed;
    bottom: 120px;
    left: -60px;
    right: 0;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    text-align: center;
    color: #666;
    background-color: #fff;
    box-shadow: 0 -1px 2px #eee;
}
.address_content{width:100%;height:20px;text-align:left;}
</style>