<template>
	<div class="jm-main-inner p10">
		<!-- <div>这是气象监测</div> -->
		

		<el-container>
			<!-- 左侧 -->
			<el-aside class="jm-aside">
				<div class="jm-card">
					<div class="jm-card-header">
						<h4 class="jm-card-title">当日廊道监测点</h4>
						<div class="jm-card-actions">
						</div>
					</div>
					<div class="jm-card-center p10">
							<el-input class="jm-search" size="small"  placeholder="输入气象点名称或者编号" v-model="input" >
								<el-button @click="search" type="primary" slot="append" >搜索</el-button>
							</el-input>

							<el-table
								:data="tableData"
								class="jm-table mt10"
								row-class-name="tr-small"
								header-row-class-name='tr-small'
								height="200"
								>
								<el-table-column prop="number" label="序号" width='60'></el-table-column>
								<el-table-column prop="snumber" label="编号" width='60'></el-table-column>
								<el-table-column prop="address" label="名称" width='100'></el-table-column>
								<el-table-column prop="date" label="时间" width='100'></el-table-column>
								<el-table-column prop="" label="操作"><a href="javascript:;">定位</a></el-table-column>
							</el-table>

							<div class="mt10">
								<el-pagination
									class="jm-pagination"
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page.sync="currentPage"
									:pager-count="pagerCount"
									:page-size="10"
									small
									layout="prev, pager, next, jumper"
									:total="50">
								</el-pagination>
							</div>
					</div>
				</div>
				
				<div class="jm-card mt10">
					<div class="jm-card-header">
						<h4 class="jm-card-title">今日全岛廊道告警统计</h4>
					</div>
						<!-- echarts图表 -->
					<div class="jm-card-center p10">
						<div id="main1"  class="mt10" style="height:240px;"></div>
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

				<div class="jm-card" style="height:100%;">
					<div class="jm-card-header">
						<h4 class="jm-card-title">江门市管廊1段监测</h4>
					</div>

					<div class="jm-card-center p10 yauto">
						<el-tabs class="jm-tabs"  v-model="tabActiveName" @tab-click="handleClick">
							<!-- 卡口监控 -->
							<el-tab-pane label="卡口监控" name="first">
								<ul class="jm-video-list">
									<li class="item">
										<img src="../../../assets/images/img1.png" alt="">
									</li>
									<li class="item">
										<img src="../../../assets/images/img1.png" alt="">
									</li>
									<li class="item">
										<img src="../../../assets/images/img1.png" alt="">
									</li>
									<li class="item">
										<img src="../../../assets/images/img1.png" alt="">
									</li>
								</ul>

								<h4 class="jm-card-title ">今日实时数据</h4>
								<div class="mt10">
									<div style="padding-top:20px;color:#999999;">2011-7-29 17:30:00</div>
									<div>彭瑶生态园气象站</div>
									<div class="flex">
										<img class="imgwh" src="../../../assets/images/img1.png" alt="">
										<el-form ref="form" :model="form"  label-width="80px" size="mini">
											<el-form-item label="雨量">
												40摄氏度
											</el-form-item>
											<el-form-item label="风速">
												4.4m/s
											</el-form-item>
											<el-form-item label="风向">
												155.33
											</el-form-item>
											<el-form-item label="太阳辐射">
												158.38w/m*m
											</el-form-item>
											<el-form-item label="空气温度">
												34.72℃
											</el-form-item>
											<el-form-item label="空气湿度">
												67.13%
											</el-form-item>
										</el-form>
									</div>
								</div>
							</el-tab-pane>

							<!-- 历史查询 -->
							<el-tab-pane label="历史查询" name="second">
								<!-- 历史搜索功能 -->
								<el-input class="jm-search" size="small"  placeholder="输入气象点名称或者编号" v-model="input" >
							<el-button @click="search" type="primary" slot="append" >搜索</el-button>
							</el-input>
							
								<!-- 监测指标表格 -->
								<el-table
									:data="tableData"
									stripe
									border
									class="mt10 sz-table"
									height="300px"
									style="width: 100%;"
									row-class-name="sz-table-tr">
									<el-table-column
										prop="number"
										label="序号"
										width='60'
										>
									</el-table-column>
									<el-table-column
										prop="snumber"
										label="编号"
										width='60'
										>
									</el-table-column>
									<el-table-column
										prop="address"
										label="名称"
											width='100'
										>
									</el-table-column>
									<el-table-column
										prop="date"
										label="时间"
										width='100'
										>
									</el-table-column>
									<el-table-column
										prop=""
										label="操作"
										>
										<el-button
											size="mini"
											@click="handleEdit(scope.$index, scope.row)">定位</el-button>
									</el-table-column>
								</el-table>

								<!-- 分页 -->
								<el-pagination
									class="jm-pagination"
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page.sync="currentPage"
									:page-size="100"
									small
									:pager-count='pagerCount'
									layout="prev, pager, next, jumper"
									:total="1000">
								</el-pagination>
								<!-- 图表 -->
								<div style="display:flex">
									<div>
										<div id="main-left-one" style="height:135px;width:170px"></div>
										<div id="main-left-two" style="height:135px;width:170px"></div>
									</div>
									<div>
										<div id="main-right" style="height:135px;width:170px;"></div>
										<div id="main-right-two" style="height:135px;width:170px;"></div>
									</div>
								</div>

							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-aside>

		</el-container>

	</div>
