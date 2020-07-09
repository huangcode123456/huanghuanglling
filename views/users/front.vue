<template>
  <div class="app-container">
    <el-button icon='el-icon-refresh' size="mini" type="primary" @click="searchUser()">刷新</el-button>
    <el-table
      class="mt20"
      style="widht:100%"
      :data="list"
      border
			v-loading="loading"
      highlight-current-row>
      <el-table-column
        width="100"
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="OPENID"
        prop="openId">
      </el-table-column>
      <el-table-column
        label="创建时间" 
        prop="createTime">
      </el-table-column>
    </el-table>
		 <el-pagination
		  class="mt20"
      style="margin-top:5px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
			@prev-click="handleCurrentChange"
			@next-click="handleCurrentChange"
      :current-page="fenye.pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="fenye.total">
    </el-pagination>
  </div>
</template>

<script>
import { searchUser } from '@/api/user'
export default {
	name:'front',
  data() {
    return {
      list:[],
			query:{
        keyword:'',
			},
			fenye:{// 分页数据
				"pageNumber": 1,
				"pageSize": 10,
				"startRow": 0
			},
			loading:false
    }
	},
	mounted(){
		// console.log(sessionStorage.getItem('token'));
		this.searchUser();
	},
  methods: {
		//分页
    handleSizeChange(val) {
			// console.log(val)
			this.fenye.pageSize=val;
			this.searchUser()
    },
    handleCurrentChange(val) {
			// console.log(val)
      this.fenye.pageNumber=val;
			this.searchUser()
		},
    searchUser(){
			this.loading = !this.loading;
			const data=this.fenye
			// console.log(data)
			searchUser(data)
			.then(res => {
				console.log(res,'前端列表')
				this.fenye.total = res.data.totalRecord;
				this.list = res.data.records;
				this.loading = !this.loading;
			})
			.catch(err=>{
				// console.log(err)
			})
		},
  }
}
</script>

<style scoped>
  .cover{
    width: 100px;
    height: 70px;
  }
</style>

