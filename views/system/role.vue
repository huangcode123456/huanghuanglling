<template>
  <div class="app-container">
    <!-- <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="关键词">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="所属专题">
        <el-select v-model="form.project" placeholder="请选择">
          <el-option v-for="(item,i) in speciallist" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="待审核" value="-2"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
          <el-option label="草稿" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="enterpriseSea">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form> -->
    <el-table
      :data="list"
      v-loading="loading"
      border
      fit
      highlight-current-row>
			<el-table-column
				width='100'
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        align="center"
        label="角色名称"
        prop="name">
      </el-table-column>
			<!-- <el-table-column
        width="200px"
        align="center"
        label="联系人姓名"
        prop="contacts">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="联系人手机号"
        prop="phone">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="登录用户名"
        prop="username">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="营业执照"
        prop="yyzz">
				<template slot-scope="scope" >
					<img :src="scope.row.yyzz" alt="">
				</template>
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="开户证明"
        prop="khzm">
				<template slot-scope="scope" >
					<img :src="scope.row.khzm" alt="">
				</template>
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="税号"
        prop="taxation">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="单位地址"
        prop="title">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="电话号码"
        prop="tel">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="开户银行"
        prop="bank">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="银行账号"
        prop="bankNo">
      </el-table-column>
			<el-table-column
        align="center"
        width="120"
        label="状态"
        prop="state">
          <template slot-scope="scope" >
            <div>
              <el-switch
                :active-value='1'
                :inactive-value='0'
								@change='enterpriseUpd(scope.row)'
                v-model="scope.row.state">
              </el-switch>
              <span>{{scope.row.state==1?'正常':'停用'}}</span>
            </div>
          </template>
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="审核状态"
        prop="releaseState">
				<template slot-scope="scope" >
					<span>{{scope.row.releaseState== 1?"通过":scope.row.releaseState== 0?"失败":scope.row.releaseState== -1?"草稿":"审核中"}}</span>
				</template>
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="审核内容"
        prop="releaseContent">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="创建时间"
        prop="createTime">
      </el-table-column> -->
			<!-- <el-table-column
        fixed="right"
        align="center"
        width="150"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" style="margin-left:5px" @click="enterpriseRes(scope.row)">重置密码</el-link>
              <el-link type="primary" @click="enterpriseDel(scope.row)" style="margin-left:5px">删除</el-link>
            </div>
          </template>
      </el-table-column> -->
    </el-table>

    <!-- <el-pagination
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
    </el-pagination> -->
  </div>
</template>

<script>
import { userAR } from '../../api/system'
export default {
  data() {
    return {
      query:{
        keyword:'',
        type:'1',
        status:'1'
      },
			list:[],
			form:{
        title:'',
        project:'',
        status:''
			},
			//企业账户列表
			speciallist:[],
			loading:false,
			fenye:{
				"pageNumber": 1,
				"pageSize": 10,
				"startRow": 0,
				total:0
			},
    }
	},
	created(){
		// console.log(sessionStorage.getItem('token'))
  },
	mounted(){
		this.enterpriseSea();
	},
  methods: {
		// 删除组织
		// enterpriseDel(value){
		// 	console.log(value)
		// 	this.$confirm(`是否删除,组织：${value.orgName}`, '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //   }).then(() => {
		// 		const data = value.userId;
		// 		enterpriseDel(data)
		// 		.then(res=>{
		// 			this.$message.success('删除成功')
		// 			this.enterpriseSea();
		// 		})
		// 		.catch(err=>{
		// 			console.log(err)
		// 		})
    //   }).catch(() => {
		// 	});
		// },
		// // 重置密码
		// enterpriseRes(value){
		// 	this.$confirm(`是否重置,组织：${value.orgName}密码`, '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //   }).then(() => {
		// 		const data = value.userId;
		// 		enterpriseRes(data)
		// 		.then(res=>{
		// 			this.$message.success('重置密码成功')
		// 			this.enterpriseSea();
		// 		})
		// 		.catch(err=>{
		// 			console.log(err)
		// 		})
    //   }).catch(() => {
		// 	});
		// },
		// 获取用户列表
		enterpriseSea(){
			this.loading = !this.loading;
			userAR()
			.then(res=>{
				console.log(res,'拿到数据')
				this.fenye.total = res.data.totalRecord;
				// console.log(res.data,'####################')
				this.list = res.data.records
				// console.log(this.list,'&&&&&&&&&&&&&&&&&')
				this.loading = !this.loading;
			})
			.catch(err=>{
				// console.log(err)
			})
		},
		// 更改状态
		// enterpriseUpd(value){
		// 	// console.log(value,'1111111111111111111111111111')
		// 	const data = {
		// 		"state": value.state,
		// 		"userId": value.userId
		// 	};
		// 	enterpriseUpd(data)
		// 	.then(res=>{
		// 		console.log(res)
		// 		this.$message.success('更改状态成功')
		// 	})
		// 	.catch(err=>{
		// 		console.log(err)
		// 	})
		// },
		//查询
    search(){
      console.log(this.form)
		},
		//清空
    clean(){
      this.form.title=''
      this.form.project=''
      this.form.status=''
		},
		//分页
    handleSizeChange(val) {
			// console.log(val)
			this.fenye.pageSize=val;

			this.enterpriseSea()
    },
    handleCurrentChange(val) {
			// console.log(val)
      this.fenye.pageNumber=val;
			this.enterpriseSea()
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

