<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日水质监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
            <el-input class="jm-search" size="small" placeholder="输入水质监测点名称或者编号" v-model="input">
              <el-button @click="changecenter" type="primary" slot="append">显示路径</el-button>
              <el-button @click="clearGj" type="primary" slot="append">清除轨迹</el-button>
              <!-- <el-button @click="initmoreSpot" type="primary" slot="append">点聚合</el-button>
              <el-button @click="initmap" type="primary" slot="append">围栏</el-button>
              <el-button @click="DrivingService" type="primary" slot="append">驾车路线</el-button> -->
            </el-input>

            <!-- 监测指标表格 -->
            <el-table
              :data="tableData"
              class="jm-table mt10"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="240"
            >
              <el-table-column prop="number" label="序号" width="60"></el-table-column>
              <el-table-column prop="snumber" label="编号" width="60"></el-table-column>
              <el-table-column prop="address" label="名称" width="100"></el-table-column>
              <el-table-column prop="date" label="时间" width="100"></el-table-column>
              <el-table-column prop label="操作">
                <el-button
                  size="mini"
                  type="primary"
                >定位</el-button>
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
            <!--今日全岛平均水质评价 -->

            <h4 class="jm-card-title mt10">今日全岛平均水质评价</h4>
            <div id="main1" class="mt10" style="height:240px;"></div>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <el-container class="plr10">
        <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
					<TXmap ref="mychild" :qp="true" :isGL="true" :isLngLat="false" Tabs='met' :point="point"></TXmap>
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
          <div class="jm-card-center yauto p10">
            <el-tabs class="jm-tabs" v-model="tabActiveName" @tab-click="handleClick">
              <!-- 水质监控 -->
              <el-tab-pane label="水质监控" name="first">
                <div>彭瑶生态园气象站(2011-7-29 17:30:00)</div>

                <div class="flex mt10">
                  <div style="width:50%;height:auto">
                    <img src="../../../assets/images/img1.png" alt />
                  </div>
                  <el-form
                    class="jm-environment-form"
                    ref="form"
                    :model="form"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="【高锰酸盐】">2.21mg/L</el-form-item>
                    <el-form-item label="【总磷】">0.006mg/L</el-form-item>
                    <el-form-item label="【总氮】">4.37mg/L</el-form-item>
                    <el-form-item label="【PH】">8.81</el-form-item>
                    <el-form-item label="【溶解氧】">6.09mg/L</el-form-item>
                    <el-form-item label="【电导率】">0.621ms/cm</el-form-item>
                    <el-form-item label="【浊度】">5.88NTU</el-form-item>
                    <el-form-item label="【温度】">26.8℃</el-form-item>
                    <el-form-item label="【氨氮】">0.007mg/L</el-form-item>
                  </el-form>
                </div>

                <h4 class="jm-card-title">分时段曲线</h4>
                <!-- echarts图表 -->
                <div id="main" style="height:300px;"></div>
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
                    <el-button type="primary" size="mini">定位</el-button>
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
// import BaiduMap from "vue-baidu-map";
// import TencentMap from "tencent-map";
import shexiangtou from "../../../assets/images/shexiangtou.png";
import meteorology from "../../../assets/images/meteorology.jpg";
import car from "../../../assets/images/car1.png";
import start from "../../../assets/images/qidian.png";
import end from "../../../assets/images/zhongdian.png";
import map from "../../../assets/js/map";

