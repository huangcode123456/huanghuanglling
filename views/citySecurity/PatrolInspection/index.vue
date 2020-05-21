<style scoped>
 
    /* .top{
        height :100px;
        border: 1px solid red;
    }
    .tac{
        width: 10%;
    } */
</style>

<template>
    <div class="jm-main-inner">

        <el-menu
            :default-active="$route.path"
            router
            class="jm-left-menu"
            >
            <el-menu-item index="/citySecurity/PatrolInspection/plan">
                <span slot="title">巡查计划管理</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/PatrolInspection/MonitoryPoint">
                <span slot="title">监控点位管理</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/PatrolInspection/repairOrder">
                <span slot="title">工单管理</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/PatrolInspection/inspection">
                <span slot="title">巡检员管理</span>
            </el-menu-item>
        </el-menu>

        
        <div class="jm-main">
            <router-view/>
        </div>


       
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    mounted(){
    },
    data() {
      return {
        activeIndex1:'1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.activeIndex=key
      },
    }
}
</script>