<style scoped lang="less">
    //隐藏地图自带按钮
    /deep/ .smnoprint{
        display: none !important;
    }
    /deep/ .zoom-control{
        display: none !important;
    }

    //全屏按钮
    .rel{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .jm-bdmap-full{
        position: fixed !important;
        z-index: 1000;
        left: 10px;
        right: 10px;
        bottom:10px;
        top: 10px;
    }
    .jm-map-tools{
        position: absolute;
        z-index: 1001;
        right: 5px;
        top: 5px;
    }
    .qpNone{
        display: none;
    }
    .qpBlock{
        display: block;
    }


    //围栏绘制
    #toolControl {
		position: absolute;
		top: 10px;
		left: 0px;
		right: 0px;
		margin: auto;
		width: 138px;
		z-index: 1001;
    }
	.toolItem {
		width: 30px;
		height: 30px;
		float: left;
		margin: 1px;
		padding: 4px;
		border-radius: 3px;
		background-size: 30px 30px;
		// background-position: 4px 4px;
		background-repeat: no-repeat;
		box-shadow: 0 1px 2px 0 #E4E7EF;
		background-color: #ffffff;
		// border: 1px solid #ffffff;
	}
	.toolItem:hover {
		border-color: #789CFF;
	}
	.active {
		border-color: #D5DFF2;
		background-color: #D5DFF2;
	}

	#polyline {
		background-image: url('../../assets/images/polyline.png');
	}
	#polygon {
		background-image: url('../../assets/images/polygon.png');
	}
	#circle {
		background-image: url('../../assets/images/circle.png');
    }

    //自定义覆盖物
    /deep/ .mydom{
        background-color: rgba(48,114,246,0.9);
        border-radius: 50%;
        width:84px;height:84px;
        line-height: 20px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position:absolute;
        top:-40px;left:0px;
        // animation: myfirst 1s infinite;
    }
    /deep/ .mydom1{
        animation: myfirst 1s infinite;
        position:absolute;
        top:-10px;left:0px;
    }
    @keyframes myfirst {
        0% {
            top:-10px;
        }
        50% {
            top:-20px;
        }
        100% {
           top:-10px;
        }
    }


    //右键菜单
    #menu{
        position:absolute;
        top:0;
        left:15px;
        width:100px; 
        display: none; 
        border:1px solid #666;
        border-bottom-width:0;
        background: white;
    }
    #menu li{
        list-style:none;
        text-indent:1em;
    }
    #menu li a{
        display:block;
        height:30px;
        line-height:30px;
        border-bottom:1px solid #666;
        text-decoration:none;
        color:black;
        font:12px/30px tahoma;
    }
    #menu li a:hover{
        background:#eee;
        color:black;
    }
</style>

<template>
    <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
        <div id="container"  style="width:100%;height:100%; border-radius: 10px;overflow: hidden;"></div>
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
</template>

<script src="https://map.qq.com/api/gljs?v=1.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script charset="utf-8" src="https://map.qq.com/api/gljs?libraries=tools&v=1.exp&key=4ETBZ-UYGLP-UH2DL-VQU7G-N6ETS-JSBSV"></script>
<script>
import  Vue  from  'vue' 
import  VueJsonp  from  'vue-jsonp'
Vue.use(VueJsonp)

import car from '../../assets/images/car1.png'
import sxt from '../../assets/images/shexiangtou.png'

