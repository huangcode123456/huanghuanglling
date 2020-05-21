<template>
    <div class="jm-main-outer">
        <!-- 二级菜单 -->
		<ul class="jm-menu">
            <li><router-link to="/configure/ruleBase">规则库</router-link></li>
            <li><router-link to="/configure/equipment">设备维护</router-link></li>
        </ul>
        <!-- 主体 -->
        <div class="jm-main">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
   
    data() {
      return {
       
      };
    },
    mounted(){
    },
    methods: {
     
    }
}
</script>

<style lang="less" scoped>
    
</style>