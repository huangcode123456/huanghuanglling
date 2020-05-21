<template>
  <div class="jm-main-inner p10">
    <!-- <div>这是气象监测</div> -->

    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日气象监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
						<el-input class="jm-search" size="small"  placeholder="输入气象点名称或编号" v-model="input" >
							<el-button id="his_search" type="primary" slot="append" >搜索</el-button>
						</el-input>

            <!-- 监测指标表格 -->
            <el-table
              :data="markers"
              class="jm-table mt10"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="200"
							@cell-mouse-enter="showCell"
            >
              <el-table-column prop="number" label="序号" width="60"></el-table-column>
              <el-table-column prop="snumber" label="编号" width="60"></el-table-column>
              <el-table-column prop="title" label="名称" width="100"></el-table-column>
              <el-table-column prop="date" label="时间" width="100"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini" type="primary" @click="handleEdit">定位</el-button>
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

            <h4 class="jm-card-title mt10">今日全岛平均气象</h4>
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              size="mini"
              class="jm-environment-form mt10"
            >
              <el-form-item style="margin-left:100px" label="天气：">晴转多云</el-form-item>
              <el-form-item style="margin-left:100px" label="温度：">12~31摄氏度</el-form-item>
              <el-form-item style="margin-left:100px" label="风速：">3-4级</el-form-item>
              <el-form-item style="margin-left:100px" label="温度：">31摄氏度</el-form-item>
              <el-form-item style="margin-left:100px" label="风向：">西南</el-form-item>
              <el-form-item style="margin-left:100px" label="降雨量：">31摄氏度</el-form-item>
            </el-form>
						<div id="echarts2" class="mt10" style="height:200px;"></div>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <el-container class="plr10">
        <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
					<TXmap ref="mychild" :qp="true" :isGL="true" :isLngLat="false" Tabs='met'></TXmap>
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
            <h4 class="jm-card-title">江门人才岛*****环境监测点</h4>
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
                <div id="echarts1" class="mt10" style="height:300px;"></div>
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
                    <el-button size="mini" @click="handleEdit">定位</el-button>
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
import echartsStyle from "../../../assets/js/echartsStyle.js";
// import BaiduMap from "vue-baidu-map";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import car from "../../../assets/images/car1.png";
import map from "../../../assets/js/map";
export default {
	components:{
    TXmap
  },
  name: "meteorology",
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
        },
        {
          number: "7",
          snumber: "734",
          date: "2016-05-03",
          address: "水质监测点5"
        },
        {
          number: "8",
          snumber: "734",
          date: "2016-05-03",
          address: "水质监测点5"
        },
        {
          number: "9",
          snumber: "734",
          date: "2016-05-03",
          address: "水质监测点5"
        },
        {
          number: "10",
          snumber: "734",
          date: "2016-05-03",
          address: "水质监测点5"
        }
      ],

      tabActiveName: "first",
      pagerCount: 5,
      currentPage: 2,
			checkList: [],
			//摄像头标注点
      point: [
        { snumber: "0" ,title: "卡口一", lng: "113.116703", lat: "22.635933" },
        { snumber: "1" ,title: "卡口五", lng: "113.120898", lat: "22.630753" },
        { snumber: "2" ,title: "卡口二", lng: "113.119551", lat: "22.6301" },
        { snumber: "3" ,title: "卡口六", lng: "113.12194", lat: "22.620267" },
        { snumber: "4" ,title: "卡口三", lng: "113.130456", lat: "22.613597" },
        { snumber: "5" ,title: "卡口七", lng: "113.135954", lat: "22.615035" },
        { snumber: "6" ,title: "卡口四", lng: "113.146194", lat: "22.600699" }
			],
			markers: [
				{
						position:[22.626912484009722,113.12394377988574],
						content:['商业1','某某地址1','正常','江门市人才岛规划中心1'],
						title:'商业1'
				},
				{
						position:[22.625991432812327, 113.12733263555788],
						content:['商业2','某某地址2','正常','江门市人才岛规划中心2'],
						title:'商业2'
				},
				{
						position:[22.619362207551035, 113.12618897231232],
						content:['商业3','某某地址3','非正常','江门市人才岛规划中心3'],
						title:'商业3'
				},
				{
						position:[22.629371269597357, 113.11066279013119],
						content:['商业4','某某地址3','正常','江门市人才岛规划中心3'],
						title:'商业4'
				},
				{
						position:[22.622893006340178,113.12131493669801],
						content:['其他1','某某地址3','正常','江门市人才岛规划中心3'],
						title:'其他1'
				},
				{
						position:[22.623702748434482,113.1216860777406],
						content:['其他2','某某地址3','非正常','江门市人才岛规划中心3'],
						title:'其他2'
				},
				{
						position:[22.61771496240948,113.12482979571837],
						content:['其他3','某某地址3','正常','江门市人才岛规划中心3'],
						title:'其他3'
				},
			],
			lushuStatus:0,
			isshowClassFull: false,
			map:'',
			list:{}
    };
  },
  watch: {
    input: function(value) {
      console.log(value);
    }
  },
  mounted() {
		this.init();
		this.init1();
		// this.$refs.mychild.tmap(this.point);
		// this.$refs.mychild.createMark(this.point);
		// this.$refs.mychild.MultiMarker(markers)
		this.$refs.mychild.zdyfgw(this.markers)
		this.$refs.mychild.tmap(this.markers)
  },
  methods: {
		// 获取单元格信息
		showCell(e){
			console.log(e)
			this.list = e
		},
		// 点击定位到对应点
    handleEdit() {
			this.$refs.mychild.isShowInfoWindow(this.list.position,this.list.content)
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
    // 初始化echarts
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echarts1"));
      // 指定图表的配置项和数据
			var fontColor = '#fff';
			var option = {
					color: ['#bf19ff', '#854cff', '#5f45ff', '#02cdff', '#0090ff', '#f9e264', '#f47a75', '#009db2', '#0780cf', '#765005'],
					textStyle: {
							fontSize: 18
					},
					title: {
							left: 'left',
							textStyle: {
									color: fontColor,
									align: 'center',
							}
					},
					grid: {
							left: '20',
							right: '50',
							bottom: '50',
							top: '80',
							containLabel: true
					},
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'shadow',
									label: {
											show: true,
											backgroundColor: '#333'
									}
							}
					},
					legend: {
							show: true,
							x: 'center',
							top: '20',
							textStyle: {
									color: fontColor
							},
							data: ['气象1', '气象2', '气象3', '气象4', '气象5']
					},
					xAxis: [{
							type: 'category',
							boundaryGap: false,
							axisLabel: {
									color: fontColor
							},
							axisLine: {
									show: true,
									lineStyle: {
											color: '#397cbc'
									}
							},
							data: ['气象1', '气象2', '气象3', '气象4', '气象5']
					}],
					yAxis: [{
							type: 'value',
							axisLine: {
									lineStyle: {
											color: fontColor
									}
							}
					}],
					series: [{
									name: '气象1',
									type: 'line',
									stack: '总量',
									symbolSize: 8,
									label: {
											normal: {
													show: false,
													position: 'top'
											}
									},
									itemStyle: {
											normal: {
													areaStyle: {
															//color: '#94C9EC'
															color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
																	offset: 0,
																	color: 'rgba(7,44,90,0.3)'
															}, {
																	offset: 1,
																	color: 'rgba(0,146,246,0.9)'
															}]),
													}
											}
									},
									data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280]
							},
							{
									name: '气象2',
									type: 'line',
									stack: '总量',
									symbol: 'circle',
									symbolSize: 8,
									label: {
											normal: {
													show: false,
													position: 'top'
											}
									},
									itemStyle: {
											normal: {
													areaStyle: {
															//color: '#94C9EC'
															color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
																	offset: 0,
																	color: 'rgba(7,44,90,0.3)'
															}, {
																	offset: 1,
																	color: 'rgba(0,212,199,0.9)'
															}]),
													}
											}
									},
									data: [220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250]
							},
							{
									name: '气象3',
									type: 'line',
									stack: '总量',
									symbol: 'circle',
									symbolSize: 8,
									label: {
											normal: {
													show: false,
													position: 'top'
											}
									},
									itemStyle: {
											normal: {
													areaStyle: {
															//color: '#94C9EC'
															color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
																	offset: 0,
																	color: 'rgba(7,44,90,0.3)'
															}, {
																	offset: 1,
																	color: 'rgba(0,212,199,0.9)'
															}]),
													}
											}
									},
									data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
							},
							{
									name: '气象4',
									type: 'line',
									stack: '总量',
									symbol: 'circle',
									symbolSize: 8,
									label: {
											normal: {
													show: false,
													position: 'top'
											}
									},
									itemStyle: {
											normal: {
													areaStyle: {
															//color: '#94C9EC'
															color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
																	offset: 0,
																	color: 'rgba(7,44,90,0.3)'
															}, {
																	offset: 1,
																	color: 'rgba(0,212,199,0.9)'
															}]),
													}
											}
									},
									data: [200, 232, 201, 200, 190, 190, 210, 190, 182, 201, 154, 190]
							}
					]
			};

      // myChart.setOption(option);
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
		},
		init1(){
      var myChart = echarts.init(document.getElementById("echarts2"));
			var index = 0;
			var colorList = ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff'];
			var option = {
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'shadow'
							}
					},
					legend: {
							show: false
					},
					grid: {
							left: 120,
							top: 20, // 设置条形图的边距
							right: 80,
							bottom: 20
					},
					toolbox: {
							show: false,
							feature: {
									saveAsImage: {}
							}
					},
					xAxis: {
							type: 'value',

							splitLine: {
									show: false
							},
							axisLabel: {
									show: false
							},
							axisTick: {
									show: false
							},
							axisLine: {
									show: false
							}

					},
					yAxis: {
							type: 'category',
							inverse: true,
							axisLine: {
									show: false
							},
							axisTick: {
									show: false
							},
							axisPointer: {
									label: {
											show: true,
											// margin: 30
									}
							},
							data: ['气象1', '气象1', '气象1', '气象1', '气象1', '气象1', '气象1', '气象1', '气象1', '气象1', '气象1'],
							axisLabel: {
									margin: 100,
									fontSize: 14,
									align: 'left',
									color: '#fff',
									rich: {
											a1: {
													color: '#fff',
													backgroundColor: colorList[0],
													width: 15,
													height: 15,
													align: 'center',
													borderRadius: 2
											},
											a2: {
													color: '#fff',
													backgroundColor: colorList[1],
													width: 15,
													height: 15,
													align: 'center',
													borderRadius: 2
											},
											a3: {
													color: '#fff',
													backgroundColor: colorList[2],
													width: 15,
													height: 15,
													align: 'center',
													borderRadius: 2
											},
											b: {
													color: '#fff',
													backgroundColor: colorList[3],
													width: 15,
													height: 15,
													align: 'center',
													borderRadius: 2
											}
									},
									formatter: function(params) {
											if (index == 11) {
													index = 0;
											}
											index++;
											if (index - 1 < 3) {
													return [
															'{a' + index + '|' + index + '}' + '  ' + params
													].join('\n')
											} else {
													return [
															'{b|' + index + '}' + '  ' + params
													].join('\n')
											}
									}
							}
					},
					series: [{
									z: 2,
									name: 'value',
									type: 'bar',
									data: [3.66, 2.86, 1.82, 1.8, 1.53, 1.47, 1.3, 1.25, 1.1, 1.02, 1].map((item, i) => {
											var itemStyle = {
													color: i > 3 ? colorList[3] : colorList[i]
											}
											return {
													value: item,
													itemStyle: itemStyle
											};
									}),
									label: {
											show: true,
											position: 'right',
											color: '#fff',
											fontSize: 14,
											offset: [10, 0],
											marginLeft: 20
									}
							}

					]
			};
			myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
		},
    search() {
      console.log("搜索气象点位" + this.input);
    },
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
// .qpNone{
// 		display: none;
// }
// .qpBlock{
// 		display: block;
// }
.jm-bdmap-full {
  position: fixed !important;
  z-index: 1000;
  left: 10px;
  right: 10px;
  bottom: 10px;
  top: 10px;
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
