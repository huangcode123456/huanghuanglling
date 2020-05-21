<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="25%" class="jm-aside">
        <div class="left-head flex flex-bw">
          <span>字典类型管理</span>
          <a href="javascript:;" class="col" @click="creatzd">新建</a>
        </div>
        <div class="left-inp">
          <el-input
            class="jm-search"
            size="small"
            style="padding-left:20px;padding-right:20px"
            placeholder="输入关键词搜索"
            v-model="zdlx.name"
          >
            <el-button @click="search" type="primary" slot="append">搜索</el-button>
          </el-input>
        </div>
        <div class="left-context">
          <div>
            <div
              class="p10 hand flex flex-bw"
              v-bind:class="[Index===`${index}`?'js-active':'']"
              :data-id="item.id"
              :data-index="index"
              @click.self="swt"
              v-for="(item,index) in allType"
              :key="index"
            >
              {{item.name}}
              <i
                class="el-icon-edit"
                @click="showRemove(item.id)"
                v-if="Index===`${index}`"
              ></i>
            </div>
          </div>
          <div v-if="allType==null" style="margin-left:40%;margin-top:20%;">暂无数据</div>
          <!-- <el-tree :data="data" node-key="id" :default-expanded-keys="[1]" :props="defaultProps"></el-tree> -->
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
            <el-form-item label="字典名称：">
              <el-input v-model="formInline.name" placehloder="请输入字典名称"></el-input>
            </el-form-item>
            <el-form-item label="字典类型：">
              <el-input v-model="formInline.type" placehloder="请输入字典类型"></el-input>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" @click="searchZd">查询</el-button>
              <el-button type="primary" @click="clear">重置</el-button>
              <el-button type="primary" @click="add = true" v-if="type!==''">新增</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <el-table :data="page.data" @cell-mouse-enter="showUser">
            <el-table-column prop="name" label="字典名称"></el-table-column>
            <el-table-column prop="description" label="字典类型" width="300"></el-table-column>
            <el-table-column prop="value" label="字典值" width="300"></el-table-column>
            <el-table-column porp label="操作" width="200">
              <el-button size="mini" @click="dialogVisible = true" type="primary">编辑</el-button>
              <el-button size="mini" @click="delshow" type="danger">删除</el-button>
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

			<!-- 弹出层-新增字典类型 -->
          <el-dialog
            title="新增字典类型"
            :visible.sync="addZdlx"
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
              <el-form-item label="字典类型名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder></el-input>
              </el-form-item>
              <el-form-item label="字典类型值" prop="type">
                <el-input v-model="ruleForm.type" placeholder></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dictTypeAdd">确 定</el-button>
              <el-button @click="addZdlx = false">取 消</el-button>
            </span>
          </el-dialog>

          <!-- 弹出层-编辑字典类型-->
          <el-dialog
            title="编辑字典类型"
            :visible.sync="remove"
            :append-to-body="true"
            width="30%"
            :center="true"
          >
            <el-form
              :model="ruleForm"
              :rules="rules1"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="字典类型名称" prop="name">
                <el-input v-model="zdname" placeholder></el-input>
              </el-form-item>
              <el-form-item label="字典类型值" prop="type">
                <el-input v-model="user.type" placeholder></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="removeZdlx">确 定</el-button>
              <el-button @click="remove = false">取 消</el-button>
            </span>
          </el-dialog>

          <!-- 弹出层-修改-->
          <el-dialog
            title="修改字典"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="30%"
            :center="true"
          >
            <el-form
              :model="ruleForm"
              :rules="rules2"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="字典类型名称" prop="name">
                <el-input v-model="user.description" placeholder disabled></el-input>
              </el-form-item>
              <el-form-item label="字典类型" prop="type">
                <el-input v-model="user.type" placeholder disabled></el-input>
              </el-form-item>
              <el-form-item label="字典名称" prop="username">
                <el-input v-model="user.name" placeholder></el-input>
              </el-form-item>
              <!-- <el-form-item label="字典类型" prop="name">
                <el-input v-model="user.description" disabled></el-input>
              </el-form-item>-->
              <el-form-item label="字典值" prop="name">
                <el-input v-model="user.value" placeholder></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="update">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>

          <!-- 弹出层-新增字典 -->
          <el-dialog
            title="新增字典"
            :visible.sync="add"
            :append-to-body="true"
            width="30%"
            :center="true"
          >
            <el-form
              :model="ruleForm"
              :rules="rules3"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="字典类型名称" prop="name">
                <el-input v-model="zdname" placeholder disabled></el-input>
              </el-form-item>
              <el-form-item label="字典类型" prop="name">
                <el-input v-model="fanyeData.type" placeholder disabled></el-input>
              </el-form-item>
              <el-form-item label="字典名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder></el-input>
              </el-form-item>
              <el-form-item label="字典值" prop="name">
                <el-input v-model="ruleForm.value" placeholder></el-input>
              </el-form-item>
              <!-- <el-form-item label="字典类型" prop="name">
                <el-input v-model="type" placeholder="" :disabled="true"></el-input>
              </el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addzd">确 定</el-button>
              <el-button @click="add = false">取 消</el-button>
            </span>
          </el-dialog>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogVisible: false, //弹出层
      add: false, // 弹出层-新增
      del: false, // 弹出层-删除
      addZdlx: false, //弹出层-新增字典类型
      remove: false,
      input: "",
      ruleForm: {
        name: "",
        user: "",
        phone: "",
        resource: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      rules1: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      rules3: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      user: {
        // 获取行信息
        name: "",
        type: "",
        value: ""
      },
      formInline: {
        name: "",
        type: ""
      },
      fanyeData: {
        // 分页请求数据
        pageNumber: 1,
        pageSize: 10,
        name: "",
        type: ""
      },
      page: {
        // 字典显示数据
        size: 0,
        data: []
      },
      allType: [], // 所有字典类型
      id: "", // 选中切换样式
      Index: "",
      type: "", // 字典类型
      zdlx: {
        // 字典类型搜索
        name: ""
      },
      zdname: "dfasf"
    };
  },
  created() {
    this.listUser();
    this.allTypes();
  },
  methods: {
    clear() {
      this.fanyeData = {
        pageNumber: 1,
        pageSize: 10,
        name: "",
        type: ""
      };
      this.Index = "";
      this.listUser();
    },
    creatzd() {
      this.ruleForm.type = "";
      this.ruleForm.name = "";
      this.addZdlx = !this.addZdlx;
    },
    showRemove(e) {
      console.log(e);
      this.remove = !this.remove;
    },
    // 修改字典类型
    async removeZdlx() {
      // console.log("修改字典类型");
      // console.log(this.user.type);
      // console.log(this.zdname);
      const res = await this.http.post(this.api.admin.dictTypeUpdate, {
        id: this.user.id,
        name: this.zdname,
        sortNum: 0,
        type: this.user.type
      });
      console.log(res);
      if (res.data.code === 200) {
        // console.log(res);
        // alert('修改成功')
        this.allTypes();
        this.$message.success("修改成功");
        this.remove = !this.remove;
      } else {
        this.$message.error(res.data.message);
        // this.remove = !this.remove;
      }
    },

    // 新增字典类型
    async dictTypeAdd() {
      // console.log("新增字典类型");
      const res = await this.http.post(this.api.admin.dictTypeAdd, {
        name: this.ruleForm.name,
        sortNum: 0,
        type: this.ruleForm.type
      });
      if (res.data.code === 200) {
        // alert('新增成功')
        this.$message.success("新增成功");
        console.log(res);
        this.ruleForm.name = "";
        this.allTypes();
        this.addZdlx = !this.addZdlx;
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 修改字典
    async update() {
      // console.log("修改字典");
      const res = await this.http.post(this.api.admin.dictUpdate, {
        description: "",
        id: this.user.id,
        name: this.user.name,
        parentId: 0,
        remark: "",
        sortNum: 0,
        type: this.user.type,
        value: this.user.value
      });
      console.log(res);
      if (res.data.code === 200) {
        // alert('修改成功')
        this.$message.success("修改成功");
        this.dialogVisible = !this.dialogVisible;
        this.listUser();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 获取行信息
    async showUser(e) {
      console.log("用户信息展示");
      console.log(e);
      var user = {
        id: e.id,
        name: e.name,
        type: e.type,
        value: e.value,
        description: e.description
      };
      this.user = user;
    },

    delshow() {
      this.$confirm(`是否删除字典：${this.user.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delzd();
        })
        .catch(() => {});
    },
    // 删除字典
    async delzd() {
      // console.log("删除字典");
      var params = {
        id: this.user.id
      };
      const res = await this.http.get(this.api.admin.dictDelete, { params });
      console.log(res);
      if (res.data.code === 200) {
        this.del = !this.del;
        // alert('删除字典成功');
        this.$message.success("删除字典成功");
        this.listUser();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 新增字典
    async addzd() {
      // console.log("新增字典");
      // console.log(this.fanyeData.type);
      // console.log(this.ruleForm.name);
      // console.log(this.ruleForm.value);
      const res = await this.http.post(this.api.admin.dictAdd, {
        description: "",
        name: this.ruleForm.name,
        parentId: 0,
        remark: "",
        sortNum: 0,
        type: this.fanyeData.type,
        value: this.ruleForm.value
      });
      console.log(res);
      if (res.data.code === 200) {
        // console.log(res);
        this.add = !this.add;
        // alert('字典添加成功')
        this.$message.success("字典添加成功");
        this.ruleForm.name = "";
        this.ruleForm.value = "";
        this.listUser();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 字典搜索
    async searchZd() {
      console.log("字典搜索");
      this.fanyeData.name = this.formInline.name;
      this.fanyeData.type = this.formInline.type;
      this.listUser();
    },
    // 获取字典类型
    async allTypes() {
      // console.log("获取字典类型");
      const res = await this.http.post(this.api.admin.dictTypeAllTypes, {
        name: this.zdlx.name
      });
      console.log(res);
      if (res.data.code === 200) {
        // console.log(res);
        this.allType = res.data.data.records;
        // console.log(this.allType);
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 翻页
    async fanye(e) {
      this.fanyeData.pageNumber = e;
      this.listUser();
    },

    // 获取所有字典
    async listUser() {
      console.log(sessionStorage.getItem("token"));
      this.loading = !this.loading;
      // console.log("获取所有字典");
      var params = this.fanyeData;
      const result = await this.http.get(this.api.admin.dictSearch, {
        params
      });
      console.log(result);
      if (result.data.code === 200) {
        var sum = result.data.data.page.totalRecord; //分页
        var size = 10;
        var list = {};
        this.page.size = Math.ceil(sum / size) * 10;
        this.page.data = result.data.data.records;
        this.loading = !this.loading;
        // console.log(this.page.data);
      } else {
        this.$message.error(result.data.message);
        // this.loading = !this.loading;
      }
    },

    swt(e) {
      this.id = e.target.dataset.id;
      this.Index = e.target.dataset.index;
      // console.log(e.target.dataset.index);
      console.log(e);
      var index = e.target.dataset.index;
      var list = this.allType[index];
      // console.log(list);
      (this.type = list.type), // 放置当前点击的操作类型
        (this.user.name = list.name);
      this.user.type = list.type;
      this.user.id = list.id;
      this.fanyeData.type = list.type;
      this.zdname = list.name;
      // this.fanueData.name = list.name
      // console.log(this.fanyeData);
      this.listUser();
    },
    search() {
      this.allTypes();
    }
  }
};
</script>
<style scoped>
.hand {
  cursor: pointer;
}
.js-active {
  color: rgb(64, 158, 255);
  background: rgb(240, 250, 255);
}
.fanye {
  text-align: right;
}
.col {
  color: rgb(64, 158, 255);
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