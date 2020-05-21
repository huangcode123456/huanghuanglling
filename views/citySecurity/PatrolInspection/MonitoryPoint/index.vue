<style scoped lang="less">

</style>
<template>
    <div class="jm-main-inner p10">
        <div class="jm-card p10 yauto">
            <div class="jm-card-center  ">
                <el-tabs v-model="activeName" class="jm-tabs">
                    <el-tab-pane name="first" label="巡查点位管理">

                        <el-form :inline="true" :model="formdata" class="demo-form-inline">
                            <el-form-item label="点位名称">
                                <el-input size="small" v-model="formdata.title" placeholder="点位名称"></el-input>
                            </el-form-item>
                            <el-form-item label="巡查员">
                                <el-input size="small" v-model="formdata.name" placeholder="巡查员"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商名称">
                                <el-input size="small" v-model="formdata.cs_name" placeholder="厂商名称"></el-input>
                            </el-form-item>
                            <el-form-item label="位置信息">
                                <el-input size="small" v-model="formdata.location" placeholder="位置信息"></el-input>
                            </el-form-item>
                            <el-form-item label="点位编号">
                                <el-input size="small" v-model="formdata.num" placeholder="点位编号"></el-input>
                            </el-form-item>
                            <!-- <el-form-item>
                                
                            </el-form-item> -->
                        </el-form>

                        <div style="margin-top:-12px">
                            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
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
                                label="点位名称"
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
                                prop="num"
                                align="center"
                                width="80"
                                label="点位编号">
                            </el-table-column>
                            <el-table-column
                                prop="location"
                                align="center"
                                label="点位位置信息"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="lnglat"
                                align="center"
                                label="点位经纬度"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="对应维护人员"
                                align="center"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="plan"
                                label="对应巡查计划"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="vendor"
                                label="厂商"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template>
                                    <el-button
                                    size="mini">编辑</el-button>
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
                cs_name:'',
                location:'',
                num:''
            },
            tableData: [{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },{
                title: '点位1',
                status: '正在运行',
                num: 'camn1',
                location:'人才岛XX街XX号附近',
                lnglat:'XX°N  XX°E ',
                name:'张三',
                plan:'XX计划 ',
                vendor:'海康'
                },
            ],
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