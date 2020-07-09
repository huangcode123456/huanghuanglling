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

    <el-button icon='el-icon-refresh' size="mini" type="primary" @click="enterpriseSea()">刷新</el-button>

    <el-table
      class="mt20"  
      :data="list"
      v-loading="loading"
      border
      fit
      highlight-current-row>
			<el-table-column
        width="200px"
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="组织名称"
        prop="orgName">
      </el-table-column>
			<el-table-column
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
					<img :src="scope.row.yyzz" @click='openIMG(scope.row.yyzz,1)' style="width:110px;height:90px;" alt="">
				</template>
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="开户证明"
        prop="khzm">
				<template slot-scope="scope" >
					<img :src="scope.row.khzm" @click='openIMG(scope.row.khzm,0)' style="width:110px;height:90px;" alt="">
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
      </el-table-column>
			<el-table-column
        fixed="right"
        align="center"
        width="200"
        label="操作">
          <template slot-scope="scope" v-if="!(scope.row.id == '1')">
            <div class="btn-link">
              <el-link type="primary" style="margin-left:5px" @click="enterpriseRes(scope.row)">重置密码</el-link>
							<el-link type="primary" style="margin-left:5px" @click="showExamine(scope.row)">审核处理</el-link>
              <el-link type="primary" @click="enterpriseDel(scope.row)" style="margin-left:5px">删除</el-link>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
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

		<el-dialog
      :title="dialogTitle"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="40%"
			center>
			<el-form :model="examine" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label='审核信息'>
					<el-input type="textarea" v-model="examine.releaseContent"></el-input>
				</el-form-item>
				<el-form-item align="center" style="margin-right:12%;">
					<el-button type="primary" @click="submit(1)">审核通过</el-button>
					<el-button type="warning" @click="submit(-1)">审核失败</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
    </el-dialog>


		<el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="800px">
        <img style="width:760px" :src="img" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { enterpriseSea,enterpriseUpd,enterpriseRes,enterpriseDel,enterprisAudit } from '../../api/user'
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
			dialogVisible:false,
			dialogTitle:'',
			closeOnClickModal:false,
			appendToBody:true,
			// 审核
			examine:{
				enterpriseId:0,
				releaseContent:"",
				releaseState: ""
			},
			imgVisible:false,
			img:""
    }
	},
	created(){
		// console.log(sessionStorage.getItem('token'))
  },
	mounted(){
		this.enterpriseSea();
	},
  methods: {
		// 点击打开图片
		openIMG(val,flag){
			this.img = val
			this.imgVisible=true
		},
		// 提交审核
		submit(flag){
			if(flag==1){
				this.$confirm(`是否审核通过`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
					type: 'warning',
					showCancelButton:false,
				}).then(() => {
					this.examine.releaseState = '1';
					this.dialogVisible = false;
					this.$message.success('审核成功');
					this.enterprisAudit();
					this.enterpriseSea();
				})
			} else if(flag==-1){
				this.$confirm(`是否审核失败`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				}).then(() => {
					this.examine.releaseState = '0'
					this.dialogVisible = false;
					this.$message.success('审核成功');
					this.enterprisAudit();
					this.enterpriseSea();
				})
			}
		},
		// 弹出审核层
		showExamine(val){
			this.dialogTitle = '审核处理'
			this.dialogVisible = true;
			this.examine.enterpriseId = val.id
		},
		// 审核接口
		enterprisAudit(){
			const data = {
				enterpriseId: this.examine.enterpriseId,
				releaseContent: this.examine.releaseContent,
				releaseState: this.examine.releaseState
			}
			enterprisAudit(data)
			.then(res=>{
				console.log(res)
			})
		},
		// 删除组织
		enterpriseDel(value){
			// console.log(value)
			this.$confirm(`是否删除,组织：${value.orgName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
				const data = value.userId;
				enterpriseDel(data)
				.then(res=>{
					this.$message.success('删除成功')
					this.enterpriseSea();
				})
      })
		},
		// 重置密码
		enterpriseRes(value){
			this.$confirm(`是否重置,组织：${value.orgName}密码`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
				const data = value.userId;
				enterpriseRes(data)
				.then(res=>{
					this.$alert('默认密码为:666888', '重置密码成功！', {
          confirmButtonText: '确定',
						callback: action => {
						}
					});
					this.enterpriseSea();
				})
      })
		},
		// 获取用户列表
		enterpriseSea(){
			this.loading = !this.loading;
			const data = {
				"pageNumber": this.fenye.pageNumber,
				"pageSize": this.fenye.pageSize,
			};
			enterpriseSea(data)
			.then(res=>{
				console.log(res)
				this.fenye.total = res.data.totalRecord;
				this.list = res.data.records
				this.loading = !this.loading;
			})
		},
		// 更改状态
		enterpriseUpd(value){
			// console.log(value,'1111111111111111111111111111')
			const data = {
				"state": value.state,
				"userId": value.userId
			};
			enterpriseUpd(data)
			.then(res=>{
				// console.log(res)
				this.$message.success('更改状态成功')
			})
		},
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

