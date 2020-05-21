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
            <el-menu-item index="/citySecurity/car/twoOne">
                <span slot="title">两客一危车辆</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/car/taxi">
                <span slot="title">出租车</span>
            </el-menu-item>
            <el-menu-item index="/citySecurity/car/bus">
                <span slot="title">公交车辆</span>
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