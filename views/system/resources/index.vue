<template>
	<div class="jm-main-inner p10">
		<el-container class="bg">
		<!-- 左侧 -->
			<el-aside width="25%" class="jm-aside">
				<div class="left-head flex flex-bw"><span>资源</span><a href="javascript:;" class="col">新建</a></div>
				<div class="left-inp">
					<el-input class="jm-search" size="small" style="padding-left:20px;padding-right:20px" placeholder="输入关键词搜索" v-model="input" >
						<el-button @click="search" type="primary" slot="append" >搜索</el-button>
					</el-input>
				</div>
				<div class="left-context">
					<el-tree
						:data="data"
						node-key="id"
						:default-expanded-keys="[1]"
						:props="defaultProps">
					</el-tree>
				</div>
			</el-aside>

			<!-- 右侧 -->
			<el-container class="jm-main-outer borleft">
				<div class="left-head">资源信息</div>
				<div class="flex">
					<div class="p10 ml10">
						<el-form ref="form" :model="js" style="width:100%" label-width="80px">
							<el-form-item label="权限名称">字典管理</el-form-item>
							<el-form-item label="权限类型">菜单</el-form-item>
							<el-form-item label="权限url">/admin/sys/dict</el-form-item>
							<el-form-item class="text" label="权限标识">admin:sys:dict:dlkfjaklfjsldfjlasdjfkaslfjalsdjflaskdfjlsdkjfladfasdfsfssdfsdfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</el-form-item>
							<el-form-item label="权限序号">5</el-form-item>
							<el-form-item label="创建时间">2019-08-16 20:11:15</el-form-item>
							<el-form-item>
								<el-button style="width:200px;" type="primary" @click="dialogVisible = true">编辑</el-button>
								<el-button style="width:200px;margin-left:40px">删除</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-container>

			<!-- 弹出层 -->
			<el-dialog
				title="编辑"
				:visible.sync="dialogVisible"
				:append-to-body=true
				width="30%"
				:center=true
				:before-close="handleClose">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="ruleForm.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="address">
						<el-input v-model="ruleForm.user" placeholder=""></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
			</el-dialog>

		</el-container>
	</div>
	
</template>
<script>
export default {
	data(){
		return{
			rules:{},
			data: [{
				id: 1,
				label: '字典类型树',
				children: [{
				id: 2,
				label: '机构管理',
					},{
						id: 3,
						label: '角色管理'
					},{
						id: 4,
						label: '资源管理'
					},{
						id: 5,
						label: '字典管理'
					}
						]
			}],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			dialogVisible: false, //弹出层
			input:'',
			js:{},
			ruleForm:{
				name:'',
				address:''
			},
			tid: 'gly',
		}
	},
	created(){
		this.allMenus();
	},
	methods:{
		// 查询所有权限
		async allMenus(){
			console.log('查询所有权限')
			const res = await this.http.get(this.api.admin.menuAllMenus);
			if(res.data.code === 200){
				console.log(res)
				this.data = res.data.data.menus;
			} else {
				this.$message.error(res.data.message);
			}
		},
		swt(e){
			this.tid = e.target.dataset.id;
			console.log(this.tid);
		},
		handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
		search(){
			alert('点击了搜索')
		},
		onSubmit(){
			alert('点击了查询')
		},
		clear(){
			alert('点击了重置')
		}
	}
}
</script>
<style scoped> 
.bg{
	background: #ffffff;
}
.text{
	word-break:break-all
}
.hand{
	cursor:pointer;
}
.col{
	color: rgb(64, 158, 255);
}
.js-active{
	color: rgb(64, 158, 255);
	background: rgb(240, 250, 255);
}
.rh-js{
	width:50px;
	height: 20px;
	background: rgb(64, 158, 255);
	color: white;
	line-height: 20px;
	border-radius: 21%;
	text-align: center;
}
.borleft{
	border-left: 1px solid #dddddd;
}
.flex-end{
	justify-content: end;
}
.flex-bw{
	justify-content: space-between;
}
.flex{
	display: flex;
}
.left-context{
	padding: 20px;
}
.left-inp{
	text-align: center;
	padding-top: 20px;
}
.left-head{
	border-bottom: 1px solid #aaaaaa;
	padding: 10px;
	margin-left: 20px;
	margin-right: 20px;
}
.el-header, .el-footer {
	background-color: #B3C0D1;
	color: #333;
	text-align: center;
}

.el-main {
	background-color: #E9EEF3;
	color: #333;
	text-align: center;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>