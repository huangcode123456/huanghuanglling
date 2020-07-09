<template>
    <div class="app-container">
        <el-page-header @back="goBack" content="新增赛事"></el-page-header>

        <el-steps style="margin:10px 40px" :active="active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="赛事项"></el-step>
            <el-step title="赛事项报名分组"></el-step>
            <el-step title="模板设置"></el-step>
        </el-steps>

        <el-form v-if="active==0" style="margin:0px 180px 0px 80px" ref="form" :model="form1" label-width="120px">
            <el-form-item label="赛事类型">
                <el-select v-model="form1.type" placeholder="请选择" style="width: 100%;" size="small">
                <el-option v-for="(item,i) in MatchType" :key="i" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赛事名称">
                <el-input v-model="form1.title" size='small'></el-input>
            </el-form-item>
            <el-form-item label="封面图片">
                <el-upload
                    class="upload-demo"
                    :headers="headers"
                    :action="uploadAction"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="form1.fileList"
                    :limit="1"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">推荐尺寸：416*372 支持png\jpg\jpeg常用图片格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="赛事简介">
                <el-input type="textarea" v-model="form1.Introduction"></el-input>
            </el-form-item>
            <el-form-item label="报名时间">
                <el-date-picker
                v-model="form1.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="比赛时间">
                <el-date-picker
                v-model="form1.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报名限制">
                <el-select v-model="form1.type" placeholder="请选择" style="width: 100%;" size="small">
                    <el-option label="无限制" value="1"></el-option>
                    <el-option label="仅个人" value="2"></el-option>
                    <el-option label="仅团队" value="3"></el-option>
                </el-select>
                <span class="el-upload__tip">无限制为同时支持个人报名与团队报名</span>
            </el-form-item>

            <el-form-item label="活动地址">
                <el-input v-model="form1.address" size='small'></el-input>
            </el-form-item>
            <el-form-item label="主办单位">
                <el-input v-model="form1.organizer" size='small'></el-input>
            </el-form-item>
            <el-form-item label="承办单位">
                <el-input v-model="form1.undertaker" size='small'></el-input>
            </el-form-item>
            <el-form-item label="执行单位">
                <el-input v-model="form1.executionUnit" size='small'></el-input>
            </el-form-item>
            <el-form-item label="特别支持单位">
                <el-input v-model="form1.supportingUnit" size='small'></el-input>
            </el-form-item>
            <el-form-item label="比赛官网">
                <el-input v-model="form1.webSite" size='small'></el-input>
            </el-form-item>
            <el-form-item label="详细介绍">
                <el-card style="width:100%">
                    <tinymce-editor ref="editor"
                        v-model="form1.introduce"
                    >
                    </tinymce-editor>
                    <!-- <quill-editor v-model="form1.introduce" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                    </quill-editor> -->
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-button style="" @click="next">下一步</el-button>
            </el-form-item>
        </el-form>

        <div v-if="active==1" style="padding-bottom:20px;">
            <el-button type="primary" @click="add2" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
        </div>
        <el-table
            v-if="active==1"
            :data="list"
            border
            fit
            highlight-current-row>
            <el-table-column
                width="200px"
                align="center"
                label="比赛项"
                prop="project">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="状态"
                prop="state">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="报名要求"
                prop="requirements">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="报名人数"
                prop="num">
            </el-table-column>
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
                fixed="right"
                align="center"
                width="180"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                    <el-link type="primary" @click="" style="margin-left:5px">置为草稿</el-link>
                    <el-link type="primary" @click="" style="margin-left:5px">编辑</el-link>
                    <el-link type="primary" @click="" style="margin-left:5px">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="active==2" style="padding-bottom:20px;">
            <el-button type="primary" @click="add3" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
        </div>
        <el-table
            v-if="active==2"
            :data="list"
            border
            fit
            highlight-current-row>
            <el-table-column
                width="200px"
                align="center"
                label="比赛项"
                prop="project">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="组别名称"
                prop="state">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="报名费用"
                prop="requirements">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="人数要求"
                prop="num">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="可否报名"
                prop="num">
            </el-table-column>
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
                fixed="right"
                align="center"
                width="180"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                    <el-link type="primary" @click="" style="margin-left:5px">置为草稿</el-link>
                    <el-link type="primary" @click="" style="margin-left:5px">编辑</el-link>
                    <el-link type="primary" @click="" style="margin-left:5px">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>


        <el-button v-if="active!=0" style="margin-top:10px"  @click="Back">上一步</el-button>
        <el-button v-if="active!=0" style="" @click="next">下一步</el-button>

        <el-dialog
            title="新增赛事项"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="dialogVisible2"
            :append-to-body="appendToBody"
            width="60%">
            <el-form  ref="form" :model="form2" label-width="90px">
                <el-form-item label="比赛项">
                    <el-input v-model="form2.project" size='small'></el-input>
                </el-form-item>
                <el-form-item label="赛事起点">
                    <el-input v-model="form2.state" size='small'></el-input>
                </el-form-item>
                <el-form-item label="赛事终点">
                    <el-input v-model="form2.end" size='small'></el-input>
                </el-form-item>
                <el-form-item label="赛事终点">
                    <el-input type="textarea" v-model="form2.requirements" size='small'></el-input>
                </el-form-item>
                <el-form-item label="人数限制">
                    <el-input type="number" v-model="form2.limit" size='small'></el-input>
                </el-form-item>
                <el-form-item label="比赛项说明">
                    <el-card style="width:100%">
                        <tinymce-editor ref="myQuillEditor"
                            v-if='dialogVisible2'
                            v-model="form1.instructions"
                        >
                        </tinymce-editor>
                    </el-card>
                    <!-- <el-card style="height: 680px;width:100%">
                        <quill-editor v-model="form1.instructions" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                        </quill-editor>
                    </el-card> -->
                </el-form-item>
                <el-form-item>
                    <el-button style="" @click="">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            title="新增赛事项报名分组"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="dialogVisible3"
            :append-to-body="appendToBody"
            width="60%">
            <el-form  ref="form" :model="form2" label-width="100px">
                <el-form-item label="比赛项">
                    <el-select v-model="form1.type" placeholder="请选择" style="width: 100%;" size="small">
                        <el-option label="item.title" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组别名称">
                    <el-input v-model="form2.state" size='small'></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="form2.end" size='small'></el-input>
                </el-form-item>
                <el-form-item label="报名费用(元)">
                    <el-input type="number" v-model="form2.limit" size='small'></el-input>
                </el-form-item>
                <el-form-item label="限制分组年龄">
                    <el-date-picker
                        v-model="form1.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  label="团队人数限制">
                    <div>
                        <el-input style="width:100px;display:inline-block" type="number" v-model="form2.limit" size='small'></el-input>
                        --
                        <el-input style="width:100px;display:inline-block" type="number" v-model="form2.limit" size='small'></el-input>
                    </div>
                </el-form-item>
                <el-form-item  label="允许报名人数">
                    <el-input type="number" v-model="form2.limit" size='small'></el-input>
                </el-form-item>
                <el-form-item label="性别限制">
                    <el-select v-model="form1.type" placeholder="请选择" style="width: 100%;" size="small">
                        <el-option label="无限制" value="item.id"></el-option>
                        <el-option label="男" value="item.id"></el-option>
                        <el-option label="女" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="" @click="">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import { getGtMatchTypeOptions } from '../../api/match'
