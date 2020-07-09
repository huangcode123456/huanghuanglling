<template>
  <div class="app-container">
    <el-page-header @back="goBack"content="赛事编辑"></el-page-header>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
   created () {
    },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  
</style>

