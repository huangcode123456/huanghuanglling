<style lang="less" scoped>
    .card-btn{
        display: flex;
    }
    .el-button{
        margin-right: 20px;
    }
    .el-input{
        margin-right: 10px;
        width: 30%;
    }
    .block{
        margin-top: 10px;
        float: right;
    }


    
    .dialog_second{
        display: flex;
        position:relative 
    }
    .dialog_second_btn{
        position:absolute;
        bottom:0px;
        left: 135px;
    }
    .btn{
        width: 100px;
        height: 40px;
    }
    .img{
        width: 120px;
        height: 150px;
    }
    .btn_group{
        margin:0 auto;
    }
    /deep/ .el-transfer-panel__body .el-checkbox,/deep/ .el-transfer-panel__body .el-checkbox__input{
        display: block;
    }

    
</style>

<template>
    <div class="jm-main-inner p10">
        <div class="jm-card p10 yauto">
            <div class="jm-card-center  ">
                <el-tabs v-model="activeName" class="jm-tabs" @tab-click="handleClick">
                    <el-tab-pane name="first" label="布控任务">
                        <div class="card-btn">
                            
                            <el-dialog
                                title=""
                                :visible.sync="dialogVisible"
                                width="80%"
                                :center="isCenter"
                                :append-to-body="appendToBody"
                                :before-close="handleClose">
                                    <el-tabs v-model="activeName">
                                        <el-tab-pane label="新建布控任务" name="first">
                                            <el-form ref="form" :model="form" label-width="120px">
                                                <el-form-item label="任务名称：">
                                                    <el-input placeholder="请输入任务名称" v-model="form.title"></el-input>
                                                </el-form-item>

                                                <el-form-item label="目标人物：">
                                                    <div><img class="img" src="../../../../../src/assets/images/img1.png" alt=""></div>
                                                    <div class="dialog_second_btn">
                                                        <el-button  class="btn">选择图片</el-button>
                                                        <span>上传说明：小于XXM图片，JPG/PNG/BMI格式</span>
                                                    </div>
                                                </el-form-item>

                                                <el-form-item label="目标人物姓名：">
                                                    <el-input placeholder="请输入标人物姓名" v-model="form.name"></el-input>
                                                </el-form-item>

                                                <el-form-item label="目标人物信息：">
                                                    <el-input placeholder="请输入目标人物信息" v-model="form.information"></el-input>
                                                </el-form-item>

                                                <el-form-item label="目标人脸库：">
                                                    <el-input placeholder="请输入搜索名称" v-model="form.search1"></el-input>
                                                    <el-transfer class="mt10" v-model="form.value1" :data="data"></el-transfer>
                                                </el-form-item>

                                                <el-form-item label="监控摄像头：">
                                                    <el-input placeholder="请输入搜索名称" v-model="form.search2"></el-input>
                                                    <el-transfer class="mt10" v-model="form.value2" :data="data"></el-transfer>
                                                </el-form-item>

                                                <el-form-item label="布控时段：">
                                                    <el-date-picker
                                                        v-model="form.date"
                                                        type="daterange"
                                                        range-separator="至"
                                                        start-placeholder="开始日期"
                                                        end-placeholder="结束日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-form>
                                        </el-tab-pane>
                                        <!-- <div class="btn_group">
                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
                                        </div> -->
                                        
                                    </el-tabs>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
                                    </span>
                            </el-dialog>

                            <el-input v-model="input" placeholder="请输入布控任务名称"></el-input>
                            <el-button type="primary">搜索</el-button>
                            <el-button type="primary" @click="dialogVisible = true">新建布控任务</el-button>
                        </div>

                        <div>
                            <el-table
                                class="jm-table"
                                :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                                style="width: 100%">
                                <el-table-column
                                    label="任务名称"
                                    align="center"
                                    width="180">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="状态"
                                    align="center"
                                    width="180">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.status }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="目标人脸库"
                                    align="center"
                                    width="100">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.people }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="监控摄像头"
                                    align="center"
                                    width="100">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.camera }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="监控时间段"
                                    align="center"
                                    width="220">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.time }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="任务描述"
                                    align="center"
                                    width="250">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.note }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            @click="dialogVisible1(scope.$index, scope.row)">编辑
                                        </el-button>
                                        <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">停止
                                        </el-button>
                                        <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scope.$index, scope.row)">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[8, 16, 30, 50]"
                            :page-size='8'
                            class="jm-pagination"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">
                            </el-pagination>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane name="second" label="预警管理">
                        <el-input v-model="input" placeholder="请输入搜索内容"></el-input><el-button  type="primary">查询</el-button>
                        <el-table
                            class="jm-table"
                            :data="tableData1"
                            @cell-click='tabClick'
                            style="width: 100%;height:100%"
                            >
                            <el-table-column
                                prop="num"
                                align="center"
                                label="序号"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                align="center"
                                label="姓名"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="category"
                                align="center"
                                label="人员类别"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="behavior"
                                align="center"
                                label="异常行为"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                align="center"
                                label="抓拍时间"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="task"
                                align="center"
                                label="对应布控任务"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="monitor_img"
                                label="布控图片"
                                align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="snap_img"
                                align="center"
                                label="抓拍图片"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="way"
                                align="center"
                                label="处理方式"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                align="center"
                                label="处理状态"
                                
                                width="180">
                                <template slot-scope="scope">
                                    <font color="red">{{scope.row.status}}</font>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="note"
                                align="center"
                                label="备注"
                                width="180">
                            </el-table-column>
                        </el-table>
                        
                        <el-dialog
                            title="提示"
                            :visible.sync="yj_dialogVisible"
                            width="60%"
                            :append-to-body="appendToBody"
                            >
                            <!-- :before-close="handleClose" -->
                                <div class="yj_dialog">
                                    <el-form :inline="true" :model="yj_form" class="demo-form-inline">
                                        <el-form-item label="布控图片：">
                                            <img src="../../../../assets/images/img1.png" alt="">
                                        </el-form-item>
                                        <el-form-item label="抓拍图片：">
                                            <img src="../../../../assets/images/img1.png" alt="">
                                        </el-form-item>
                                    </el-form>

                                    <el-form :model="yj_fromdata" class="demo-form-inline">
                                        <el-form-item label="异常信息描述：">
                                            <span> 2019年12月31日至2020年1月1日期间在XX号监控点位附近发现有徘徊滞留行为</span>
                                        </el-form-item>

                                        <el-form-item label="处理意见：">
                                            <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入内容"
                                                v-model="yj_fromdata.textarea1">
                                            </el-input>
                                        </el-form-item>

                                        <el-form-item label="">
                                            <el-button type="primary">解除预警</el-button><el-button type="primary">恢复预警</el-button>
                                        </el-form-item>

                                        <el-form-item label="备注：">
                                            <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入内容"
                                                v-model="yj_fromdata.textarea2">
                                            </el-input>
                                        </el-form-item>

                                        <el-form-item label="操作人：">
                                            <el-input
                                                placeholder="请输入操作人姓名"
                                                v-model="yj_fromdata.name">
                                            </el-input>
                                            <el-button type="primary" @click="onSubmit">保存</el-button>
                                            <el-button>取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                        </el-dialog>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    data(){
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
            });
            }
            return data;
        };
        return{
            status:'color:red;',
            isCenter:true,
            data:generateData(),
            search1:'',
            search2:'',
            form: {
                title: '',
                name: '',
                information: '',
                value1:[],
                value2:[],
                data:''
            },
            isIndeterminate: true,
            input:'',
            pagesize:8,
            currpage:1,
            tableData: [],
            dialogVisible: false,
            yj_dialogVisible:false,
            appendToBody:true,
            activeName:'first',
            tableData1: [
            ],
            yj_form:{},
            yj_fromdata:{
                textarea1:'',
                textarea2:'',
                name:''
            }
        }
    },
    mounted(){
        let tableData=[];
        for(let i=0;i<20;i++){
            tableData.push({
                title: `徘徊人员监测${i+1}`,
                status: '正在进行',
                people: '2个',
                camera:'12个',
                time:"2020年2月1日-2020年2月2日",
                note:'监控社区徘徊的库外人员',
            })
        }
        this.tableData=tableData
        console.log(this.tableData)

        let tableData1=[];
        for(let i=0;i<9;i++){
            tableData1.push({
                num: i,
                name: '王小虎',
                category: '刑满释放人员',
                behavior:'昼夜浮出',
                date:'2020.02.02',
                task:'徘徊人员检测1',
                monitor_img:'',
                snap_img:'',
                way:'-',
                succ_date:'2020.02.02',
                status:'未处理',
                note:''
            })
        }
         this.tableData1=tableData1
    },
    methods:{
        tabClick(row, column, cell, event){
            console.log(row, column, cell, event)
            if(column.property=='status'){
                this.yj_dialogVisible = true
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // handleClose(done) {
        //     this.$confirm('确认关闭？')
        //     .then(_ => {
        //         done();
        //     })
        //     .catch(_ => {});
        // },
        handleSizeChange(val){
            console.log(val)
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currpage=val
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        dialogVisible1(index, row){
            this.dialogVisible=true
            console.log(index, row);
        },
        onSubmit(){

        },
    }
}
</script>