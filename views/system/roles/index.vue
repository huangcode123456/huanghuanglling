<template>
  <div class="jm-main-inner p10">
    <el-container class="bg">
      <!-- 左侧 -->
      <el-aside width="25%" class="jm-aside">
        <div class="left-head flex flex-bw">
          <span>角色</span>
          <a href="javascript:;" @click="add = true" class="col">新建</a>
        </div>
        <div class="left-inp">
          <el-input
            class="jm-search"
            size="small"
            style="padding-left:20px;padding-right:20px"
            placeholder="输入关键词搜索"
            v-model="input"
          >
            <el-button @click="roleSearch" type="primary" slot="append">搜索</el-button>
          </el-input>
        </div>
        <div class="left-context">
					<div>
						<div
							class="p10 hand flex flex-bw"
							v-bind:class="[Index===`${index}`?'js-active':'']"
							:data-id="item.id"
							:data-name="item.name"
							:data-index="index"
							@click.self="swt"
							v-for="(item,index) in allRoles"
							:key="index"
						>
							{{item.name}}
							<!-- <i
								class="el-icon-close"
								style="color:red"
								@click="remove = true"
								v-if="Index===`${index}`"
							></i> -->
						</div>
					</div>
					<div v-if="allRoles.length===0" style="margin-left:40%;margin-top:20%;">
						暂无数据
					</div>
        </div>
      </el-aside>

      <!-- 右侧 -->
      <el-container class="jm-main-outer borleft">
        <div class="left-head">角色信息</div>

        <el-container v-if="Index" style=" height:100%; overflow:hidden ">
          <div class="p10 " style="width:50%">
            <el-form ref="form" :model="js" label-width="80px">
              <el-form-item label="角色名称">{{user.name}}</el-form-item>
              <el-form-item label="角色描述">{{user.description}}</el-form-item>
              <el-form-item label="创建时间">{{user.createTime}}</el-form-item>
              <el-form-item>
                <el-button style="margin-left:20px" type="primary" @click="upshow">编辑</el-button>
                <el-button style="margin-left:40px;margin-right:40px" @click="delshow">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="borleft" style="width:50%;">
						<div class="p10" style="height:100%;overflow-y:auto ">
							<div class=" flex flex-bw">
								<div class="flex">
									<div class="rh-js mr10">{{user.name}}</div>
									<span>的系统功能权限</span>
								</div>
							</div>
							<!-- 树状结构 -->
							<div class="ml20">
								<el-tree 
									:data="data" 
									show-checkbox 
									node-key="id" 
									:props="defaultProps" 
									default-expand-all
									@check="getCheckedNodes"
									ref="treeForm"
								>
								</el-tree>
							</div>
							<el-button type="primary" class="mt20 ml20" @click="roleBindMenus">保存</el-button>
						</div>
          </div>
        </el-container>
      </el-container>

      <!-- 弹出层-新建 -->
      <el-dialog
        title="新建角色"
        :visible.sync="add"
        :append-to-body="true"
        width="30%"
        :center="true"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="address">
            <el-input v-model="ruleForm.address" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
          <el-button @click="add = false">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 弹出层-编辑角色 -->
      <el-dialog
        title="编辑角色"
        :visible.sync="remove"
        :append-to-body="true"
        width="30%"
        :center="true"
      >
        <el-form :model="updata" :rules='rules1' ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="角色名称" prop="name">{{user.name}}</el-form-item>
          <el-form-item label="角色描述" prop="address">{{user.description}}</el-form-item> -->
					<el-form-item label="角色名称" prop="name">
            <el-input v-model="updata.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="address">
            <el-input v-model="updata.description" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="roleUpdate">确 定</el-button>
          <el-button @click="remove = false">取 消</el-button>
        </span>
      </el-dialog>

    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
			},
			rules1: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogVisible: false, //弹出层
      add: false, // 弹出层-添加
      remove: false, // 弹出层-删除
      input: "",
      js: {},
      ruleForm: {
        name: "",
        address: ""
      },
      allRoles: [],
      id: "", //点击角色id
      Index: "", //角色下标
      user: {
				name:'',
				description:''
			},
			updata: {
				name:'',
				description:''
			}
    };
  },
  created() {
    this.getRoles();
    this.allMenus();``
    // this.rolesList();
  },
  methods: {
		// 角色绑定权限
		async roleBindMenus(){
			// console.log('修改角色权限');
			// console.log(this.tree);
			// console.log(this.user.id);
			const res = await this.http.post(this.api.admin.roleBindMenus,{
				"bindMenuIds": this.tree,
				"id": this.user.id
			});
			console.log(res);
			if( res.data.code === 200 ){
				this.$message.success('权限修改成功')
			} else {
				this.$message.error(res.data.message);
			}
		},
		getCheckedNodes(){
			let childeArr = this.$refs.treeForm.getCheckedKeys();
			console.log(childeArr)
			this.tree = childeArr
		},
		
		// 显示编辑框
		upshow(){
			console.log('显示编辑弹窗');
			this.remove = !this.remove
		},
		// 修改角色
		async roleUpdate(){
			// console.log('编辑角色');
			// console.log(this.updata.name)
			// console.log(this.user.id)
			// console.log(this.updata.description)
			const res = await this.http.post(this.api.admin.roleUpdate,{
				"description": this.updata.description,
				"id": this.user.id,
				"name": this.updata.name
			});
			console.log(res)
			if(res.data.code === 200){
				this.$message.success('编辑角色成功')
				this.remove = !this.remove
				this.getRoles();
				this.getRolelist(this.user.name)
			} else {
				this.$message.error(res.data.message)
				// this.remove = !this.remove
			}
		},
		// 搜索角色
		async roleSearch(){
			// console.log('搜索角色')
				let params = {
					name:this.input
				}
				const res = await this.http.get(this.api.admin.roleSearch,{params});
				console.log(res);
				if(res.data.code === 200){
					this.allRoles = res.data.data.records
					// console.log(this.allRoles)
				} else {
					this.$message.error(res.data.message)
				}
		},
		// 获取角色详情
		async getRolelist(e) {
			// await this.allMenus();
			// console.log("获取角色详情");
			// console.log(e)
			let params = {
				name: e
			};
			const res = await this.http.get(this.api.admin.roleSearch, { params });
				console.log(res)
			if(res.data.code === 200){
				var id =res.data.data.records[0].roleMenuIds
				// console.log(id)
				this.data.oneche = id
				this.$refs.treeForm.setCheckedKeys(id);
				this.user.name = res.data.data.records[0].name;
				this.user.description = res.data.data.records[0].description;
				// console.log(this.data.oneche)
			} else {
				this.$message.error(res.data.message)
			}
    },

    // 获取所有功能权限
    async allMenus() {
      // console.log("获取所有功能权限");
      // console.log(this.data);
			const res = await this.http.get(this.api.admin.menuallMenus);
			console.log(res)
      if (res.data.code === 200) {
				// console.log(res.data.data.menus)
				let List = res.data.data.menus.map(Item => {
					// console.log(Item)
					if(Item.children!==null){
						let list = Item.children.map(item => ({
							id:item.id,
							label:item.name,
						}))
						// console.log(list)
						return{
							id:Item.id,
							label:Item.name,
							children:list
						}
					} else {
						return {
							id:Item.id,
							label:Item.name,
							children:[]
						}
					}
				})
			
			this.data = List;
      } else {
        this.$message.error(res.data.message);
      }
    },
		delshow(){
			this.$confirm(`是否删除删除角色：${this.user.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.roleRoleUsers()
        }).catch(() => {
              
        });
		},
		// 查询角色绑定的用户
		async roleRoleUsers(){
			// console.log('查询角色绑定的用户')
			let params = {
				id:this.updata.id,
				pageSize:'10',
				pageNumber:'1'
			}
			const res = await this.http.get(this.api.admin.roleRoleUsers,{params})
			console.log(res)
			if(res.data.code === 200){
				if(res.data.data.totalRecord===0){
					this.removeRoles()
				}else{
					this.$message.error('请清除所有被绑定人员')
				}
			} else {
				this.$message.error(res.data.message)
			}
		},
    // 删除角色
    async removeRoles() {
      // console.log("删除角色");
      // console.log(this.id);
      var params = {
        id: this.id
      };
			const res = await this.http.get(this.api.admin.rolDdelete, { params });
			console.log(res)
      if (res.data.code === 200) {
        // alert("删除成功");
				this.$message.success("删除成功");
				this.Index = ''
        this.getRoles();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add = false;
          this.addRoles();
        } else {
          // alert("角色名格式错误");
          this.$message.error("角色名错误");
          return false;
        }
      });
    },
    // 添加角色
    async addRoles() {
      // console.log("添加角色");
      // console.log(this.ruleForm);
      // console.log(this.ruleForm.name);
      const res = await this.http.post(this.api.admin.roleAdd, {
        description: this.ruleForm.address,
        name: this.ruleForm.name
      });
      if (res.data.code === 200) {
        // alert("角色添加成功");
        this.$message.success("角色添加成功");
        this.getRoles();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 获取角色详情
    async rolesList() {
      // console.log("获取角色详情");
      var params = {
        id: this.id
      };
      const res = await this.http.get(this.api.admin.roledetail, { params });
      console.log(res);
      // if(res.data.code === 200){
      // 	console.log(res);
      // } else {
      // 	this.$message.error(res.data.records);
      // }
    },

    // 获取所有角色
    async getRoles() {
      // console.log(sessionStorage.getItem("token"));
      // console.log("获取所有角色");
      const res = await this.http.get(this.api.admin.roleAllRoles);
			// console.log("11111111111111111111111111110", res);
        console.log(res);
      if (res.data.code === 200) {
        this.allRoles = res.data.data.records;
      } else {
        this.$message.error(res.data.message);
      }
		},
		
    swt(e) {
      console.log(e);
      this.id = e.target.dataset.id;
      this.Index = e.target.dataset.index;
      // console.log(e.target.dataset.index);
      var index = e.target.dataset.index;
      var list = this.allRoles[index];
      // console.log(this.allRoles)
			// console.log(list);
			this.updata.name = list.name;
			this.updata.id = list.id
			this.updata.description = list.description
      this.user.name = list.name;
      this.user.description = list.description;
      if (this.user.description == "") {
        this.user.description = "无";
      } else {
        this.user.description = list.description;
      }
      this.user.createTime = list.createTime;
      this.user.id = list.id;
			// console.log(this.user);
			this.getRolelist(e.target.dataset.name)
      // this.rolesList(); // 获取角色详情
    },
    
  }
};
</script>
<style scoped>
.hand {
  cursor: pointer;
}
.col {
  color: rgb(64, 158, 255);
}
.js-active {
  color: rgb(64, 158, 255);
  background: rgb(240, 250, 255);
}
.rh-js {
  padding-left: 5px;
  padding-right: 5px;
  height: 20px;
  background: rgb(64, 158, 255);
  color: white;
  line-height: 20px;
  border-radius: 3px;
  text-align: center;
}
.borleft {
  border-left: 1px solid #dddddd;
}

.flex-bw {
  justify-content: space-between;
}
.flex {
  display: flex;
}
.left-context {
  padding: 20px;
}
.left-inp {
  text-align: center;
  padding-top: 20px;
}
.left-head {
  border-bottom: 1px solid #aaaaaa;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.bg {
  background-color: white;
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