</template>
<script>
import TXmap from '../../../components/environment/txMap(2)'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import shexiangtou from '../../../assets/images/shexiangtou.png'
import map from '../../../assets/js/map'
import echartsStyle from '../../../assets/js/echartsStyle'
export default {
	components:{
    TXmap
  },
	name:"synthesis",
	data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			input:'',
			infoWindow: {
			show: true,
			contents: '这是天安门'
			},
			activeIndex: '1',
			activeIndex1:'1',
			center: map.center,
			zoom: map.zoom,
			active: false,
			tableData: [
				{
					number: '1',
					snumber:'231',
					date: '2016-05-02',
					address: '水质监测点',
				}, 
				{
					number: '2',
					snumber:'227',
					date: '2016-05-04',
					address: '水质监测点1'
				},
				{
					number: '2',
					snumber:'227',
					date: '2016-05-04',
					address: '水质监测点1'
				}, 
				{
					number: '2',
					snumber:'227',
					date: '2016-05-04',
					address: '水质监测点1'
				}, 
					{
					number: '2',
					snumber:'227',
					date: '2016-05-04',
					address: '水质监测点1'
				}, 
				{
					number: '2',
					snumber:'227',
					date: '2016-05-04',
					address: '水质监测点1'
				}, 
				{
					number: '3',
					snumber:'121',
					date: '2016-05-01',
					address: '水质监测点2',
				}, 
				{
					number: '4',
					snumber:'546',
					date: '2016-05-01',
					address: '水质监测点3',
				}, 
				{
					number: '5',
					snumber:'394',
					date: '2016-05-01',
					address: '水质监测点4',
				}, 
				{
					number: '6',
					snumber:'734',
					date: '2016-05-03',
					address: '水质监测点5'
				}
			],
			tabActiveName:'first',
			currentPage:2,
			pagerCount:5,
			checkList:[],
			isshowClassFull: false,
		};
	},
	watch: {
		input:function(value){
			console.log(value)
		}
	},
	mounted(){
		this.initw();
		this.initwLo();
		this.initwLt();
		this.initwR();
		this.initwRw()
	},
	methods: {
		// 绘制图表
		initw(){
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main1'));
			// 指定图表的配置项和数据
			var colors = [{
				type: 'linear',
				x: 0, x2: 1, y: 0, y2: 0,
				colorStops: [{
						offset: 0,
						color: '#21bddf80'
				}, {
						offset: 0.5,
						color: '#21bddf80'
				}, {
						offset: 0.5,
						
						color: '#21bddf'
				}, {
						offset: 1,
						color: '#21bddf'
				}]
			}];


			var barWidth = 30;


			var getCrossPoint = function( point1 , point2 , x  ){
					return (x - point1[0] ) * ( point2[1] - point1[1] ) / (point2[0] - point1[0]) + point1[1];
			}

			var renderItem = function(params , api){
										
					var yValue = api.value(1);
					var start = api.coord([api.value(0), yValue]);
					var size = api.size([api.value(1) - api.value(0), yValue]);
					var style = api.style();
					// 可以建泰定义


					// 最右边的点坐标

					var width = size[0] * 1.2 ;
					var x = start[0]  - width  / 2;
					var y = start[1];

					var bottomHeight = 20;

					var leftpoints = [
							[ x + width / 2 , y],
					];
					var rightpoints = [
							[ x + width / 2 , y],
					];
					
					
					
					// 左边的坐标点
					if( params.dataIndex == 0 ){
							leftpoints.push( [ x , size[1] + y  ] );
					}else {
							leftpoints.push(
									[ x + ( width / 2 - width / 1.2 / 2 ), 
									getCrossPoint( 
											[ x , size[1] + y],
											[ x + width / 2 , y  ],
											x + ( width / 2 - width / 1.2 / 2 )
									) ]
							);
							leftpoints.push(
									[ x + ( width / 2 - width / 1.2 / 2 ), 
									getCrossPoint( 
											[ x , size[1] + y],
											[ x + width / 2 , size[1] + y + bottomHeight  ],
											x + ( width / 2 - width / 1.2 / 2 )
									) ]
							);
							
					}
					
					leftpoints.push( [ x + width / 2 , size[1] + y + bottomHeight] );
					rightpoints.push( [ x + width / 2 , size[1] + y + bottomHeight] );
					
					
					// 右边的坐标点
					if( params.dataIndex == params.dataInsideLength - 1 ){
							rightpoints.push( [ x + width  , size[1] + y ]  );
					}else{
							rightpoints.push(
									[ x + width / 2 + width / 1.2 / 2 , 
									getCrossPoint( 
											[ x + width / 2 , size[1] + y + bottomHeight],
											[ x + width , size[1] + y  ],
											x + width / 2 + width / 1.2 / 2
									) ]    
							);
							
							rightpoints.push(
									[ x + width / 2 + width / 1.2 / 2 , 
									getCrossPoint( 
											[ x + width / 2 , y],
											[ x + width , size[1] + y  ],
											x + width / 2 + width / 1.2 / 2
									) ] 
							);
							
					}
				
				style.stroke = '#98e3f5';
				style.lineWidth = 2;
					
					var group = {
							type : 'group',
							children : [{
									// 左边
									z2: 3,
									type :'polygon',
									shape : {
											points : leftpoints
									},
									style:{
											fill: style.fill.colorStops[0].color,
											stroke : style.stroke,
											lineWidth:style.lineWidth,
											
									},
									styleEmphasis:{
											fill: style.fill.colorStops[0].color,
											stroke : style.stroke,
											lineWidth:style.lineWidth,
									}
							},{
									// 右边
									z2: 3,
									type :'polygon',
									shape : {
											points : rightpoints
									},
									style:{
											fill: style.fill.colorStops[3].color,
											stroke : style.stroke,
											lineWidth:style.lineWidth,
									},
									styleEmphasis:{
											fill: style.fill.colorStops[3].color,
											stroke : style.stroke,
											lineWidth:style.lineWidth,
									}
							}],
					};
					

					return group; 
				
			}
			var option = {
					// title: {
					// 		text: 'Awesome Chart'
					// },
					xAxis: {
							data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
					},
					tooltip:{
							show:true,
							trigger:'item',
					},
					yAxis: {},
					series: [{
							
							type : 'custom',
							itemStyle:{
									normal:{
											color:colors[0] ,
									}
							},
							data:[220, 182, 191, 234, 290, 330, 310],
							renderItem : renderItem
					},{
							type :'line',
							lineStyle:{
									color:'white'
							},
							symbol:'circle',
							symbolSize:10,
							itemStyle:{
									color:'#25dafd',
							},
							data:[220, 182, 191, 234, 290, 330, 310],
							label:{
									show:true ,
									textStyle:{
											color:'white'
									},
									formatter:function(params){
											console.log(params)
									}
							},
					}]
						
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		},
		initwLo() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main-left-one"));
      // 指定图表的配置项和数据
      var option = {
					title : {
							show: false, // false
							// text: '阅读时间统计分析',
							textStyle: {
											fontStyle: 'normal', // 'italic', 'oblique',
											fontWeight: 'bolder',  //'normal','bold','bolder','lighter',100|200|300|400 
											fontFamily:'Microsoft YaHei', // default: 'sans-serif', 'serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', 
											fontSize: '35',
											align: 'center', // 'center', 'right',
											},
							left: 'center', // 20|30, 49%, 'left','center','rgiht',
							top: '90%', // 20|30, 49%, 'top','middle','bottom',
					},
					tooltip : {
							trigger: 'item',
							//formatter: "{a} <br/>{b} : {c} ({d}%)"
							//use the data of list to display
							formatter: function (x) {
									return x.data.des;
							}
					},
					legend: {
							show: false,
							orient: 'horizontal',
							bottom: '5%',
							left: 'left',
							data: ["A点预警", "B点预警", "C点预警","D点预警", "E点预警", "F点预警", "G点预警","A点预警", "B点预警","C点预警"]
					},
					series : [
							{
									name: '用时统计',
									type: 'pie',
									selectedMode:'single',
									selectedOffset:50,
									
									//basic Pie
									radius: ['35%', '70%'],
									avoidLabelOverlap: false,
									label: {
											normal: {
													show: false,
													position: 'center'
											},
											emphasis: {
													show: true,
													textStyle: {
															fontStyle: 'normal',
															fontSize: '40',
															fontFamily:'Microsoft YaHei',
															fontWeight: 'lighter'  //'normal','bold','bolder','lighter',100|200|300|400
													}
											}
									},
									labelLine: {
											normal: {
													show: false,
											}
									},

									data: [
										{
											"name": "A点预警",
											"value": 158.62,
											// "des": "红楼梦 73:21:47 <br/>明朝那些事儿  65:43:17 </br>围城  15:32:17 </br>私人阅读史   3:44:39 </br> 红楼梦–衣食住行    0:15:00"
										},
										{
											"name": "B点预警",
											"value": 134.69,
											// "des": "三国演义    37:26:39 <br/> 史记  29:51:56 <br/> 论语  25:20:54 <br/> 大学  9:08:51 <br/> 中国哲学简史  6:30:14 <br/> 六祖坛经    5:50:43 <br/>  世说新语    5:33:18 <br/> 传习录 4:02:44 <br/>孟子  3:50:59 <br/> 道德经 2:00:18 <br/> 孙子兵法    1:41:10<br/> 庄子  1:12:27 <br/> 国学常识    1:11:48 <br/> 心经  0:49:27 <br/>   国史大纲    0:09:52"
										},
										{
											"name": "C点预警",
											"value": 37.12,
											// "des": "越读者 19:37:13    <br/>暗时间 9:01:15 <br/>断舍离 6:08:56 <br/>逛书架 1:41:22 <br/>买书琐记    0:38:28 <br/>"
										},
										{
											"name": "D点预警",
											"value": 90.58,
											// "des": "苏东坡传    18:26:47    <br/>把时间当作朋友 13:12:18    <br/>往事并不如烟  12:45:36  <br/>儒林外史    11:47:19    <br/>哲学的慰藉   6:03:51 <br/>吾国与吾民   5:46:04 <br/>  心流  5:04:52 <br/>  局外人 4:44:47 <br/> 新生  3:32:03 <br/>人生不过如此  1:43:52 <br/>工作DNA   1:37:18 <br/>别闹了，费曼先生    1:22:22 <br/>我们仨 1:02:35 <br/>悉达多 0:49:37 <br/>博尔赫斯谈话录 0:41:20 <br/>曾国藩家书   0:35:04 <br/>亲密关系    0:27:59 <br/> 西西弗神话   0:45:48 <br/>  鼠疫  0:05:30 <br/>"
										},
										{
											"name": "E点预警",
											"value": 71.48,
											// "des": "未来简史    23:48:01    <br/>人类简史    14:55:31    <br/>数学之美    6:33:38 <br/>乡土中国    4:52:10 <br/>人类群星闪耀时 4:42:24 <br/>稀缺  4:31:17 <br/>大学之路    3:33:38 <br/>历史深处的忧虑 1:43:57 <br/>从一到无穷大  1:41:36 <br/>技术的本质   1:29:05 <br/>中国大历史   1:26:12 <br/>集装箱改变世界 1:04:31 <br/>信息之美    0:45:59 <br/>中国文学史   0:14:24 <br/>万历十五年   0:06:21 <br/>"
										},
										{
											"name": "F点预警",
											"value": 10.69,
											// "des": "形式逻辑    10:26:25    <br/>策略思维    0:15:07 <br/>"
										},
										{
											"name": "G点预警",
											"value": 58.25,
											// "des": "约翰克里斯朵夫 16:46:35    <br/>奇特的一生   16:05:10    <br/>知行合一王阳明 10:34:58    <br/>富兰克林自传  6:14:18 <br/>人生的枷锁   3:58:24 <br/>司马迁之人格与风格   2:06:26 <br/>钱钟书传    0:55:55 <br/>报任安书    0:51:49 <br/>傅雷家书    0:36:45 <br/>一网打尽    0:04:55 <br/>"
										},
										{
											"name": "A点预警",
											"value": 66.32,
											// "des": "人生的智慧   21:52:27    <br/> 血酬定律    10:37:54    <br/>美丽新世界   9:39:44 <br/>理想国 7:05:07 <br/>丑陋的中国人  6:27:40 <br/>拆掉思维的墙  5:33:30 <br/> 娱乐至死    4:13:20 <br/>伤逝  0:49:38 <br/>"
										},
										{
											"name": "B点预警",
											"value": 39.64,
											// "des": "白鹿原 30:25:01    <br/>活着  5:30:46 <br/>喻世明言    1:28:34 <br/>博尔赫斯短篇小说    1:21:18 <br/>城堡  0:41:00 <br/>雪国  0:11:36 <br/>"
										},
										{
											"name": "C点预警",
											"value": 25.96,
											// "des": "格调  6:24:07 <br/>许三观卖血记  4:16:50 <br/>人间失格    3:27:03 <br/>在爱情与欲望之间    2:15:08 <br/>苦妓回忆录   2:13:35 <br/>蝇王  1:43:23 <br/>一句顶一万句  1:33:50 <br/>儒林外史连环画 1:24:55 <br/>王朔文集    1:14:58 <br/>人兽鬼 0:57:12 <br/>三国史话    0:11:19 <br/>小说稗类    0:08:14 <br/>怦然心动的人生整理魔法 0:06:54 <br/>"
										}
									],

									itemStyle: {
											emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
											}
									}
							}
					]
			};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initwLt() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main-left-two"));
      var option = {
					// title: {
					// 		text: '量表制定方法',
					// 		subtext: '逻辑建构'
					// },
					// tooltip: {
					// 		trigger: 'item',
					// 		formatter: "{a} <br/>{b} : {c}%"
					// },
					// toolbox: {
					// 		feature: {
					// 				dataView: {readOnly: false},
					// 				restore: {},
					// 				saveAsImage: {}
					// 		}
					// },
					// legend: {
					// 		data: ['因子分析后确定最后量表','设计题目并发放','划分维度指标','文献综述','确定概念']
					// },
					calculable: false,
					series: [
							{
									name:'漏斗图',
									type:'funnel',
									left: '10%',
									top: 0,
									//x2: 80,
									bottom: 0,
									width: '80%',
									// height: {totalHeight} - y - y2,
									min: 0,
									max: 100,
									minSize: '0%',
									maxSize: '100%',
									sort: 'descending',
									gap: 2,
									label: {
											normal: {
													show: false,
													position: 'inside'
											},
											emphasis: {
													textStyle: {
															fontSize: 20
													}
											}
									},
									labelLine: {
											normal: {
													length: 10,
													lineStyle: {
															width: 1,
															type: 'solid'
													}
											}
									},
									itemStyle: {
											normal: {
													borderColor: '#fff',
													borderWidth: 1
											}
									},
									data: [
											{value: 60, name: '路灯'},
											{value: 40, name: '摄像头'},
											{value: 20, name: '传感器'},
											{value: 80, name: '压力传感器'},
											{value: 100, name: '显示屏'}
									]
							}
					]
			};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initwR() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main-right"));
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
            name: "工作大道",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "客户大道",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "学习大道",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "图标大道",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "折线大道",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initwRw() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main-right-two"));
      // 指定图表的配置项和数据
      // var legendData = ['车辆数', '设计车位']; //图例
			var indicator = [{
							// text: '小型车',
							max: 6000,
					},
					{
							// text: '中型车',
							max: 5000
					},
					{
							// text: '大型车',
							max: 5000
					},
					{
							// text: '货车',
							max: 5000,
							//  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
					},
					{
							// text: '特种车',
							max: 5000
					},
					{
							// text: '贵宾车',
							max: 5000
					}
			];
			var dataArr = [{
							value: [4300, 4700, 3600, 3900, 3800, 4200],
							// name: legendData[0],
							itemStyle: {
									normal: {
											lineStyle: {
													color: '#4A99FF',
													// shadowColor: '#4A99FF',
													// shadowBlur: 10,
											},
											shadowColor: '#4A99FF',
											shadowBlur: 10,
									},
							},
							areaStyle: {
											normal: { // 单项区域填充样式
													color: {
															type: 'linear',
															x: 0, //右
															y: 0, //下
															x2: 1, //左
															y2: 1, //上
															colorStops: [{
																	offset: 0,
																	color: '#4A99FF'
															}, {
																	offset: 0.5,
																	color: 'rgba(0,0,0,0)'
															}, {
																	offset: 1,
																	color: '#4A99FF'
															}],
															globalCoord: false
													},
													opacity: 1 // 区域透明度
											}
									}
					},
					{
							value: [3200, 3000, 3400, 2000, 3900, 2000],
							// name: legendData[1],
							itemStyle: {
									normal: {
											lineStyle: {
													color: '#4BFFFC',
													// shadowColor: '#4BFFFC',
													// shadowBlur: 10,
											},
											shadowColor: '#4BFFFC',
											shadowBlur: 10,
									},
							},
							areaStyle: {
											normal: { // 单项区域填充样式
													color: {
															type: 'linear',
															x: 0, //右
															y: 0, //下
															x2: 1, //左
															y2: 1, //上
															colorStops: [{
																	offset: 0,
																	color: '#4BFFFC'
															}, {
																	offset: 0.5,
																	color: 'rgba(0,0,0,0)'
															}, {
																	offset: 1,
																	color: '#4BFFFC'
															}],
															globalCoord: false
													},
													opacity: 1 // 区域透明度
											}
									}
					}
			];
			var colorArr = ['#4A99FF', '#4BFFFC']; //颜色
			var option = {
					color: colorArr,
					legend: {
							orient:'vertical',
							icon: 'circle', //图例形状
							// data: legendData,
							bottom:35,
							right:40,
							itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
							itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
							itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
							textStyle: {
									fontSize: 14,
									color: '#00E4FF',
							},
					},
					radar: {
							// shape: 'circle',
							name: {
									textStyle: {
											color: '#fff',
											fontSize: 16
									},
							},
							indicator: indicator,
							splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
									show: true,
									areaStyle: { // 分隔区域的样式设置。
											color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
									}
							},
							axisLine: { //指向外圈文本的分隔线样式
									lineStyle: {
											color: '#153269'
									}
							},
							splitLine: {
									lineStyle: {
											color: '#113865', // 分隔线颜色
											width: 1, // 分隔线线宽
									}
							},
					},
					series: [{
							type: 'radar',
							symbolSize: 8,
							// symbol: 'angle',
							data: dataArr
					}]
			};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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

		search(){
			alert('搜索气象点位'+this.input)
		},
		infoWindowClose (e) {
		this.infoWindow.show = false
		},
		infoWindowOpen (e) {
			this.infoWindow.show = true
		},
		draw ({el, BMap, map}) {
		const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
		el.style.left = pixel.x - 60 + 'px'
		el.style.top = pixel.y - 20 + 'px'
		},

		// 点击摄像头
		infoWindowOpenhead () {
				console.log('点击摄像头')
				this.show = true
		},

		handler ({BMap, map}) {
			const that = this;

			//定位
			// var geolocation = new BMap.Geolocation();
			// geolocation.getCurrentPosition(function(r) {
			//     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
			//         that.center.lng = r.longitude;
			//         that.center.lat = r.latitude;
			//         console.log(that.center);
			//     } else {
			//         alert("failed" + this.getStatus());
			//     }
			// });


			//摄像头标注点
			var bounds = map.getBounds();
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();
			var lngSpan = Math.abs(sw.lng - ne.lng);
			var latSpan = Math.abs(ne.lat - sw.lat);
			console.log(bounds)
			console.log(sw)
			console.log(ne)
			console.log(bounds)
			console.log(lngSpan)
			console.log(latSpan)

			var data_info=[]

			for (var i = 0; i < 25; i ++) {
					// console.log(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7))
					var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));

					data_info.push([sw.lng + lngSpan * (Math.random() * 0.7),ne.lat - latSpan * (Math.random() * 0.7),`${sw.lng + lngSpan * (Math.random() * 0.7)}`])
			}
			var opts = {
					// width : 250,     // 信息窗口宽度
					// height: 80,     // 信息窗口高度
					// title : "信息窗口" , // 信息窗口标题
					enableMessage:true//设置允许信息窗发送短息
			};
			for(var j=0;j<data_info.length;j++){
					var myIcon = new BMap.Icon(shexiangtou, new BMap.Size(15,30));
					var marker = new BMap.Marker(new BMap.Point(data_info[j][0],data_info[j][1]),{icon:myIcon});  // 创建标注
					// var content = data_info[i][2];

					// var content=`我是地址${i+1}`
					var content =
							`
						<div style="display:flex">
							<img style="width:50%" src="https://n.sinaimg.cn/sports/transform/283/w650h433/20200224/f6b5-ipzreiv5945213.jpg" alt="">
							<div>
								<div>位置:</div>
								<div>鸿福西路15号</div>
								<div>设备ID:</div>
								<div>12334567</div>
							</div>
						</div>
						<div>
							<div>
								状态:<span style="color: red;">三级警戒</span>
							</div>
							<div>状态说明:倾斜角度90度</div>
						</div>
						<div>
							数据异常
							<div>1.工作温度80℃</div>
							<div>2.工作温度:95℃</div>
						</div>
							`;
					
					map.addOverlay(marker);               // 将标注添加到地图中
					addClickHandler(content,marker);
			}
			function addClickHandler(content,marker){
					marker.addEventListener("click",function(e){
							openInfo(content,e)}
					);
			}
			function openInfo(content,e){
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
					map.openInfoWindow(infoWindow,point); //开启信息窗口
			}

			//计算距离划线
			var pointA = new BMap.Point(106.486654,29.490295);
			var pointB = new BMap.Point(106.581515,29.615467);       
		},
	},
}
	
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
.imgwh{
	width: 48%;
	height: 48%;
}
/deep/.el-form-item label{
	text-align: center;
}
/deep/.el-form-item{
	margin: 0;
}
.jm-video-list{
		display: flex;
		margin: 0 -10px;
		flex-wrap: wrap;
		.item{
			flex: 0 0 50%;
			padding: 5px;
			img{
				width: 100%;
			}
		
		}
	}
.jm-aside{
	width: 25% !important;
}
.sz-table{
	font-size: 12px
}
/deep/ .el-table  td, /deep/ .el-table th{
	padding: 5px 0;
}
.border{
	border:1px solid;
}
.flex{
	display: flex;
}
.map {
		height: 800px;
}
</style>