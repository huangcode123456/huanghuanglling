<template>
  <div class="dashboard-container">
    <div class="welcome">
      <img class="logo" src="https://www.jctybm.com/webadmin/fileserver/images/logos/minilogo.png" alt="">
      <h4 class="title">欢迎使用大大家运动赛事管理系统</h4>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Dashboard',
  computed: {
 
  },
  data(){
    return{
      
    }
  },
  created() {
   
	},
	mounted(){
	
  },
  methods:{
   
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
.welcome{
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo{
      width: 200px;
      height: 200px;
      vertical-align: top;
    }
    .title{
      font-size: 28px;
      color: #666;
      line-height: 1.6;
    }
}
</style>
