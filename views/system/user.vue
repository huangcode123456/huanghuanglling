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

		<div style="padding-bottom:20px;">
			 <el-button icon='el-icon-refresh' size="mini" type="primary" @click="enterpriseSea()">刷新</el-button>
      <!-- <el-button type="primary" @click="addNews(1)" icon="el-icon-plus" size="mini">新增人员</el-button> -->
      <el-button type="success" @click="add()" icon="el-icon-plus" size="mini">新增人员</el-button>
    </div>

    <el-table
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
        align="center"
        label="用户名"
        prop="username">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="昵称"
        prop="nickName">
      </el-table-column>
			<el-table-column
        width="200px"
        align="center"
        label="拥有角色"
        prop="roleName">
      </el-table-column>
			<el-table-column
        align="center"
        width="120"
        label="状态"
        prop="state">
          <template slot-scope="scope" v-if="!(scope.row.id == '1')">
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
        label="创建时间"
        prop="createTime">
      </el-table-column>
			<el-table-column
        fixed="right"
        align="center"
        width="170"
        label="操作">
          <template slot-scope="scope" v-if="!(scope.row.id == '1')">
            <div class="btn-link">
              <el-link type="primary" style="margin-left:5px" @click="enterpriseRes(scope.row)">重置密码</el-link>
              <el-link type="primary" style="margin-left:5px" @click="eidt(scope.row)">编辑</el-link>
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
			<el-form :model="userData" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="昵称" prop="nickName">
					<el-input v-model="userData.nickName" autocomplete="off" size='small'></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="userData.phone" autocomplete="off" size='small'></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input v-model.number="userData.username" size='small'></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="roleIds">
					<el-checkbox-group v-model="userData.roleIds">
						<el-checkbox label="1">平台管理员</el-checkbox>
						<el-checkbox label="2">发布</el-checkbox>
						<el-checkbox label="3">编辑</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item align="center" style="margin-right:8%;">
					<el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
					<el-button @click="dialogVisible=false">取消</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
    </el-dialog>
  </div>
</template>

<script>
import { userAdd,userRes,userDel,userSea,userUS,userUU } from '../../api/system'
export default {
  data() {
		var checkAge = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('手机不能为空'));
			}
			setTimeout(() => {
				if (!(/^1[3456789]\d{9}$/.test(value))) {
					callback(new Error('手机格式有误'));
				} else {
					callback();
				}
			}, 1000);
		};
		// var validatePass = (rule, value, callback) => {
		// 	if (value === '') {
		// 		callback(new Error('请输入密码'));
		// 	} else {
		// 		if (this.ruleForm.checkPass !== '') {
		// 			this.$refs.ruleForm.validateField('checkPass');
		// 		}
		// 		callback();
		// 	}
		// };
		// var validatePass2 = (rule, value, callback) => {
		// 	if (value === '') {
		// 		callback(new Error('请再次输入密码'));
		// 	} else if (value !== this.ruleForm.pass) {
		// 		callback(new Error('两次输入密码不一致!'));
		// 	} else {
		// 		callback();
		// 	}
		// };
    return {
			ruleForm: {
				nickName: '',
				phone: '',
				username: ''
			},
			rules: {
				nickName: [
					{ required: true, message: '请输入名称', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: checkAge, trigger: 'blur' }
				],
				username: [
					{ required: true, message: '请输入名称', trigger: 'blur' },
				],
				roleIds: [
					{ required: true, message: '角色不能为空', trigger: 'blur' },
				]
			},
			value: [],
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
			userData:{
				nickName: "",
				phone: "",
				roleIds: [],
				username: "",
				roleRecords:[],
			},
			dialogVisible:false,
			dialogTitle:'',
			closeOnClickModal:false,
			appendToBody:true,
			action:""
    }
	},
	created(){
		console.log(sessionStorage.getItem('token'))
  },
	mounted(){
		this.enterpriseSea();
	},
  methods: {
		// 弹出编辑
		eidt(data){
			this.action = 1 
			this.dialogTitle="编辑用户"
			this.clearForm()
			this.dialogVisible = !this.dialogVisible;
			this.userData.id = data.id
			this.userData.nickName = data.nickName;
			this.userData.phone = data.phone;
			this.userData.username = data.username;
			this.userData.nickName = data.nickName;
			data.roleRecords.map(item=>{
				this.userData.roleIds.push(String(item.id))
			})
		},
		// 弹出新增
		add(){
			this.action = 0 
			this.dialogTitle="新增人员"
			this.dialogVisible = !this.dialogVisible;
			this.clearForm()
		},
		// 清除数据
		clearForm(){
			this.userData= {
				nickName: "",
				phone: "",
				roleIds: [],
				username: "",
				roleRecords:[],
			}
		},
		// 提交表单
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.action=='0'){
						this.userAdd()
					}else if(this.action=='1'){
						this.userUU()
					}
				} else {
					this.$message.error('请检查输入信息')
					return false;
				}
			});
		},
		// 编辑用户信息
		userUU(){
			const data = {
				"id":this.userData.id,
				"nickName":this.userData.nickName,
				"phone":this.userData.phone,
				"username": this.userData.username,
				"roleIds": this.userData.roleIds,
			}
			userUU(data)
			.then(res=>{
				this.$message.success('信息修改成功');
				this.enterpriseSea();
				this.dialogVisible = !this.dialogVisible;
			})
		},
		// 增加用户
		userAdd(){
			const data = this.userData;
			userAdd(data)
			.then(res=>{
				this.$message.success('添加用户成功')
				this.enterpriseSea();
				this.dialogVisible = !this.dialogVisible;
				this.userData.nickName = '';
				this.userData.phone = '';
				this.userData.username = '';
			})
		},
		// 删除用户
		enterpriseDel(value){
			console.log(value)
			this.$confirm(`是否删除,用户名：${value.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
				const data = value.id;
				userDel(data)
				.then(res=>{
					this.$message.success('删除成功')
					this.enterpriseSea();
				})
				.catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }).catch(() => {
                  
      });
		},
		// 重置密码
		enterpriseRes(value){
			this.$confirm(`是否重置,用户名：${value.username}密码`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
				const data = value.id;
				userRes(data)
				.then(res=>{
					this.$message.success('重置密码成功')
					this.enterpriseSea();
				})
				.catch(() => {
        });
      })
		},
		// 获取用户列表
		enterpriseSea(){
			this.loading = !this.loading;
			const data = {
				"pageNumber": this.fenye.pageNumber,
				"pageSize": this.fenye.pageSize,
			};
			userSea(data)
			.then(res=>{
				console.log(res,'拿到数据')
				this.fenye.total = res.data.totalRecord;
				this.list = res.data.records
				res.data.records.map(Item=>{
					Item.roleName = [];
					Item.roleRecords.map(item=>{
						Item.roleName.push(item.name+' ')
					})
				})
				this.loading = !this.loading;
			})
		},
		// 更改状态
		enterpriseUpd(value){
			const data = {
				"state": value.state,
				"userId": value.id
			};
			userUS(data)
			.then(res=>{
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
			this.fenye.pageSize=val;
			this.enterpriseSea()
    },
    handleCurrentChange(val) {
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



