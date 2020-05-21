<style scoped lang="less">
    /deep/ .BMapLib_marker{
        display: none;
    }

    /deep/ .BMapLib_polyline{
        display: none;
    }

    .rel{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .jm-map-tools{
        position: absolute;
        z-index: 3;
        right: 5px;
        top: 5px;
    }
    .qpNone{
        display: none;
    }
    .qpBlock{
        display: block;
    }
    .jm-bdmap-full{
        position: fixed !important;
        z-index: 1000;
        left: 10px;
        right: 10px;
        bottom:10px;
        top: 10px;
    }
    /deep/ .fgw{
        position: absolute;
        // padding: 2px;
        white-space: nowrap;
        left: 102px;
        top: 249px;
        background-color: rgba(255, 199, 0, 0.7);
        height: 30px;
        width: 30px;
        border: 1px solid rgb(204, 159, 0);
        border-radius: 100%;
        box-shadow: rgb(255, 199, 0) 0px 0px 1px;
        line-height: 30px;
        color: rgb(102, 79, 0);
        font-size: 14px;
        text-align: center;
        z-index:1000;
    }

    //3D控件
    /deep/ .BMap_noprint{
        right: 5px !important;
        bottom: 50px !important;
    }

    //右键菜单
    /deep/ .BMap_contextMenu>div{
        color: red !important;
        border: 1px solid red;
    }
</style>

<template>
    <!-- rel  jm-bdmap-full -->
    <div :class="isshowClassFull==false?'rel':'jm-bdmap-full'">
        <div id="allmap" style="width:100%;height:100%; border-radius: 10px;"></div>
        <div class="jm-map-tools">
            <el-button type="" @click="isshowFull" size="mini" :class="isshowQp">{{this.isshowClassFull==false?'全屏':'取消全屏'}}</el-button>
        </div>
    </div>
    
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=MMY3uSMacjU8Dyt6sQNRrha2nGOwcjwV"></script>
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=MMY3uSMacjU8Dyt6sQNRrha2nGOwcjwV"></script>
<script>
import mapData from '../../../src/assets/js/map'
export default {
    props:{
        'isShowGetLngLat':Boolean,//点击地图是否获取经纬度
        'enableScrollWheelZoom':Boolean,//是否启用滚轮放大缩小，默认禁用
        'center': Object,//中心经纬度 对象 {lng:106.528541,lat:29.569499}
        'zoom':Number, //缩放级别 数值 1-20
        'qp':Boolean,//是否开启全屏显示
        'navi3DCtrl':Boolean,//开启3D控件
    },
    data(){
        return{
            cache:'',
            isshowQp:'qpNone',
            isshowClassFull:false,
            centerDialogVisible:false,
        }
    },
    mounted(){
        var map = new BMap.Map("allmap",{enableMapClick:false});//加载地图时，默认图标禁止点击
        let point=new BMap.Point(this.center?this.center.lng:mapData.center.lng,this.center?this.center.lat:mapData.center.lat);
        if(this.navi3DCtrl==true){
            map = new BMapGL.Map("allmap");
            point=new BMapGL.Point(this.center?this.center.lng:mapData.center.lng,this.center?this.center.lat:mapData.center.lat);
            map.setTrafficOn();
        }
        this.map=map;
        
        map.centerAndZoom(point,this.zoom?this.zoom:mapData.zoom);//默认中心经纬度和缩放级别

        //点击地图显示经纬度
        if(this.isShowGetLngLat){
            function showInfo(e){
                alert(e.point.lng + ", " + e.point.lat);
            }
            map.addEventListener("click", showInfo);
        }

        //滚轮缩放地图
        if(this.enableScrollWheelZoom){
            map.enableScrollWheelZoom();
        }

        //全屏
        if(this.qp==true){
            this.isshowQp='qpBlock'
        }

        //开启3D控件
        if(this.navi3DCtrl==true){
            var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
            map.addControl(navi3DCtrl);
        }
    },
    watch:{

    },
    methods:{
        //轨迹运动，需传参数经纬度数组、小车图片、轨迹颜色，如：
        // let drivingLnglat=[
        //     {lng:113.113662, lat:22.629928},//起点
        //     {lng:113.12552, lat:22.625858},//中点
        //     {lng:113.12552, lat:22.646139},//终点
        // ]
        guiji(drivingLnglat,car,color){
            let map=this.map;
            map.clearOverlays()
            console.log(drivingLnglat);
            let that=this;
            let points=[];
            for(let i=0;i<drivingLnglat.length;i++){
                points.push(new BMap.Point(drivingLnglat[i].lng,drivingLnglat[i].lat))
            }
            var driving=new BMap.DrivingRoute(map,{renderOptions:{map: map, autoViewport: true}});

            console.log(points)
            //判断是否为多个点
            if(points.length>2){
                console.log('多个点')
                let waypoints=points.slice(1,points.length-1)
                driving.search(points[0], points[points.length-1],{waypoints:waypoints})
            }else{
                console.log('两个点')
                driving.search(points[0], points[points.length-1])
            }

            driving.setSearchCompleteCallback(function(){
                var plan = driving.getResults().getPlan(0);
                var  num = plan.getNumRoutes();
                console.log(plan)
                console.log(num)
                let pts=[]
                for(var j=0;j<num;j++){
                    var pts1=driving.getResults().getPlan(0).getRoute(j).getPath();
                    console.log(pts1)
                    for(var z=0;z<pts1.length;z++){
                        pts.push(pts1[z])
                    }
                }
                console.log(pts)
                //清除路线规划（修改颜色用）
                driving.clearResults();

                
                var lushu;
                // 实例化一个驾车导航用来生成路线
                var drv =new BMap.DrivingRoute(map, {
                    onSearchComplete: function(res) {
                        if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                            map.addOverlay(new BMap.Polyline(pts, {strokeColor: color}));
                            
                            // if(that.lushuStatus==0){
                            //     map.clearOverlays()
                            // }else{
                            //     map.setViewport(pts);
                            // }
                            lushu = new BMapLib.LuShu(map,pts,{
                                // defaultContent:"",//"从天安门到百度大厦"
                                autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                                icon  : new BMap.Icon(car, new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                                speed: 450,
                                enableRotation:true,//是否设置marker随着道路的走向进行旋转
                                landmarkPois: []
                            });
                            lushu.start()
                        }
                    }
                });
                var start=points[0]
                var end=points[points.length-1]
                drv.search(start,end);
            })
        },
        
        //预警
        //添加多个标注点
        //需传标注点经纬度数组以及是否预警points:[{lng:xxxxxxx,lat:xxxxxxx,novice:xxxxxx}](lng,lat必传，novice为预警状态选传)
        //icon:{url:xxxx,size:[1,1]}需传标注点图标(选传)
        //cache:默认展示信息窗口(选传)
        addPoint(mapData){
            console.log(mapData.icon)
            let that=this;
						let map=this.map;
						console.log(mapData.cache)
            if(mapData.cache){
                that.cache=mapData.cache
                map.panTo(new BMap.Point(mapData.cache.lng,mapData.cache.lat))
            }
            map.clearOverlays()
            function addMarker(point){
                if(mapData.icon){
                    var size=new BMap.Size(30,30);
                    if(mapData.icon.size){
                        size=new BMap.Size(mapData.icon.size[0],mapData.icon.size[1])
                    }
                    var myIcon = new BMap.Icon(mapData.icon.url, size);
                    var marker = new BMap.Marker(point,{icon:myIcon});
                }else{
                    var marker = new BMap.Marker(point);
                }
                map.addOverlay(marker);

                if(mapData.content){
                    if(!that.cache){
                        let content=
                            `
                                <div>
                                <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                </div>
                            `
                        if(mapData.points[i].novice){
                            content = 
                            `
                                <div>
                                    <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                    <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                    <div style="color:red;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">预警</span>:<span style="margin-left:10px;">噪声过大(范围值<100)</span></div>
                                </div>
                            `;
                        }
                        addClickHandler(content,marker,mapData.points[i]);

                        function addClickHandler(content,marker,cache){
                            marker.addEventListener("click",function(e){
                                openInfo(content,e,cache)
                            });
                        }
                        function openInfo(content,e,cache){
                            var p = e.target;
                            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                            map.openInfoWindow(infoWindow,point); //开启信息窗口
                            that.cache=cache;
                            that.$emit('cache',cache)
                            console.log(cache)
                        }
                    }else{
                        for(let i=0;i<mapData.points.length;i++){
                            if(mapData.points[i].number==that.cache.number){
                                let content=
                                    `
                                        <div>
                                        <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                        <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                        <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                        <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                        </div>
                                    `
                                if(mapData.points[i].novice){
                                    content = 
                                    `
                                        <div>
                                            <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                            <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                            <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                            <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                            <div style="color:red;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">预警</span>:<span style="margin-left:10px;">噪声过大(范围值<100)</span></div>
                                        </div>
                                    `;
                                }
                                var point = new BMap.Point(mapData.points[i].lng, mapData.points[i].lat);
                                var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                                // infoWindow.addEventListener("close", function(){
                                //     console.log('关闭了')
                                //     that.cache=''
                                // });
                                map.openInfoWindow(infoWindow,point); //开启信息窗口
                                map.addEventListener("click",function(){
                                    infoWindow.addEventListener("close", function(){
                                        console.log('关闭了')
                                        that.cache=''
                                    });
                                })
                                
                            }
                        }
                        let content=
                            `
                                <div>
                                <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                </div>
                            `
                        if(mapData.points[i].novice){
                            content = 
                            `
                                <div>
                                    <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                                    <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                                    <div style="color:red;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">预警</span>:<span style="margin-left:10px;">噪声过大(范围值<100)</span></div>
                                </div>
                            `;
                        }
                        addClickHandler(content,marker,mapData.points[i]);

                        function addClickHandler(content,marker,cache){
                            marker.addEventListener("click",function(e){
                                openInfo(content,e,cache)
                            });
                        }
                        function openInfo(content,e,cache){
                            var p = e.target;
                            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                            map.openInfoWindow(infoWindow,point); //开启信息窗口

                            that.cache=cache;
                            that.$emit('cache',cache)
                            console.log(cache)
                            
                        }
                    }
                }

                if(mapData.points[i].novice==true){
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                }
            }

            for (var i = 0; i < mapData.points.length; i++) {
                var point = new BMap.Point(mapData.points[i].lng,mapData.points[i].lat);
                addMarker(point);
            }
        },
        
        //增加标注点，点击点位显示对应的信息窗口
        //mapData:points:[{lng:xxxxxxx,lat:xxxxxxx}]
        //icon:{url:xxxx,size:[1,1]}需传标注点图标(选传)
        //content true/false 是否点击地图标注开启信息窗口
        //clickContent  点击菜单栏在地图上弹出对应的信息窗口
        addPoint1(mapData){
            let that=this;
            let map=this.map;
            if(mapData.clickContent){
                let content=
                `
                    <div>
                    <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.clickContent.name}</h4>
                    <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.clickContent.location}</span></div>
                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.clickContent.status==1?'正常':'异常'}</span></div>
                    <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.clickContent.department}</span></div>
                    </div>
                `
                var point = new BMap.Point(mapData.clickContent.lng, mapData.clickContent.lat);
                map.panTo(new BMap.Point(mapData.clickContent.lng, mapData.clickContent.lat),15)
                var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            }else{
                function addMarker(point){
                    if(mapData.icon){
                        var size=new BMap.Size(30,30);
                        if(mapData.icon.size){
                            size=new BMap.Size(mapData.icon.size[0],mapData.icon.size[1])
                        }
                        var myIcon = new BMap.Icon(mapData.icon.url, size);
                        var marker = new BMap.Marker(point,{icon:myIcon});
                    }else{
                        var marker = new BMap.Marker(point);
                    }

                    //创建右键菜单
                    var del = function(){
                        console.log('删除')
                    }
                    var upd = function(){
                        console.log('修改')
                    }
                    var add = function(){
                        console.log('添加')
                    }
                    var markerMenu=new BMap.ContextMenu();
                    markerMenu.addItem(new BMap.MenuItem('删除',del));
                    markerMenu.addItem(new BMap.MenuItem('修改',upd));
                    markerMenu.addItem(new BMap.MenuItem('添加',add));
                    marker.addContextMenu(markerMenu);

                    map.addOverlay(marker);

                    if(mapData.content){
                        let content=
                        `
                            <div>
                            <h4 style='text-align:center;font-weight:bold;font-size:16px;'>${mapData.points[i].name}</h4>
                            <div style="margin-top:5px;font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">位置</span>:<span style="margin-left:10px;">${mapData.points[i].location}</span></div>
                            <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">设备状态</span>:<span style="margin-left:10px;">${mapData.points[i].status==1?'正常':'异常'}</span></div>
                            <div style="font-size:12px;"><span style="font-weight:bold;display:inline-block;width:70px;text-align-last:justify;">所属单位</span>:<span style="margin-left:10px;">${mapData.points[i].department}</span></div>
                            </div>
                        `
                        addClickHandler(content,marker);
                    }

                    
                }
                function addClickHandler(content,marker){
                    marker.addEventListener("click",function(e){
                        openInfo(content,e)}
                    );
                }
                function openInfo(content,e){
                    var p = e.target;
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                    map.panTo(point,15)
                    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                }


                // 随机向地图添加25个标注
                for (var i = 0; i < mapData.points.length; i ++) {
                    var point = new BMap.Point(mapData.points[i].lng,mapData.points[i].lat);
                    addMarker(point);
                }
            }
            
        },

        //新增围栏
        //必传参数
            //enableDrawingTool:Boolean  是否显示工具栏
        addwl(enableDrawingTool,row){
            let map=this.map;
            if(enableDrawingTool==false){
                var allmap=document.getElementById('allmap')
                var BMapLib_Drawing=document.getElementsByClassName('BMapLib_Drawing');
                allmap.removeChild(BMapLib_Drawing[0])
            }
            var overlays = [];
            var overlaycomplete = function(e){
                // console.log('完成')
                console.log(e)
                var polygon = new BMap.Polygon(e.overlay.ia, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
                var getCenterPoint=function(path){
                    console.log(path)
                    var x = 0.0;
                    var y = 0.0;
                    for(let i=0;i<path.length;i++){
                        x=x+ parseFloat(path[i].lng);
                        y=y+ parseFloat(path[i].lat);
                    }
                    x=x/path.length;
                    y=y/path.length;
                    return new BMap.Point(x,y);
                }
                var point = getCenterPoint(polygon.getPath());
                var label=new BMap.Label(row.title, {offset:new BMap.Size(-20,-5), position:point});
                map.addOverlay(label);

                overlays.push(e.overlay);
                console.log(overlays)
            };
            var styleOptions = {
                strokeColor:"red",    //边线颜色。
                fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3,       //边线的宽度，以像素为单位。
                strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            }
            //实例化鼠标绘制工具
            var drawingManager = new BMapLib.DrawingManager(map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: enableDrawingTool, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                },
                circleOptions: styleOptions, //圆的样式
                polylineOptions: styleOptions, //线的样式
                polygonOptions: styleOptions, //多边形的样式
                rectangleOptions: styleOptions //矩形的样式
            });
            //添加鼠标绘制工具监听事件，用于获取绘制结果
            drawingManager.addEventListener('overlaycomplete', overlaycomplete);
            function clearAll() {
                for(var i = 0; i < overlays.length; i++){
                    map.removeOverlay(overlays[i]);
                }
                overlays.length = 0   
            }
        },

        //全屏
        isshowFull(){
            console.log(this.isshowClassFull)
            this.isshowClassFull=!this.isshowClassFull;
            let map=this.map
            
            setTimeout(()=>{
                let point=new BMap.Point(this.center?this.center.lng:mapData.center.lng,this.center?this.center.lat:mapData.center.lat);
                map.centerAndZoom(point,this.zoom?this.zoom:mapData.zoom);//默认中心经纬度和缩放级别
            },100)
        },

        //点聚合
        isCount(CountPoints){//集合点经纬度，数值;[{id:xxxxx;lng:xxxxxxxxxxx;lat:xxxxxxxxxxxx;num:123456}]
            let th=this;
            let mp=this.map
            function ComplexCustomOverlay(point, text,id, mouseoverText){
                this._point = point;
                this._text = text;
                this._overText = mouseoverText;
                this._id=id
            }
            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function(map){
                this._map = map;
                var div = this._div = document.createElement("div");
                div.className='fgw'
                div.onclick = function() {
                    let DialogData={isShow:true,id:that._id}
                    th.$emit('isDialog',DialogData)
                }
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                var span = this._span = document.createElement("span");
                div.appendChild(span);
                span.appendChild(document.createTextNode(this._text));      
                var that = this;

                var arrow = this._arrow = document.createElement("div");
                arrow.style.position = "absolute";
                arrow.style.top = "220px";
                arrow.style.left = "10px";
                div.appendChild(arrow);

                // console.log(mp.getPanes())
                mp.getPanes().labelPane.appendChild(div);
                
                return div;
            }
            ComplexCustomOverlay.prototype.draw = function(){
                var map = this._map;
                var pixel = map.pointToOverlayPixel(this._point);
                this._div.style.left = pixel.x - parseInt(this._arrow.style.left)-6 + "px";
                this._div.style.top  = pixel.y - 19 + "px";
            }
            
            for(let i=0;i<CountPoints.length;i++){
                var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(CountPoints[i].lng, CountPoints[i].lat),CountPoints[i].Count,CountPoints[i].id);
                mp.addOverlay(myCompOverlay);
            }
            
        },

        //右键菜单
        aaa(){
            console.log('11')
        },
    },
}
</script>