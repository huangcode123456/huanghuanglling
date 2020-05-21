<style scoped lang="less">

</style>
<template>
    <div class="jm-main-inner p10">
        <div class="jm-card p10 yauto">
            <div class="jm-card-center  ">
                <el-tabs v-model="activeName" class="jm-tabs">
                    <el-tab-pane name="first" label="巡查计划管理">

                        <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="计划名称">
                                <el-input size="small" v-model="formdata.title" placeholder="计划名称"></el-input>
                            </el-form-item>
                            <el-form-item label="巡查员">
                                <el-input size="small" v-model="formdata.name" placeholder="巡查员"></el-input>
                            </el-form-item>
                            <el-form-item label="巡查时间">
                                <el-time-select
                                    v-model="formdata.date"
                                    size='small'
                                    :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30'
                                    }"
                                    placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <div style="margin-top:-12px">
                            <el-button size="small" type="primary" @click="onSubmit">导出</el-button>
                            <el-button size="small" type="primary" @click="onSubmit">新增</el-button>
                            <el-button size="small" type="primary" @click="onSubmit">暂停</el-button>
                            <el-button size="small" type="primary" @click="onSubmit">删除</el-button>
                        </div>

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
                                prop="title"
                                label="计划名称"
                                align="center"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="monitor"
                                align="center"
                                width="80"
                                label="绑定监控点位">
                            </el-table-column>
                            <el-table-column
                                prop="details"
                                align="center"
                                label="监控点位信息"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                align="center"
                                label="巡查时间段"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="note"
                                label="任务描述"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="巡检员"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template>
                                    <el-button
                                    size="mini">编辑</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger">停止</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

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
export default {
    data(){
        return{
            activeName:'first',
            formdata:{
                title:'',
                name:'',
                date:''
            },
            tableData: [{
                title: 'xxxxxxxx计划',
                status: '正在运行',
                monitor: '3个',
                details:' 点位2、点位3、点位4 ',
                date:'每周一上午9:00-11:00  ',
                note:' 检查绑定点位运行状态',
                name:'张毅 '
                }, {
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
                },{
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
                },{
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
                },{
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
                },{
                title: 'xxxxxxxx计划',
                status: '正在运行',
                monitor: '3个',
                details:' 点位2、点位3、点位4 ',
                date:'每周一上午9:00-11:00  ',
                note:' 检查绑定点位运行状态',
                name:'张毅 '
                },{
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
                },{
                    title: 'xxxxxxxx计划',
                    status: '正在运行',
                    monitor: '3个',
                    details:' 点位2、点位3、点位4 ',
                    date:'每周一上午9:00-11:00  ',
                    note:' 检查绑定点位运行状态',
                    name:'张毅 '
            }],
            pagesize:6,
            currpage:1,
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