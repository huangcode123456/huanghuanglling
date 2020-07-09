<template>
    <div>
        <el-steps :space="200" :active="2" simple finish-status="success" style="margin-bottom:15px;">
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
          <el-step :title="step4"></el-step>
        </el-steps>
        <div v-if="btnStatus!=1">
            <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
        </div>
        <el-table
            :data="list"
            style="margin-top:20px"
            border
            fit
            highlight-current-row>
            <el-table-column
                align="center"
                width="80"
                label="排序字段"
                >
                <template slot-scope="scope" >
                <el-input
                     size='small'
                    v-model="scope.row.listIndex"
                    :disabled="false">
                </el-input>
                </template>
            </el-table-column>
            <el-table-column
                width="150px"
                align="center"
                label="赛事项"
                prop="matchtitle">
            </el-table-column>
            <el-table-column
                width="160px"
                align="center"
                label="创建时间"
                prop="releaseTime">
            </el-table-column>
            <el-table-column
                width="120px"
                align="center"
                label="组别名称"
                prop="title">
            </el-table-column>
            <el-table-column
                width="80px"
                align="center"
                label="报名费用"
                prop="price">
                <template slot-scope="scope" >
                    <span>{{scope.row.price}}元</span>
                </template>
            </el-table-column>
            <el-table-column
                width="120px"
                align="center"
                label="人数要求"
                prop="unit">
            </el-table-column>
            <el-table-column
                width="80px"
                align="center"
                label="可否报名"
                prop="num">
                <template slot-scope="scope" >
                    <span>{{scope.row.state==1?'正常':'停用'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="btnStatus!=1"
                fixed="right"
                align="center"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                        <el-link type="primary" @click="upd(scope.row)" style="margin-left:5px">编辑</el-link>
                        <el-link type="primary" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            style="margin-top:5px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <el-button style="margin-top:20px" @click="back">上一步</el-button>
        <el-button style="margin-top:20px" @click="next">下一步</el-button>

        <el-dialog
            :before-close="beforeClose"
            :title="dialogTitle"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="dialogVisible"
            :append-to-body="appendToBody"
            width="60%">
            <el-form  ref="form" :model="form" label-width="120px">
                <el-form-item label="比赛项" required>
                    <el-select v-model="form.matchProjectId" placeholder="请选择" style="width: 100%;" size="small">
                        <el-option v-for="item in matchprojectlist" :key="item.value" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组别名称" required>
                    <el-input v-model="form.title" size='small'></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="form.info" size='small'></el-input>
                </el-form-item>
                <el-form-item label="报名费用(元)" required>
                    <!-- <el-input type="number" v-model="form.price" size='small' :min="0"></el-input> -->
                    <MyNumber :point="2" v-model="form.price" size='small' :min="0"></MyNumber>
                </el-form-item>
                <el-form-item label="限制分组年龄" required>
                    <el-date-picker
                        v-model="form.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item  label="团队人数限制" >
                    <div>
                        <el-input style="width:100px;display:inline-block" type="number" v-model="form.Minlimit" size='small' :min="0" :max="form.Maxlimit"></el-input>
                        --
                        <el-input style="width:100px;display:inline-block" type="number" v-model="form.Maxlimit" size='small' :min="form.Minlimit>0?form.Minlimit:0"></el-input>
                    </div>
                </el-form-item>
                <el-form-item  label="允许报名人数">
                    <el-input type="number" v-model="form.signUpCount" size='small'  :min="form.Maxlimit>0?form.Maxlimit:0"></el-input>
                </el-form-item>
                <el-form-item label="性别限制">
                    <el-select v-model="form.sexLimitVal" placeholder="请选择" style="width: 100%;" size="small">
                        <el-option label="无限制" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { gtMatchProjectPriceSort,updateMatchProjectPrice,deleteMatchProjectPrice,matchprojectXlk,listMatchProjectPrice,insertMatchProjectPrice } from '../../../api/match'
import MyNumber from '@/components/Form/MyNumber';
import moment from 'moment'
export default {
    components:{
      MyNumber
    },
    data(){
        return{
            list:[],

            //dialog
            appendToBody:true,
            closeOnClickModal:false,
            dialogVisible:false,
            dialogTitle:'',

            form:{
                matchProjectId:"",
                title:"",
                price:"",
                Minlimit:'',
                Maxlimit:'',
                info:'',
                time:'',
                signUpCount:'',
                sexLimitVal:'',
            },
            //分页
            total:0,
            currentPage:1,
            pageSize:10,

            step1:'基本信息',
            step2:'赛事项设置',
            step3:'报名分组设置',
            step4:'模板设置',
            //赛事项列表
            matchprojectlist:[],

            updId:'',//编辑用id

            btnStatus:''
        }
    },
    created(){
        if(this.$route.query["upd"]==false||this.$route.query["upd"]=='false'){
            this.btnStatus=1;
            this.step1='基本信息';
            this.step2='赛事项信息';
            this.step3='报名分组信息';
            this.step4='模板信息';
        }
    },
    mounted(){
        this.matchprojectXlk()
        this.listMatchProjectPrice()
    },
    methods:{
        add(){
            this.dialogTitle='新增赛事项报名分组'
            this.dialogVisible=true;
        },
        onSubmit(){
            var regEn = /[`~!@#$%^&*_+<>?:"{},.\/;'[\]]/im,regCn = /[·！#￥——：；“”‘、，《。》？、【】[\]]/im;
            if(regEn.test(this.form.title) || regCn.test(this.form.title)) {
                this.$message.error('组别名称不能包含特殊字符');
                return false;
            }
            console.log(this.form.time,"dfasd time")
            const data={
                matchId:this.$route.query["id"],
                matchProjectId:this.form.matchProjectId,
                title:this.form.title,
                info:this.form.info,
                price:this.form.price,
                limitMinAge:(this.form.time!=undefined&&this.form.time!='')?moment(this.form.time[0]).format('YYYY-MM-DD'):"",
                limitMaxAge:(this.form.time!=undefined&&this.form.time!='')?moment(this.form.time[1]).format('YYYY-MM-DD'):'',
                unit:`${this.form.Minlimit}-${this.form.Maxlimit}人/组`,
                signUpCount:this.form.signUpCount,
                sexLimitVal:this.form.sexLimitVal,
                releaseTime:moment().format('YYYY-MM-DD HH:mm:ss')
            }
            console.log(data,"baoming ")
            if(this.form.matchProjectId==''){
                this.$message.error('比赛项必填');
            }else if(this.form.title==''){
                this.$message.error('组别名称必填');
            }else if(this.form.price==""){
                this.$message.error('报名费必填');
            // }else if(this.form.Minlimit==''){
            //     this.$message.error('团队人数限制必填');
            // }else if(this.form.Maxlimit==''){
						// 		this.$message.error('团队人数限制必填');
						}else if(this.form.time==''||this.form.time==undefined||this.form.time[0]=='Invalid date'){
								this.$message.error('限制分组年龄必填')
            }else{
                if(this.dialogTitle=='新增赛事项报名分组'){
                    insertMatchProjectPrice(data).then(res=>{
                        console.log(res)
                        if(res.code==200){
                          this.$message.success("保存成功！");
                        }
                        this.dialogVisible=false;
                        this.listMatchProjectPrice()
                    })
                }else{
                    data.id=this.updId;
                    updateMatchProjectPrice(data).then(res=>{
                        console.log(res)
                        this.dialogVisible=false;
                        if(res.code==200){
                          this.$message.success("保存成功！");
                        }
                        this.listMatchProjectPrice()
                        this.form={
                            matchProjectId:"",
                            title:"",
                            price:"",
                            Minlimit:'',
                            Maxlimit:'',
                            info:'',
                            time:'',
                            signUpCount:'',
                            sexLimitVal:'',
                        }
                    })
                }
            }
        },
        beforeClose(){
            this.form={
                matchProjectId:"",
                title:"",
                price:"",
                Minlimit:'',
                Maxlimit:'',
                info:'',
                time:'',
                signUpCount:'',
                sexLimitVal:'',
            }
            this.dialogVisible=false;
        },
        back(){
            this.$router.push({
                path:'project',
                query:{
                    id:this.$route.query["id"],
                    upd:this.$route.query["upd"],
                }
            })
        },
        next(){
            this.$router.push({
                path:'setting',
                query:{
                    id:this.$route.query["id"],
                    upd:this.$route.query["upd"],
                }
            })
        },
        //获取赛事项下拉框
        matchprojectXlk(){
            const data={
                matchId:this.$route.query["id"]
            }
            matchprojectXlk(data).then(res=>{
                console.log(res,'下拉框')
                this.matchprojectlist=res.data
            })
        },
        listMatchProjectPrice(){
            const data={
                matchId:this.$route.query["id"],
                pageNumber:this.currentPage,
                pageSize:this.pageSize,
            }
            listMatchProjectPrice(data).then(res=>{
                this.total=res.data.page.totalRecord
                this.list=res.data.records;
                console.log(res,"报名分组")
            })
        },
        upd(row){
            console.log(row)
            this.dialogTitle='编辑赛事项报名分组'
            this.updId=row.id
            this.dialogVisible=true;
            this.form={
                matchProjectId:row.matchProjectId,
                title:row.title,
                info:row.info,
                price:row.price,
                time:[row.limitMinAge,row.limitMaxAge],
                Minlimit:row.unit.split('-')[0],
                Maxlimit:row.unit.split('-')[1].split('人')[0],
                signUpCount:row.signUpCount,
                sexLimitVal:row.sexLimitVal==null?'':`${row.sexLimitVal}`,
            }
        },
        del(id){
            const data={
                id
            }
            this.$confirm('此操作将删除该赛事, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteMatchProjectPrice(data).then(res=>{
                    console.log(res)
                    this.listMatchProjectPrice()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            })
        },
        updSort(){
            console.log(this.list)
            let records=[]
            for(let i=0;i<this.list.length;i++){
                records.push(
                {
                    'id':this.list[i].id,
                    'listIndex':this.list[i].listIndex
                })
            }
            console.log(records)
            const data={
                records
            }
            gtMatchProjectPriceSort(data).then(res => {
                console.log(res)
                this.listMatchProjectPrice()
            })
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.listMatchProjectPrice()
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.listMatchProjectPrice()
        },
    }
}
</script>
