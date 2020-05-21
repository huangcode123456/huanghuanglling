<style lang="less" scoped>
    .title{
        font-weight: 600;
        font-size: 16px;
        position: relative;
        color: #ebeefd;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .el-form-item{
        margin-bottom: 5px;
    }
    /deep/ .el-form-item__label{
        width: 100px!important;
    }
    .jm-card-center .car_jk{
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
</style>

<template>
    <div class="jm-main-inner p10">
        <el-container>
            <el-aside width="25%" class="container-left">
                <div class="jm-card">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">实时定位</h4>
                    </div>
                    <div class="jm-card-center p10">
                        <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="车辆类型：">
                                <el-radio-group size="mini" v-model="formdata.radio1">
                                    <el-radio-button label="两客"></el-radio-button>
                                    <el-radio-button label="一危"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div class="title">指定车辆信息</div>
                        <el-form :model="form_loca">
                            <el-form-item label="车牌号：">
                                <el-select size="mini" v-model="form_loca.region" placeholder="车牌号">
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="车辆类型：">
                                <el-radio-group  size="small" v-model="form_loca.radio1">
                                    <el-radio-button label="班线客车"></el-radio-button>
                                    <el-radio-button label="其他客车"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div style="text-align:center">
                            <el-button type="primary" size="mini">查询</el-button>
                            <el-button size="mini">清除</el-button>
                        </div>
                    </div>
                </div>

                <div class="jm-card mt10">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">历史轨迹</h4>
                    </div>
                    <div class="jm-card-center p10">
                        <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="车辆类型：">
                                <el-radio-group size="mini" v-model="formdata.radio1">
                                    <el-radio-button label="两客"></el-radio-button>
                                    <el-radio-button label="一危"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div class="title">指定车辆信息</div>
                        <el-form :model="form_loca">
                            <el-form-item label="车牌号：">
                                <el-select size="mini" v-model="form_loca.region" placeholder="车牌号">
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始时间：">
                                <el-date-picker
                                size='mini'
                                v-model="form_loca.date_start"
                                type="datetime"
                                placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="开始时间：">
                                <el-date-picker
                                size='mini'
                                v-model="form_loca.date_end"
                                type="datetime"
                                placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                        <div style="text-align:center">
                            <el-button id="his_search" type="primary" size="mini" @click="his_search">查询</el-button>
                            <el-button size="mini">清除</el-button>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-container  class="plr10">
                <TXmap ref="mychild" :qp="true" :isLngLat="false"></TXmap>
            </el-container>
            <el-aside width="25%">
                <div class="jm-card">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">电子围栏</h4>
                        <div class="jm-card-actions">
                            <a href="javscript:;" class="more">更多</a>
                        </div>
                    </div>
                    <div class="jm-card-center p10">
                        <el-table
                        class="jm-table"
                        row-class-name="tr-small"
                        header-row-class-name='tr-small'
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="title"
                                label="围栏名称"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="car"
                                label="绑定车辆"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="设置时间"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="guize"
                                align="center"
                                label="规则">
                            </el-table-column>
                            <el-table-column
                                prop="note"
                                align="center"
                                label="备注">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                width="180"
                                label="操作">
                                <template  slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="toggle('polyline',scope.row)"
                                        >新增</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="delwl(scope.$index, scope.row)"
                                        >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="jm-card">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">预警信息</h4>
                        <div class="jm-card-actions">
                            <a href="javscript:;" class="more">更多</a>
                        </div>
                    </div>
                    <div class="jm-card-center p10">
                        <el-table
                        class="jm-table"
                        row-class-name="tr-small"
                        header-row-class-name='tr-small'
                        :data="tableData1"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="发生时间"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="class"
                                label="预警类型"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="car"
                                label="预警车辆"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="weilan"
                                align="center"
                                label="电子围栏">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                align="center"
                                label="处理状态">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="jm-card">
                    <div class="jm-card-header">
                        <h4 class="jm-card-title">车内监控画面</h4>
                    </div>
                    <div class="jm-card-center p10">
                        <div class="car_jk">
                            <div class="p10">
                                <img src="../../../../assets/images/car_jk.png" alt="">
                                <span>粤A 123456</span>
                            </div>
                            <div class="p10">
                                <img src="../../../../assets/images/car_jk.png" alt="">
                                <span>粤A 123456</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=MMY3uSMacjU8Dyt6sQNRrha2nGOwcjwV"></script>
<script>
import TXmap from '../../../../components/txMap/txMap'
export default {
    components:{
        TXmap
    },
    data(){
        return{
            formdata:{
                radio1:'两客'
            },
            form_loca:{
                region:'',
                radio1:'班线客车',
                date_start:'',
                date_end:''
            },
            tableData: [
                {   
                    id:'1',
                    title: '电子围栏1',
                    car: '10辆',
                    date: '2020.02.02',
                    guize:'严禁驶入',
                    note:'未处理'
                },{
                    id:'2',
                    title: '电子围栏2',
                    car: '10辆',
                    date: '2020.02.02',
                    guize:'严禁驶入',
                    note:'未处理'
                }],
                tableData1:[{
                    date:'2020.02.02',
                    class:'驶入围栏',
                    car:'10辆',
                    weilan:'电子围栏1',
                    status:'未处理'
                },{
                    date:'2020.02.02',
                    class:'驶入围栏',
                    car:'10辆',
                    weilan:'电子围栏1',
                    status:'未处理'
                }
            ]
        }
    },
    mounted(){

    },
    methods:{
        toggle (name,row) {
            this[name].editing = !this[name].editing;
            this.row=row
        },
        his_search(){
            
        }
    }
}
</script>