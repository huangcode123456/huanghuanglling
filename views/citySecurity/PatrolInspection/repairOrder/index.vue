<style scoped lang="less">
    .map{
        width: 500px;
        height: 500px;
        display: inline-block;
        margin-right: 20px;
    }
    .transfer{
        display: inline-block;
    }
    .dialog .el-tab-pane{
        display: flex;
    }
    demo-form-inline{
        margin-top: 10px;
    }
</style>
<template>
    <div class="jm-main-inner p10">
        <div class="jm-card p10 yauto">
            <div class="jm-card-center  ">
                <el-tabs v-model="activeName" class="jm-tabs">
                    <el-tab-pane name="first" label="工单管理">

                        <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="工单号">
                                <el-input size="small" v-model="formdata.title" placeholder="工单号"></el-input>
                            </el-form-item>
                            <el-form-item label="巡查员">
                                <el-input size="small" v-model="formdata.name" placeholder="巡查员"></el-input>
                            </el-form-item>
                            <el-form-item label="点位编号">
                                <el-input size="small" v-model="formdata.num" placeholder="点位编号"></el-input>
                            </el-form-item>
                            <el-form-item label="完成状态">
                                <el-select size="small" v-model="formdata.region" placeholder="完成状态">
                                    <el-option label="完成" value="完成"></el-option>
                                    <el-option label="进行中" value="进行中"></el-option>
                                    <el-option label="未完成" value="未完成"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary">查询</el-button>
                                <el-button size="small" type="primary">导出</el-button>  
                                <el-button size="small" type="primary">删除</el-button>  
                                <el-button size="small" type="primary"  @click="dialogVisible = true">新增</el-button>
                                <el-button size="small" type="primary">批量导出</el-button>   
                            </el-form-item>
                        </el-form>

                        <el-table
                            :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            class="jm-table mt10"
                            style="width: 100%">
                            <el-table-column
                                type="selection"
                                align="center"
                                width="30">
                            </el-table-column>
                            <el-table-column
                                prop="orderNo"
                                label="工单号"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="dianwei"
                                label="巡查点位"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                align="center"
                                width="80"
                                label="巡查员">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                align="center"
                                label="巡查时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="results"
                                align="center"
                                label="巡查结果"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template>
                                    <el-button
                                    size="mini" @click="dialogVisible = true">编辑</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-dialog
                            title=""
                            class="dialog"
                            :visible.sync="dialogVisible"
                            width="80%"
                            :center="isCenter"
                            :append-to-body="appendToBody"
                            >
                            <!-- :before-close="handleClose" -->
                                <el-tabs v-model="activeName">
                                    <el-tab-pane label="新增工单/编辑工单" name="first">
                                        <baidu-map 
                                        :center="center"  
                                        class="jm-bdmap map"  
                                        :zoom="zoom" 
                                        :scroll-wheel-zoom="true">
                                        <!-- @ready="handler" -->
                                        </baidu-map>

                                        <div>
                                            <el-transfer class="transfer" v-model="value" :data="data"></el-transfer>

                                            <el-form  label-width="80px" :model="formdialog" class="demo-form-inline">
                                                <el-form-item label="巡查时间">
                                                    <el-time-picker
                                                        size="small"
                                                        is-range
                                                        v-model="formdialog.date"
                                                        range-separator="至"
                                                        start-placeholder="开始时间"
                                                        end-placeholder="结束时间"
                                                        placeholder="选择时间范围">
                                                    </el-time-picker>
                                                </el-form-item>
                                                <el-form-item label="巡查员">
                                                    <el-select v-model="formdialog.name" size="small" placeholder="巡查员">
                                                        <el-option label="张三" value="shanghai"></el-option>
                                                        <el-option label="李四" value="beijing"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="巡查原因">
                                                    <el-input size="small" v-model="formdialog.why" placeholder="巡查原因"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-tab-pane>
                                    
                                </el-tabs>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
                                </span>
                        </el-dialog>

                    </el-tab-pane>
                </el-tabs>
                <div class="p10">
                    <el-pagination
                    class="jm-pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[6, 10, 20, 30]"
                    :page-size='6'
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import map from '../../../../assets/js/map'
import BaiduMap from 'vue-baidu-map'
export default {
    data(){
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return{
            activeName:'first',
            formdata:{
                title:'',
                name:'',
                region:'',
                num:''
            },
            tableData: [{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },{
                orderNo: '20200203001',
                dianwei: '点位1、点位2',
                name:'张三',
                date:" 本周四8:00am",
                results:'点位正常',
                status: '已完成',
                },
            ],
            pagesize:6,
            currpage:1,

            dialogVisible: false,
            isCenter:true,
            appendToBody:true,

            center:map.center,
            zoom:map.zoom,
            data: generateData(),
            value: [],

            formdialog:{
                date:'',
                name:'',
                why:'',
            }
        }
    },
    methods:{
        onSubmit(){
            console.log('搜索')
        },
        //选择每页显示条数时触发
        handleSizeChange(val){
            console.log(val)
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currpage=val
        },
    },
}
</script>