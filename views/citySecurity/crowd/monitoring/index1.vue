<style lang="less" scoped>
    // 公共
    .title{
        font-weight: bold;
    }
    .more1{
        font-size: 12px;
        color: #666;
    }

    // 左边第一个div
    .rq-total{
        background: #fafafa;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        // height: 25%;
    }
    .rq-total-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 20%;
    }
    
    .rq-total_details{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        font-size: 12px;
        height: 80%;
    }
    .count{
        width: 30%;
        text-align: center;
        font-size: 18px;
       i{
           font-size:12px;
           font-style: normal;
           color:#fff;
       }
    }
    .text-orange{
         color: red;
    }
    .list{
        flex: 1;
        padding-left: 50px;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
    }
    .list>p{
       line-height: 1.6;
       color: #fff;
       font-size: 12px;
       i{
           font-style: normal;
       }
    }

    // 左边第二个div
    .echarts1{
        background: #fafafa;
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        height: 20%;
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
        height: 20%;
    }
    #echarts2{
        height: 100%;
    }

    //左边第四个div
    .zp_list{
        display: flex;
       
        padding-top: 10px;
        align-items: center;
    }
    .zp_list img{
        // width: 12%;
        // height: 100%;
        height: 60px;
        width: 60px;
        // border: 1px solid red;
    }
    .zp_list_details{
        flex: 1;
        padding: 0 10px;
    }
    .zp_list_details>span{
        font-size: 12px;
        padding: 10px;
    }
    .span_red{
        margin-left: 10px;
        color: red;
    }
    .zp_list_details_p{
        font-size: 12px;
        // padding-left: 10px;
        color: #fff;
        margin-top: 5px;
    }
    .el-icon-location-outline{
        color: #999;
    }
    .details_title{
        font-size: 13px;
        color: #fff;
    }


    .map {
        width: 100%;
        height: 100%;
    }
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

    .sxt_list_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">重点人群</h4>
                        <div class="jm-card-actions">
                            <a href="javscript:;" class="more">更多</a>
                        </div>
                    </div>
                    <div class="rq-total_details">
                        <div class="count text-orange">888<i>人</i></div>
                        <div class="list">
                            <p>较上月新增&nbsp;<i class="text-orange">88</i>&nbsp;人</p>
                            <p>较上季度新增&nbsp;<i class="text-orange">88</i>&nbsp;人</p>
                            <p>环比新增&nbsp;<i class="text-orange">88</i>&nbsp;人</p>
                            <p>本年度新增&nbsp;<i class="text-orange">88</i>&nbsp;人</p>
                        </div>
                    </div>
                </div>
                
                <div class="jm-card mt10">
                    <div class="jm-card-center p10">
                        <div id="echarts1" style="height:28vh"></div>
                    </div>
                </div>
                
                <div class="jm-card mt10">
                    <div class="jm-card-center p10">
                        <div id="echarts2" style="height:28vh"></div>
                    </div>
                </div>

                <div class="jm-card mt10">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">人像抓拍</h4>
                        <div class="jm-card-actions">
                            <a href="javscript:;" class="more">更多</a>
                        </div>
                    </div>
                    <div class="jm-card-center p10">
                        <div class="zp_list"  v-for="(item,i) in todos" :key="i">
                            <img src="https://pic.36krcnd.com/avatar/201807/18033830/acefgtal2m0elpfs!120" alt="" class="img">
                            <div class="zp_list_details">
                                <p class="details_title">
                                    <span>人才岛社区出入门口</span>
                                    <span class='span_red'>未识别人员</span>
                                </p>
                                <p class="zp_list_details_p">2020年2月2日</p>
                            </div>
                            <i class="el-icon-location-outline"></i>
                        </div>
                    </div>
                </div>
            </el-aside>

            <el-container  class="plr10">
                <txMap ref="mychild" :qp="true" :isLngLat="false" @isDialog='isDialog'></txMap>
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
                            <el-button @click="search" type="primary" slot="append" >搜索</el-button>
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

        <el-dialog
            :title="CountPoints.title+'监测人群'"
            :visible.sync="centerDialogVisible"
            width="600px"
            :append-to-body	='isBody'
            center>
            <el-form ref="form" :model="dialogForm" label-width="60px">
                <el-form-item label="姓名:">
                    <el-input v-model="dialogForm.name" size="mini"></el-input>
                    <el-button style="margin-left:10px" type="primary" size="mini">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="dialogData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="why"
                    align="center"
                    label="监测原因">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false" size="mini">确 定</el-button>
            </span>
        </el-dialog>
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
            // //摄像头点位查询
            dw_list:[
                {title:'出口1',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.626912484009722',lat:'113.12394377988574'},
                {title:'出口2',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.625991432812327',lat:' 113.12733263555788'},
                {title:'出口3',location:'某某地址3',status:'非正常',dep:'江门市人才岛规划中心3',src:require('../../../../assets/images/img1.png'),lng:'22.619362207551035',lat:'113.12618897231232'},
                {title:'出口4',location:'某某地址4',status:'正常',dep:'江门市人才岛规划中心4',src:require('../../../../assets/images/img1.png'),lng:'22.629371269597357',lat:'113.11066279013119'},
            ],

            //dialog遮罩层
            centerDialogVisible:false,
            isBody:true,
            dialog:[],
            CountPoints:'',

            input:'',
            todos:[1,2,3],
            // center: map.center,
            // zoom: map.zoom,
            tableData: [{
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
            ],
            dialogData: [
                {
                    age: '34',
                    name: '王小虎',
                    sex: '男',
                    why:'xxxxxxxxxxxxxxxx'
                }, {
                    age: '35',
                    name: '张三',
                    sex: '女',
                    why:'xxxxxxxxxxxxxxxx'
                }, {
                    age: '36',
                    name: '李四',
                    sex: '男',
                    why:'xxxxxxxxxxxxxxxx'
                }, {
                    age: '37',
                    name: '王二麻子',
                    sex: '女',
                    why:'xxxxxxxxxxxxxxxx'
                }
            ],
            dialogForm:{
                name:''
            }
        }
    },
    mounted(){
        this.$refs.mychild.MarkerCluster();

        this.setEcharts()
    },
    methods:{
        setEcharts(){
            var myChart1 = echarts.init(document.getElementById('echarts1'));
            var option1 = {
                grid: {
                    left: 30,
                    right:10,
                    top:10,
                    bottom:25
                },
                  tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
                    axisLabel:echartsStyle.axisLabel,
                    axisLine:echartsStyle.axisLine,
                },
                yAxis: {
                    type: 'value',
                    axisLabel:echartsStyle.axisLabel,
                    axisLine:echartsStyle.axisLine,
                },
                series: [{
                    data: [0, 10, 20, 30, 40, 50, 60,50,30,60,90,50,7,10,5,6,92,12,34,20,16,98,42,24],
                    type: 'line',
                    smooth: true
                }]
            }
            myChart1.setOption(option1);
            window.addEventListener("resize", function(){
                myChart1.resize();
            })

            var myChart2 = echarts.init(document.getElementById('echarts2'));
            // 指定图表的配置项和数据
            var option2 = {
                grid: {
                    left: 45,
                    right:13,
                    top:10,
                    bottom:25
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'value',
                    axisLabel:echartsStyle.axisLabel,
                    axisLine:echartsStyle.axisLine,
                },
                yAxis: {
                    type: 'category',
                    data: ['路口1', '路口2', '路口3', '路口4', '路口5', '路口6', '路口7', '路口8', '路口9', '路口10'],
                    axisLabel:echartsStyle.axisLabel,
                    axisLine:echartsStyle.axisLine,
                },
                series: [{

                    data: [170, 180, 200, 220, 250, 260, 300, 330, 360, 400],
                    type: 'bar'
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);
            window.addEventListener("resize", function(){
                myChart2.resize();
            })
        },
        search(){
            
        },
        imgclick(e){
           
        },
        isDialog(DialogData){
            this.centerDialogVisible=DialogData.isShow
            this.CountPoints={title:DialogData.title}
            console.log(DialogData.title)
        },
    }
}
</script>