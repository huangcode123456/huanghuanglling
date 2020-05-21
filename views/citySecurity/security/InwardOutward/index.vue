<style lang="less" scoped>
    .jm-card-center-form{
        padding-top: 10px;
    }


    .yj-total{
        // background: #fafafa;
        padding: 10px;
        // border-radius: 5px;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        height: 30%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
    }
    .today-total{
        display: flex;
        align-items: center;
        width: 50%;
        justify-content: center;
    }
    .today-total .cont{
        display: flex;
        align-items: center;
    }
    .today-total .cont .text{
        flex: 1;
    }
    .yujing_img{
        width: 30px;
        height: 30px;
    }
    .yujing_title{
        font-size:12px;
        color: #ebeefd;
    }
    .yujing_num{
        font-size:18px;
        text-align: center;
        color: red;
    }
    

    // 左边第二个div
    .echarts1{
        background: #fafafa;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        height: 33%;
    }
    #echarts1{
        height: 100%;
    }

    //左边第三个div
    .echarts2{
        background: #fafafa;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        height: 33%;
    }
    #echarts2{
        height: 100%;
    }

    //左边第四个div
    .el-input {
        width: 230px;
    }

    .jm-video-list{
        display: flex;
        margin: 0 -5px;
        flex-wrap: wrap;
        .item{
            flex: 0 0 50%;
            padding: 5px;
            text-align: center;
            img{
                width: 100%;
            }
        }
    }
    .color-red{
        color: red;
    }
</style>

<template>
    <div class="jm-main-inner p10">
        <el-container>
            <el-aside width="25%" class="container-left">
                <div class="jm-card">
                    <div class="jm-card-center p10">
                        <div class="yj-total">
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">今日预警</div>
                                        <div class="yujing_num">2次</div>
                                    </div>
                                </div>
                            </div>
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">今日已处理预警</div>
                                        <div class="yujing_num">2次</div>
                                    </div>
                                </div>
                            </div>
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">历史预警</div>
                                        <div class="yujing_num">2次</div>
                                    </div>
                                </div>
                            </div>
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">历史已处理预警</div>
                                        <div class="yujing_num">2次</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="jm-card-center p10">
                        <div id="echarts1" style="height:28vh"></div>
                    </div>

                    <div class="jm-card-center p10">
                        <div id="echarts2" style="height:28vh"></div>
                    </div>
                </div>

                <!-- <div class="jm-card mt10">
                    
                </div>


                <div class="jm-card mt10">
                    
                </div> -->
            </el-aside>

            <el-container class="plr10">
                <txMap ref="mychild" :qp="true" :isLngLat="false"></txMap>
            </el-container>
            
            <el-aside width="25%">
                <div class="jm-card">
                    <div class="jm-card-header">
                    <h4 class="jm-card-title">摄像头点位</h4>
                    <div class="jm-card-actions">
                        <a href="javscript:;" class="more">更多</a>
                    </div>
                    </div>
                    <div class="jm-card-center p10">

                        <el-input class="jm-search" size="small"  placeholder="请输入路口名称" v-model="input" >
                            <el-button @click="serach" type="primary" slot="append" >搜索</el-button>
                        </el-input>

                        <ul class="jm-video-list">
                            <li class="item"  v-for="(item,i) in dw_list" :key="i">
                                <div>{{item.title}}</div>
                                <img :data-title="item.title" :data-location="item.location" :data-status="item.status" :data-dep="item.dep" :data-lng="item.lng" :data-lat="item.lat" :src="item.src" @click="imgclick" alt="">
                            </li>
                            
                        </ul>
                    </div>
                </div>

                <div class="jm-card mt10">
                    <div class="jm-card-header">
                    <h4 class="jm-card-title">预警信息</h4>
                    <div class="jm-card-actions">
                        <a href="javscript:;" class="more">更多</a>
                    </div>
                    </div>
                    <div class="jm-card-center p10">
                        <el-table
                            :data="tableData"
                            class="jm-table"
                            row-class-name="tr-small"
                            header-row-class-name='tr-small'
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="发生时间"
                                align="center"
                                cell-style='color-red'
                                width="95">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="sex"
                                width="50"
                                align="center"
                                label="性别">
                            </el-table-column>
                            <el-table-column
                                prop="behavior"
                                width="100"
                                align="center"
                                label="异常行为">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                width="100"
                                align="center"
                                label="处理状态">
                            </el-table-column>
                        </el-table>
                        
                    </div>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
