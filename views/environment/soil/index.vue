<template>
  <div class="jm-main-inner p10">
    <!-- <div>这是土壤监测</div> -->

    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日土壤监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
            <el-input class="jm-search" size="small" placeholder="输入气象点名称或编号" v-model="input">
              <el-button @click="search" type="primary" slot="append">搜索</el-button>
            </el-input>

            <!-- 监测指标表格 -->
            <el-table
              :data="markers"
              class="jm-table mt10"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="240"
							@cell-mouse-enter="showCell"
            >
              <!-- <el-table-column prop="number" label="序号" width="60"></el-table-column> -->
              <el-table-column prop="number" label="编号" width="60"></el-table-column>
              <el-table-column prop="title" label="名称"></el-table-column>
              <el-table-column prop="date" label="时间" width="100"></el-table-column>
              <el-table-column prop label="操作" width='80'>
									<el-button type="primary" size="mini" @click="handleEdit">定位</el-button>
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

            <h4 class="jm-card-title mt10">今日全岛土壤指数</h4>
            <el-form
              ref="form"
              :model="form"
              label-width="120px"
              size="mini"
              class="mt10"
              style="margin-left:25%;"
            >
              <el-form-item label="全市污染指数：">102</el-form-item>
              <el-form-item label="严重污染：">22</el-form-item>
              <el-form-item label="中度污染：">54</el-form-item>
              <el-form-item label="低度污染：">26</el-form-item>
              <el-form-item label="就是污染：">30</el-form-item>
            </el-form>
					<div id="main1" class="mt10" style="height:200px;"></div>
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
              <el-tab-pane label="土壤监控" name="first">
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
                <div id="main" class="mt10" style="height:240px;"></div>
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
                    <el-button size="mini" @click="handleEdit(scope.row)">定位</el-button>
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
import BaiduMap from "vue-baidu-map";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import echartsStyle from "../../../assets/js/echartsStyle";
import map from "../../../assets/js/map";
export default {
	components:{
    TXmap
  },
  name: "soil",
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
          address: "土壤监测点"
        },
        {
          number: "2",
          snumber: "227",
          date: "2016-05-04",
          address: "土壤监测点"
        },
        {
          number: "3",
          snumber: "121",
          date: "2016-05-01",
          address: "土壤监测点"
        },
        {
          number: "4",
          snumber: "546",
          date: "2016-05-01",
          address: "土壤监测点"
        },
        {
          number: "5",
          snumber: "394",
          date: "2016-05-01",
          address: "土壤监测点"
        },
        {
          number: "6",
          snumber: "734",
          date: "2016-05-03",
          address: "土壤监测点"
        }
      ],
			//预警数据
      yj_devices:[
				{
					id: 1,
					number: "101001001",
					name: "坦边振兴工业园监测点",
					type: "DustNoise",
					department: "江门市人才岛规划中心",
					status: 1,
					lng: 113.11655465354752,
					lat: 22.64362883690453,
					location: "江门市连荷路100号",
					createTime: "2020-04-02 11:02:37",
					novice: false
				},
				{
					id: 2,
					number: "101001002",
					name: "潮连中心学校检测点",
					type: "DustNoise",
					department: "江门市人才岛规划中心",
					status: 1,
					lng: 113.13162433911371,
					lat: 22.631373331920074,
					location: "江门市塘边坊街73号",
					createTime: "2020-04-02 11:03:38",
					novice: false
				},
				{
					id: 3,
					number: "101001003",
					name: "卢边工业区监测点",
					type: "DustNoise",
					department: "江门市人才岛规划中心",
					status: 1,
					lng: 113.13200550831404,
					lat: 22.635356553422795,
					location: "江门市青年公路5号",
					createTime: "2020-04-02 11:04:33",
					novice: false
				},
			],
			num_devices:0,//预警总数
			//摄像头标注点
      // point: [
      //   { title: "卡口一", lng: "113.116703", lat: "22.635933" },
      //   { title: "卡口五", lng: "113.120898", lat: "22.630753" },
      //   { title: "卡口二", lng: "113.119551", lat: "22.6301" },
      //   { title: "卡口六", lng: "113.12194", lat: "22.620267" },
      //   { title: "卡口三", lng: "113.130456", lat: "22.613597" },
      //   { title: "卡口七", lng: "113.135954", lat: "22.615035" },
      //   { title: "卡口四", lng: "113.146194", lat: "22.600699" }
			// ],
			markers:[
				{
					position:[22.626912484009722,113.12394377988574],
					content:['商业1','某某地址1','正常','江门市人才岛规划中心1'],
					id:0,
					title:'商业1'
				},
				{
					position:[22.625991432812327, 113.12733263555788],
					content:['商业2','某某地址2','正常','江门市人才岛规划中心2'],
					id:1,
					title:'商业2'
				},
				{
					position:[22.619362207551035, 113.12618897231232],
					content:['商业3','某某地址3','非正常','江门市人才岛规划中心3'],
					id:2,
					title:'商业3'
				},
				{
					position:[22.629371269597357, 113.11066279013119],
					content:['商业4','某某地址3','正常','江门市人才岛规划中心3'],
					id:3,
					title:'商业4'
				},
				{
					position:[22.622893006340178,113.12131493669801],
					content:['其他1','某某地址3','正常','江门市人才岛规划中心3'],
					id:4,
					title:'其他1'
				},
				{
					position:[22.623702748434482,113.1216860777406],
					content:['其他2','某某地址3','非正常','江门市人才岛规划中心3'],
					id:5,
					title:'其他2'
				},
				{
					position:[22.61771496240948,113.12482979571837],
					content:['其他3','某某地址3','正常','江门市人才岛规划中心3'],
					id:6,
					title:'其他3'
				},
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
		this.init1();
		this.$refs.mychild.zdyfgw(this.markers,'soil')
  },
  methods: {
		// 获取单元格信息
		showCell(e){
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
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
				title: {
							// text: '土壤',
							textStyle: {
								align: 'center',
									color: '#fff',
									fontSize: 20,
							},
							top: '1%',
							left: '10%',
					},
				// backgroundColor: '#0f375f',
				grid: {
						top: "25%",
						bottom: "10%"//也可设置left和right设置距离来控制图表的大小
				},
				tooltip: {
						trigger: "axis",
						axisPointer: {
								type: "shadow",
								label: {
										show: true
								}
						}
				},
				legend: {
						data: ["水质1", "水质2"],
						top: "15%",
						textStyle: {
								color: "#ffffff"
						}
				},
				xAxis: {
						data: [
								"土壤1",
								"土壤2",
								"土壤3",
								"土壤4",
								"土壤5",
								"土壤6",
								"土壤7",
								"土壤8",
								
						],
						axisLine: {
								show: true, //隐藏X轴轴线
								lineStyle: {
														color: '#01FCE3'
														}
						},
						axisTick: {
								show: true //隐藏X轴刻度
						},
						axisLabel: {
								show: true,
								textStyle: {
										color: "#ebf8ac" //X轴文字颜色
								}
						},
						
				},
				yAxis: [{
								type: "value",
								// name: "亿元",
								nameTextStyle: {
										color: "#ebf8ac"
								},
								splitLine: {
										show: false
								},
								axisTick: {
										show: true
								},
								axisLine: {
										show: true,
										lineStyle: {
																color: '#FFFFFF'
																}
								},
								axisLabel: {
										show: true,
										textStyle: {
												color: "#ebf8ac"
										}
								},
								
						},
						{
								type: "value",
								name: "同比",
								nameTextStyle: {
										color: "#ebf8ac"
								},
								position: "right",
								splitLine: {
										show: false
								},
								axisTick: {
										show: false
								},
								axisLine: {
										show: false
								},
								axisLabel: {
										show: false,
										formatter: "{value} %", //右侧Y轴文字显示
										textStyle: {
												color: "#ebf8ac"
										}
								}
						},
						{
								type: "value",
								gridIndex: 0,
								min: 50,
								max: 100,
								splitNumber: 8,
								splitLine: {
										show: false
								},
								axisLine: {
										show: false
								},
								axisTick: {
										show: false
								},
								axisLabel: {
										show: false
								},
								splitArea: {
										show: true,
										areaStyle: {
												color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
										}
								}
						}
				],
				series: [{
								name: "水质1",
								type: "line",
								yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
								smooth: true, //平滑曲线显示
								showAllSymbol: true, //显示所有图形。
								symbol: "circle", //标记的图形为实心圆
								symbolSize: 10, //标记的大小
								itemStyle: {
										//折线拐点标志的样式
										color: "#058cff"
								},
								lineStyle: {
										color: "#058cff"
								},
								areaStyle:{
										color: "rgba(5,140,255, 0.2)"
								},
								data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
						},
						{
								name: "水质2",
								type: "bar",
								barWidth: 15,
								itemStyle: {
										normal: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
																offset: 0,
																color: "#00FFE3"
														},
														{
																offset: 1,
																color: "#4693EC"
														}
												])
										}
								},
								data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
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
			var myChart = echarts.init(document.getElementById("main1"));
			var  category= [
				{
					name: "严重污染",
					value: 2500
				},
				{
					name: "严重污染1",
					value: 8000
				},
				{
					name: "严重污染2",
					value: 3000
				},
				{
					name: "严重污染3",
					value: 3000
				},
				{
					name: "严重污染4",
					value: 3000
				}
			]; // 类别
			var total = 10000; // 数据总数
			var  datas = [];
			category.forEach(value => {
					datas.push(value.value);
			});
			var option = {
					// backgroundColor:'#071347',
					xAxis: {
							max: total,
							splitLine: {
									show: false
							},
							axisLine: {
									show: false
							},
							axisLabel: {
									show: false
							},
							axisTick: {
									show: false
							}
					},
					grid: {
							left: 80,
							top: 20, // 设置条形图的边距
							right: 80,
							bottom: 20
					},
					yAxis: [{
							type: "category",
							inverse: false,
							data: category,
							axisLine: {
									show: false
							},
							axisTick: {
									show: false
							},
							axisLabel: {
									show: false
							}
					}],
					series: [
						{
							// 内
							type: "bar",
							barWidth: 18,

							legendHoverLink: false,
							silent: true,
							itemStyle: {
									normal: {
											color: function(params) {
													var color;
													if(params.dataIndex==19){
															color = {
																	type: "linear",
																	x: 0,
																	y: 0,
																	x2: 1,
																	y2: 0,
																	colorStops: [{
																					offset: 0,
																					color: "#EB5118" // 0% 处的颜色
																			},
																			{
																					offset: 1,
																					color: "#F21F02" // 100% 处的颜色
																			}
																	]
															}
															}else if(params.dataIndex==18){
															color = {
																	type: "linear",
																	x: 0,
																	y: 0,
																	x2: 1,
																	y2: 0,
																	colorStops: [{
																					offset: 0,
																					color: "#FFA048" // 0% 处的颜色
																			},
																			{
																					offset: 1,
																					color: "#B25E14" // 100% 处的颜色
																			}
																	]
															}
															}else if(params.dataIndex==17){
															color = {
																	type: "linear",
																	x: 0,
																	y: 0,
																	x2: 1,
																	y2: 0,
																	colorStops: [{
																					offset: 0,
																					color: "#F8E972" // 0% 处的颜色
																			},
																			{
																					offset: 1,
																					color: "#E5C206" // 100% 处的颜色
																			}
																	]
															}
															}else{
															color = {
																	type: "linear",
																	x: 0,
																	y: 0,
																	x2: 1,
																	y2: 0,
																	colorStops: [{
																					offset: 0,
																					color: "#1588D1" // 0% 处的颜色
																			},
																			{
																					offset: 1,
																					color: "#0F4071" // 100% 处的颜色
																			}
																	]
															}
															}
															return color;
											},
									}
							},
							label: {
									normal: {
											show: true,
											position: "left",
											formatter: "{b}",
											textStyle: {
													color: "#fff",
													fontSize: 14
											}
									}
							},
							data: category,
							z: 1,
							animationEasing: "elasticOut"
						},
						{
							// 分隔
							type: "pictorialBar",
							itemStyle: {
									normal:{
											color:"#061348"
									}
							},
							symbolRepeat: "fixed",
							symbolMargin: 6,
							symbol: "rect",
							symbolClip: true,
							symbolSize: [1, 21],
							symbolPosition: "start",
							symbolOffset: [1, -1],
							symbolBoundingData: this.total,
							data: category,
							z: 2,
							animationEasing: "elasticOut"
						},
						{
									// 外边框
									type: "pictorialBar",
									symbol: "rect",
									symbolBoundingData: total,
									itemStyle: {
											normal: {
													color: "none"
											}
									},
									label: {
											normal: {
												formatter: (params) => {
													var text;
															if(params.dataIndex==1){
																text = '{a|  100%}{f|  '+params.data+'}';
															}else if(params.dataIndex==2){
																text = '{b|  100%}{f|  '+params.data+'}';
															}else if(params.dataIndex==3){
																text = '{c|  100%}{f|  '+params.data+'}';
															}else{
																text = '{d|  100%}{f|  '+params.data+'}';
															}
															return text;
											},
									rich:{
										a: {
														color: 'red'
												},
												b: {
													color: 'blue'
												},
												c:{
													color: 'yellow'
												},
												d:{
													color:"green"
												},
												f:{
													color:"#ffffff"
												}
									},
									position: 'right',
									distance: 0, // 向右偏移位置
									show: true
											}
									},
									data: datas,
									z: 0,
									animationEasing: "elasticOut"
						},
						{
							name: "外框",
							type: "bar",
							barGap: "-120%", // 设置外框粗细
							data: [total, total, total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total],
							barWidth: 25,
							itemStyle: {
									normal: {
											color: "transparent", // 填充色
											barBorderColor: "#1C4B8E", // 边框色
											barBorderWidth: 1, // 边框宽度
											// barBorderRadius: 0, //圆角半径
											label: {
													// 标签显示位置
													show: false,
													position: "top" // insideTop 或者横向的 insideLeft
											}
									}
							},
							z: 0
						}
					]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
    search() {
      alert("搜索气象点位" + this.input);
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
/deep/.el-form-item label {
  text-align: center;
}
/deep/.el-form-item {
  margin: 0;
}
.imgwh {
  width: 48%;
  height: 48%;
}
.jm-aside {
  width: 25% !important;
}
.relative {
  position: relative;
}

.border {
  border: 1px solid;
}
.flex {
  display: flex;
}

.jm-bdmap-full {
  position: fixed !important;
  z-index: 1000;
  left: 10px;
  right: 10px;
  bottom: 10px;
  top: 10px;
}
.jm-aside {
  width: 25% !important;
}
.jm-environment-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
#container {
  /*地图(容器)显示大小*/
  width: 100%;
  height: 100%;
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