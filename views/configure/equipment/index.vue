<template>
  <div class="jm-main-inner p10">
    <el-container class="jm-main-outer" style="padding:20px;">
      <!-- <el-main> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align:left">
        <el-form-item label="类型：">
          <el-select v-model="fanyeData.type" placeholder="选择设备类型" @change="Search">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input v-model="fanyeData.searchKey" placeholder="输入关键词查询" clearable></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="Search">查询</el-button>
          <!-- <el-button type="primary" @click="getSomeUser">查询</el-button> -->
          <el-button type="primary" @click="clear">重置</el-button>
          <!-- <el-button type="primary" @click="clear">重置</el-button> -->
          <el-button type="primary" @click="showdialog(0)">增加设备</el-button>
          <!-- <el-button type="primary" @click="add=true" v-if="fanyeData.orgId !==''">增加人员</el-button> -->
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="page.data" @cell-mouse-enter="showData">
        <!-- <el-table
					:data="page.data"
					height="615px"
					:v-loading="loading"
					@cell-mouse-enter="showUser"
        >-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="经度：">
                <span>{{ props.row.lng }}</span>
              </el-form-item>
              <el-form-item label="纬度：">
                <span>{{ props.row.lat }}</span>
              </el-form-item>
              <el-form-item label="IP地址：">
                <span>{{ props.row.ipLocation }}</span>
              </el-form-item>
              <el-form-item label="MAC地址：">
                <span>{{ props.row.macLocation }}</span>
              </el-form-item>
              <el-form-item label="登录账号：">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="登录密码：">
                <span>{{ props.row.passWord }}</span>
              </el-form-item>
              <!-- <el-form-item label="商品描述">
									<span>{{ props.row.desc }}</span>
              </el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="number" label="设备编号" width="100"></el-table-column>
        <el-table-column prop="location" label="位置"></el-table-column>
        <el-table-column prop="status" label="设备状态" width="90">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 'danger'"
              disable-transitions
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="所属单位"></el-table-column>

        <!-- <el-table-column prop="lng" label="经度" width="180"></el-table-column>
					<el-table-column prop="lat" label="纬度" width="200"></el-table-column>
					<el-table-column prop="ipLocation" label="IP地址" width="150"></el-table-column>
					<el-table-column prop="macLocation" label="MAC地址" width="150"></el-table-column>
					<el-table-column prop="account" label="登陆账号" width="120"></el-table-column>
        <el-table-column prop="lgpwd" label="登陆密码" width="120"></el-table-column>-->
        <el-table-column porp label="操作" width="150">
          <!-- <el-button size="mini" type="primary">编辑</el-button> -->
          <el-button size="mini" @click="updata" type="primary">编辑</el-button>
          <!-- <el-button size="mini" type="warning">权限</el-button> -->
          <!-- <el-button size="mini" @click="unbind=true" type="warning">权限</el-button> -->
          <el-button size="mini" type="danger" @click="showdel">删除</el-button>
          <!-- <el-button size="mini" type="danger" @click="open">删除</el-button> -->
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
      <!-- </el-main> -->
    </el-container>
    <!-- 弹出层 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="40%"
      :center="true"
    >
      <el-form
        :model="upData"
        :rules="rules"
        ref="upData"
        :inline="true"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类型：" prop="type">
          <el-select
            v-model="upData.type"
            placeholder="选择设备类型"
            style="max-width:202px"
            @change="show"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="upData.name" placeholder></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="number">
          <el-input v-model="upData.number" placeholder></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="upData.location" placeholder></el-input>
        </el-form-item>
        <el-form-item label="设备状态" v-if="dialog.title==='修改设备'" prop="status">
          <!-- <el-input v-model="upData.status" placeholder></el-input> -->
          <el-select v-model="upData.status" placeholder="选择状态" style="max-width:202px">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属单位" prop="department">
          <el-input v-model="upData.department" placeholder></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="lng">
          <el-input v-model="upData.lng" placeholder></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="upData.lat" placeholder></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ipLocation">
          <el-input v-model="upData.ipLocation" placeholder></el-input>
        </el-form-item>
        <el-form-item label="MAC地址" prop="macLocation">
          <el-input v-model="upData.macLocation" placeholder></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="upData.account" placeholder></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="passWord">
          <el-input v-model="upData.passWord" placeholder></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('upData')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "configEquipment",
  data() {
    return {
      formInline: {},
      page: {
        data: []
      },
      fanyeData: {
        pageNumber: 1,
        pageSize: 10,
        searchKey: "",
        startRow: 0,
        type: ""
      },
      options: [
        {
          value: "meteorology",
          label: "气象监测"
        },
        {
          value: "waterQuality",
          label: "水质监测"
        },
        {
          value: "soli",
          label: "土壤监测"
        },
        {
          value: "DustNoise",
          label: "扬尘与噪声"
        },
        {
          value: "internarlWarter",
          label: "内涝监测"
        }
      ],
      options1: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "故障"
        }
      ],
      upData: {
        account: "",
        department: "",
        equipmentUrl: "",
        id: 0,
        ipLocation: "",
        lat: 0,
        lng: 0,
        location: "",
        macLocation: "",
        mapUrl: "",
        name: "",
        number: "",
        passWord: "",
        status: "1",
        type: "meteorology"
      }, // 更新数据
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        // lng: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { message: "格式错误", trigger: "blur" }
        // ],
        // lat: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { message: "格式错误", trigger: "blur" }
        // ],
        ipLocation: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ],
        macLocation: [
          { required: true, message: "请输入", trigger: "blur" },
          { message: "格式错误", trigger: "blur" }
        ]
        // account: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { message: "格式错误", trigger: "blur" }
        // ],
        // passWord: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { message: "格式错误", trigger: "blur" }
        // ],
      }, // 表单验证
      dialogVisible: false, // 修改设备弹出层
      dialog: {
        title: ""
      }
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("token"));
    this.manageDeviceSearch();
  },
  methods: {
    show() {
      console.log(this.upData.type);
    },
    // 弹出层控制
    showdialog(flag) {
      if (flag == 0) {
        this.dialog.title = "新增设备";
        this.upData = {};
        if (this.fanyeData.type !== "") {
          this.upData.type = this.fanyeData.type;
        }
        this.dialogVisible = !this.dialogVisible;
      } else if (flag == 1) {
        this.dialog.title = "修改设备";
        this.dialogVisible = !this.dialogVisible;
      } else {
        console.log("弹出层控制错误");
      }
    },
    // 新增设备
    async manageAdd() {
      console.log("新增设备");
      this.fanyeData.type == "" ? "" : (this.upData.type = this.fanyeData.type);
      console.log(this.upData);
      const res = await this.http.post(
        this.api.environment.manageAdd,
        this.upData
      );
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("新增设备成功");
        this.dialogVisible = !this.dialogVisible;
        this.manageDeviceSearch();
      } else {
        this.$message.error(res.data.message);
      }
    },
    showdel() {
      this.$confirm(`是否删除此设备,设备名：${this.upData.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.manageDelete();
        })
        .catch(() => {});
    },
    // 删除设备
    async manageDelete() {
      console.log("删除设备");
      var params = {
        id: this.upData.id
      };
      const res = await this.http.post(
        this.api.environment.manageDelete,
        params
      );
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("删除设备成功");
        this.manageDeviceSearch();
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 验证提交表单
    submitForm(upData) {
      this.$refs[upData].validate(valid => {
        if (valid) {
          if (this.dialog.title === "新增设备") {
            this.manageAdd();
          } else if (this.dialog.title === "修改设备") {
            this.manageUpdate();
          } else {
            console.log("弹出层信息错误");
          }
        } else {
          this.$message.error("请确认信息是否准确");
          return false;
        }
      });
    },

    // 编辑设备信息
    async manageUpdate() {
      console.log(this.upData);
      let Data = this.upData;
      Data.status === "正常"
        ? (Data.status = "1")
        : Data.status === "故障"
        ? (Data.status = "0")
        : "";
      // Data.status='0';
      console.log(Data);
      const res = await this.http.post(this.api.environment.manageUpdate, Data);
      console.log(res);
      if (res.data.code === 200) {
        this.$message.success("修改设备信息成功");
        this.dialogVisible = !this.dialogVisible;
        this.manageDeviceSearch();
        this.upData = {};
      } else {
        this.$message.error(res.data.error);
      }
    },

    // 重置查询结果
    clear() {
      (this.fanyeData = {
        pageNumber: 1,
        pageSize: 10,
        searchKey: "",
        startRow: 0,
        type: ""
      }),
        // console.log('清除关键词');
        (this.fanyeData.searchKey = "");
      this.manageDeviceSearch();
    },

    // 查询设备
    async Search() {
      await this.manageDeviceSearch();
      // this.fanyeData.searchKey = ''
    },

    // 编辑
    updata() {
      this.showdialog(1);
    },

    // 获取每行数据
    showData(e) {
      console.log(e);
      this.upData = {
        account: e.account,
        department: e.department,
        equipmentUrl: e.equipmentUrl,
        id: e.id,
        ipLocation: e.ipLocation,
        lat: e.lat,
        lng: e.lng,
        location: e.location,
        macLocation: e.macLocation,
        mapUrl: e.mapUrl,
        name: e.name,
        number: e.number,
        passWord: e.passWord,
        status: e.status,
        type: e.type
      };
    },

    // 翻页
    async fanye(e) {
      this.fanyeData.pageNumber = e;
      this.manageDeviceSearch();
    },

    // 获取所有设备（搜索设备）
    async manageDeviceSearch() {
      this.loading = !this.loading;
      console.log("查询设备");
      console.log(this.fanyeData);
      const res = await this.http.post(
        this.api.environment.manageDeviceSearch,
        this.fanyeData
      );
      console.log(res);
      if (res.data.code === 200) {
        var sum = res.data.data.totalRecord; //分页
        var size = 10;
        var list = {};
        this.page.size = Math.ceil(sum / size) * 10;
        if (res.data.data.records !== null) {
          res.data.data.records.map(item => {
            if (item.status === 1) {
              item.status = "正常";
            } else if (item.status === 0) {
              item.status = "故障";
            }
          });
        }

        this.page.data = res.data.data.records;
        this.loading = !this.loading;
        // console.log('1111111111111111111111111111111111111111111111111',this.loading)
      } else {
        this.$message.error(res.data.message);
        // this.loading = !this.loading;
      }
    }

    // filterTag(value, row) {
    // 	return row.status === value;
    // },
    // filterHandler(value, row, column) {
    // 	const property = column['property'];
    // 	return row[property] === value;
    // }
  }
};
</script>
<style scoped lang="less">
.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
.el-table {
  overflow: auto;
}
.jm-main-outer {
  background: #fafafa;
}
.fanye {
  text-align: right;
}
</style>