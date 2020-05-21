<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">今日扬尘与噪声监测</h4>
          </div>
          <div class="jm-card-center yauto p10">
            <el-input class="jm-search" size="small" placeholder="输入气象点名称或编号" v-model="searchInput">
              <el-button @click="ept_search" type="primary" slot="append">搜索</el-button>
            </el-input>

            <!-- 监测指标表格 -->
            <el-table
              :data="ept_tableData"
              class="jm-table"
              row-class-name="tr-small"
              header-row-class-name="tr-small"
              height="200"
							@cell-mouse-enter='showRow'
            >
              <!-- <el-table-column prop="number" label="序号" width="60"></el-table-column> -->
              <el-table-column prop="number" label="编号" width="100"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <!-- <el-table-column prop="date" label="时间" width="100"></el-table-column> -->
              <el-table-column prop label="操作" width="80">
                  <el-button type="primary" size="mini" @click="dingwei">定位</el-button>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              class="jm-pagination mt10"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="ept_pagesize"
              :total="ept_total"
              :current-page="ept_currpage"
            ></el-pagination>

            <h4 class="jm-card-title mt10">今日全岛PM2.5指数</h4>
            <!-- echarts图片 -->
            <div id="chartPM25" class="mt10" style="height:350px;"></div>
          </div>
        </div>
      </el-aside>

      <!-- 中间 -->
      <!-- <el-container class="plr10 rel" >
        <div class="jm-map-tools">
            <ul class="cont">
              <li>扬尘与噪声监测点数：<span class="num">{{yj_devices.length}}</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">异常告警数：<span class="num">{{num_devices}}</span></li>
              <li>扬尘与噪声指数：<span class="num">8</span></li>
            </ul>
        </div>
      </el-container> -->
      <el-container class="plr10">
        <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
					<TXmap ref="mychild" :qp="true" :isGL="true" :isLngLat="false" Tabs='met' v-on:listenToChildEvent = 'showMsgfromChild'></TXmap>
          <div class="jm-map-tools">
						<ul class="cont">
              <li>扬尘与噪声监测点数：<span class="num">{{yj_devices.length}}</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">异常告警数：<span class="num">{{num_devices}}</span></li>
              <li style="cursor: pointer;" @click="centerDialogVisible = true">扬尘与噪声指数：<span class="num">8</span></li>
            </ul>
          </div>
        </div>
      </el-container>

      <!-- 右侧 -->
      <el-aside class="jm-aside">
        <div class="jm-card" style="height:100%">
          <div class="jm-card-header">
            <h4 class="jm-card-title">{{curr_ept.name}}</h4>
          </div>
          <div class="jm-card-center p10 yauto">
            <el-tabs class="jm-tabs" v-model="tabActiveName" @tab-click="handleClick">
              <el-tab-pane label="扬尘与噪声监控" name="first">
                <div  >{{curr_ept_deviceMessge.createTime}}</div>
                <div class="flex">
                  <div style="width:50%">
                    <img style="width:100%" src="../../../assets/images/img1.png" alt />
                  </div>
                  <el-form
                    class="jm-environment-form mt10"
                    label-width="80px"
                    size="mini"
                  >
                    <el-form-item label="PM2.5">{{curr_ept_deviceMessge.pm2p5}} μg/m³</el-form-item>
                    <el-form-item label="PM10">{{curr_ept_deviceMessge.pm10}} μg/m3</el-form-item>
                    <el-form-item label="TSP">{{curr_ept_deviceMessge.tsp}} μg/m3</el-form-item>
                    <el-form-item label="噪声">{{curr_ept_deviceMessge.novice}} db</el-form-item>
                    <el-form-item label="温度">{{curr_ept_deviceMessge.temperature}} ℃</el-form-item>
                    <el-form-item label="湿度">{{curr_ept_deviceMessge.humidity}} %</el-form-item>
                  </el-form>
                </div>
                
                <h4 class="jm-card-title mt10">今日扬尘与噪声曲线</h4>
                <!-- echarts图表 -->
                <div id="todayStatistics" class="mt10" style="height:280px;"></div>
              </el-tab-pane>

              <!-- 历史查询 -->
              <el-tab-pane label="历史查询" name="second">
                <div class="flex">
                  <el-date-picker
                    size="small"
                    class="jm-datetimerange"
                    v-model="dataValue"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                  <el-button class="ml10" @click="searchHis" size="mini" type="primary">查询</el-button>
                <!-- <el-button @click="his_daochu" size="mini" type="primary">导出</el-button> -->
                </div>
                <!-- 监测指标表格 -->
                <el-table
                  :data="his_tableData"
                  class="jm-table mt10"
                  row-class-name="tr-small"
                  header-row-class-name="tr-small"
                >
                  <!-- <el-table-column prop="number" label="序号" width="50"></el-table-column> -->
                  <el-table-column prop="createTime" width="140" label="时间"></el-table-column>
                  <el-table-column prop="pm2p5" label="PM2.5"></el-table-column>
                  <el-table-column prop="pm10" label="PM10"></el-table-column>
                  <el-table-column prop="tsp" label="TSP"></el-table-column>
                  <el-table-column prop="temperature" label="温度"></el-table-column>
                  <el-table-column prop="humidity" label="湿度"></el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination
                  class="jm-pagination mt10"
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange_his"
                  :page-size="his_pagesize"
                  :total="his_total"
                  :current-page="his_currpage"
                ></el-pagination>

                <!-- <h4 class="jm-card-title mt10">历史全岛扬尘与噪声曲线</h4> -->
                <!-- echarts图表 -->
                <!-- <div id="hisCharts" class="mt10" style="height:240px;"></div> -->
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-aside>
    </el-container>

    <!-- 预警历史记录 -->
     <el-dialog
        title="异常告警历史数据"
        :visible.sync="centerDialogVisible"
        :append-to-body="true"
        width='80%'
        center>

        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="220"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="监测点名称"
            width="220"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="位置"
            width="220"
            align="center">
          </el-table-column>
          <el-table-column
            prop="det"
            label="所属单位"
            width="220"
            align="center">
          </el-table-column>
          <el-table-column
            prop="yj"
            label="预警"
            width="220"
            align="center">
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      
  </div>
