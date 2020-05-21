<style scoped  lang="less">
    .main{
        padding:20px;
        width: 100%;
        
    }
    .top{
        display: flex;
        justify-content: space-around;
        // border-bottom: 2px solid black;
        border-bottom:1px solid rgba(255, 255, 255, 0.3);
    }
    .top>div{
        width: 30%;
        padding:20px;
        color: #ebeefd;
    }
    .top>div>:first-child {
        font-size:18px;
        font-weight:bold;
    }
    .top>div>:last-child{
        font-size:18px;
        font-weight:bold;
    }
    .top>div>:nth-child(2){
        font-size:18px;
        color: red;
    }
    .content{
        /* display: flex;
        flex: 1; */
        // border: 1px solid red;
        padding:20px;
    }
    .content>:not(:first-child){
        margin-top: 20px;   
    }
    .content>div>span{
        display: inline-block;
        width: 70px;
        text-align: justify;
        text-align-last: justify;
    }
    .content>:nth-child(2){
        display: flex;
        /* flex-direction:column; */
        /* justify-content: space-around; */
        flex-wrap: wrap;
    }
    .content>:nth-child(2)>div{
        width: 12.5%;
        padding:10px;
        img{
            width: 100%;
        }
        span{
            padding-left:10px;
            display: block;
            font-size: 12px;
        }
    }
</style>

<template>
    <div class="jm-main-inner p10">
        <div class="jm-card yauto">
            <div class="jm-card-center ">
                <div class="top">
                    <div>
                        <span>今日新增：</span><span>666</span><span> 人</span>
                    </div>
                    <div>
                        <span>本月新增：</span><span>888</span><span> 人</span>
                    </div>
                    <div>
                        <span>累计抓拍：</span><span>88888</span><span> 人</span>
                    </div>
                </div>
                <div class="content">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="摄像头">
                            <el-select v-model="camera" clearable placeholder="请选择">
                                <el-option
                                size="small"
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="时间">
                            <el-date-picker
                                v-model="data"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                            </el-date-picker>
                        </el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button type="primary" @click="clean">清除</el-button>
                    </el-form>

                    <div>
                        <div v-for="(item,i) in todos.slice((currpage - 1) * pagesize, currpage * pagesize)" :key="i">
                            <img src="../../../../assets/images/img1.png" alt="">
                            <span>时间：2020年5月1日</span>
                            <span>位置：五号摄像头</span>
                            <span>姓名：某某某</span>
                        </div>
                    </div>

                    <div class="block">
                        <el-pagination
                        class="jm-pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[16, 32, 64, 128]"
                        :page-size='16'
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="todos.length">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data(){
        return{
            checkboxGroup1: ['上海'],
            cities: cityOptions,
            formInline:'',
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
            options: [{
                value: '1',
                label: '摄像头1'
                }, {
                value: '2',
                label: '摄像头2'
                }, {
                value: '3',
                label: '摄像头3'
                }, {
                value: '4',
                label: '摄像头4'
                }, {
                value: '5',
                label: '摄像头5'
            }],
            camera: '',
            data:'',
            value1:'',
            todos:[1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            pagesize:16,
            currpage:1,
        }
    },
    methods:{
        search(){
            console.log('搜索')
        },
        clean(){
            console.log('清除')
        },
        datachange(){
            console.log(this.data)
        },
        //选择每页显示条数时触发
        handleSizeChange(val){
            console.log(val)
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currpage=val
        },
        Yesterday(){
            var day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            console.log(s1)
            this.data=[s1,s1]
        },
        week(){
            var arr = [];
            var now = new Date().getTime();
            var year=new Date().getFullYear();
            var mon=new Date().getMonth();
            var oneDayTime = 60*60*24*1000;    // 一天的秒数
            for(var i=6; i>=0; i--){
                var dd = new Date(now - i*oneDayTime).getDate();
                arr.push(dd < 10 ? '0'+dd : dd+'');
            }
            console.log(`${year}-${mon}-${arr[0]}`)
            this.data=[`${year}-${mon}-${arr[0]}`,`${year}-${mon}-${arr[6]}`]
        },
        mon(){
            
        }
    }
}
</script>