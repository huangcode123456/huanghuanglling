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
        <!-- 重点人群 -->

        <el-menu
            :default-active="$route.path"
            router
            class="jm-left-menu"
            >
            <el-menu-item index="/citySecurity/crowd/monitoring">
                <!-- <i class="el-icon-menu"></i> -->
                <span slot="title">重点人群监测</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/crowd/management">
                <span slot="title">重点人群管理</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/crowd/snap">
                <span slot="title">人像抓拍管理</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/crowd/trajectory">
                <span slot="title">轨迹查询</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/crowd/monitor">
                <span slot="title">人才岛人像布控</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/crowd/retrieve">
                <span slot="title">多维度检索</span>
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