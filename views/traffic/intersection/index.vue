<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日重点路口车辆监测</h4>
            <div class="jm-card-actions">
              <a href="javscript:;" class="more">更多</a>
            </div>
          </div>
          <div class="jm-card-center p10">
            <el-input class="jm-search" size="small" placeholder="请输入路口名称" v-model="input">
              <el-button @click="serach" type="primary" slot="append">搜索</el-button>
            </el-input>

            <el-table
              :data="tableData"
              class="jm-table mt10"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="200"
            >
              <el-table-column prop="lk" label="路口"></el-table-column>
              <el-table-column prop="cp" label="车牌"></el-table-column>
              <el-table-column prop="ys" width="50" label="颜色"></el-table-column>
              <el-table-column prop="cs" width="50" label="车速"></el-table-column>
              <el-table-column prop="lx" width="50" label="类型"></el-table-column>
              <el-table-column prop="sj" width="100" label="时间"></el-table-column>
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
              :total="50"
            ></el-pagination>
          </div>
        </div>

        <div class="jm-card mt10">
          <div class="jm-card-header">
            <h4 class="jm-card-title">Top10路口车辆数</h4>
          </div>
          <!-- echarts图表 -->
          <div class="jm-card-center p10">
            <div id="chartLk" style="height:300px;"></div>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <el-container class="plr10">
        <txMap ref="mychild" :qp="true" :isLngLat="false"></txMap>
      </el-container>

      <!-- 右侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%;">
          <div class="jm-card-header">
            <h4 class="jm-card-title">江门人才岛S90路口</h4>
          </div>

          <div class="jm-card-center p10 yauto">
            <el-tabs class="jm-tabs" v-model="tabActiveName" @tab-click="handleClick">
              <!-- 卡口监控 -->
              <el-tab-pane label="卡口监控" name="first">
                <ul class="jm-video-list">
                  <li class="item">
                    <img src="../../../assets/images/img1.png" alt />
                  </li>
                  <li class="item">
                    <img src="../../../assets/images/img1.png" alt />
                  </li>
                  <li class="item">
                    <img src="../../../assets/images/img1.png" alt />
                  </li>
                  <li class="item">
                    <img src="../../../assets/images/img1.png" alt />
                  </li>
                </ul>

                <h4 class="jm-card-title">今日车流量</h4>
                <div class="mt10">
                  <div id="chartCll" style="height:300px;"></div>
                </div>
              </el-tab-pane>

              <!-- 历史查询 -->
              <el-tab-pane label="历史查询" name="second">
                <el-date-picker
                  size="small"
                  class="jm-datetimerange"
                  v-model="dataValue"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>

                <div class="mt10 flex">
                  <el-input
                    size="small"
                    class="jm-search"
                    placeholder="请输入车牌号"
                    v-model="inputSearch"
                  >
                    <el-button @click="serach" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <el-checkbox class="ml10" v-model="suspiciousChecked">可疑车辆</el-checkbox>
                </div>
                <p class="mt10">
                  <span>车辆总数：13020 辆</span>
                  <span class="ml20">异常车辆：342 辆</span>
                </p>
                <el-table
                  :data="tableData"
                  class="jm-table mt10"
                  row-class-name="tr-small"
                  header-row-class-name="tr-small"
                >
                  <el-table-column prop="lk" label="路口"></el-table-column>
                  <el-table-column prop="cp" label="车牌"></el-table-column>
                  <el-table-column prop="ys" width="50" label="颜色"></el-table-column>
                  <el-table-column prop="cs" width="50" label="车速"></el-table-column>
                  <el-table-column prop="lx" width="50" label="类型"></el-table-column>
                  <el-table-column prop="sj" width="100" label="时间"></el-table-column>
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-aside>
    </el-container>

    <div id="menu" style="z-index:2">
      <ul>
        <li>
          <a href="#">打开</a>
        </li>
        <li>
          <a href="#">车辆识别</a>
        </li>
        <li>
          <a href="#">属性</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsStyle from "../../../assets/js/echartsStyle";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import txMap from "../../../components/txMap/txMap";
export default {
  name: "trafficIntersection",
  data() {
    return {
      input: "",
      tableData: [
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        },
        {
          lk: "S90路口",
          cp: "粤A12345",
          ys: "红",
          cs: "36",
          lx: "公交",
          sj: "2020-03-01"
        }
      ],
      currentPage: 1,
      pagerCount: 5,

      tabActiveName: "first",
      inputSearch: "",
      suspiciousChecked: "",
      dataValue: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10)
      ]
    };
  },
  methods: {
    serach() {
      console.log("搜索...");
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 初始化echarts
    initLk() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartLk"));

      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: 0,
          right: 20,
          top: 10,
          bottom: 30,
          containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "value",
          axisLabel: echartsStyle.axisLabel,
          axisLine: echartsStyle.axisLine
        },
        yAxis: {
          type: "category",
          data: [
            "路口1",
            "路口2",
            "路口3",
            "路口4",
            "路口5",
            "路口6",
            "路口7",
            "路口8",
            "路口9",
            "主干道路口"
          ],
          axisLabel: echartsStyle.axisLabel,
          axisLine: echartsStyle.axisLine
        },
        series: [
          {
            data: [170, 180, 200, 220, 250, 260, 300, 330, 360, 400],
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              // 图形的形状
              color: echartsStyle.barColor,
              barBorderRadius: [0, 18, 18, 0]
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },

    initCll() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartCll"));
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
          // 默认为直线'line'，可选为阴影'shadow'
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ],
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
            data: [
              600,
              520,
              460,
              560,
              590,
              560,
              580,
              650,
              700,
              750,
              800,
              900,
              960,
              930,
              900,
              960,
              1000,
              950,
              920,
              860,
              800,
              750,
              720,
              700,
              640,
              600
            ],
            type: "line",
            smooth: true,
            itemStyle: echartsStyle.itemStyle,
            lineStyle: echartsStyle.lineStyle,
            areaStyle: echartsStyle.areaStyle
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    // 选项卡
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    this.initLk();
    this.initCll();

    //加载地图
    var details=[
      {
        position:[22.626912484009722,113.12394377988574],
        content:['某某某监测点1','某某地址1','正常','江门市人才岛规划中心1']
      },
      {
        position:[22.625991432812327, 113.12733263555788],
        content:['某某某监测点2','某某地址2','正常','江门市人才岛规划中心2']
      },
      {
        position:[22.619362207551035, 113.12618897231232],
        content:['某某某监测点3','某某地址3','正常','江门市人才岛规划中心3']
      },
    ]
    this.$refs.mychild.zdyfgw(details);
  },
  created() {
    //  console.log(echartsStyle.areaStyle)
  },
  components: {
    txMap
  }
};
</script>
<style scoped lang="less">
.jm-aside {
  width: 25% !important;
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
}
//右键菜单
#menu {
  position: absolute;
  width: 100px;
  display: none;
  border: 1px solid #666;
  border-bottom-width: 0;
  background: white;
}
#menu li {
  list-style: none;
  text-indent: 1em;
}
#menu li a {
  display: block;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #666;
  text-decoration: none;
  color: black;
  font: 12px/30px tahoma;
}
#menu li a:hover {
  background: #eee;
  color: black;
}
</style>

