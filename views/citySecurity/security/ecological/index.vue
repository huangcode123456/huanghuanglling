<style lang="less" scoped>
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
        padding: 20px;
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
                    <div class="jm-card-center">
                        <div class="yj-total">
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">接入监控环境区域</div>
                                        <div class="yujing_num">2次</div>
                                    </div>
                                </div>
                            </div>
                            <div class="today-total">
                                <div class="cont">
                                    <img class="yujing_img" src="../../../../assets/images/yujing.png" alt="">
                                    <div class="text">
                                        <div class="yujing_title">接入监控设想数量</div>
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
                {title:'生态1',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.626912484009722',lat:'113.12394377988574'},
                {title:'生态2',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.625991432812327',lat:' 113.12733263555788'},
                {title:'生态3',location:'某某地址3',status:'非正常',dep:'江门市人才岛规划中心3',src:require('../../../../assets/images/img1.png'),lng:'22.619362207551035',lat:'113.12618897231232'},
                {title:'生态4',location:'某某地址4',status:'正常',dep:'江门市人才岛规划中心4',src:require('../../../../assets/images/img1.png'),lng:'22.629371269597357',lat:'113.11066279013119'},
                {title:'生态5',location:'某某地址1',status:'正常',dep:'江门市人才岛规划中心1',src:require('../../../../assets/images/img1.png'),lng:'22.622893006340178',lat:'113.12131493669801'},
                {title:'生态6',location:'某某地址2',status:'正常',dep:'江门市人才岛规划中心2',src:require('../../../../assets/images/img1.png'),lng:'22.623702748434482',lat:'113.1216860777406'},
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
                }, {
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
                }, {
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
                }, {
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
        var details=[
            {
                position:[22.626912484009722,113.12394377988574],
                content:['生态1','某某地址1','正常','江门市人才岛规划中心1']
            },
            {
                position:[22.625991432812327, 113.12733263555788],
                content:['生态2','某某地址2','正常','江门市人才岛规划中心2']
            },
            {
                position:[22.619362207551035, 113.12618897231232],
                content:['生态3','某某地址3','非正常','江门市人才岛规划中心3']
            },
            {
                position:[22.629371269597357, 113.11066279013119],
                content:['生态4','某某地址4','正常','江门市人才岛规划中心3']
            },
            {
                position:[22.622893006340178,113.12131493669801],
                content:['生态5','某某地址5','正常','江门市人才岛规划中心3']
            },
            {
                position:[22.623702748434482,113.1216860777406],
                content:['生态6','某某地址6','非正常','江门市人才岛规划中心3']
            },
        ]
        this.$refs.mychild.zdyfgw(details);
    },
    methods:{
        serach(){
            
        },
        imgclick(e){
            let position=[e.target.dataset.lng,e.target.dataset.lat]
            let content=[e.target.dataset.title,e.target.dataset.location,e.target.dataset.status,e.target.dataset.dep]
            this.$refs.mychild.isShowInfoWindow(position,content);
        },
    }
}
</script>