// import { TMap } from '../TMap'
export default {
	components:{
    TXmap
  },
  name: "waterQuality",
  data() {
    return {
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
      tabActiveName: "first",
      pagerCount: 5,
      currentPage: 2,
      checkList: [],
      // isshowQp:'qpNone',
      isshowClassFull: false,
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
			zoom: 14,
			center: {
				lat: 22.63009348,
				lng: 113.12862822
			},
			map: {}
    };
  },
  watch: {
    input: function(value) {
      console.log(value);
    }
  },
  mounted() {
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
		this.init();
		this.initw();
  },
  methods: {
		// 显示轨迹
		changecenter(){
			let from=[22.629955329658163,113.11011672019958];
      let to=[22.62706367752099,113.1170904636383];
			this.$refs.mychild.TrackPlayback(from,to)
			// let that = this;
			// var map = that.map
			// let carpath = [
      //   new TMap.LatLng(that.point[0].lat, that.point[0].lng),
      //   new TMap.LatLng(that.point[1].lat, that.point[1].lng),
      //   new TMap.LatLng(that.point[2].lat, that.point[2].lng)
			// ];
			// map.setCenter(new TMap.LatLng(22.632970,113.118576));
			// map.setZoom(17);
			// console.log('显示轨迹')
			// var polylineLayer = new TMap.MultiPolyline({
			// 	map, // 绘制到目标地图
			// 	// 折线样式定义
			// 	styles: {
			// 		style_blue: new TMap.PolylineStyle({
			// 			color: "#3777FF", //线填充色
			// 			width: 4, //折线宽度
			// 			borderWidth: 2, //边线宽度
			// 			borderColor: "#FFF", //边线颜色
			// 			lineCap: "round" //线端头方式
			// 		})
			// 	},
			// 	geometries: [
			// 		{
			// 			styleId: "style_blue",
			// 			paths: carpath
			// 		}
			// 	]
			// });
      // var marKer = new TMap.MultiMarker({
      //   map,
      //   styles: {
      //     "car-down": new TMap.MarkerStyle({
      //       width: 40,
      //       height: 40,
      //       anchor: {
      //         x: 20,
      //         y: 20
      //       },
      //       faceTo: "map",
      //       rotate: 0,
      //       src: car
      //     }),
      //     start: new TMap.MarkerStyle({
      //       width: 20,
      //       height: 20,
      //       anchor: { x: 16, y: 32 },
      //       src: start
      //     }),
      //     end: new TMap.MarkerStyle({
      //       width: 20,
      //       height: 20,
      //       anchor: { x: 16, y: 32 },
      //       src: end
      //     })
      //   },
      //   geometries: [
      //     {
      //       id: "car",
      //       styleId: "car-down",
      //       position: new TMap.LatLng(that.point[0].lat, that.point[0].lng)
      //     },
      //     {
      //       id: "start",
      //       styleId: "start",
      //       position: new TMap.LatLng(that.point[0].lat, that.point[0].lng)
      //     },
      //     {
      //       id: "end",
      //       styleId: "end",
      //       position: new TMap.LatLng(that.point[2].lat, that.point[2].lng)
      //     }
      //   ]
			// });
      // marKer.moveAlong(
      //   {
      //     car: {
      //       path: carpath,
      //       speed: 250
      //     }
      //   },
      //   {
      //     autoRotation: true
      //   }
      // );
		},
		// 清除轨迹
		clearGj(){
			this.$refs.mychild.clearTrackPlayback();
		},

    open() {
      alert("点击了打开");
    },
    property() {
      alert("点击了属性");
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
      var myChart = echarts.init(document.getElementById("main"));
			// 指定图表的配置项和数据
			var option = {
					// backgroundColor: '#01004C',
					title: {

					},
					tooltip: {
							trigger: 'axis'
					},
					legend: {
							data: ['水质监测', '水质监测1',],
							textStyle: {
									color: '#fff'
							}
					},
					toolbox: {
							show: true,
							feature: {
									mark: {
											show: false
									},
									dataView: {
											show: false,
											readOnly: false
									},
									magicType: {
											show: false,
											type: ['line', 'bar']
									},
									restore: {
											show: false
									},
									saveAsImage: {
											show: false
									}
							}
					},
					calculable: false,
					xAxis: [{
							type: 'category',
							boundaryGap: false,
							data:['一月份', '二月份', '三月份', '四月份', '五月份', '六月份'],
							axisLabel: {
									show: true,
									textStyle: {
											color: "#ffffff", //X轴文字颜色
											fontSize: 16
									}
							},

					}],
					yAxis: [{
							type: 'value',
							axisLabel: {
									formatter: '{value} ',
									color: '#ffffff',
									textStyle: {
											fontSize: 16
									}
							},
							axisLine: {
									show: true,
									lineStyle: {
											color: "#ccc"
									},
							},


					}],
					series: [
						{
							name: '水质监测',
							type: 'line',
							data: [1, 4, 2, 5, 1, 2, 1],
							lineStyle: {
									normal: {
											width: 8,
											color: {
													type: 'linear',

													colorStops: [{
															offset: 0,
															color: '#57BD9F' // 0% 处的颜色
													}, {
															offset: 1,
															color: '#19BC8C' // 100% 处的颜色
													}],
													globalCoord: false // 缺省为 false
											},
											shadowColor: 'rgba(72,216,191, 0.3)',
											shadowBlur: 6,
											shadowOffsetY: 10
									}
							},
							itemStyle: {
									normal: {
											color: '#57BD9F',
											borderWidth: 10,
											borderColor: "#57BD9F"
									}
							},
							markPoint: {
									data: [{
													type: 'max',
													name: '最大值'
											},
											{
													type: 'min',
													name: '最小值'
											}
									]
							},
						},
						{
								name: '水质监测1',
								type: 'line',
								data: [0, 1, 1, 3, 2],
								lineStyle: {
										normal: {
												width: 8,
												color: {
														type: 'linear',

														colorStops: [{
																offset: 0,
																color: '#7597EB' // 0% 处的颜色
														}, {
																offset: 1,
																color: '#638BEE' // 100% 处的颜色
														}],
														globalCoord: false // 缺省为 false
												},
												shadowColor: 'rgba(72,216,191, 0.3)',
												shadowBlur: 6,
												shadowOffsetY: 10
										}
								},
								itemStyle: {
										normal: {
												color: '#7597EB',
												borderWidth: 10,
												borderColor: "#7597EB"
										}
								},
								markPoint: {
										data: [{
														type: 'max',
														name: '最大值'
												},
												{
														type: 'min',
														name: '最小值'
												}
										]
								},
						}
					]
			};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    initw() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      // 指定图表的配置项和数据
      var fontColor = '#fff';
			var data = [
				{
					"name": "水质1",
					"value": 456
				}, 
				{
					"name": "水质2",
					"value": 231
				}, 
				{
					"name": "水质3",
					"value": 121
				}, 
				{
					"name": "水质4",
					"value": 45
				}, 
				{
					"name": "水质5",
					"value": 154
				}, 
				{
					"name": "水质6",
					"value": 67
				}, 
			]
			var option = {
					color: ['#bf19ff', '#854cff', '#5f45ff', '#02cdff', '#314976', '#f9e264', '#f47a75', '#009db2', '#024b51- 0780cf', '#765005'],
					// backgroundColor: '#0f375f',
					title: {
							text: '优',
							// subtext: '水质',
							textStyle: {
									color: '#f2f2f2',
									fontSize: 40,
							},
							subtextStyle: {
									fontSize: 30,
									color: ['#ff9d19']
							},
							x: 'center',
							y: 'center',
					},
					grid: {
							bottom: 150,
							left: 100,
							right: '10%'
					},
					tooltip: {
							trigger: 'item',
							// formatter: '{b}<br/> {c}亿元  ({d}%)'
					},
					legend: {
							orient: 'vertical',
							right:'1',
							textStyle: {
									color: '#f2f2f2',
									fontSize: 10,

							},
							icon: 'roundRect',
							data: data,
					},
					series: [
							// 主要展示层的
							{
									radius: ['50%', '90%'],
									center: ['50%', '50%'],
									type: 'pie',
									label: {
											position: 'inner',
											// formatter: '{b}：{c}亿元',
									},
									labelLine: {
											normal: {
													show: true,
													length: 30,
													length2: 55
											},
											emphasis: {
													show: true
											}
									},
									data: data,

							},
							// 边框的设置
							{
									radius: ['45%', '50%'],
									center: ['50%', '50%'],
									type: 'pie',
									label: {
											normal: {
													show: false
											},
											emphasis: {
													show: false
											}
									},
									labelLine: {
											normal: {
													show: false
											},
											emphasis: {
													show: false
											}
									},
									animation: false,
									tooltip: {
											show: false
									},
									data: [{
											value: 1,
											itemStyle: {
													color: "rgba(250,250,250,0.3)",
											},
									}],
							}, {
									name: '外边框',
									type: 'pie',
									clockWise: false, //顺时加载
									hoverAnimation: false, //鼠标移入变大
									center: ['50%', '50%'],
									radius: ['100%', '100%'],
									label: {
											normal: {
													show: false
											}
									},
									data: [{
											value: 9,
											name: '',
											itemStyle: {
													normal: {
															borderWidth: 2,
															borderColor: '#0b5263'
													}
											}
									}]
							},
					]
			};
      // 使用刚指定的配置项和数据显示图表。
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