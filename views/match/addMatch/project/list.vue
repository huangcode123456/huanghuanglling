<template>
    <div>
        <el-steps :space="200" :active="1" simple finish-status="success" style="margin-bottom:15px;">
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
          <el-step :title="step4"></el-step>
        </el-steps>
        <div v-if="btnStatus!=1">
            <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSorting" size="mini">修改排序</el-button>
        </div>

        <el-table
            style="margin-top:20px"
            :data="list"
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
                label="比赛项"
                prop="title">
            </el-table-column>
            <el-table-column
                width="160px"
                align="center"
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                width="50px"
                align="center"
                label="状态"
                prop="state">
                    <template slot-scope="scope" >
                        <span>{{scope.row.state==1?'正常':'停用'}}</span>
                    </template>
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="报名要求"
                prop="qualification">
            </el-table-column>
            <el-table-column
                width="80px"
                align="center"
                label="报名人数"
                prop="signupCount">
            </el-table-column>
            <el-table-column
                v-if="matchKind==1"
                width="120px"
                align="center"
                label="投票规则"
                prop="voteRule">
                <template slot-scope="scope" >
                    <span>{{scope.row.voteRule==0?'一人仅一票':'一人一天多票'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="false"
                width="80px"
                align="center"
                label="可投票数"
                prop="voteNum">
            </el-table-column>
            <el-table-column
                v-if="btnStatus!=1"
                fixed="right"
                align="center"
                width="160"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                        <el-link type="primary" @click="upd(scope.row)" style="margin-left:5px">编辑</el-link>
                        <el-link type="primary" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
                        <el-link type="primary" @click="tableSet(scope.row.id)" style="margin-left:5px">表单设置</el-link>
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
            :title="dialogTitle"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="dialogVisible"
            :append-to-body="appendToBody"
            :before-close="beforeClose"
            width="60%">
            <el-form  ref="form" :model="form" label-width="90px">
                <el-form-item label="比赛项" required>
                    <el-input v-model="form.title" size='small'></el-input>
                </el-form-item>
                <el-form-item label="赛事起点">
                    <el-input v-model="form.state" size='small'></el-input>
                </el-form-item>
                <el-form-item label="赛事终点">
                    <el-input v-model="form.end" size='small'></el-input>
                </el-form-item>
                <el-form-item label="报名要求">
                    <el-input type="textarea" v-model="form.qualification" size='small'></el-input>
                </el-form-item>
                <el-form-item label="人数限制">
                    <el-input type="number" v-model="form.limit" size='small' :min="0"></el-input>
                    <span>0表示无限制</span>
                </el-form-item>
                <el-form-item label="投票规则" required v-show="matchKind==1">
                    <el-switch
                      style="display: inline;padding-right:15px;"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="form.voteRule"
                      active-color="#13ce66"
                      inactive-color="#4949FF"
                      active-text="一人多票"
                      inactive-text="一人仅一票">
                    </el-switch>
                    <el-input-number size="small" :min="1" :max="100" v-model="form.voteNum" v-show="form.voteRule!=0"></el-input-number>
                </el-form-item>
                <el-form-item label="比赛项说明">
                    <el-card style="width:100%">
                        <!-- <quill-editor 
                            v-model="form.instructions" 
                            ref="myQuillEditor" 
                            style="height: 500px;" 
                            :options="editorOption">
                        </quill-editor> -->
                        <tinymce-editor ref="editor"
                            v-if='dialogVisible'
                            v-model="form.instructions"
                        >
                        </tinymce-editor>
                    </el-card>
                </el-form-item>
                <el-form-item>
                    <el-button style="" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { gtMatchProjectSort,insertMatchProject,MatchProjectlist,deleteMatchProject,updateMatchProject,queryMatchBaseInfo } from '@/api/match'
import TinymceEditor from '../../../../components/tinymce-editor/tinymce-editor'
export default {
    name: 'FuncFormsEdit',
    components: {
        TinymceEditor
    },
    data(){
        return{
            //赛事项列表
            list:[

            ],

            //富文本
            content: null,
            editorOption: {},

            //dialog
            appendToBody:true,
            closeOnClickModal:false,
            dialogVisible:false,
            matchKind:null,

            //比赛项
            form:{
                title:'',
                state:'',
                end:'',
                qualification:'',
                limit:0,
                voteRule:0,
                voteNum:1,
                instructions:''
            },

            //分页
            total:0,
            currentPage:1,
            pageSize:10,

            step1:'基本信息',
            step2:'赛事项设置',
            step3:'报名分组设置',
            step4:'模板设置',
            dialogTitle:'',
            updId:'',//赛事项id,编辑用

            btnStatus:'',
        }
    },
    created(){
        if(this.$route.query["upd"]==false || this.$route.query["upd"]=='false'){
            this.btnStatus=1;
            this.step1='基本信息';
            this.step2='赛事项信息';
            this.step3='报名分组信息';
            this.step4='模板信息';
        }
    },
    mounted(){
      this.MatchProjectlist();
      if(this.$route.query["id"]!=undefined){
        let id=this.$route.query["id"];
        const data={
            id,
        }
        queryMatchBaseInfo(data).then(res=>{
            console.log(res,'赛事基本信息')
            this.matchKind=res.data.kind;
        });
      }
    },
    methods:{
        next(){
            this.$router.push({
                path:'../group',
                query:{
                    id:this.$route.query["id"],
                    upd:this.$route.query["upd"],
                }
            })
        },
        back(){
            this.$router.push({
                path:'../base',
                query:{
                    id:this.$route.query["id"],
                    upd:this.$route.query["upd"],
                }
            })
        },
        add(){
            this.dialogVisible=true
            this.dialogTitle='新增赛事项'
        },
        MatchProjectlist(){
            const data={
                matchId:this.$route.query["id"],
                pageNumber:this.currentPage,
                pageSize:this.pageSize,
            }
            MatchProjectlist(data).then(res=>{
                this.total=res.data.page.totalRecord
                this.list=res.data.records;
                console.log(res,"赛事项信息")
            })
        },
        onSubmit(){
            const data={
                matchId:this.$route.query["id"],
                title:this.form.title,
                address:this.form.state,
                addressEnd:this.form.end,
                qualification:this.form.qualification,
                signupCount:this.form.limit,
                voteRule:this.form.voteRule,
                voteNum:this.form.voteNum,
                releaseState:1,
                state:1,
                route:this.form.instructions
            }
            if(this.form.title==''){
                this.$message.error('比赛项必填');
            }else if(this.matchKind==1&&this.form.voteRule==null){
              this.$message.error('投票规则必须设置');
            }else if(this.matchKind==1&&this.form.voteRule==1&&this.form.voteNum==null){
              this.$message.error('一人一天可投票数必须设置');
            }else{
                if(this.dialogTitle=='新增赛事项'){
                    insertMatchProject(data).then(res=>{
                        this.dialogVisible=false;
                        this.form={
                            title:'',
                            state:'',
                            end:'',
                            qualification:'',
                            limit:0,
                            instructions:'',
                            voteRule:0,
                            voteNum:1,
                            route:''
                        }
                        if(res.code==200){
                          this.$message.success("保存成功！");
                        }
                        this.MatchProjectlist();
                    })
                }else if(this.dialogTitle=='编辑赛事项'){
                    data.id=this.updId;
                    updateMatchProject(data).then(res=>{
                        this.dialogVisible=false;
                        if(res.code==200){
                          this.$message.success("保存成功！");
                        }
                        this.MatchProjectlist();
                        this.form={
                            title:'',
                            state:'',
                            end:'',
                            qualification:'',
                            limit:0,
                            instructions:'',
                            voteRule:0,
                            voteNum:1,
                            route:''
                        }
                    })
                }
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
                deleteMatchProject(data).then(res=>{
                    this.MatchProjectlist()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            })

        },
        upd(row){
            console.log(row)
            this.updId=row.id
            this.form={
                title:row.title,
                state:row.address,
                end:row.addressEnd,
                qualification:row.qualification,
                limit:row.signupCount,
                voteRule:row.voteRule,
                voteNum:row.voteNum,
                instructions:row.route
            }
            this.dialogTitle='编辑赛事项'
            this.dialogVisible=true
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.MatchProjectlist()
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.MatchProjectlist()
        },

        updSorting(){
            console.log(this.list)
            let records=[]
            for(let i=0;i<this.list.length;i++){
                records.push(
                {
                    'id':this.list[i].id,
                    'listIndex':this.list[i].listIndex
                }
                )
            }
            const data={
                records
            }
            gtMatchProjectSort(data).then(res => {
                console.log(res)
                this.MatchProjectlist()
            })
        },
        beforeClose(){
            this.form={
                title:'',
                state:'',
                end:'',
                qualification:'',
                limit:0,
                instructions:'',
                voteRule:0,
                voteNum:1,
                route:''
            }
            this.dialogVisible=false;
        },

        tableSet(projectId){
            this.$router.push({
                path:'tableSet',
                query:{
                    id:this.$route.query["id"],
                    projectId,
                    upd:this.$route.query["upd"],
                }
            })
        }
    }
}
</script>
