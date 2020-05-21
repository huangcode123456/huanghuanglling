<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="25%" class="jm-aside">
        <div class="left-head flex flex-bw">
          <span>机构</span>
        </div>
        <!-- <div class="left-inp">
          <el-input
            class="jm-search"
            size="small"
            style="padding-left:20px;padding-right:20px"
            placeholder="输入关键词筛选"
            v-model="input"
          >
            <el-button @click="search" type="primary" slot="append">搜索</el-button>
          </el-input>
        </div>-->
        <div class="left-context">
          <el-tree
            :props="defaultProps"
            :load="loadNode"
            :expand-on-click-node="false"
            lazy
            @node-click="seaUser"
            :default-expanded-keys="[this.jgid]"
            node-key="id"
          >
            <span class="custom-tree-node" slot-scope="{ node,data }">
              <div class="custom-tree-node-inner">
                <div class="title">
                  <div class="text" :title=" node.label">{{ node.label }}</div>
                </div>
                <div class="edit">
                  <i class="el-icon-plus col" @click.stop="() => addDialogShow(node, data, 0)"></i>
                  <!-- <i class="el-icon-plus col" @click.stop="addjg = true"></i> -->
                  <i
                    class="el-icon-close"
                    style="color:red;margin-left:10px"
                    @click.stop="() => remove(node, data)"
                  ></i>
                  <!-- <i class="el-icon-close" style="color:red"></i> -->
                </div>
              </div>
            </span>
          </el-tree>
        </div>
      </el-aside>

      <!-- 右侧 -->
      <el-container class="jm-main-outer">
        <el-main>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            style="text-align:left"
          >
            <el-form-item label="姓名：">
              <el-input v-model="formInline.name" placehloder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号：">
              <el-input v-model="formInline.user" placehloder="账号"></el-input>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" @click="getSomeUser">查询</el-button>
              <el-button type="primary" @click="clear">重置</el-button>
              <el-button type="primary" @click="add=true" v-if="fanyeData.orgId !==''">增加人员</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <el-table
            :data="page.data"
            height="615px"
            :v-loading="loading"
            @cell-mouse-enter="showUser"
          >
            <el-table-column prop="fullname" label="姓名"></el-table-column>
            <el-table-column prop="departmentName" label="部门" width="90"></el-table-column>
            <el-table-column prop="userName" label="账号"></el-table-column>
            <el-table-column prop="phonenumber" label="电话" width="120"></el-table-column>
            <el-table-column prop="roleName" label="角色" width="200"></el-table-column>
            <el-table-column porp label="操作" width="250">
              <el-button size="mini" @click="dialogVisible = true" type="primary">编辑</el-button>
              <el-button size="mini" @click="unbind=true" type="warning">权限</el-button>
              <el-button size="mini" type="danger" @click="open">删除</el-button>
              <!-- <el-button size="mini" type="danger" @click="delRoles">删除人员</el-button> -->
            </el-table-column>
          </el-table>
          <div class="fanye p10">
            <el-pagination
              background
              @current-change="fanye"
              @prev-click="fanye"
              @next-click="fanye"
              layout="prev, pager, next"
              :current-page="fanyeData.pageNumber"
              :total="page.size"
            ></el-pagination>
          </div>

          
        </el-main>
      </el-container>

			<!-- 弹出层 -->
			<!-- 添加机构 -->
			<el-dialog
				title="添加机构"
				:visible.sync="addDialog"
				:append-to-body="true"
				width="40%"
				:center="true"
			>
				<el-form
					:inline="true"
					:model="tree"
					:rules="rules3"
					ref="Add"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="机构名称" prop="nodename">
						<el-input v-model="tree.nodename" placeholder></el-input>
					</el-form-item>
					<el-form-item label="机构编码" prop="code">
						<el-input v-model="tree.code" placeholder></el-input>
					</el-form-item>
					<el-form-item label="电子公章" prop="dzgzkey">
						<el-input v-model="tree.dzgzkey" placeholder></el-input>
					</el-form-item>
					<el-form-item label="简拼" prop="jp">
						<el-input v-model="tree.jp" placeholder></el-input>
					</el-form-item>
					<el-form-item label="全拼" prop="qp">
						<el-input v-model="tree.qp" placeholder></el-input>
					</el-form-item>
					<el-form-item label="行政区域编码" prop="xzqm">
						<el-input v-model="tree.xzqm" placeholder></el-input>
					</el-form-item>
					<el-form-item label="机构类型" prop="orgtype">
						<el-input v-model="tree.orgtype" placeholder></el-input>
					</el-form-item>
					<el-form-item label="区域编码" prop="orgnumber">
						<el-input v-model="tree.orgnumber" placeholder></el-input>
					</el-form-item>
					<el-form-item label="显示名称" prop="showname">
						<el-input v-model="tree.showname" placeholder></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addSubmit(0)">确 定</el-button>
					<!-- <el-button type="primary" @click="orgAddOrg">确 定</el-button> -->
					<el-button @click="addDialog = false">取 消</el-button>
				</span>
			</el-dialog>
			<!-- 修改人员 -->
			<el-dialog
				title="修改人员"
				:visible.sync="dialogVisible"
				:append-to-body="true"
				width="40%"
				:center="true"
			>
				<el-form
					:model="upUser"
					:rules="rules2"
					ref="upUser"
					:inline="true"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="用户邮箱" prop="email">
						<el-input v-model="upUser.email" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户名称" prop="fullname">
						<el-input v-model="upUser.fullname" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户密码" prop="password">
						<el-input v-model="upUser.password" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户手机" prop="phonenumber">
						<el-input v-model="upUser.phonenumber" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户详细" prop="description">
						<el-input v-model="upUser.description" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户身份证" prop="idCardNumber">
						<el-input v-model="upUser.idCardNumber" placeholder></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="submitForm1('upUser')">确 定</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</span>
			</el-dialog>
			<!-- 添加人员 -->
			<el-dialog
				title="新增人员"
				:visible.sync="add"
				:append-to-body="true"
				width="40%"
				:center="true"
			>
				<el-form
					:model="newuser"
					:rules="rules1"
					ref="newuser"
					:inline="true"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="用户邮箱" prop="email">
						<el-input v-model="newuser.email" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户名称" prop="fullname">
						<el-input v-model="newuser.fullname" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户账户" prop="userName">
						<el-input v-model="newuser.userName" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户密码" prop="password">
						<el-input v-model="newuser.password" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户手机" prop="phonenumber">
						<el-input v-model="newuser.phonenumber" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户详细" prop="description">
						<el-input v-model="newuser.description" placeholder></el-input>
					</el-form-item>
					<el-form-item label="用户身份证" prop="idCardNumber">
						<el-input v-model="newuser.idCardNumber" placeholder></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="submitForm('newuser')">确 定</el-button>
					<el-button @click="add = false">取 消</el-button>
				</span>
			</el-dialog>
			<!-- 权限设置 -->
			<el-dialog
				title="权限设置"
				:visible.sync="unbind"
				:append-to-body="true"
				width="30%"
				:center="true"
			>
				<el-form ref="form" :model="user" label-width="100px">
					<el-form-item label="机构：">{{upUser.departmentName}}</el-form-item>
					<el-form-item label="用户名称：">{{user.fullname}}</el-form-item>
					<el-form-item label="用户角色：" prop="role">
						<el-checkbox-group v-model="typeId">
							<el-checkbox
								v-for="(item,index) in roles"
								:key="index"
								:label="item.id"
							>{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="userBindRole">确 定</el-button>
					<el-button @click="unbind = false">取 消</el-button>
				</span>
			</el-dialog>
    </el-container>
  </div>
</template>
<script>
import Qs from "qs";

export default {
  data() {
    return {
      loading: false,
      input: "",
      dialogVisible: false, //弹出层
      unbind: false, // 解除绑定
      add: false, // 添加用户
      addjg: false, // 添加机构
      data: [],
      defaultProps: {
        id: "Id",
        label: "label",
        children: "children"
      },
      rules: {
        fullname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "电话格式错误", trigger: "blur" }
        ]
      },
      rules1: {
        // 注册验证
        fullname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "格式错误", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        idCardNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 18, max: 18, message: "格式错误", trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { min: 11, max: 11, message: "格式错误", trigger: "blur" }
        ]
      },
      rules2: {
        // 修改验证
        fullname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 1, max: 11, message: "长度在 1 到 11 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "格式错误", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        idCardNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 18, max: 18, message: "格式错误", trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { min: 11, max: 11, message: "格式错误", trigger: "blur" }
        ]
      },
      rules3: {
        nodename: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { message: "机构名称格式错误", trigger: "blur" }
        ]
      },
      formInline: {
        name: "",
        user: ""
      },
      page: {}, // 分页数据
      user: {
        id: "",
        fullname: "",
        userName: "",
        phonenumber: "",
        roleName: []
      }, // 用户数据
      newuser: {
        phonenumber: "", // 手机号
        userName: "", // 账户名称
        description: "", // 用户描述
        email: "", // 用户邮箱
        fullname: "", // 用户名称
        idCardNumber: "", // 用户身份证
        password: "" // 用户密码
      },
      roles: {}, // 所有角色
      fanyeData: {
        pageNumber: 1,
        pageSize: 10,
        fullName: "",
        orgId: ""
      },
      id: "", // 绑定角色id
      typeId: [], // 显示用户绑定角色的id
      upUser: {
        email: "",
        fullname: "",
        password: "",
        phonenumber: ""
      }, // 修改用户信息
      jgid: "6", // 默认机构id
      pid: "6", // 可更新的父id
      tree: {
        // 树形控件
        isLeaf: "leaf",
        treeNode: {},
        nodename: ""
      },
      addDialog: false,
      flag: null, //操作标志位
      node: {}, // tree 节点对象
      nodedata: {},
      usum: 0, // 该节点子节点数
      jgsum: 0, // 该节点子机构数
      parentId: "" // 删除时获取该节点的父节点id
    };
  },
  created() {
    this.orgSearch(); // 获取机构数据
    this.getUser(); // 获取所有人员
    this.getRoles(); // 获取所有角色
  },
  methods: {
    // 删除机构
    remove(node, data) {
      // console.log(node);
      // console.log(data);
      // console.log(this.nodedata);
      this.$confirm(`是否删除节点：${data.label}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.node = node.parent;
          // this.nodedata = data;
          this.parentId = node.parent.data.id;
          console.log(data);
          // console.log(node);
          this.tree = {};
          this.pid = data.id;
          // console.log(this.pid);
          this.orgDelSysOrg();
        })
        .catch(() => {});

      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    //   删除机构
    async orgDelSysOrg() {
      let that = this;
      await this.orgCountOrgUser();
      await this.orgCountSysOrg();
      if (this.usum === 0 && this.jgsum === 0) {
        // console.log("删除机构");
        const res = await this.http.post(this.api.admin.orgDelSysOrg, {
          id: this.pid
        });
        console.log(res);
        if (res.data.code === 200) {
          var params = { pid: this.parentId };
          // console.log(params);
          const result = await this.http.get(this.api.admin.orgSearch, {
            params
          });
          // console.log(result);
          if (result.data.code === 200) {
            var list = "";
            if (result.data.data.records !== null) {
              list = result.data.data.records.map(Item => {
                return {
                  id: Item.id,
                  label: Item.name
                };
              });
            } else {
              list = [];
            }
            // console.log(list);

            // 节点动态更新核心代码-------
            var theChildren = that.node.childNodes;
            // console.log(that.node);
            theChildren.splice(0, theChildren.length);
            that.node.doCreateChildren(list);
            this.$message.success("删除成功");
          }
        } else {
          this.$message.error(res.data.message);
        }
      } else {
        this.$message.error("删除失败，请清空该节点下所有子机构和人员");
      }
    },
    // 查询机构人员数量
    async orgCountOrgUser() {
      // console.log("查询机构人员数量");
      let params = {
        id: this.pid
      };
      const res = await this.http.get(this.api.admin.orgCountOrgUser, {
        params
      });
      console.log(res);
      if (res.data.code === 200) {
        this.usum = res.data.data.num;
      } else {
        this.$message.error(res.data.message);
      }
      // console.log(res.data.data.num);
    },
    // 查询子机构数量
    async orgCountSysOrg() {
      // console.log("查询子机构数量");
      let params = {
        id: this.pid
      };
      const res = await this.http.get(this.api.admin.orgCountSysOrg, {
        params
      });
      console.log(res);
      if (res.data.code === 200) {
        this.jgsum = res.data.data.num;
      } else {
        this.$message.error(res.data.message);
      }
      // console.log(res.data.data.num);
    },

    //新增
    addDialogShow(node, data, flag) {
      this.node = node;
      this.nodedata = data;
      // console.log(data);
      console.log(node);
      if (flag === 0) {
        this.tree = {};
        this.addDialog = true;
        this.pid = data.id;
        // console.log(this.pid);
        this.flag = 0;
      }
      if (flag === 1) {
        this.addDialog = true;
        this.pid = data.Id;
        this.addForm.name = data.Name;
        this.flag = 1;
      }
    },

    // 新增机构
    async addSubmit(flag) {
      let that = this;
      if (flag === 0) {
        var params = {
          name: that.tree.nodename,
          pid: that.pid,
          isshow: "是",
          code: that.tree.code,
          level: "",
          issecondlevel: "",
          dzgzkey: that.tree.dzgzkey,
          jp: that.tree.jp,
          qp: that.tree.qp,
          xzqm: that.tree.xzqm,
          orgtype: that.tree.orgtype,
          orgnumber: that.tree.orgnumber,
          showname: that.tree.showname
        };
        // console.log(params);
        const res = await that.http.post(
          that.api.admin.orgAddOrg,
          Qs.stringify(params)
        );
        console.log("addddd", res);
        if (res.data.code === 200) {
          that.$message.success("新增机构成功");

          var params1 = { pid: that.pid };
          // console.log(params1);
          const result = await that.http.get(that.api.admin.orgSearch, {
            params: params1
          });
          // console.log(result);
          if (result.data.code === 200) {
            let list = result.data.data.records.map(Item => {
              return {
                id: Item.id,
                label: Item.name
              };
            });

            // 节点动态更新核心代码-------
            var theChildren = that.node.childNodes;
            // console.log(that.node);
            // console.log(that.node.childNodes);
            theChildren.splice(0, theChildren.length);
            that.node.doCreateChildren(list);
          }
          this.jgid = this.pid;
          this.addDialog = !this.addDialog;
        } else {
          this.$message.error(res.data.message);
          // this.addDialog = !this.addDialog;
        }
      }
      // if(flag === 1) {
      //  let data = {
      //   name: arr.name
      //  }
      //  updatetype(this.pid,data).then(res => {
      //   this.$set(this.node.data, 'Name',arr.name)
      //   this.addDialog = false
      //   this.$notify.success({
      //    message:'更新成功',
      //    duration: 2000
      //   })
      //  }).catch(() => {
      //   this.addDialog = false
      //  })
      // }
    },

    // 修改人员
    async userUpdate() {
      // console.log("修改人员");
      let rasPw = this.$getRsaCode(this.upUser.password); // ras 加密 密码
      const res = await this.http.post(this.api.admin.userUpdate, {
        description: this.upUser.description, //用户描述信息
        email: this.upUser.email, //用户邮箱地址
        fullname: this.upUser.fullname, // 用户全名
        id: this.user.id, // 用户ID
        idCardNumber: this.upUser.idCardNumber, // 身份证号
        isNaturalPerson: "1",
        loginType: "0",
        password: rasPw, //密码
        phonenumber: this.upUser.phonenumber, //用户电话号码
        userName: this.user.userName //用户登录账号
      });
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("修改人员成功");
        this.getUser();
        this.dialogVisible = !this.dialogVisible;
        this.upUser = {
          email: "",
          funname: "",
          userName: "",
          password: "",
          idCardNumber: "",
          description: ""
        };
      } else {
        this.$message.error(res.data.message);
      }
    },
    //   删除提示
    open(e) {
      this.$confirm(
        `是否删除,名称：${this.user.fullname}账号：${this.user.userName}`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.userDel();
        })
        .catch(() => {});
    },
    // 删除人员
    async userDel(e) {
      // console.log("删除人员");
      let params = {
        id: this.user.id
      };
      console.log(params);
      const res = await this.http.get(this.api.admin.userDelete, { params });
      if (res.data.code === 200) {
        this.$message.success("删除人员成功");
        this.getUser();
      } else {
        this.$message.error(res.data.message);
      }
    },
    // 树形控件
    loadNode(node, resolve) {
      // console.log(node);
      // console.log(node.childNodes);
      // 如果是顶级的父节点
      if (node.level === 0) {
        this.isdel = 0;
        // 查找顶级对象
        this.orgSearch()
          .then(res => {
            return resolve(res);
          })
          .catch(() => {
            let data = [];
            return resolve(data);
          });
      } else {
        // 根据父节点id找寻下一级的所有节点
        this.isdel = 1;
        this.orgSearch({ pid: node.data.id })
          .then(res => {
            console.log(res);
            return resolve(res);
          })
          .catch(() => {
            let data = [];
            return resolve(data);
          });
      }
    },

    // 获取机构信息
    async orgSearch(e) {
      // console.log(sessionStorage.getItem("token"));
      // console.log("获取机构信息");
      var params = e;
      // console.log(params);
      const result = await this.http.get(this.api.admin.orgSearch, { params });
      console.log(result);
      if (result.data.code === 200) {
        let List = result.data.data.records.map(Item => {
          return {
            id: Item.id,
            label: Item.name
          };
        });
        // console.log(List);
        this.data = List;
        return List;
        // this.data = result.data.data.records;
      } else {
        this.$message.error(result.data.message);
      }
    },

    // 点击搜索人员
    async seaUser(e, tree) {
      this.treeNode = tree;
      // console.log("点击搜索人员", tree);
      // console.log(e);
      this.fanyeData.orgId = e.id;
      this.pid = e.id;
      console.log(this.pid);
      this.newuser.departmentName = e.label;
      this.newuser.orgId = e.id;
      this.getUser();
    },

    // 提交修改表单
    submitForm1(upUser) {
      this.$refs[upUser].validate(valid => {
        if (valid) {
          this.userUpdate();
        } else {
          this.$message.error("请确认信息是否准确");
          return false;
        }
      });
    },
    // 提交创建表单
    submitForm(newuser) {
      this.$refs[newuser].validate(valid => {
        if (valid) {
          this.addUser();
        } else {
          this.$message.error("请确认信息是否准确");
          return false;
        }
      });
    },
    // 添加人员
    async addUser() {
      // console.log("添加人员");
      let rasPw = this.$getRsaCode(this.newuser.password); // ras 加密 密码
      const res = await this.http.post(this.api.admin.addUser, {
        orgId: this.fanyeData.orgId,
        departmentName: this.newuser.departmentName, // 组织名称
        description: this.newuser.description, // 用户描述信息
        email: this.newuser.email, // 用户邮箱地址
        forever: "-1", // 用户属性
        fullname: this.newuser.fullname, // 用户全名
        idCardNumber: this.newuser.idCardNumber, // 身份证号
        isNaturalPerson: "1",
        loginType: "0",
        password: rasPw, // 密码
        phonenumber: this.newuser.phonenumber, // 手机号码
        userName: this.newuser.userName // 用户登录账户
      });
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("新增人员成功");
        this.add = !this.add;
        this.getUser();
        this.newuser = {};
      } else {
        this.$message.error(res.data.message);
        // this.add = !this.add;
      }
      // console.log(this.newuser);
    },

    // 重置
    async clear() {
      // console.log("重置查询");
      var params = {
        pageNumber: 1,
        pageSize: 10,
        fullName: "",
        userName: ""
      };
      this.fanyeData = params;
      this.getUser();
    },
    // 根据指定账号和名称查询用户
    async getSomeUser() {
      // console.log("根据指定信息查询用户");
      this.fanyeData.pageNumber = 1;
      this.fanyeData.fullName = this.formInline.name;
      this.fanyeData.userName = this.formInline.user;
      this.getUser();
    },

    // 用户绑定角色
    async userBindRole() {
      // console.log("用户绑定角色");
      const result = await this.http.post(this.api.admin.roleUserBindRole, {
        bindRoleIds: this.typeId,
        userId: this.user.id
      });
      console.log(result);
      if (result.data.code === 200) {
        this.$message.success("绑定成功");
        this.getUser();
        this.unbind = !this.unbind;
      } else {
        this.$message.error(result.data.message);
      }
    },

    // 获取行信息
    async showUser(e) {
      // console.log("用户信息展示");
      // console.log(e);
      this.upUser.fullname = e.fullname;
      this.upUser.userName = e.userName;
      this.upUser.phonenumber = e.phonenumber;
			this.upUser.departmentName = e.departmentName;
			this.upUser.email = e.email;
			this.upUser.idCardNumber = e.idCardNumber;
			this.upUser.description = e.description;
      // console.log(this.upUser);
      if (e.roles === null) {
        this.typeId = [];
      } else {
        this.typeId = e.roles;
      }
      // console.log(this.typeId, "1111111111111111111");
      var user = {
        id: e.id,
        fullname: e.fullname,
        userName: e.userName,
        phonenumber: e.phonenumber,
        roleName: e.roleName
      };
      if (e.roles != null) {
        this.id = e.roles[0];
      }
      // console.log(e.roleName);
      if (e.roleName === null) {
        user.roleName = "";
      }
      this.user = user;
      // console.log(this.user);
    },

    // 翻页
    async fanye(e) {
      this.fanyeData.pageNumber = e;
      this.getUser();
    },

    // 获取所有角色
    async getRoles() {
      // console.log("获取所有角色");
      const result = await this.http.get(this.api.admin.roleAllRoles);
      console.log(result);
      if (result.data.code === 200) {
        this.roles = result.data.data.records;
        console.log(this.roles);
      } else {
        this.$message.error(result.data.message);
      }
    },

    // 获取所有人员
    async getUser() {
      this.loading = !this.loading;
      // console.log("查询用户数据");
      var params = this.fanyeData;
      const result = await this.http.get(this.api.admin.userQueryList, {
        params
      });
      console.log(result);
      if (result.data.code === 200) {
        var sum = result.data.data.page.totalRecord; //分页
        var size = 10;
        var list = {};
        this.page.size = Math.ceil(sum / size) * 10;
				this.page.data = result.data.data.users;
        this.loading = !this.loading;
        // console.log('1111111111111111111111111111111111111111111111111',this.loading)
      } else {
        this.$message.error(result.data.message);
        // this.loading = !this.loading;
      }
    },

    // 重命名
    set(node, data) {
      // console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      // console.log(parent);
      // console.log(children);
      // console.log(index);
      // children.splice(index, 1);
    },
    search() {
      alert("点击了搜索");
    }
  }
};
</script>
<style scoped>
.fanye {
  text-align: right;
}
body {
  margin: 0;
}
.custom-tree-node {
  flex: 1;
}
.custom-tree-node-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  /* padding-right: 8px; */
}
.custom-tree-node-inner .title {
  flex: 1;
  white-space: pre-wrap;
}
.custom-tree-node-inner .title .text {
  height: 19px;
  line-height: 19px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.custom-tree-node-inner .edit {
  display: none;
}
.custom-tree-node-inner:hover .edit {
  display: block;
}
.flex-bw {
  justify-content: space-between;
}
.flex {
  display: flex;
}
.col {
  color: rgb(64, 158, 255);
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

.el-aside {
  background-color: white;
}

.el-main {
  background-color: #e9eef3;
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