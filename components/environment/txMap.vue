<style scoped lang="less">
//隐藏地图自带按钮
/deep/ .smnoprint {
  display: none !important;
}
/deep/ .zoom-control {
  display: none !important;
}

//全屏按钮
.rel {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.jm-bdmap-full {
  position: fixed !important;
  z-index: 1000;
  left: 10px;
  right: 10px;
  bottom: 10px;
  top: 10px;
}
.jm-map-tools {
  position: absolute;
  z-index: 1001;
  right: 5px;
  top: 5px;
}
.contextStyle {
	display: none;
	position: absolute;
	top: 1400%;
	right: 650%;
	.item{
		min-width:100px;
	}
}
.contextStyle1 {
	display: none;
	position: absolute;
	top: 1650%;
	right: 1055%;
	.item{
		min-width:100px;
	}
}
.qpNone {
  display: none;
}
.qpBlock {
  display: block;
}
</style>

<template>
  <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
    <div id="container" style="width:100%;height:100%; border-radius: 10px;overflow: hidden;"></div>
    <div class="jm-map-tools">
			<div class="jm-map-tools">
					<el-button @click="isshowFull" size="mini" :class="isshowQp">{{this.isshowClassFull==false?'全屏':'取消全屏'}}</el-button>
			</div>
			<div id="toolControl" :style="isToolControl">
					<div class="toolItem active" id="polygon" title="多边形"></div>
					<div class="toolItem" id="circle" title="圆形"></div>
			</div>
			<!-- 右键菜单 -->
			<div id="menu" style="z-index:1000">
					<ul>
							<li @click="aaa"><a href="#">打开</a></li>
							<li><a href="#">车辆识别</a></li>
							<li><a href="#">详情</a></li>
					</ul>
			</div>
    </div>
  </div>
</template>

<script src="https://map.qq.com/api/gljs?v=1.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script>
import Vue from "vue";
import VueJsonp from "vue-jsonp";
Vue.use(VueJsonp);

import car from '../../assets/images/car1.png'
import shexiangtou from "../../assets/images/shexiangtou.png";
export default {
	props: {
		qp: Boolean, //是否开启全屏
		isGL: Boolean, //是否使用GL API
		isLngLat: Boolean, //是否开启点击地图显示经纬度(注：isGL必须为false)
		Tabs: String, // 判断传入页面
		point: Array, // 坐标数据
	},
	data() {
		return {
			isshowQp: "qpNone", //全屏
			isshowClassFull: false, //全屏
			map: {},
			infoWindow: {}
		};
	},
	mounted() {
		this.loadMap();
	},
	methods: {
		// 定位
		location(point){
			let that = this;
			that.map.setCenter(new TMap.LatLng(point.lat,point.lng));
			that.infoWindow.map(item=>{
				item.close();
			})
			that.infoWindow[point.snumber].open()
			var right = document.getElementById('context')
			right.style.display = 'none';
			right.style.display = 'block';
		},

		// 展示围栏
		tmap(point){
			let that = this;
			let path = [
				new TMap.LatLng(point[3].lat, point[3].lng),
				new TMap.LatLng(point[4].lat, point[4].lng),
				new TMap.LatLng(point[5].lat, point[5].lng)
				// new TMap.LatLng(that.point[6].lat, that.point[6].lng),
			];
			//自定义DOM覆盖物 - 继承DOMOverlay
			var mydom;
			function myInfoWindow(options) {
					TMap.DOMOverlay.call(this, options);
			}
			myInfoWindow.prototype = new TMap.DOMOverlay();
			
			// 初始化
			myInfoWindow.prototype.onInit = function(options) {
					this.position = options.position;
					this.content = options.content;
					this.id = options.id
			};
			
			// 创建DOM元素，返回一个DOMElement
			myInfoWindow.prototype.createDOM = function() {
				mydom=document.createElement("div");
				//设置DOM样式
				mydom.style.cssText = `
					height:25px;
					padding:5px;
					background:#fff;
					border:#ccc solid 1px;
					line-height:15px;
					font-size:12px;
					position:absolute;
					top:0px;
					left:0px;
				`;
				mydom.id = this.id
				mydom.innerHTML=this.content;
				return mydom;
			};
			
			// 更新DOM元素，在地图移动/缩放后执行
			myInfoWindow.prototype.updateDOM = function() {
					if (!that.map) {
							return;
					}
					// 经纬度坐标转容器像素坐标
					let pixel = that.map.projectToContainer(this.position);
			
					//默认使用DOM左上角作为坐标焦点进行绘制（左上对齐）
					//如想以DOM中心点（横向&垂直居中）或其它位置为焦点，可结合this.dom.clientWidth和this.dom.clientHeight自行计算
					let left = pixel.getX() - this.dom.clientWidth / 2 + 'px'; //本例水平居中
					let top = pixel.getY() + 'px';
					
					//将平面坐标转为三维空间坐标
					this.dom.style.transform = `translate3d(${left}, ${top}, 0px)`;
			};
			
			//自定义一个更新内容的方法 
			myInfoWindow.prototype.updateContent = function(content) {
					mydom.innerHTML=content;
			};
			
			//创建一个自定义的infoWindow
			var list = [
				new TMap.LatLng(point[0].lat, point[0].lng),
				new TMap.LatLng(point[4].lat, point[4].lng)
			]
			var myIW = new myInfoWindow({
					map:that.map,
					position: list[0],
					content:"圆形围栏",
					id:'circle'
			})
			var myIW1 = new myInfoWindow({
					map:that.map,
					position: list[1],
					content:"矩形围栏",
					id:'polygon'
			})
			function $(ele){
				return document.getElementById(ele)
			};

			// 显示围栏
			//创建圆形覆盖物
			var circle = new TMap.MultiCircle({
				styles: {
				// 设置圆形样式
					circle: new TMap.CircleStyle({
						color: "rgba(41,91,255,0.16)",
						showBorder: true,
						borderColor: "rgba(41,91,255,1)",
						borderWidth: 2
					})
				},
				geometries: [
					{
						styleId: "circle",
						center: new TMap.LatLng(point[0].lat, point[0].lng), //圆形中心点坐标
						radius: 600 //半径（单位：米）
					}
				]
			});
			//创建多边形围栏
			var polygon = new TMap.MultiPolygon({
				id: "polygon-layer", //图层id
				// map: map, //设置多边形图层显示到哪个地图实例中
				//多边形样式
				styles: {
					polygon: new TMap.PolygonStyle({
						color: "rgba(41,91,255,0.16)", //面填充色
						showBorder: true, //是否显示拔起面的边线
						borderColor: "rgba(41,91,255,1)" //边线颜色
					})
				},
				//多边形数据
				geometries: [
					{
						id: "p1", //该多边形在图层中的唯一标识（删除、更新数据时需要）
						styleId: "polygon", //绑定样式名
						paths: path //多边形轮廓
					}
				]
			});

			function showcircle(e,value){
				console.log(that.map)
				console.log(e)
				$(value).style.background = 'yellow'
				e.setMap(that.map)
			};
			function clearcircle(e,value){
				$(value).style.background = '#fff'
				e.setMap(null)
			};
			$('circle').addEventListener('mouseover',function(){
				showcircle(circle,'circle')
			})
			$('circle').addEventListener('mouseleave',function(){
				clearcircle(circle,'circle');
			})
			$("polygon").addEventListener('mouseover',function(){
				showcircle(polygon,'polygon')
			})
			$("polygon").addEventListener('mouseleave',function(){
				clearcircle(polygon,'polygon')
			})
		},

		// 菜单栏
		show(){
			alert("点击了菜单")
		},
		//加载地图
		loadMap() {
			// console.log(this.isGL)
			// if (this.isGL) {
				var center = new TMap.LatLng(22.623756028232407, 113.12506198883057);
				var map = new TMap.Map("container", {
				zoom: 14,
				center: center
				});
				this.map = map;
			// } else {
				// var center = new qq.maps.LatLng(22.623756028232407, 113.12506198883057);
				// var map = new qq.maps.Map(document.getElementById("container"), {
				// zoom: 14,
				// center: center
				// });
				// this.map = map;

				//点击地图获取经纬度(使用非GL模式才能使用)
				if (this.isLngLat) {
				qq.maps.event.addListener(map, "click", function(event) {
					alert(event.latLng.getLat() + ", " + event.latLng.getLng());
				});
				}
			// }
			this.map = map;

			if (this.qp) {
				this.isshowQp = "qpBlock";
			}
		},
		
		// 创建坐标点,创建点击信息弹出窗，点聚合
		createMark(point) {
			var that = this;
			console.log(point);
			// 创建标记点组
			var geometries = new Array();
			for (let i = 0; i < point.length; i++) {
				let item = point[i];
				geometries.push({
					id: i + 1,
					styleId: "myStyle",
					position: new TMap.LatLng(item.lat, item.lng),
					properties: {
						title: `marker${i}`
					}
				});
			}

			// 创建坐标函数
			var markerLayer = new TMap.MultiMarker({
				map: that.map, //指定地图容器
				//样式定义
				styles: {
				//创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
					myStyle: new TMap.MarkerStyle({
						width: 20, // 点标记样式宽度（像素）
						height: 20, // 点标记样式高度（像素）
						src: shexiangtou, //图片路径
						//焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
						anchor: { x: 16, y: 32 }
					})
				},
				//点标记数据数组
				geometries: geometries
			});

			//创建信息弹出窗
			// 创建信息弹窗
			let infoWindow = new Array();
			var content = "";
			if (that.Tabs == "syn") {
				content = `
					<img style='width:200px' src='https://n.sinaimg.cn/sports/transform/283/w650h433/20200224/f6b5-ipzreiv5945213.jpg'>
					<div>1#监控</div>
					<div>位置：*******路口</div>
					<div>坐标：117.99,168.77</div>
					<div>设备状态：正常</div>
					<div>所属单位：江门市</div>
				`;
			} else if(that.Tabs == 'met'){
				content = `
					<div>1#气象站</div>
					<div>位置：*******路口</div>
					<div>坐标：117.99,168.77</div>
					<div>设备状态：正常</div>
					<div>所属单位：江门市</div>
				`
			}
			for (let j = 0; j < point.length; j++) {
				let jtem = point[j];
				//初始化infoWindow
				infoWindow[j] = new TMap.InfoWindow({
				map: that.map,
				position: new TMap.LatLng(jtem.lat, jtem.lng),
				offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素，为了使其显示在Marker的上方
				//设置infoWindow，content支持直接传入html代码，以实现各类内容格式需求
				content: content
				});
				infoWindow[j].close(); //初始关闭信息窗关闭
			}
			that.infoWindow = infoWindow
			// console.log(infoWindow);


			//自定义DOM覆盖物 - 继承DOMOverlay
			function myInfoWindow(options) {
				var mydom;
				TMap.DOMOverlay.call(this, options);
			}
			myInfoWindow.prototype = new TMap.DOMOverlay();
			
			// 初始化
			myInfoWindow.prototype.onInit = function(options) {
				this.position = options.position;
				this.content = options.content;
				this.Style = options.Style;
			};
			// 创建DOM元素，返回一个DOMElement
			myInfoWindow.prototype.createDOM = function() {
				mydom=document.createElement("div");
				//设置DOM样式
				// mydom.style.cssText = 'height:15px;max-width:120px;padding:5px;background:#fff;border:#ccc solid 1px;\
				// 					line-height:15px;font-size:12px;position:absolute;top:0px;left:0px;';
				mydom.style.cssText = this.Style
				mydom.innerHTML=this.content;
				return mydom;
			};
			// 更新DOM元素，在地图移动/缩放后执行
			myInfoWindow.prototype.updateDOM = function() {
				if (!this.map) {
					return;
				}
			
				// 经纬度坐标转容器像素坐标
				let pixel = this.map.projectToContainer(this.position);
			
				//默认使用DOM左上角作为坐标焦点进行绘制（左上对齐）
				//如想以DOM中心点（横向&垂直居中）或其它位置为焦点，可结合this.dom.clientWidth和this.dom.clientHeight自行计算
				let left = pixel.getX() - this.dom.clientWidth / 2 + 'px'; //本例水平居中
				let top = pixel.getY() + 'px';
				
				//将平面坐标转为三维空间坐标
				this.dom.style.transform = `translate3d(${left}, ${top}, 0px)`;
			};
			//自定义一个更新样式的方法 
			myInfoWindow.prototype.updateDOM = function(content) {
				mydom.style.cssText=content;
			};



			// 创建点聚合实例
			// var markerCluster = new TMap.MarkerCluster({
			// 	// id: "cluster",
			// 	map: that.map,
			// 	enableDefaultStyle: true, // 启用默认样式
			// 	minimumClusterSize: 2, // 形成聚合簇的最小个数
			// 	geometries: geometries,
			// 	zoomOnClick: true, // 点击簇时放大至簇内点分离
			// 	gridSize: 60, // 聚合算法的可聚合距离
			// 	averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
			// 	maxZoom: true // 采用聚合策略的最大缩放级别
			// });
			//监听标注点击事件
			
			var container = document.getElementById('container')
			container.addEventListener('mousedown',function(e){
				var right = document.getElementById('context')
				console.log(e)
				markerLayer.on("click", function(evt) {
					for (let h = 0; h < point.length; h++) {
						infoWindow[h].close(); //关闭信息窗关闭
					}
					if (evt.geometry !== null) {
						var index = evt.geometry.id - 1;
					}
					//设置infoWindow
					if (evt.cluster == undefined) {
						// infoWindow[index].open(); //打开信息窗
						// infoWindow[index].setPosition(evt.geometry.position); //设置信息窗位置
						// // console.log(new TMap.LatLng(that.point[index].lat,that.point[index].lng))
						that.map.setCenter(new TMap.LatLng(point[index].lat,point[index].lng));
						// // map.setZoom(17);
					}
					// infoWindow[j].setContent(evt.geometry.position.toString());//设置信息窗内容
				});
				right.style.display = 'none';
				if(e.which === 1){
					markerLayer.on("click", function(evt) {
						for (let h = 0; h < point.length; h++) {
							infoWindow[h].close(); //关闭信息窗关闭
						}
						if (evt.geometry !== null) {
							var index = evt.geometry.id - 1;
						}
						//设置infoWindow
						if (evt.cluster == undefined) {
							infoWindow[index].open(); //打开信息窗
							infoWindow[index].setPosition(evt.geometry.position); //设置信息窗位置
							// console.log(new TMap.LatLng(that.point[index].lat,that.point[index].lng))
							that.map.setCenter(new TMap.LatLng(point[index].lat,point[index].lng));
							// map.setZoom(17);
						}
						// infoWindow[j].setContent(evt.geometry.position.toString());//设置信息窗内容
						console.log(right)
						right.style.display = 'block';
					});
				}else if(e.which === 3){
					// if(e.target.tagName === 'IMG'){
						markerLayer.on("click", function(evt) {
							for (let h = 0; h < point.length; h++) {
								infoWindow[h].close(); //关闭信息窗关闭
							}
							if (evt.geometry !== null) {
								var index = evt.geometry.id - 1;
							}
							//设置infoWindow
							if (evt.cluster == undefined) {
								infoWindow[index].open(); //打开信息窗
								
								infoWindow[index].setPosition(evt.geometry.position); //设置信息窗位置
								// console.log(new TMap.LatLng(that.point[index].lat,that.point[index].lng))
								that.map.setCenter(new TMap.LatLng(point[index].lat,point[index].lng));
								// map.setZoom(17);
							}
							// infoWindow[j].setContent(evt.geometry.position.toString());//设置信息窗内容
						});
						
					// }
				}
			})
		},	

		//全屏
		isshowFull() {
			this.isshowClassFull = !this.isshowClassFull;
		},

		//轨迹回放
		TrackPlayback(from,to){
            let map=this.map;

            var marker=this.TrackPlayback_marker;
            var polylineLayer=this.TrackPlayback_polylineLayer;
            if(marker!=null){
                marker.setMap(null);
                polylineLayer.setMap(null)
            }

            map.setCenter(new TMap.LatLng(from[0],from[1]));
            map.setZoom(16)

            from=`${from[0]},${from[1]}`
            to=`${to[0]},${to[1]}`
            // var from='22.629955329658163,113.11011672019958';
            // var to='22.62706367752099,113.1170904636383';
            Vue.jsonp('https://apis.map.qq.com/ws/direction/v1/driving/',
            {
                from,
                to,
                output:'jsonp',
                key:'4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV'
            }).then(json=>{
                console.log(json)
                var coors = json.result.routes[0].polyline, pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩，因此需要解压）
                var kr = 1000000;
                for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
								}
                //将解压后的坐标生成LatLng数组
                for (var i = 0; i < coors.length; i += 2) {
                    pl.push(new TMap.LatLng(coors[i], coors[i+1]));
                }
                
                var path=pl;

                polylineLayer = new TMap.MultiPolyline({
                    map, // 绘制到目标地图
                    // 折线样式定义
                    styles: {
                        'style_blue': new TMap.PolylineStyle({
                        'color': '#3777FF', //线填充色
                        'width': 4, //折线宽度
                        'borderWidth': 2, //边线宽度
                        'borderColor': '#FFF', //边线颜色
                        'lineCap': 'round' //线端头方式
                        })
                    },
                    geometries: [{
                        styleId: 'style_blue',
                        paths: path
                    }],
                });
                //创建mareker（小车）
                marker = new TMap.MultiMarker({
                    map,
                    styles: { //样式设置
                        'car-down': new TMap.MarkerStyle({
                        'width': 40,  //小车图片宽度（像素）
                        'height': 40, //高度
                        'anchor': {   //图片中心的像素位置（小车会保持车头朝前，会以中心位置进行转向）
                            x: 20,y: 20,
                        },
                        'faceTo': 'map',  //取’map’让小车贴于地面，faceTo取值说明请见下文图示
                        'rotate': 180,    //初始小车朝向（正北0度，顺时针一周为360度，180为正南）
                        'src': car,   //小车图片（图中小车车头向上，即正北0度）
                        })
                    },
                    geometries: [{    //小车marker的位置信息
                        id: 'car',      //因MultiMarker支持包含多个点标记，因此要给小车一个id
                        styleId: 'car-down',    //绑定样式
                        position: new TMap.LatLng(from[0],from[1]),//初始坐标位置
                        }]
                    });
                    
                    //调用moveAlong，实现小车移动
                    marker.moveAlong({ 
                        "car": {    //设置让"car"沿"path"移动，速度70公里/小时
                            path,
                            speed: 500
                            }
                        }, 
                        {
                        autoRotation:true   //车头始终向前（沿路线自动旋转）
                })

                this.TrackPlayback_polylineLayer=polylineLayer;
                this.TrackPlayback_marker=marker;
            }).catch(err=>{
                console.log(err)
            })
        },
	}
};
</script>