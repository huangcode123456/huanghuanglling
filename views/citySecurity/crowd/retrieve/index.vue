<style lang="less" scoped>
    .list{
        display: flex;
        flex-wrap: wrap;
    }
    .item{
        width:16.666666666%;
        display: flex;
        flex-direction:column;
        padding: 10px;
        box-sizing: border-box;
    }
    .el-form-item{
        margin-left: 20px;
    }
    /deep/ .el-upload--picture-card{
        width: 80px;
        height: 80px;
        line-height: 90px;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item{
        width: 80px;
        height: 80px;
    }
</style>

<template>
    <div class="jm-main-inner p10">
        <div class="jm-card p10 yauto">
            <div class="jm-card-center  ">
                <el-tabs class="jm-tabs" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="信息检索" name="first">
                        <el-form :inline="true" :model="formdata1" class="demo-form-inline">
                            <el-form-item label="姓名：">
                                <el-input v-model="formdata1.name" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话：">
                                <el-input v-model="formdata1.phone" placeholder="联系电话"></el-input>
                            </el-form-item>
                            <el-form-item label="性别：">
                                <el-select v-model="formdata1.region" placeholder="性别">
                                    <el-option label="男" value="M"></el-option>
                                    <el-option label="女" value="G"></el-option>
                                </el-select>
                            </el-form-item>
                            <div>
                                <el-form-item label="时间：">
                                    <el-date-picker
                                        v-model="formdata1.date"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right">
                                    </el-date-picker>
                                </el-form-item>
                                <el-button type="primary">检索</el-button>
                                <el-button type="primary">清除</el-button>
                            </div>
                        </el-form>

                        <div class="list">
                            <div class="item" v-for="(item,i) in todolist.slice((currpage - 1) * pagesize, currpage * pagesize)" :key="i">
                                <img src="../../../../assets/images/img1.png" alt="">
                                <div>
                                    <span>时间：{{item.date}}</span>
                                </div>
                                <div>
                                    <span>五号摄像头</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            style="float:right"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[12, 24, 36, 48]"
                            :page-size="12"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="todolist.length"
                            class="jm-pagination">
                        </el-pagination>
                    </el-tab-pane>

                    <el-tab-pane label="标签检索" name="second">
                        <el-form :inline="true" :model="formdata2" class="demo-form-inline">
                            <el-form-item label="标签：">
                                <el-radio-group v-model="formdata2.radio1">
                                    <el-radio-button label="频繁出入"></el-radio-button>
                                    <el-radio-button label="昼伏夜出"></el-radio-button>
                                    <el-radio-button label="不限"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="人员标签：">
                                <el-radio-group v-model="formdata2.radio2">
                                    <el-radio-button label="库内人员"></el-radio-button>
                                    <el-radio-button label="流动人员"></el-radio-button>
                                    <el-radio-button label="不限"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="摄像头">
                                <el-select v-model="formdata2.sxt" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <div>
                                <el-form-item label="时间：">
                                    <el-date-picker
                                        v-model="formdata1.date"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right">
                                    </el-date-picker>
                                </el-form-item>
                                <el-button type="primary">检索</el-button>
                                <el-button type="primary">清除</el-button>
                            </div>
                        </el-form>
                        <div class="list">
                            <div class="item" v-for="(item,i) in todolist.slice((currpage - 1) * pagesize, currpage * pagesize)" :key="i">
                                <img src="../../../../assets/images/img1.png" alt="">
                                <div>
                                    <span>时间：{{item.date}}</span>
                                </div>
                                <div>
                                    <span>五号摄像头</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            style="float:right"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[12, 24, 36, 48]"
                            :page-size="12"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="todolist.length"
                            class="jm-pagination">
                        </el-pagination>
                    </el-tab-pane>

                    <el-tab-pane label="以图搜人" name="third">
                        <el-form :inline="true" :model="formdata3" class="demo-form-inline">
                            <el-form-item label="照片">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    >
                                    <i class="el-icon-plus"></i>
                                    
                                </el-upload>
                                <span>上传说明：小于XXM图片，JPG/PNG/BMI格式</span>
                            </el-form-item>

                            <el-form-item label="摄像头">
                                <el-select v-model="formdata3.region" placeholder="摄像头">
                                <el-option label="摄像头1" value="shanghai"></el-option>
                                <el-option label="摄像头2" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="时间：">
                                <el-date-picker
                                    v-model="formdata3.date"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                                </el-date-picker>
                            </el-form-item>
                            <el-button type="primary">检索</el-button>
                            <el-button type="primary">清除</el-button>
                        </el-form>
                        <div class="list">
                            <div class="item" v-for="(item,i) in todolist.slice((currpage - 1) * pagesize, currpage * pagesize)" :key="i">
                                <img src="../../../../assets/images/img1.png" alt="">
                                <div>
                                    <span>时间：{{item.date}}</span>
                                </div>
                                <div>
                                    <span>五号摄像头</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination
                            style="float:right"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[12, 24, 36, 48]"
                            :page-size="12"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="todolist.length"
                            class="jm-pagination">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeName: 'third',
            formdata1: {
                name: '',
                phone:'',
                region: '',
                date:''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }, 
            todolist:[],
            pagesize:12,
            currpage:1,
            currentPage:1,
            formdata2:{
                radio1: '频繁出入',
                radio2:'库内人员',
                sxt:''
            },
            formdata3:{

            }
            
        }
    },
    created(){
        let todolist=[]
        for(let i=0;i<20;i++){
            todolist.push(
                {
                    img:'1',
                    date:'2020年02月01日 20：00',
                    loca:'五号摄像头'
                }
            )
        }
        this.todolist=todolist;
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleSizeChange(val){
            console.log(val)
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currpage=val
        },
    }
}
</script>