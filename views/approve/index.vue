<template>
  <div class="app-container">
    <h2 style="margin-left:10px">企业认证</h2>
		<el-form ref="addform" :model="addform" status-icon :rules="rules" label-width="100px">
			<el-form-item label='认证状态' prop="title">
				<span class="state">{{title}}</span>
			</el-form-item>
			<el-form-item label="审核反馈" prop="">
			</el-form-item>
			<el-form-item label="联系人手机" prop="phone">
				{{addform.phone}}
			</el-form-item>
			<el-form-item label="联系人姓名" prop="contacts">
				<el-input v-model="addform.contacts" size='small'></el-input>
			</el-form-item>
			<el-form-item label="组织名称" prop="orgName">
				<el-input v-model="addform.orgName" size='small'></el-input>
			</el-form-item>
			<el-form-item label="营业执照" prop="yyzz">
				<el-upload
					class="upload-demo"
					:headers="headers"
					:multiple=false
					:action="uploadAction"
					:on-preview="handlePreviewYYZZ"
					:on-remove="handleRemoveYYZZ"
					:on-success="handleSuccessYYZZ"
					:file-list="addform.yyzz"
					:limit="1"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">支持png\jpg\jpeg常用图片格式</div>
				</el-upload>
				<div class="el-upload__tip">示例图片</div>
				<img src="http://www.jctybm.com/static/uploads/demo-1.jpg" style="width:20%;height:20%" alt="">
			</el-form-item>
			<el-form-item label="开户证明" prop="khzm">
				<el-upload
					class="upload-demo"
					:headers="headers"
					:multiple=false
					:action="uploadAction"
					:on-preview="handlePreviewKHZM"
					:on-remove="handleRemoveKHZM"
					:on-success="handleSuccessKHZM"
					:file-list="addform.khzm"
					:limit="1"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">支持png\jpg\jpeg常用图片格式</div>
				</el-upload>
				<div class="el-upload__tip">示例图片</div>
				<img src="http://www.jctybm.com/static/uploads/demo-2.jpeg" style="width:20%;height:20%" alt="">
			</el-form-item>
			<el-form-item label="税号" prop="taxation">
				<el-input v-model="addform.taxation" size='small'></el-input>
			</el-form-item>
			<el-form-item label="单位地址" prop="address">
				<el-input v-model="addform.address" size='small'></el-input>
			</el-form-item>
			<el-form-item label="电话号码" prop="tel">
				<el-input v-model="addform.tel" size='small'></el-input>
			</el-form-item>
			<el-form-item label="开户银行" prop="bank">
				<el-input v-model="addform.bank" size='small'></el-input>
			</el-form-item>
			<el-form-item label="银行账号" prop="bankNo">
				<el-input v-model="addform.bankNo" size='small'></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="onSubmit">提交资料</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import { submitCertification } from '../../api/approve'
import {UPLOAD_ACTION} from '@/utils/const.js'
export default {
  data() {
		// var checkAge = (rule, value, callback) => {
		// 	if (!value) {
		// 		return callback(new Error('手机不能为空'));
		// 	}
		// 	setTimeout(() => {
		// 		if (!(/^1[3456789]\d{9}$/.test(value))) {
		// 			callback(new Error('手机格式有误'));
		// 		} else {
		// 			callback();
		// 		}
		// 	}, 1000);
		// };
    return {
			title:'',
      headers:{"token": ''},

      uploadAction:UPLOAD_ACTION,
			addform:{
				phone: '',
				contacts: '',
				orgName: '',
				taxation: '',
				address: '',
				tel: '',
				bank: '',
				bankNo: '',
				khzm:[],
				yyzz:[]
      },
      khzmpath:'',
      yyzzpath:'',
			rules: {
				phone: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				contacts: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				orgName: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				yyzz: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				khzm: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				taxation: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				address: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				tel: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				bank: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
				bankNo: [
					{ required: true, message: '此项不能为空', trigger: 'blur' },
				],
			},
    }
	},
	mounted(){
		var releaseState = sessionStorage.getItem('releaseState')
		releaseState == 1?this.title = '认证成功!':releaseState == 0?this.title = '审核失败，请重新提审':releaseState == -1?this.title = '未审核，请提交资料！':this.title = '审核中，请稍后！'
		this.addform.phone = sessionStorage.getItem('Phone')||sessionStorage.getItem('userName')
		this.addform.contacts = sessionStorage.getItem('nickName')
		console.log(sessionStorage.getItem('token'))
    this.headers.token=sessionStorage.getItem("token")
  },
  methods: {
		onSubmit() {
			console.log(this.addform)
			this.$refs.addform.validate((valid) => {
				if (valid) {
					const data = {
						address: this.addform.address,
						bank: this.addform.bank,
						bankNo: this.addform.bankNo,
						contacts: this.addform.contacts,
						khzm: this.addform.khzm[0],
						orgName: this.addform.orgName,
						phone: this.addform.phone,
						taxation: this.addform.taxation,
						tel: this.addform.tel,
						yyzz: this.addform.yyzz[0]
					}
					console.log(data)
					submitCertification(data)
					.then(res=>{
						console.log(res)
						this.$confirm('提交审核成功', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'success',
							center: true
						}).then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
						this.$message.success('')
						this.title = '认证中，请稍后'
					})
				} else {
					this.$message.error('请检查输入信息')
					return false;
				}
			});

		},
		//图片上传 营业执照
		handleRemoveYYZZ(fileList) {
      this.addform.yyzz=[];
      this.yyzzpath='';
    },
    handlePreviewYYZZ(file) {
    },
    handleSuccessYYZZ(response, file, fileList) {
      this.addform.yyzz[0]=fileList[0].response.data.fileurl;
      this.yyzzpath = fileList[0].response.data.filepath;
		},

		//图片上传 营业执照
		handleRemoveKHZM(fileList) {
      this.addform.khzm=[];
      this.khzmpath = "";
    },
    handlePreviewKHZM(file) {
    },
    handleSuccessKHZM(response, file, fileList) {
      this.addform.khzm[0]=fileList[0].response.data.fileurl;
      this.khzmpath = fileList[0].response.data.filepath;
    },
  }
}
</script>

<style scoped >
.state{
	border-radius: 5px;
	padding: 5px;
	background: rgb(29, 132, 198);
	color: white;
	font-weight: 800;
}
</style>
<style >
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
</style>
