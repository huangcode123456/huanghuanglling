<template>
  <div class="jm-main-inner p10">
    <!-- 这是气象监测</div> -->

    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日环境综合监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
            <div id="chartZhzs" class="mt10" style="height:200px;"></div>
            <ul class="jm-environment-state">
              <!-- <li><h4>8</h4><p>综合指数</p></li> -->
              <li>
                <h4>8</h4>
                <p>气象指标</p>
              </li>
              <li>
                <h4>8</h4>
                <p>水质指标</p>
              </li>
              <li>
                <h4>8</h4>
                <p>土壤指标</p>
              </li>
              <li>
                <h4>8</h4>
                <p>扬尘指标</p>
              </li>
              <li>
                <h4>8</h4>
                <p>噪音指标</p>
              </li>
              <li>
                <h4>8</h4>
                <p>内涝指标</p>
              </li>
            </ul>

            <h4 class="jm-card-title mt10">环境点位选择</h4>
            <el-checkbox-group class="mt10" v-model="checkList" style="text-align:center;">
              <div class="jm-checkbox-item">
                <el-checkbox label="气象点位"></el-checkbox>
              </div>
              <div class="jm-checkbox-item">
                <el-checkbox label="水质点位"></el-checkbox>
              </div>
              <div class="jm-checkbox-item">
                <el-checkbox label="土壤点位"></el-checkbox>
              </div>
              <div class="jm-checkbox-item">
                <el-checkbox label="噪声点位"></el-checkbox>
              </div>
              <div class="jm-checkbox-item">
                <el-checkbox label="内涝点位"></el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <el-container class="plr10">
        <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
					<TXmap ref="mychild" :qp="true" :isGL="true" :isLngLat="false" Tabs='syn' :load='true'></TXmap>
          <div class="jm-map-tools">
						<ul class="cont">
              <li>环境监测点数：<span class="num">8</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">异常告警数：<span class="num">8</span></li>
            </ul>
          </div>
        </div>
      </el-container>

      <!-- 右侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">江门市人才岛 **** 环境监站点</h4>
          </div>
          <div class="jm-card-center p10 yauto">
            <el-tabs class="jm-tabs" v-model="tabActiveName" @tab-click="handleClick">
              <!-- 环境监控 -->
              <el-tab-pane label="环境监控" name="first">
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
                <h4 class="jm-card-title">今日实时数据</h4>

                <div>彭瑶生态园气象站(2011-7-29 17:30:00)</div>
                <div class="flex">
                  <div style="width:50%;height:auto">
                    <img src="../../../assets/images/img1.png" alt />
                  </div>
                  <el-form
                    ref="form"
                    class="jm-environment-form"
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
              </el-tab-pane>

              <!-- 历史查询 -->
              <el-tab-pane label="历史查询" name="second">
                <!-- 历史搜索功能 -->
                <el-input class="jm-search" size="small" placeholder="输入气象点名称或者编号" v-model="input">
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>
<script src="https://map.qq.com/api/gljs?v=1.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script>
import TXmap from '../../../components/environment/txMap(2)'
import echarts from "echarts";
import echartsStyle from "../../../assets/js/echartsStyle";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import car from "../../../assets/images/car1.png";
// import start from "../../../assets/images/qidian.png";
// import end from "../../../assets/images/zhongdian.png";
import map from "../../../assets/js/map";
export default {
	components:{
    TXmap
  },
  name: "synthesis",
  data() {
    return {
      form: {
        name: "",
        type: [],
      },
      input: "",
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
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "水质监测点1"
        },
        {
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "水质监测点1"
        },
        {
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "水质监测点1"
        },
      ],
      //摄像头标注点
      point: [
        { title: "卡口一", lng: "113.116703", lat: "22.635933" },
        { title: "卡口五", lng: "113.120898", lat: "22.630753" },
        { title: "卡口二", lng: "113.119551", lat: "22.6301" },
        { title: "卡口六", lng: "113.12194", lat: "22.620267" },
        { title: "卡口三", lng: "113.130456", lat: "22.613597" },
        { title: "卡口七", lng: "113.135954", lat: "22.615035" },
        { title: "卡口四", lng: "113.146194", lat: "22.600699" }
      ],
      tabActiveName: "first",
      currentPage: 2,
      pagerCount: 5,
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
		this.initZhzs();
		// this.inputPoint();
		let markers=[
			{
					position:[22.626912484009722,113.12394377988574],
					content:['商业1','某某地址1','正常','江门市人才岛规划中心1']
			},
			{
					position:[22.625991432812327, 113.12733263555788],
					content:['商业2','某某地址2','正常','江门市人才岛规划中心2']
			},
			{
					position:[22.619362207551035, 113.12618897231232],
					content:['商业3','某某地址3','非正常','江门市人才岛规划中心3']
			},
			{
					position:[22.629371269597357, 113.11066279013119],
					content:['商业4','某某地址3','正常','江门市人才岛规划中心3']
			},
			{
					position:[22.622893006340178,113.12131493669801],
					content:['其他1','某某地址3','正常','江门市人才岛规划中心3']
			},
			{
					position:[22.623702748434482,113.1216860777406],
					content:['其他2','某某地址3','非正常','江门市人才岛规划中心3']
			},
			{
					position:[22.61771496240948,113.12482979571837],
					content:['其他3','某某地址3','正常','江门市人才岛规划中心3']
			},
    ]
		// this.$refs.mychild.MultiMarker(markers)
		this.$refs.mychild.zdyfgw(markers)
  },
  created() {
	},
  methods: {
		// 传入坐标点
		// inputPoint(){
		// 	let that = this;
		// 	var point = that.point.map(item => {
		// 		return {
		// 			lat:item.lat,
		// 			lng:item.lng
		// 		}
		// 	})
		// 	// console.log(point)
		// 	that.$refs.mychild.createMark(point)
		// },

    // 初始化echarts
    initZhzs() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartZhzs"));

      var colorTemplate = [
        [
          1,
          new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0.1,
              color: "#FFC600"
            },
            {
              offset: 0.6,
              color: "#30D27C"
            },
            {
              offset: 1,
              color: "#0B95FF"
            }
          ])
        ]
      ];

      // 指定图表的配置项和数据
      var option = {
        // grid: {
        // 		left: 0,
        // 		right:0,
        // 		top:0,
        // 		bottom:0
        // },
        tooltip: {
          formatter: "{b} : {c}"
        },
        toolbox: {
          // feature: {
          // 		restore: {},
          // 		saveAsImage: {}
          // }
        },
        series: [
          {
            name: "综合指数",
            type: "gauge",
            data: [{ value: 8, name: "综合指数" }],
            min: 0,
            max: 10,
            splitNumber: 10,
            radius: "100%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                width: 15,
                color: colorTemplate
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 0, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "rgba(255,255,255,.5)",
                width: 2
              }
            },
            pointer: {
              // 仪表盘指针。
              show: true, // 是否显示指针,默认 true。
              length: "70%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 8 // 指针宽度,默认 8。
            },

            itemStyle: {
              // 仪表盘指针样式。
              color: "auto", // 指针颜色，默认(auto)取数值所在的区间的颜色
              opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              borderWidth: 0, // 描边线宽,默认 0。为 0 时无描边。
              borderType: "solid", // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
              borderColor: "#fff" // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
              // shadowBlur: 5,			// (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              // shadowColor: "#fff",	// 阴影颜色。支持的格式同color。
            },

            axisLabel: {
              color: colorTemplate
              // backgroundColor: 'auto',
              // borderRadius: 2,
              // color: '#eee',
              // padding: 3,
              // textShadowBlur: 2,
              // textShadowOffsetX: 1,
              // textShadowOffsetY: 1,
              // textShadowColor: '#222'
            },
            title: {
              // 仪表盘标题。
              show: true, // 是否显示标题,默认 true。
              offsetCenter: [0, "65%"], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#c2c6dc", // 文字的颜色,默认 #333。
              fontSize: 12 // 文字的字体大小,默认 15。
            },

            detail: {
              // 仪表盘详情，用于显示数据。
              show: true, // 是否显示详情,默认 true。
              // offsetCenter: [0,"50%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#fff", // 文字的颜色,默认 auto。
              fontSize: 30, // 文字的字体大小,默认 30。
              formatter: "{value}" // 格式化函数或者字符串
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
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  }
};
</script>
<style scoped lang="less">
.jm-environment-state {
  display: flex;
  flex-wrap: wrap;
  li {
    flex: 0 0 33.333%;
    text-align: center;
    padding-top: 10px;
    h4 {
      font-size: 20px;
      color: #fff;
    }
    p {
      font-size: 12px;
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
}
.jm-aside {
  width: 25% !important;
}
.jm-environment-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.jm-checkbox-item {
  padding: 10px;
}
#container {
  /*地图(容器)显示大小*/
  width: 100%;
  height: 100%;
}
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
.jm-bdmap-full {
  position: fixed !important;
  z-index: 1000;
  left: 10px;
  right: 10px;
  bottom: 10px;
  top: 10px;
}
</style>