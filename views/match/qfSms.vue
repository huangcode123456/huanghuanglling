<template>
    <div class="app-container">
        <el-form :inline="true" ref="form" :model="form" size="mini">
            <el-form-item label="赛事项目">
                <el-select v-model="form.typeId" placeholder="请选择" style="width: 100%;" size="small">
                    <el-option v-for="item in matchprojectlist" :key="item.value" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询报名列表</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="list"
            border
            fit
            highlight-current-row
            @selection-change="handleSelectionChange"
            >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                width="120px"
                align="center"
                label="项目分组"
                prop="title">
            </el-table-column>
            <el-table-column
                align="center"
                label="参赛编号"
                prop="ssNo">
            </el-table-column>
           <el-table-column
                align="center"
                label="手机号码"
                prop="phone">
            </el-table-column>
            <el-table-column
                align="center"
                label="姓名"
                prop="name">
            </el-table-column>
            <el-table-column
                align="center"
                label="身份证号码"
                prop="cardNo">
            </el-table-column>
        </el-table>

        <el-form style="margin-top:10px" ref="form" :model="form" size="mini">
            <el-form-item label="短信模板">
                <el-select @change="SmsChange" v-model="form.SmsId" placeholder="请选择" style="width: 100%;" size="small">
                    <el-option v-for="item in Smslist" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板内容">
                <span>{{content}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sendSms">群发短信</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { matchprojectXlk,entrantsList,matchSmsSend,sendSms } from '../../api/match'
export default {
    data(){
        return{
            form:{
                SmsId:''
            },
            //赛事项列表-下拉框
            matchprojectlist:[],
            //短信模板下拉框
            Smslist:[],

            list:[],
            content:'',

            multipleSelection:[]//选中人员
        }
    },
    mounted(){
        // this.$route.query["id"]
        this.matchprojectXlk()
        this.matchSmsSend()
    },
    methods:{
        SmsChange(){
            for(let i=0;i<this.Smslist.length;i++){
                if(this.form.SmsId==this.Smslist[i].id){
                    this.content=this.Smslist[i].content
                }
            }
        },
        //赛事项目下拉框
        matchprojectXlk(){
            const data={
                matchId:this.$route.query["id"]
            }
            matchprojectXlk(data).then(res=>{
                console.log(res)
                this.matchprojectlist=res.data
            })
        },
        //短信模板下拉框
        matchSmsSend(){
            const data={
                matchId:this.$route.query["id"]
            }
            matchSmsSend(data).then(res=>{
                console.log(res,'短信模板')
                this.Smslist=res.data
            })
        },
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },
        //查询群发短信人员列表
        search(){
            const data={
                matchId:this.$route.query["id"],
                matchProjectId:this.form.typeId
            }
            entrantsList(data).then(res=>{
                this.list=res.data
                console.log(res)
            })
        },
        sendSms(){
            let arr=[]
            for(let i=0;i<this.multipleSelection.length;i++){
                arr.push(this.multipleSelection[i].id)
            }
            console.log(arr.join(","))
            
            const data={
                entrantsIds:arr.join(","),
                smsTmpId:this.form.SmsId
            }
            console.log(data)
            sendSms(data).then(res=>{
                console.log(res)
                this.$message({
                    message: '发送成功',
                    type: 'success'
                });
            })
        },
    }
}
</script>