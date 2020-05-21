<style scoped>
</style>

<template>
    <div class="jm-main-outer">
        
        <!-- 二级菜单 -->
				<ul class="jm-menu">
            <li><router-link to="/system/organization">组织管理</router-link></li>
            <li><router-link to="/system/roles">角色管理</router-link></li>
            <!-- <li><router-link to="/system/resources">资源维护</router-link></li> -->
            <li><router-link to="/system/dictionary">字典管理</router-link></li>
        </ul>

        <!-- 主体 -->
        <div class="jm-main">
            <router-view v-if="isRouterAlive"/>
        </div>
    </div>
</template>

<script>
export default {
	// provide(){
	// 	return reload:this.reload,
	// },
    mounted(){
    },
    data() {
		return {
			isRouterAlive: true
		};
    },
    methods: {
		reload(){
			this.isRouterAlive = false;
			this.$nextTick(()=>{
				this.isRouterAlive = true
			})
		}
    }
}
</script>