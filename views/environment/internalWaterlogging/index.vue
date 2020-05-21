<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日内涝监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
            <el-input class="jm-search" size="small" placeholder="输入气象点名称或编号" v-model="input">
              <el-button @click="search" type="primary" slot="append">搜索</el-button>
            </el-input>

            <!-- 监测指标表格 -->
            <el-table
              :data="tableData"
              class="jm-table mt10"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="200"
            >
              <el-table-column prop="number" label="序号" width="60"></el-table-column>
              <el-table-column prop="snumber" label="编号" width="60"></el-table-column>
              <el-table-column prop="address" label="名称" width="100"></el-table-column>
              <el-table-column prop="date" label="时间" width="100"></el-table-column>
              <el-table-column prop label="操作">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">定位</el-button>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              class="jm-pagination mt10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              small
              :pager-count="pagerCount"
              layout="prev, pager, next, jumper"
              :total="1000"
            ></el-pagination>

            <h4 class="jm-card-title mt10">今日内涝监测</h4>
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              size="mini"
              class="jm-environment-form mt10"
            >
              <el-form-item label="天气：">晴转多云</el-form-item>
              <el-form-item label="温度：">12~31摄氏度</el-form-item>
              <el-form-item label="风速：">3-4级</el-form-item>
              <el-form-item label="温度：">31摄氏度</el-form-item>
              <el-form-item label="风向：">西南</el-form-item>
              <el-form-item label="降雨量：">31摄氏度</el-form-item>
            </el-form>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <el-container class="plr10">
        <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
					<TXmap ref="mychild" :qp="true" :isGL="true" :isLngLat="false"></TXmap>
          <div class="jm-map-tools">
						<ul class="cont">
              <li>气象监测点数：<span class="num">8</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">异常告警数：<span class="num">8</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">气象指数：<span class="num">8</span></li>
            </ul>
          </div>
        </div>
      </el-container>

      <!-- 右侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">江门人才岛*****内涝监测点</h4>
          </div>
          <div class="jm-card-center p10 yauto">
            <el-tabs class="jm-tabs" v-model="tabActiveName" @tab-click="handleClick">
              <!-- 卡口监控 -->
              <el-tab-pane label="气象监控" name="first">
                <div>彭瑶生态园气象站（2011-7-29 17:30:00）</div>
                <div class="flex">
                  <img class="imgwh" src="../../../assets/images/img1.png" alt />
                  <el-form
                    class="jm-environment-form mt10"
                    ref="form"
                    :model="form"
                    label-width="80px"
                    size="mini"
                  >
                    <el-form-item label="雨量">40摄氏度</el-form-item>
                    <el-form-item label="风速">4.4m/s</el-form-item>
                    <el-form-item label="风向">155.33</el-form-item>
                    <el-form-item label="太阳辐射">158.38w/m*m</el-form-item>
                    <el-form-item label="空气温度">34.72℃</el-form-item>
                    <el-form-item label="空气湿度">67.13%</el-form-item>
                  </el-form>
                </div>
                <h4 class="jm-card-title mt10">分时段曲线</h4>
                <!-- echarts图表 -->
                <div id="main" class="mt10" style="height:300px;"></div>
              </el-tab-pane>

              <!-- 历史查询 -->
              <el-tab-pane label="历史查询" name="second">
                <el-input class="jm-search" size="small" placeholder="输入气象点名称或编号" v-model="input">
                  <el-button @click="search" type="primary" slot="append">搜索</el-button>
                </el-input>

                <!-- 监测指标表格 -->
                <el-table
                  :data="tableData"
                  class="jm-table mt10"
                  row-class-name="tr-small"
                  header-row-class-name="tr-small"
                >
                  <el-table-column prop="number" label="序号" width="60"></el-table-column>
                  <el-table-column prop="snumber" label="编号" width="60"></el-table-column>
                  <el-table-column prop="address" label="名称" width="100"></el-table-column>
                  <el-table-column prop="date" label="时间" width="100"></el-table-column>
                  <el-table-column prop label="操作">
                    <el-button size="mini" @click="handleEdit()">定位</el-button>
                  </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination
                  class="jm-pagination mt10"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="100"
                  small
                  :pager-count="pagerCount"
                  layout="prev, pager, next, jumper"
                  :total="1000"
                ></el-pagination>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-aside>
    </el-container>

    <!-- 主题内容 -->
  </div>
</template>
<script>
import TXmap from '../../../components/environment/txMap(2)'
import echarts from "echarts";
import echartsStyle from "../../../assets/js/echartsStyle.js";
import BaiduMap from "vue-baidu-map";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import map from "../../../assets/js/map";
export default {
	components:{
    TXmap
  },
  name: "internalWaterlogging",
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
      infoWindow: {
        show: true,
        contents: "这是天安门"
      },
      activeIndex: "1",
      activeIndex1: "1",
      center: map.center,
      zoom: map.zoom,
      active: false,
      tableData: [
        {
          number: "1",
          snumber: "231",
          date: "2016-05-02",
          address: "水质监测点"
        },
        {
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "水质监测点1"
        },
        {
          number: "3",
          snumber: "121",
          date: "2016-05-01",
          address: "水质监测点2"
        },
        {
          number: "4",
          snumber: "546",
          date: "2016-05-01",
          address: "水质监测点3"
        },
        {
          number: "5",
          snumber: "394",
          date: "2016-05-01",
          address: "水质监测点4"
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
      checkList: [],
			isshowClassFull: false,
    };
  },
  watch: {
    input: function(value) {
      console.log(value);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
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
    // 初始化echarts
    init() {
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: 40,
          right: 10,
          top: 10,
          bottom: 30
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: echartsStyle.axisLabel,
          axisLine: echartsStyle.axisLine
        },
        yAxis: {
          type: "value",
          axisLabel: echartsStyle.axisLabel,
          axisLine: echartsStyle.axisLine
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            itemStyle: echartsStyle.itemStyle,
            lineStyle: echartsStyle.lineStyle,
            areaStyle: echartsStyle.areaStyle
          }
        ]
      };
      // myChart.setOption(option);
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    search() {
      alert("搜索气象点位" + this.input);
    },
    // 点击摄像头
    // handler ({BMap, map}) {
    //   console.log(BMap, map)
    //   this.center.lng = 116.404
    //   this.center.lat = 39.915
    //   this.zoom = 15
    // },
  }
};
</script>
<style scoped lang="less">
.rel {
  position: relative;
  width: 100%;
  height: 100%;
	z-index: 2;
	.jm-map-tools {
		position: absolute;
		z-index: 9;
		left: 5px;
		top: 5px;
		.cont{
			display: flex;
			color: #333;
			border-radius: 5px;
			box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			background: rgba(255, 255, 255, .9);
			padding: 10px;
			li~li{
				margin-left: 20px;
			}
			.num{
				font-size: 16px;
				color: red;
				font-weight: 800;
			}
		}
	}
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
.jm-environment-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
</style>