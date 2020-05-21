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
            <el-menu-item index="/citySecurity/security/InwardOutward">
                <span slot="title">出入口区域监控</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/security/school">
                <span slot="title">学校区域监控</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/security/business">
                <span slot="title">商业区域监控</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/security/ecological">
                <span slot="title">生态环境监控</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/security/industry">
                <span slot="title">产业区域监控</span>
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