import TinymceEditor from '../../components/tinymce-editor/tinymce-editor'
import {UPLOAD_ACTION} from '@/utils/const.js'
export default {
    name: 'FuncFormsEdit',
    components: {
        TinymceEditor
    },
    data(){
        return{
            //dialog
            appendToBody:true,
            closeOnClickModal:false,
            dialogVisible2:false,
            dialogVisible3:false,

            uploadAction:UPLOAD_ACTION,
            //步骤条
            active:2,

            //富文本
            content: null,
            editorOption: {},

            //赛事类型下拉框
            MatchType:[],

            headers:{"token": ''},

            //赛事项列表
            list:[

            ],

            //基本信息
            form1:{
                type:'',
                title:'',
                fileList:[],
                Introduction:'',
                signUpTime:'',
                gameTime:'',
                signUplimit:'',
                address:'',
                organizer:'',
                undertaker:'',
                executionUnit:'',
                supportingUnit:'',
                webSite:'',
                introduce:''
            },
            //比赛项
            form2:{
                project:'',
                state:'',
                end:'',
                requirements:'',
                limit:'',
                instructions:''
            },
            //赛事项报名分组
            form3:{

            }
        }
    },
    async mounted(){
        this.headers.token=sessionStorage.getItem("token")
        await this.getGtMatchTypeOptions()
    },
    methods:{
        async getGtMatchTypeOptions(){
            const data={
                releaseState:1,
                state:1
            }
            await getGtMatchTypeOptions(data).then(res=>{
                this.MatchType=res.data.list
                console.log(res)
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        //图片上传
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.addform.fileList[0]='';
        },
        handlePreview(file) {

            // console.log(file);
        },
        handleSuccess(response, file, fileList) {
            console.log(fileList)
            this.addform.fileList[0]=fileList[0].response.data.fileurl;
        },

        next(){
            this.active=this.active+1
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        Back(){
            this.active=this.active-1
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        add2(){
            this.dialogVisible=true
        },
        add3(){

        },
        updSort(){

        }
    }
}
</script>