export default {
    // store,
    props:{
        qp:Boolean,//是否开启全屏
        isLngLat:Boolean,//是否开启点击地图显示经纬度(注：isGL必须为false)
    },
    data(){
        return{
            isshowQp:'qpNone',//全屏
            isshowClassFull:false,//全屏
            TrackPlayback_marker:null,
            TrackPlayback_polylineLayer:null,
            isToolControl:'display:none',//显示隐藏绘制围栏工具栏
            statusZoom1:true,
            statusZoom2:false,
            infoWindows:[],//当前页面所有信息窗口
        }
    },
    beforeDestroy(){
        this.map.destroy()
    },
    mounted(){
        this.loadMap();
    },
    methods:{
        //加载地图
        loadMap() {
            var center = new TMap.LatLng(22.623756028232407, 113.12506198883057);
            var map = new TMap.Map("container", {
                zoom: 14,
                center: center,
                minZoom:13
            });

            //点击地图获取经纬度(使用非GL模式才能使用)
            if(this.isLngLat){
                map.on("click",function(evt){
                    alert(evt.latLng.getLat()+', '+evt.latLng.getLng())
                })
            }
            this.map=map;
            map.on('click',function(){
                let menu=document.getElementById('menu');
                menu.style.display='none'
            })

            if(this.qp){
                this.isshowQp='qpBlock'
            }

            //地图移动关闭右键菜单
            map.on("bounds_changed",function(){
                let menu=document.getElementById('menu');
                menu.style.display='none'
            })
            // let thatData=this;
            // function myInfoWindow(options) {
            //     TMap.DOMOverlay.call(this, options);
            // }

            // myInfoWindow.prototype = new TMap.DOMOverlay();

            // // 初始化
            // myInfoWindow.prototype.onInit = function(options) {
            //     this.position = options.position;
            //     this.content = options.content;
            //     this.path=options.path;
            // };
            
            // // 创建DOM元素，返回一个DOMElement
            // myInfoWindow.prototype.createDOM = function() {
            //     var mydom=document.createElement("div");

            //     //设置DOM样式
            //     mydom.classList.add("mydom");
            //     let that=this
            //     mydom.addEventListener('mouseenter',function(e){
            //         // console.log('鼠标移入')
            //         mydom.style.backgroundColor='red'
            //         var path = that.path;
                    
            //         //初始化polygon
            //         var polygon = new TMap.MultiPolygon({
            //             id: 'polygon-layer', //图层id
            //             map: map, //显示多边形图层的底图
            //             styles: { //多边形的相关样式
            //                 'polygon': new TMap.PolygonStyle({
            //                     'color': 'rgba(41,91,255,0.16)', //面填充色
            //                     'showBorder':true, //是否显示拔起面的边线
            //                     'borderColor': 'rgba(48,114,246,0.9)' //边线颜色
            //                 })
            //             },
            //             geometries: [
            //                 {
            //                     'id': 'polygon', //多边形图形数据的标志信息
            //                     'styleId': 'polygon', //样式id
            //                     'paths': path, //多边形的位置信息
            //                     'properties': { //多边形的属性数据
            //                         'title': 'polygon'
            //                     }
            //                 }
            //             ]
            //         });
            //         that.polygon=polygon;
            //         thatData.polygon=polygon;
            //     });
            //     mydom.addEventListener('mouseleave',function(e){
            //         // console.log('鼠标移出')
            //         mydom.style.backgroundColor='rgba(48,114,246,0.9)'
                    
            //         let polygon=that.polygon;
            //         polygon.setMap(null)
            //     });
            //     mydom.onclick=function(){
            //         console.log(that.position)
            //         map.setZoom(15)
            //         map.panTo(that.position)
            //     }
                
            //     var p1 =document.createElement('p');
            //     p1.innerHTML=this.content[0];
            //     p1.title=this.content[0]
            //     p1.style.cssText=`white-space: nowrap;margin-top: 5px;color:rgb(255, 255, 255);
            //     text-align: center;overflow: hidden;text-overflow: ellipsis;padding-left: 6px;
            //     padding-right: 6px;`

            //     var p2 =document.createElement('p');
            //     p2.innerHTML=this.content[1]
            //     p2.style.cssText=`color:rgb(255, 255, 255);text-align: center;`

            //     mydom.appendChild(p1);
            //     mydom.appendChild(p2);

            //     return mydom;
            // };
            
            // // 更新DOM元素，在地图移动/缩放后执行
            // myInfoWindow.prototype.updateDOM = function() {
            //     if (!this.map) {
            //         return;
            //     }
            
            //     // 经纬度坐标转容器像素坐标
            //     let pixel = this.map.projectToContainer(this.position);
            
            //     //默认使用DOM左上角作为坐标焦点进行绘制（左上对齐）
            //     //如想以DOM中心点（横向&垂直居中）或其它位置为焦点，可结合this.dom.clientWidth和this.dom.clientHeight自行计算
            //     let left = pixel.getX() - this.dom.clientWidth / 2 + 'px'; //本例水平居中
            //     let top = pixel.getY() + 'px';
                
            //     //将平面坐标转为三维空间坐标
            //     this.dom.style.transform = `translate3d(${left}, ${top}, 0px)`;
            // };

            // var myIW = [
            //     new myInfoWindow({
            //         map:map,
            //         position: new TMap.LatLng(22.633777242960548, 113.11407622910338),
            //         content:['上城区','1000人'],
            //         path:[
            //             new TMap.LatLng(22.648933916211263, 113.10518604616732),
            //             new TMap.LatLng(22.62819962332958, 113.1026136931257),
            //             new TMap.LatLng(22.615569869254443, 113.11624716030906),
            //             new TMap.LatLng(22.628945866384413, 113.12893743165546),
            //             new TMap.LatLng(22.64493203708423, 113.11401778872892),
            //         ]
            //     }),
            //     new myInfoWindow({
            //         map:map,
            //         position: new TMap.LatLng(22.615106334881148, 113.13811498569635),
            //         content:['下城区','800人'],
            //         path:[
            //             new TMap.LatLng(22.60535338018434, 113.16104934547468),
            //             new TMap.LatLng(22.619139157957875, 113.14920532077224),
            //             new TMap.LatLng(22.628328908829587, 113.1300660676817),
            //             new TMap.LatLng(22.6161285886854, 113.11564725558412),
            //             new TMap.LatLng(22.6045610509388, 113.13401407537015),
            //         ]
            //     })
            // ]

            // // let that=this;
            // //监听缩放级别
            // map.on("bounds_changed",function(){
            //     let zoom=map.getZoom()
            //     let menu=document.getElementById('menu');
            //     menu.style.display='none'
            //     console.log(zoom)
            //     var statusZoom1=thatData.statusZoom1;
            //     var statusZoom2=thatData.statusZoom2;
            //     if(zoom<15 && statusZoom1==true){
            //         for(let i=0;i<myIW.length;i++){
            //             myIW[i].setMap(null)
            //         }
            //         if(thatData.polygon!=undefined){
            //             let polygon=thatData.polygon;
            //             polygon.setMap(null)
            //         }
            //         thatData.statusZoom1=false;
            //         thatData.statusZoom2=true;
            //         myIW = [
            //             new myInfoWindow({
            //                 map:map,
            //                 position: new TMap.LatLng(22.633777242960548, 113.11407622910338),
            //                 content:['上城区','1000人'],
            //                 path:[
            //                     new TMap.LatLng(22.648933916211263, 113.10518604616732),
            //                     new TMap.LatLng(22.62819962332958, 113.1026136931257),
            //                     new TMap.LatLng(22.615569869254443, 113.11624716030906),
            //                     new TMap.LatLng(22.628945866384413, 113.12893743165546),
            //                     new TMap.LatLng(22.64493203708423, 113.11401778872892),
            //                 ]
            //             }),
            //             new myInfoWindow({
            //                 map:map,
            //                 position: new TMap.LatLng(22.615106334881148, 113.13811498569635),
            //                 content:['下城区','800人'],
            //                 path:[
            //                     new TMap.LatLng(22.60535338018434, 113.16104934547468),
            //                     new TMap.LatLng(22.619139157957875, 113.14920532077224),
            //                     new TMap.LatLng(22.628328908829587, 113.1300660676817),
            //                     new TMap.LatLng(22.6161285886854, 113.11564725558412),
            //                     new TMap.LatLng(22.6045610509388, 113.13401407537015),
            //                 ]
            //             })
            //         ]
            //     }else if(zoom>=15 && statusZoom2==true){
            //         for(let i=0;i<myIW.length;i++){
            //             myIW[i].setMap(null)
            //         }
            //         if(thatData.polygon!=undefined){
            //             let polygon=thatData.polygon;
            //             polygon.setMap(null)
            //         }
            //         thatData.statusZoom1=true;
            //         thatData.statusZoom2=false;
            //         myIW = [
            //             new myInfoWindow({
            //                 map:map,
            //                 position: new TMap.LatLng(22.62662708886313, 113.10751023791613),
            //                 content:['江门职业技术学院','1000人'],
            //                 path:[
            //                     new TMap.LatLng(22.629247356623864, 113.10969810117285),
            //                     new TMap.LatLng(22.630993613878047, 113.10357920398565),
            //                     new TMap.LatLng(22.630354299234227, 113.10359092393742),
            //                     new TMap.LatLng(22.63018666476097, 113.10230749375933),
            //                     new TMap.LatLng(22.628040418381147, 113.10315222880706),
            //                     new TMap.LatLng(22.624173538667094, 113.10764423378305),
            //                     new TMap.LatLng(22.624687638794057, 113.10827384101844),
            //                     new TMap.LatLng(22.621172387240506, 113.1126645741358),
            //                     new TMap.LatLng(22.621820614041724, 113.11340315205439),
            //                     new TMap.LatLng(22.626822049010343, 113.10868925018178),
            //                 ]
            //             })
            //         ]
            //     }
            // })
        },

        //全屏
        isshowFull(){
            this.isshowClassFull=!this.isshowClassFull;
        },

        //轨迹回放
        // var from=[22.629955329658163,113.11011672019958];
        // var to=[22.62706367752099,113.1170904636383];
        // var isClean=true/false //清除轨迹回放
        TrackPlayback(from,to,isClean){
            let map=this.map;

            var marker=this.TrackPlayback_marker;
            var polylineLayer=this.TrackPlayback_polylineLayer;
            if(isClean){
                marker.setMap(null);
                polylineLayer.setMap(null)
            }else{
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
            }
        },

        //点标记
        // let markers=[
        //     [22.6299042863414, 113.10935038008631,'某某某监测点1','某某地址1','正常','江门市人才岛规划中心1'],
        //     [22.62294167877627, 113.12120555907086,'某某某监测点2','某某地址2','正常','江门市人才岛规划中心2'],
        //     [22.628242908743516, 113.12518525280257,'某某某监测点3','某某地址3','正常','江门市人才岛规划中心3'],
        //     [22.615144268435017, 113.14163997653043,'某某某监测点4','某某地址4','正常','江门市人才岛规划中心4'],
        //     [22.606327713247822, 113.13175385078466,'某某某监测点5','某某地址5','正常','江门市人才岛规划中心5'],
        //     [22.6120380146221, 113.13163614103405,'某某某监测点6','某某地址6','正常','江门市人才岛规划中心6'],
        // ]
        MultiMarker(markers){
            let map=this.map;
            //22.6299042863414, 113.10935038008631
            let geometries=[]
            for(let i=0;i<markers.length;i++){
                let geometrie={
                    "id":i+1,//点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                    "styleId": 'myStyle',//指定样式id
                    "position": new TMap.LatLng(markers[i][0],markers[i][1]), //点标记坐标位置
                    "title": markers[i][2],
                    'address':markers[i][3],
                    "status":markers[i][4],
                    "dep":markers[i][5]
                }
                geometries.push(geometrie)
            }
            //创建并初始化MultiMarker
            var markerLayer = new TMap.MultiMarker({
                map: map,  //指定地图容器
                //样式定义
                styles: {
                    //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
                    "myStyle": new TMap.MarkerStyle({ 
                        "width": 10,  // 点标记样式宽度（像素）
                        "height": 15, // 点标记样式高度（像素）
                        "src": sxt,  //图片路径
                        //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                        "anchor": { x: 16, y: 32 }  
                    }) 
                },
                //点标记数据数组
                geometries,
            });

            var infoWindow = new TMap.InfoWindow({
                map: map,
                position: new TMap.LatLng(22.6299042863414, 113.10935038008631),
                offset: { x: -8, y: -32 } //设置信息窗相对position偏移像素
            });
            infoWindow.close();//初始关闭信息窗关闭
            //监听标注点击事件
            markerLayer.on("click", function (evt) {
                // console.log(evt)
                //设置infoWindow
                infoWindow.open(); //打开信息窗
                map.panTo(new TMap.LatLng(evt.geometry.position.lat,evt.geometry.position.lng));
                infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
                infoWindow.setContent(`
                    <div>
                        <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${evt.geometry.title}</h4>
                        <div style="text-align:left;margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${evt.geometry.address}</span></div>
                        <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${evt.geometry.status}</span></div>
                        <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${evt.geometry.dep}</span></div>
                    </div>
                `);//设置信息窗内容
            })
        },

        //绘制围栏
        Editor(row){
            this.isToolControl='display:block'

            var map, editor, activeType = 'polygon';

            // 切换激活图层
            document.getElementById('toolControl').addEventListener('click', (e) => {
                let id = e.target.id;
                if (id !== 'toolControl') {
                    document.getElementById(activeType).className = "toolItem";
                    document.getElementById(id).className = "toolItem active";
                    activeType = id;

                    editor.setActiveOverlay(id);
                }
            });
            // 初始化几何图形及编辑器
            editor = new TMap.tools.GeometryEditor({
                map:this.map, // 编辑器绑定的地图对象
                overlayList: [ // 可编辑图层
                    {
                        overlay: new TMap.MultiPolygon({
                            map:this.map,
                        }),
                        id: 'polygon'
                    },
                    {
                        overlay: new TMap.MultiCircle({
                            map:this.map
                        }),
                        id: 'circle'
                    }
                ],
                actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, // 编辑器的工作模式
                activeOverlayId: 'polygon', // 激活图层
                snappable: true // 开启吸附
            });
            // 监听绘制结束事件，获取绘制几何图形
            editor.on('draw_complete', (geometry) => {
                var x = 0.0;
                var y = 0.0;
                for(let i=0;i<geometry.paths.length;i++){
                    x=x+ parseFloat(geometry.paths[i].lng);
                    y=y+ parseFloat(geometry.paths[i].lat);
                }
                x=x/geometry.paths.length;
                y=y/geometry.paths.length;
                var label = new TMap.MultiLabel({
                    id: row.id,
                    map: this.map,
                    styles: {
                        'label': new TMap.LabelStyle({
                            'color': '#3777FF', //颜色属性
                            'size': 20, //文字大小属性
                            'offset': { x: 0, y: 0 }, //文字偏移属性单位为像素
                            'angle': 0, //文字旋转属性
                            'alignment': 'center', //文字水平对齐属性
                            'verticalAlignment': 'middle' //文字垂直对齐属性
                        })
                    },
                    geometries:[{
                        'id': row.id, //点图形数据的标志信息
                        'styleId': 'label', //样式id
                        'position': new TMap.LatLng(y,x), //标注点位置
                        'content':row.title, //标注文本
                        'properties': { //标注点的属性数据
                            'title': 'label'
                        }
                    }],
                });
                this.label=label
                this.polygon=editor.getOverlayList()[0].overlay;
                editor.destroy()
            });
        },
        
        //删除围栏
        delEditor(row){
            let map=this.map;
            let polygon=this.polygon;
            polygon.setMap(null)
            this.label.setMap(null)
        },


        //自定义覆盖物(跳动预警效果)
        // var details=[
        //     {
        //         position:[22.626912484009722,113.12394377988574],
        //         content:['某某某监测点1','某某地址1','正常','江门市人才岛规划中心1']
        //     }
        // ]
        zdyfgw(details){
            let thatData=this;
            function myInfoWindow(options) {
                TMap.DOMOverlay.call(this, options);
            }
            myInfoWindow.prototype = new TMap.DOMOverlay();
            
            // 初始化
            myInfoWindow.prototype.onInit = function(options) {
                this.position = options.position;
                this.content = options.content;
            };
            
            // 创建DOM元素，返回一个DOMElement
            myInfoWindow.prototype.createDOM = function() {
                let that=this;
                var mydom=document.createElement("img");
                //设置DOM样式
                mydom.id='mydom'
                mydom.setAttribute("src", sxt);
                mydom.style.width='10px';
                mydom.style.height='15px';
                mydom.style.position="absolute";
                mydom.style.top="-8px"
                mydom.style.left="4px";
                
                //右键事件
                mydom.onmousedown=function(e){
                    if(e.button==2){
                        // var mydom=document.getElementById('mydom')
                        let strStartIndex = mydom.style.cssText.indexOf('(');
                        let strEndIndex = mydom.style.cssText.indexOf(')');
                        let loca=mydom.style.cssText.substring(strStartIndex+1,strEndIndex).split(',')
                        let menu=document.getElementById('menu');
                        if(loca[1].split('px')[0]>=366){
                            loca[1]='366px'
                        }
                        menu.style.transform=`translate3d(${loca[0]},${loca[1]},0px)`
                        menu.style.display='block'
                    }
                }
                
                //点击弹出信息窗口
                var infoWindow = new TMap.InfoWindow({
                    map: thatData.map,
                    position: that.position,
                });
                let infoWindows=thatData.infoWindows;
                infoWindows.push(infoWindow)
                thatData.infoWindows=infoWindows;
                
                infoWindow.close()
                mydom.onclick=function(){
                    var infoWindowClose=thatData.infoWindowClose;
                    if(infoWindowClose){
                        infoWindowClose.close()
                    }
                    infoWindow.open();
                    let map=thatData.map;
                    map.panTo(that.position)
                    infoWindow.setPosition(that.position)
                    infoWindow.setContent(`
                        <div>
                            <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${that.content[0]}</h4>
                            <div style="text-align:left;margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${that.content[1]}</span></div>
                            <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${that.content[2]}</span></div>
                            <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${that.content[3]}</span></div>
                        </div>
                    `);//设置信息窗内容
                    thatData.infoWindowClose=infoWindow;
                }
                
                // mydom.classList.add("mydom1");
                return mydom;
            };
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
                // thatData.transformLeft=left;
                // thatData.transformTop=top;
            };

            for(let i=0;i<details.length;i++){
                new myInfoWindow({
                    map:this.map,
                    position:new TMap.LatLng(details[i].position[0],details[i].position[1]),
                    content:details[i].content
                })
            }
        },

        //点击按钮弹出信息窗口
        // position=[经度,纬度]
        // content=[标题,位置,设备状态,所属单位]
        isShowInfoWindow(position,content){
            let infoWindows=this.infoWindows;
            let map=this.map;
            for(let i=0;i<infoWindows.length;i++){
                if(position[0]==infoWindows[i].position.lat && position[1]==infoWindows[i].position.lng){
                    let infoWindow=infoWindows[i];
                    var infoWindowClose=this.infoWindowClose;
                    if(infoWindowClose){
                        infoWindowClose.close()
                    }
                    infoWindow.open()
                    map.panTo(new TMap.LatLng(infoWindows[i].position.lat,infoWindows[i].position.lng))
                    infoWindow.setPosition(new TMap.LatLng(infoWindows[i].position.lat,infoWindows[i].position.lng))
                    infoWindow.setContent(`
                        <div>
                            <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${content[0]}</h4>
                            <div style="text-align:left;margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${content[1]}</span></div>
                            <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${content[2]}</span></div>
                            <div style="text-align:left;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${content[3]}</span></div>
                        </div>
                    `);//设置信息窗内容
                    this.infoWindowClose=infoWindow;
                }
            }
        },
        
        //重点人群模块类似点聚合功能
        MarkerCluster(){
            let mythis=this;
            let map=this.map;
            function myInfoWindow(options) {
                TMap.DOMOverlay.call(this, options);
            }
            myInfoWindow.prototype = new TMap.DOMOverlay();
            
            // 初始化
            myInfoWindow.prototype.onInit = function(options) {
                this.position = options.position;
                this.content = options.content;
                this.title=options.title;
            };
            
            // 创建DOM元素，返回一个DOMElement
            myInfoWindow.prototype.createDOM = function() {
                let that=this;
                var mydom=document.createElement("div");
                //设置DOM样式
                mydom.style.cssText = `background-color: rgba(255, 182, 0, 0.7);
                                        height: 38px;
                                        width: 38px;
                                        border: 1px solid rgb(204, 145, 0);
                                        border-radius: 19px;
                                        box-shadow: rgb(255, 182, 0) 0px 0px 1px;
                                        line-height: 38px;
                                        color: rgb(102, 73, 0);
                                        font-size: 14px;
                                        text-align: center;
                                        cursor:pointer`
                mydom.innerHTML=this.content;
                mydom.onclick=function(){
                    console.log(that.title)
                    let DialogData={isShow:true,title:that.title}
                    mythis.$emit('isDialog',DialogData)
                }

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
                let top = pixel.getY() - this.dom.clientHeight / 2 + 'px';
                
                //将平面坐标转为三维空间坐标
                this.dom.style.position = 'absolute';
                this.dom.style.left = left;
                this.dom.style.top = top;
            };

            var myIW = [
                new myInfoWindow({
                    map,
                    position: new TMap.LatLng(22.638357519902115, 113.11537303721707),
                    content:"100",
                    title:'富岗'
                }),
                new myInfoWindow({
                    map,
                    position: new TMap.LatLng(22.61342114006021, 113.12799776346196),
                    content:"100",
                    title:'某岗村'
                }),
                new myInfoWindow({
                    map,
                    position: new TMap.LatLng(22.608151679762784, 113.14889626296815),
                    content:"100",
                    title:'白鹤沙'
                }),
            ]

            map.on('bounds_changed',function(){
                if(map.getZoom()>=15 && map.getZoom()<=16){
                    for(let i=0;i<myIW.length;i++){
                        myIW[i].setMap(null)
                    }
                    myIW=[
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.64071862454074, 113.11865997944369),
                            content:"100",
                            title:'洪圣公园'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.617722191740427, 113.127092304141),
                            content:"50",
                            title:'战狼特训营'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.61232087980642, 113.13257064810534),
                            content:"50",
                            title:'益林'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.610031709170585, 113.14983967636795),
                            content:"38",
                            title:'小海河湿地公园'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.608069871369025, 113.15341615996454),
                            content:"62",
                            title:'特成沙'
                        }),
                    ]
                }else if(map.getZoom()<=15){
                    for(let i=0;i<myIW.length;i++){
                        myIW[i].setMap(null)
                    }
                    myIW=[
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.638357519902115, 113.11537303721707),
                            content:"100",
                            title:'富岗'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.61342114006021, 113.12799776346196),
                            content:"100",
                            title:'某岗村'
                        }),
                        new myInfoWindow({
                            map,
                            position: new TMap.LatLng(22.608151679762784, 113.14889626296815),
                            content:"100",
                            title:'白鹤沙'
                        }),
                    ]
                }
            })
        },


        //右键菜单点击事件
        aaa(){
            console.log(1)
        }
    }
}
</script>