<style lang="less" scoped>
   
</style>

<template>
    <div class="jm-main-outer">
        <!-- 二级菜单 -->
        <ul class="jm-menu">
            <li><router-link to="/citySecurity/security">城市安防</router-link></li>
            <li><router-link to="/citySecurity/crowd">重点人群</router-link></li>
            <li><router-link to="/citySecurity/car">重点车辆</router-link></li>
            <li><router-link to="/citySecurity/PatrolInspection">巡线巡检</router-link></li>
            <li><router-link to="/citySecurity/warning">统计预警</router-link></li>
        </ul>

        <!-- 主体 -->
        <div class="jm-main">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
    },
    data() {
      return {
       
      };
    },
    methods: {
     
    }
}
</script>