import echarts from 'echarts';
import echartsStyle from '../../../../assets/js/echartsStyle'
import txMap from '../../../../components/txMap/txMap'
export default {
    components:{
        txMap
    },
    data(){
        return{
            //摄像头点位查询
            dw_list:[
                {title:'出口1',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.626912484009722',lat:'113.12394377988574'},
                {title:'出口2',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.625991432812327',lat:' 113.12733263555788'},
                {title:'出口3',location:'某某地址3',status:'非正常',dep:'江门市人才岛规划中心3',src:require('../../../../assets/images/img1.png'),lng:'22.619362207551035',lat:'113.12618897231232'},
                {title:'出口4',location:'某某地址4',status:'正常',dep:'江门市人才岛规划中心4',src:require('../../../../assets/images/img1.png'),lng:'22.629371269597357',lat:'113.11066279013119'},
            ],
            input:'',
            input3:'',
            todos:[1,2,3],
            tableData: [
                {
                date: '2016.05.02',
                name: '王小虎',
                sex: '男',
                behavior:'反复徘徊',
                status:'未处理'
                }, {
                date: '2016.05.02',
                name: '王小虎',
                sex: '男',
                behavior:'反复徘徊',
                status:'未处理'
                }
            ]
        }
    },
    mounted(){
        this.setEcharts()

        //加载地图
        var details=[
            {
                position:[22.626912484009722,113.12394377988574],
                content:['出口1','某某地址1','正常','江门市人才岛规划中心1']
            },
            {
                position:[22.625991432812327, 113.12733263555788],
                content:['出口2','某某地址2','正常','江门市人才岛规划中心2']
            },
            {
                position:[22.619362207551035, 113.12618897231232],
                content:['出口3','某某地址3','非正常','江门市人才岛规划中心3']
            },
            {
                position:[22.629371269597357, 113.11066279013119],
                content:['出口4','某某地址3','正常','江门市人才岛规划中心3']
            },
            {
                position:[22.622893006340178,113.12131493669801],
                content:['入口1','某某地址3','正常','江门市人才岛规划中心3']
            },
            {
                position:[22.623702748434482,113.1216860777406],
                content:['入口2','某某地址3','非正常','江门市人才岛规划中心3']
            },
            {
                position:[22.61771496240948,113.12482979571837],
                content:['入口3','某某地址3','正常','江门市人才岛规划中心3']
            },
        ]
        this.$refs.mychild.zdyfgw(details);
    },
    methods:{
        setEcharts(){
            var myChart1 = echarts.init(document.getElementById('echarts1'));
            var option1 = {
                tooltip: {
                    trigger: 'axis',
                    padding: [2, 10],
                    textStyle: {
                        fontSize: 12
                    }
                },
                grid: {
                    left: 30,
                    right:10,
                    top:10,
                    bottom:25
                },
                xAxis: {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ebeefd'
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        lineStyle: {
                            width:1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ebeefd'
                        },
                        formatter: function(value) {
                            return value.split(":")[0];
                        }
                    },
                    data: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00","08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00","15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00","22:00", "23:00", "24:00"]
                },
                yAxis: {
                    type: 'value',
                    name: '/条',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        lineStyle: {
                            width: 3
                        }
                    },
                    axisLabel:echartsStyle.axisLabel,
                    axisLine:echartsStyle.axisLine,
                },
                series: [{
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    smooth: true,
                    animationDuration: 2000,
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            shadowBlur: 2,
                            shadowColor: "rgba(0, 0, 0, .12)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    },
                    lineStyle: {
                        color: '#fff',
                        width: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',//设置折线阴影
                        shadowBlur: 15,
                        shadowOffsetY: 20,
                    },
                    data: [120, 90, 34, 65, 89, 201, 130,120, 90, 34, 65, 89, 201, 130,120, 90, 34, 65, 89, 201, 130,120, 90, 15],
                }]
            }
            myChart1.setOption(option1);

            window.addEventListener("resize", function(){
                myChart1.resize();
            })

            var myChart2 = echarts.init(document.getElementById('echarts2'));
            // 指定图表的配置项和数据
            var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
            var option2 = {
                grid: {
                    left: 50,
                    right:10,
                    top:20,
                    bottom:5
                },
                xAxis: [{
                    show: false,
                }],
                yAxis: [{
                    axisTick: 'none',
                    axisLine: 'none',
                    offset: '2',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '12',
                        }
                    },
                    data: ['路口一', '路口二', '路口三', '路口四', '路口五', '路口六']
                }, {
                    axisTick: 'none',
                    axisLine: 'none',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '0',
                        }
                    },
                    data: ['10', '9', '8', '7', '6', '5']
                }, {
                    name: '预警数量分类统计',
                    nameGap: '4',
                    nameTextStyle: {
                        color: '#ffffff',
                        fontSize: '12',
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: [],
                }],
                series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: [10, 13, 25, 29, 38, 44],
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '12',
                                }
                            }
                        },
                        barWidth: 12,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }, {
                        name: '白框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [99, 99.5, 99.5, 99.5, 99.5, 99.5],
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: 'rgb(7,80,157)',
                                barBorderRadius: 5,
                            }
                        },
                        z: 1
                    }, {
                        name: '外框',
                        type: 'bar',
                        yAxisIndex: 2,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100,100],
                        barWidth: 24,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                                barBorderRadius: 5,
                            }
                        },
                        z: 0
                    },
                    {
                        name: '外圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0, 0, 0, 0, 0, 0],
                        yAxisIndex: 2,
                        symbolSize: 15,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                                opacity: 1,
                            }
                        },
                        z: 2
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);
            window.addEventListener("resize", function(){
                myChart2.resize();
            })
        },
        serach(){
            console.log(this.input)
            if(this.input=='出口'){
                this.dw_list=[
                {title:'出口1',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.626912484009722',lat:'113.12394377988574'},
                {title:'出口2',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.625991432812327',lat:' 113.12733263555788'},
                {title:'出口3',location:'某某地址3',status:'非正常',dep:'江门市人才岛规划中心3',src:require('../../../../assets/images/img1.png'),lng:'22.619362207551035',lat:'113.12618897231232'},
                {title:'出口4',location:'某某地址4',status:'正常',dep:'江门市人才岛规划中心4',src:require('../../../../assets/images/img1.png'),lng:'22.629371269597357',lat:'113.11066279013119'},
                ]
            }else if(this.input=="入口"){
                this.dw_list=[
                {title:'入口1',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.622893006340178',lat:'113.12131493669801'},
                {title:'入口2',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.623702748434482',lat:'113.1216860777406'},
                {title:'入口3',location:'某某地址3',status:'非正常',dep:'江门市人才岛规划中心3',src:require('../../../../assets/images/img1.png'),lng:'22.61771496240948',lat:'113.12482979571837'},
                ]
            }
        },
        imgclick(e){
            let position=[e.target.dataset.lng,e.target.dataset.lat]
            let content=[e.target.dataset.title,e.target.dataset.location,e.target.dataset.status,e.target.dataset.dep]
            this.$refs.mychild.isShowInfoWindow(position,content);
        },
        aaa(){
            console.log('11')
        },
    }
}
</script>