<template>
  <div class="jm-main-inner p10">
    <!-- <div>这是诱导屏监测主页监测</div> -->

    <el-container>
      <!-- 左侧 -->

      <el-aside class="jm-aside">
        <div class="jm-card">
          <div class="jm-card-header">
            <h4 class="jm-card-title">诱导屏监测</h4>
          </div>
          <div class="jm-card-center p10">
            <div class="flex">
              <!-- 气象点搜索功能 -->
              <el-input class="jm-search" size="small" placeholder="输入诱导屏名称" v-model="input">
                <el-button @click="sreach" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>

            <!-- 监测指标表格 -->
            <el-table
              :data="tableData"
              stripe
              border
              class="mt10 sz-table"
              height="300px"
              style="width: 100%;"
              row-class-name="sz-table-tr"
            >
              <el-table-column prop="number" label="序号" width="60"></el-table-column>
              <el-table-column prop="snumber" label="编号" width="60"></el-table-column>
              <el-table-column prop="address" label="名称" width="100"></el-table-column>
              <el-table-column prop="date" label="时间" width="100"></el-table-column>
              <el-table-column prop label="操作">
                <a href="javascript:;">定位</a>
              </el-table-column>
            </el-table>

            <el-pagination
              class="jm-pagination mt10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :pager-count="pagerCount"
              :page-size="10"
              small
              layout="prev, pager, next, jumper"
              :total="40"
            ></el-pagination>
          </div>
        </div>

        <!-- <div class="jm-card mt10">
						<div class="jm-card-header">
							<h4 class="jm-card-title">今日车辆和异常总数监控</h4>
						</div>
        <div class="jm-card-center p10">-->
        <!-- echarts图表 -->
        <!-- <div id="chartCl"  style="height:300px;"></div>
						</div>
        </div>-->
      </el-aside>
      <!-- 中间 -->
      <el-container class="plr10">
        <txMap ref="mychild" :qp="true" :isLngLat="false"></txMap>
      </el-container>
    </el-container>

    <!-- 主题内容 -->
  </div>
</template>
<script>
import echarts from "echarts";
import txMap from '../../../../components/txMap/txMap'
export default {
  name: "meteorology",
  components:{
    txMap
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      input: "",
      activeIndex: "1",
      activeIndex1: "1",
      active: false,
      tableData: [
        {
          number: "1",
          snumber: "231",
          date: "2016-05-02",
          address: "诱导屏监测1"
        },
        {
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "诱导屏监测2"
        },
        {
          number: "3",
          snumber: "121",
          date: "2016-05-01",
          address: "诱导屏监测3"
        },
        {
          number: "4",
          snumber: "546",
          date: "2016-05-01",
          address: "诱导屏监测4"
        },
        {
          number: "5",
          snumber: "394",
          date: "2016-05-01",
          address: "诱导屏监测5"
        },
        {
          number: "6",
          snumber: "734",
          date: "2016-05-03",
          address: "水质监测点5"
        }
      ],

      tabActiveName: "first",
      pagerCount: 5,
      currentPage: 2,
      checkList: []
    };
  },
  watch: {
    input: function(value) {
      console.log(value);
    }
  },
  mounted() {},
  methods: {
    sreach() {
      alert("点击了搜索");
    },
    // 选项卡
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    search() {
      alert("搜索气象点位" + this.input);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-form-item label {
  text-align: center;
}
/deep/.el-form-item {
  margin: 0;
}
.checkbox-item {
  padding: 5px 10px 5px 20px;
}
.checkbox-item .el-checkbox {
  color: #333;
}
.imgwh {
  width: 48%;
  height: 48%;
}
.jm-video-list {
  display: flex;
  margin: 0 -10px;
  flex-wrap: wrap;
  .item {
    flex: 0 0 50%;
    padding: 5px;
    img {
      width: 100%;
    }
  }
  .item-left {
    flex: 0 0 33%;
    padding: 5px;
    img {
      width: 100%;
    }
  }
}
.jm-aside {
  width: 25% !important;
}
.qxfy {
  margin-left: 30px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.m10 {
  margin: 0 10px;
}
.navigation .item.router-link-active {
  background-color: yellow;
  color: #111;
}
.navigation.item {
  width: 200px;
  height: 60px;
  text-decoration: none;
  background: #fff;
}
.navigation {
  width: 300px;
  height: 50px;
  // background:#eee;
  line-height: 50px;
  margin-left: 20px;
  display: flex;
}
.stw {
  background: blueviolet;
  widows: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  right: 0;
}
.relative {
  position: relative;
}
.boxShadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.border {
  border: 1px solid;
}
.flex {
  display: flex;
}
.m2 {
  margin: 20px 0 10px 20px;
}
.rightText {
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.map {
  height: 800px;
}
.syn_l-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.syn_el-col {
  border-radius: 4px;
}
.syn_bg-purple-dark {
  background: #99a9bf;
}
.syn_bg-purple {
  background: #d3dce6;
}
.syn_bg-purple-light {
  background: #e5e9f2;
}
.syn_grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.syn_row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.leftText {
  //左边标题
  height: 59px;
  line-height: 50px;
  padding-left: 120px;
}
.hjzs {
  //环境综合指数
  width: 200px;
  height: 30px;
  background: white;
  margin: 0 0 20px 120px;
  text-align: center;
  line-height: 30px;
  border: 1px solid;
}
</style>