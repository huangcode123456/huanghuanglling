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
                            <!-- <el-form-item label="车辆类型：">
                                <el-radio-group size="mini" v-model="formdata.radio1">
                                    <el-radio-button label="两客"></el-radio-button>
                                    <el-radio-button label="一危"></el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
                        </el-form>
                        <div class="title">指定车辆信息</div>
                        <el-form :model="form_loca">
                            <el-form-item label="车牌查询：">
                                <el-select size="mini" v-model="form_loca.region" placeholder="车牌查询">
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="线路查询：">
                                <el-select size="mini" v-model="form_loca.xianlu" placeholder="线路查询">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="车辆类型：">
                                <el-radio-group  size="small" v-model="form_loca.radio1">
                                    <el-radio-button label="班线客车"></el-radio-button>
                                    <el-radio-button label="其他客车"></el-radio-button>
                                </el-radio-group>
                            </el-form-item> -->
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
                        <!-- <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="车辆类型：">
                                <el-radio-group size="mini" v-model="formdata.radio1">
                                    <el-radio-button label="两客"></el-radio-button>
                                    <el-radio-button label="一危"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form> -->
                        <div class="title">指定车辆信息</div>
                        <el-form :model="form_loca">
                            <el-form-item label="车牌查询：">
                                <el-select size="mini" v-model="form_loca.region" placeholder="车牌查询">
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                    <el-option label="湘E 7A428" value="湘E 7A428"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="线路查询：">
                                <el-select size="mini" v-model="form_loca.xianlu" placeholder="线路查询">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
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
                            <el-button type="primary" @click="his_search" size="mini">查询</el-button>
                            <el-button size="mini" @click="del(1)">清除</el-button>
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
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)"
                                    >新增</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="del(scope.row)"
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
                // radio1:'班线客车',
                xianlu:'',
                date_start:'',
                date_end:''
            },
            tableData: [
                {
                    id:1,
                    title: '电子围栏1',
                    car: '10辆',
                    date: '2020.02.02',
                    guize:'严禁驶入',
                    note:'未处理'
                },{
                    id:2,
                    title: '电子围栏2',
                    car: '10辆',
                    date: '2020.02.02',
                    guize:'严禁驶入',
                    note:'未处理'
                }
            ],
            tableData1:[
                {
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
            ],
        }

    },
    mounted(){
        let markers=[
            [22.6299042863414, 113.10935038008631,'某某某监测点1','某某地址1','正常','江门市人才岛规划中心1'],
            [22.62294167877627, 113.12120555907086,'某某某监测点2','某某地址2','正常','江门市人才岛规划中心2'],
            [22.628242908743516, 113.12518525280257,'某某某监测点3','某某地址3','正常','江门市人才岛规划中心3'],
            [22.615144268435017, 113.14163997653043,'某某某监测点4','某某地址4','正常','江门市人才岛规划中心4'],
            [22.606327713247822, 113.13175385078466,'某某某监测点5','某某地址5','正常','江门市人才岛规划中心5'],
            [22.6120380146221, 113.13163614103405,'某某某监测点6','某某地址6','正常','江门市人才岛规划中心6'],
        ]
        this.$refs.mychild.MultiMarker(markers);
    },
    methods:{
        his_search(){
            let from=[22.629955329658163,113.11011672019958];
            let to=[22.62706367752099,113.1170904636383];
            this.$refs.mychild.TrackPlayback(from,to);
        },
        handleEdit(row){
            console.log(row)
            this.$refs.mychild.Editor(row);
        },
        del(row){
            // this.$refs.mychild.delEditor(row);
            console.log('删除轨迹')
            this.$refs.mychild.TrackPlayback(1,1,true);
        }
    }
}
</script>