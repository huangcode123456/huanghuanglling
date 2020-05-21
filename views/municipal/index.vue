<style lang="less" scoped>

</style>

<template>
    <div class="jm-main-outer">
        
        <!-- 二级菜单 -->
				<ul class="jm-menu">
            <li><router-link to="/municipal/earlyWarning">预警</router-link></li>
            <li><router-link to="/municipal/surveillance">监控</router-link></li>
            <li><router-link to="/municipal/streetlamp">路灯</router-link></li>
						<li><router-link to="/municipal/manholeCover">井盖</router-link></li>
						<li><router-link to="/municipal/fireFighting">消防</router-link></li>
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