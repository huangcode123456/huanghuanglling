<template>
    <div class="jm-main-outer">
        <!-- 二级菜单 -->
		<ul class="jm-menu">
            <li><router-link to="/environment/synthesis">综合监控</router-link></li>
            <li><router-link to="/environment/meteorology">气象监测</router-link></li>
            <li><router-link to="/environment/waterQuality">水质监测</router-link></li>
            <li><router-link to="/environment/soil">土壤监测</router-link></li>
            <li><router-link to="/environment/dustNoise">扬尘与噪音</router-link></li>
            <li><router-link to="/environment/internalWaterlogging">内涝监测</router-link></li>
            <li><router-link to="/environment/conFigurAtion">配置与维护</router-link></li>
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

<style lang="less" scoped>
    
</style>