</template>
<script>
import TXmap from '../../../components/environment/txMap(2)'
import echarts from "echarts";
import echartsStyle from "../../../assets/js/echartsStyle";
import map from "../../../assets/js/map";
import yangcheng from "../../../assets/images/yangcheng.png";
var moment = require('moment');
export default {
  components:{
		TXmap
  },
  name: "dustNoise",
  data() {
    return {
      centerDialogVisible:false,
      //历史告警数据
      tableData: [
        {
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        }, {
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        },{
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        },{
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        },{
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        },{
          date: '2016-05-02 12:03:02',
          name: '坦边振兴工业园监测点',
          address: '江门市连荷路100号',
          det:'江门市人才岛规划中心',
          yj:'噪声过大(范围值<100)'
        },
      ],

      searchInput: "",

      //地图数据，都别动，让我来
      center: map.center,
      zoom: map.zoom,
      active: false,

      //监测数据
      ept_tableData: [],
      ept_total:0,
      ept_pagesize:5,
      ept_currpage:1,
      ept_searchKey:'',
      deviceMessge:'',
      ept_title:'',
      ept_id:'',
      ept_date:'',

      // 当前设备信息
      curr_ept:{},
      curr_ept_deviceMessge:{},
      curr_ept_selected:-1,

      //历史数据
      his_tableData:[],
      his_pagesize:9,
      his_currpage:1,
      his_total:0,
      //预警数据
      yj_devices:[],
      num_devices:0,//预警总数
      //
   
      tabActiveName: "first",
      checkList: [],
      dataValue: [],

      // 图表
      todatyPm25:{
        times:[],
        values:[],
      },
      todayStatistics:{
        pm2p5:[],
        pm10:[],
        tsp:[],
        novice:[],
        temperature:[],
        humidity:[],
        hour:[]
      },
      map:'',
			isshowClassFull: false,
			list:{}
    };
  },
  created(){
  },
  async mounted() {
    await this.getqueryWarn();
    this.getdevice();
    this.getTodayPm();
    setInterval(()=>{
      // let BMap=this.BMap;
      // let map=this.map;
      // map.clearOverlays()
      this.getqueryWarn();
      // this.getdevice()
    },30000)
  },
  methods: {
		showRow(e){
			this.list = e
		},
		// 点击定位地图变更
		async dingwei(){
			let that = this;
			console.log(that.list)
			this.$refs.mychild.isShowInfoWindow(that.list,'','dustNoise');
			let res = await that.http.post(that.api.environment.deviceMessgeSearch, { // 接口
        "deviceId": that.list.id
			});
			if(res.data.code == 200){
				console.log(res.data.data)
				that.curr_ept.name = that.list.name
				that.curr_ept_deviceMessge.pm2p5 = res.data.data.pm2p5
				that.curr_ept_deviceMessge.pm10 = res.data.data.pm10
				that.curr_ept_deviceMessge.tsp = res.data.data.tsp
				that.curr_ept_deviceMessge.novice = res.data.data.novice
				that.curr_ept_deviceMessge.temperature = res.data.data.temperature
				that.curr_ept_deviceMessge.humidity = res.data.data.humidity
			}else{
				that.$message.error('设备获取异常')
			}
		},
		// 点击地图摄像头改变页面数据
		async showMsgfromChild(data){
			let that = this;
			console.log(data,'111111111111111111111111');
			let res = await that.http.post(that.api.environment.deviceMessgeSearch, { // 接口
        "deviceId": data.id
			});
			if(res.data.code == 200){
				console.log(res.data.data)
				that.curr_ept.name = data.name
				that.curr_ept_deviceMessge.pm2p5 = res.data.data.pm2p5
				that.curr_ept_deviceMessge.pm10 = res.data.data.pm10
				that.curr_ept_deviceMessge.tsp = res.data.data.tsp
				that.curr_ept_deviceMessge.novice = res.data.data.novice
				that.curr_ept_deviceMessge.temperature = res.data.data.temperature
				that.curr_ept_deviceMessge.humidity = res.data.data.humidity
			}else{
				this.$message.error('设备获取异常')
			}
		},
    cache(cache){//子传父
      this.curr_ept=cache;
      this.getDeviceInfo()
    },
    // 初始化查询日期七天前至当天
    getDefaultDate(){
      this.dataValue=[];
      let startTime = moment().subtract('days', 7).format('YYYY-MM-DD') ;
      let endTime =moment().format('YYYY-MM-DD');
      this.dataValue.push(startTime,endTime);
      // console.log(this.dataValue)
    },
    // 今日全岛PM2.5指数统计
    async getTodayPm(){
      let that=this;
      let res = await that.http.get(that.api.environment.statisticsTodayPm); // 接口
      // console.log('2222',res.data.data.records)
      let list =res.data.data.records,
          times= [],
          values=[];
      list.map( item => {
        times.push(item.createTime+'时');
        values.push(item.pm2p5);
      });
      that.todatyPm25.times=times;
      that.todatyPm25.values=values;
      // console.log(that.pm25)
      that.chartPM25();
     
    },
    chartPM25() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartPM25"));
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: 30,
          right: 20,
          top: 10,
          bottom: 30
        },
        tooltip: {
          trigger: "axis",
          // 默认为直线'line'，可选为阴影'shadow'
          axisPointer: {
            type: "shadow"
          },
          formatter: '{b}:</br>{c}μg/m³'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.todatyPm25.times,
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
            data: this.todatyPm25.values,
            type: "line",
            smooth: true,
            itemStyle: echartsStyle.itemStyle,
            lineStyle: echartsStyle.lineStyle,
            areaStyle: echartsStyle.areaStyle
          }
        ]
			};
					
			// 更新图表
			var xData = function() {
					var data = [];
				for (var i = 1; i < 31; i++) {
						data.push(i + "日");
				}
				return data;
			}();

			var option1 = {
					// backgroundColor: "#1A1835",
					tooltip: {
							trigger: "axis",
							axisPointer: {
									type: "shadow",
									textStyle: {
											color: "#fff"
									}

							},
					},
					grid: {
							borderWidth: 0,
							top: 110,
							bottom: 95,
							textStyle: {
									color: "#fff"
							}
					},
					legend: {
							x: '46%',
							top: '11%',
							textStyle: {
									color: '#90979c',
							},
							data: ['pm2.5']
					},


					calculable: true,
					xAxis: [{
							type: "category",
							// axisLine: {
							// 		lineStyle: {
							// 				color: "rgba(204,187,225,0.5)",
							// 		}
							// },
							splitLine: {
									show: false
							},
							axisTick: {
									show: false
							},
							boundaryGap: false,
							data: this.todatyPm25.times,
							axisLabel: echartsStyle.axisLabel,
							axisLine: echartsStyle.axisLine
					}],

					yAxis: [{
							type: "value",
							splitLine: {
									show: false
							},
							axisLine: {
									lineStyle: {
											color: "rgba(204,187,225,0.5)",
									}
							},
							axisLabel: echartsStyle.axisLabel,
							// axisLine: echartsStyle.axisLine
					}],
					// dataZoom: [{
					// 		show: true,
					// 		height: 30,
					// 		xAxisIndex: [0],
					// 		bottom: 30,
							
					// 		"start": 10,
					// 		"end": 80,
					// 		handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
					// 		handleSize: '110%',
					// 		handleStyle: {
					// 				color: "#5B3AAE",
					// 		},
					// 		textStyle:{
					// 				color:"rgba(204,187,225,0.5)",
					// 		},
					// 		fillerColor:"rgba(67,55,160,0.4)",
					// 		borderColor: "rgba(204,187,225,0.5)",

					// }, {
					// 		type: "inside",
					// 		show: true,
					// 		height: 15,
					// 		start: 1,
					// 		end: 35
					// }],
					series: [{
            data: this.todatyPm25.values,
            type: "line",
            smooth: true,
            // itemStyle: echartsStyle.itemStyle,
            // lineStyle: echartsStyle.lineStyle,
						// areaStyle: echartsStyle.areaStyle,
						
						name: "pm2.5",
						symbolSize: 10,
						symbol: 'circle',
						itemStyle: {
								color: "#6f7de3",
						},
						markPoint: {
								label: {
										normal: {
												textStyle: {
														color: '#fff'
												}
										}
								},
								data: [{
										type: 'max',
										name: '最大值',

								}, {
										type: 'min',
										name: '最小值'
								}]
						},
							// data: [
							// 		509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117,2000,1455,1210,719,
							// 		733,944,2285,2208,3372,3936,3693,2962,2810,3519,2455,2610,2719,2484,2078
							// ],
					}, 
					// {
					// 		name: "订单量",
					// 		type: "line",
					// 		symbolSize: 10,
					// 		symbol: 'circle',
					// 		itemStyle: {
					// 				color: "#c257F6",
					// 		},
					// 		markPoint: {
					// 				label: {
					// 						normal: {
					// 								textStyle: {
					// 										color: '#fff'
					// 								}
					// 						}
					// 				},
					// 				data: [{
					// 						type: 'max',
					// 						name: '最大值',

					// 				}, {
					// 						type: 'min',
					// 						name: '最小值'
					// 				}]
					// 		},
					// 		data: [
					// 				2136,3693,2962,3810,3519,3484,3915,3823,3455,4310,4019,3433,3544,3885,4208,3372,
					// 				3484,3915,3748,3675,4009,4433,3544,3285,4208,3372,3484,3915,3823,4265,4298
					// 		]
					// }, 
					]
			}
      // 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option1);
			// myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },

    // 当日扬尘与噪声曲线
    async getStatisticsRecord(){
      let that=this;
      let res = await that.http.post(that.api.environment.statisticsRecord,{ // 接口
        deviceId:that.curr_ept.id,
      });
      // console.log('2222',res.data.data.records)
      let list =res.data.data.records,
          pm2p5= [],
          pm10=[],
          tsp=[],
          novice=[],
          temperature=[],
          humidity=[],
          hour=[];
      list.map( item => {

        pm2p5.push(item.pm2p5);
        pm10.push(item.pm10);
        tsp.push(item.tsp);
        novice.push(item.novice);
        temperature.push(item.temperature);
        humidity.push(item.humidity);
        hour.push(item.hour+'时');
      });
      that.todayStatistics.pm2p5=pm2p5;
      that.todayStatistics.pm10=pm10;
      that.todayStatistics.tsp=tsp;
      that.todayStatistics.novice=novice;
      that.todayStatistics.temperature=temperature;
      that.todayStatistics.humidity=humidity;
      that.todayStatistics.hour=hour;
      console.log(that.todayStatistics)
      
      that.chartTodayStatistics();
     
    },
    chartTodayStatistics() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("todayStatistics"));
      // 指定图表的配置项和数据
      var option = {
        legend: {
          orient: "horizontal",
          x: "left",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          data: ["PM2.5", "PM10", "TSP", "噪声", "温度", "湿度"],
          textStyle: {
            color: "#eee" // 图例文字颜色
          }
        },
        grid: {
          left: 40,
          right: 20,
          top: 60,
          bottom: 30
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          // formatter: '{b}:</br>{a0}:{c0}μg/m³ </br>{a1}:{c1}μg/m³ </br>{a2}:{c2}μg/m³ </br>{a3}:{c3}db </br>{a4}:{c4}℃ </br>{a5}:{c5}% </br>'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.todayStatistics.hour,
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
            name: "PM2.5",
            type: "line",
            smooth: true,
            data: this.todayStatistics.pm2p5,
            itemStyle: {
                normal: {
                    color: 'yellow',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            

            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgb(255,224,4,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255,142,31,1)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
          },
          {
            name: "PM10",
            type: "line",
            smooth: true,
            data: this.todayStatistics.pm10,
            itemStyle: {
                normal: {
                    color: '#eb6a6b',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#e784b7' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#ed6861' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
          },
          {
            name: "TSP",
            type: "line",
            smooth: true,
            data: this.todayStatistics.tsp,
            itemStyle: {
                normal: {
                    color: '#58b8dc',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#8ef8ab' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#55b4dd' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
          },
          {
            name: "噪声",
            type: "line",
            smooth: true,
            data: this.todayStatistics.novice,
            itemStyle: {
                normal: {
                    color: '#6b36cb',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#7948d5' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#4710ae' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
          },
          {
            name: "温度",
            type: "line",
            smooth: true,
            data: this.todayStatistics.temperature,
            itemStyle: {
                normal: {
                    color: '#eb3853',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#ed77e1' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#e95fe1' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
          },
          {
            name: "湿度",
            type: "line",
            smooth: true,
            data: this.todayStatistics.humidity,
            itemStyle: {
                normal: {
                    color: '#3071f1',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                    shadowColor: '#fff',
                    shadowBlur: 4,
                },
            },
            lineStyle: {
                normal: {
                    width: 4,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#6ff1f8' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#3472ed' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
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

    //获取设备列表
    async getdevice() {
      let that=this;
      let res = await that.http.post(that.api.environment.deviceSearch, { // 接口
        pageNumber: that.ept_currpage,
        pageSize: that.ept_pagesize,
        searchKey: that.searchInput,
        startRow: 0,
        type: ""
      });
      console.log('!!!',res)
      if(res.data.code=='200'){
        that.ept_tableData=[];
        if(res.data.data.records){
          that.ept_total=res.data.data.totalRecord;
          that.ept_tableData=res.data.data.records;
          if(that.curr_ept_selected==-1){
            that.curr_ept=res.data.data.records[0]; //默认第一个为当前设备
						let mapData={points:that.yj_devices,icon:{url:yangcheng},content:true,cache:res.data.data.records[0]}
						console.log(mapData)
						// this.$refs.mychild.addPoint(mapData);
						// this.$refs.mychild.zdyfgw(res.data.data.records,'dustNoise')
          }else{
            for(let i=0;i<that.ept_tableData.length;i++){
              if(that.curr_ept_selected==that.ept_tableData[i].number){
                that.curr_ept=res.data.data.records[i];
              }
            }
          }
          console.log(that.curr_ept)
          that.getDeviceInfo();
          //默认展示当前设备的信息窗口
          // that.infoWindow()
        }
      }else{
        this.$message.error(res.data.message);
      }
    },

    // 分页
    handleCurrentChange(val) {
      this.ept_currpage=val;
      this.getdevice()
    },
    //搜索设备
    ept_search(){
      this.ept_currpage=1;
      this.getdevice()
    },

    // 更新设备相关信息
    getDeviceInfo(){
      this.getDefaultDate();
      this.getdeviceMessgeSearch();// 查询当前设备数据
      this.getStatisticsRecord()// 当日扬尘与噪声曲线
      this.searchHis()//更新历史查询
    },

    //查询预警信息
    async getqueryWarn(){
      let that=this;
      let res = await that.http.get(that.api.environment.queryWarn, {}); // 接口
      console.log('wwwwww',res)
      let num_devices=0;
      for(let i=0;i<res.data.data.devices.length;i++){
        if(res.data.data.devices[i].novice==true){
          num_devices++;
        }
      }
      that.num_devices=num_devices
      that.yj_devices=res.data.data.devices;
      // return res.data.data.devices
      console.log(res.data.data.devices)

      //调用地图组件
      let mapData={points:res.data.data.devices,icon:{url:yangcheng},content:true}
			// this.$refs.mychild.addPoint(mapData);
			this.$refs.mychild.zdyfgw(mapData,'dustNoise')
    },
   
    //获取当前设备数据
    async getdeviceMessgeSearch(id){
      let that=this;
      let res =await that.http.post(that.api.environment.deviceMessgeSearch, { // 接口
        deviceId:that.curr_ept.id
      });
      // console.log(res)
      that.curr_ept_deviceMessge=res.data.data
      console.log(that.curr_ept_deviceMessge);
    },

    //历史查询
    async getHis(){
      let that=this;
      console.log(that.dataValue)
      let res=await that.http.post(that.api.environment.recordSearch, { // 接口
        deviceId: that.curr_ept.id,
        startTime: that.dataValue[0]+' 00:00:00',
        endTime: that.dataValue[1]+' 23:59:59',
        pageNumber: this.his_currpage,
        pageSize: 9,
        startRow: 0,
      });
      if(res.data.data!=null){
        that.his_tableData=res.data.data.records;
        that.his_total=res.data.data.totalRecord;
      }
    },
    searchHis(){
      this.his_currpage=1;
      this.getHis();
    },
    handleCurrentChange_his(val){
      this.his_currpage=val;
      this.getHis()
    },
    // 选项卡
    handleClick(tab, event) {
    },
    //历史数据导出
    // async his_daochu(){
    //   let that=this
    //   console.log(that.ept_id)
    //   let res=await that.http.get(that.api.environment.recordExport, {
    //     deviceId: that.ept_id,
    //     endTime: that.dataValue[1]+' 23:59:59',
    //     startTime: that.dataValue[0]+' 00:00:00'
    //   });
    // },
    
    // 定位
    handleEdit(row) {
      console.log(row);
      const that =this;
      that.curr_ept =row;
			that.getDeviceInfo();
			var content = ''
			let mapData={points:that.yj_devices,icon:{url:yangcheng},content:true,cache:row}
			console.log(mapData)
			// this.$refs.mychild.addPoint(mapData);
			this.$refs.mychild.isShowInfoWindow(mapData,content,'dustNoise')
    },
  }
};
</script>
<style scoped lang="less">

/deep/.el-form-item {
  margin: 0;
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

</style>