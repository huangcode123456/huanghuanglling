<template>
  <div>
    <!--header s-->
    <div class="add_header">
      <span><img @click="back" class="shdzadd_img" src="../../img/jt.png"/></span>
      <span class="add_span1">添加常用地址</span>
      <span class="add_span2" @click="save">保存</span>
    </div>
    <!--header e-->
    <!--body s-->
    <div class="add_body">
      <input class="add_body_input1" placeholder="联系人姓名" v-model="name"/>
      <input class="add_body_input1" placeholder="手机号码" v-model="phone"/>
    </div>
    <!--body e-->
    <!--地区 s-->
    <div class="add_select_f">
      <select class="add_select" v-model="sheng">
        <option value="0">选择省</option>
        <option value="hn">湖南省</option>
        <option value="sc">四川省</option>
        <option value="hn">海南省</option>
        <option value="gz">贵州省</option>
        <option value="cq">重庆省</option>
        <option value="gz">广东省</option>
      </select>
      <select class="add_select" v-model="shi">
        <option value="0">选择市</option>
        <option value="cs">长沙市</option>
      </select>
      <select class="add_select" v-model="qu">
        <option value="0">选择区</option>
        <option value="yh">雨花区</option>
      </select>
    </div>
    <!--地区 e-->
    <!--详细地址 s-->
    <div>
      <textarea class="add_xxdz" placeholder="详细地址" v-model="xxdz"></textarea>
    </div>
    <!--详细地址 e-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:"",
      phone:"",
      sheng:"0",
      shi:"0",
      qu:"0",
      xxdz:""
    }
  },
  methods: {
    back(){
      this.$router.push("/shdz")
    },
    save(){
      var name=this.name;
      var phone=this.phone;
      var sheng=this.sheng;
      var shi=this.shi;
      var qu=this.qu;
      var xxdz=this.xxdz;
      var address = `${sheng}-${shi}-${qu}-${xxdz}`

      this.axios.get("address",{params:{name:name,phone:phone,address:address}}).then(res=>{
        if(res.code=="0"){
          this.$messagebox("添加失败 请重试")
        }else{
          this.$messagebox("添加成功")
          this.$router.push("/shdz")
        }
      })
    }
  },
}
</script>
<style scope>
*{margin:0;padding:0;}
.shdzadd_img{width:30px;height:30px;margin:5px;position:absolute;top:5px;left:5px;}
.add_header{height:50px;}
.add_span1{font-size:16px; position:absolute;top:18px;left:115px;}
.add_span2{position:absolute;top:18px;right:25px;}
.add_body{margin-top:20px;}
.add_body_input1{width: 100%;
    box-sizing: border-box;
    height: 36px;
    padding: 4px 10px;
    border-radius: 4px;
    border: none;
    padding:25px 20px;
  }
.add_select{
  width: 30%;
  min-width: 95px;
  margin-right: 3px;
  box-sizing:border-box;   height: 36px;
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
  color: #012;
  font: inherit;
  margin: 0;
  -webkit-appearance: none;
  margin-left:12px;
  }
.add_xxdz{height: 145px;padding-top: 10px;resize: none;width:88%;border:none;padding:6%;}
</style>