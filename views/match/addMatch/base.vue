<template>
    <div class="app-container">
        <el-steps :space="200" :active="0" simple finish-status="success" style="margin-bottom:15px;">
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
          <el-step :title="step4"></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="赛事类型" required>
                <el-select v-model="form.typeId" placeholder="请选择" style="width: 100%;" size="small" :disabled="btnStatus==1">
                <el-option v-for="(item,i) in MatchType" :key="i" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赛事名称" required>
                <el-input v-model="form.title" size="small" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="封面图片">
                <el-upload
                    class="upload-demo"

                    :headers="headers"
                    :action="uploadAction"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="form.fileList"
                    :limit="1"
                    list-type="picture">
                    <el-button size="small" type="primary" v-show="btnStatus!=1">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" v-show="btnStatus!=1">推荐尺寸：416*372 支持png\jpg\jpeg常用图片格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="赛事简介">
                <el-input  size="small" type="textarea" v-model="form.content" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="赛事分类" required>
                <el-select v-model="form.kind" placeholder="请选择" style="width: 100%;" size="small" :disabled="btnStatus==1">
                    <el-option label="线下赛事" value="0"></el-option>
                    <el-option label="线上赛事" value="1"></el-option>
                </el-select>
                <span class="el-upload__tip">视频比赛称之为线上赛事，其他赛事（如自行车赛）为线下赛事</span>
            </el-form-item>
            <el-form-item label="报名时间" required>
                <el-date-picker
                size="small"
                :readonly="btnStatus==1"
                v-model="form.signUpTime"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['08:00:00', '18:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传作品时间" required v-show="form.kind==1">
                <el-date-picker
                size="small"
                :readonly="btnStatus==1"
                v-model="form.uploadTime"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['08:00:00', '18:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="比赛时间" required>
                <el-date-picker
                size="small"
                :readonly="btnStatus==1"
                v-model="form.gameTime"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['08:00:00', '18:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报名限制" required v-show="form.kind==0">
                <el-select v-model="form.signupType" placeholder="请选择" style="width: 100%;" size="small" :disabled="btnStatus==1">
                    <el-option label="无限制" value="1"></el-option>
                    <el-option label="仅个人" value="2"></el-option>
                    <el-option label="仅团队" value="3"></el-option>
                </el-select>
                <span class="el-upload__tip">无限制为同时支持个人报名与团队报名</span>
            </el-form-item>

            <el-form-item label="活动地址">
                <el-input size="small" v-model="form.address" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="主办单位">
                <el-input size="small" v-model="form.organizer" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="承办单位">
                <el-input size="small" v-model="form.undertaker" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="执行单位">
                <el-input size="small" v-model="form.executionUnit" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="特别支持单位">
                <el-input size="small" v-model="form.supportingUnit" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <el-form-item label="比赛官网">
                <el-input size="small" v-model="form.webSite" :readonly="btnStatus==1"></el-input>
            </el-form-item>
            <!-- <el-form-item label="详细介绍" v-show="extList.length<2">
                <el-card style="height: 640px;width:100%">
                    <quill-editor v-model="form.introduce" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                    </quill-editor>
                </el-card>
            </el-form-item> -->

            <el-tabs v-model="editableTabsValue" type="card" @tab-add="addExtInfo" @tab-remove="removeExtInfo" :editable="btnStatus!=1" @tab-click="chgExtInfo">
                <el-tab-pane
                    v-for="(item,index) in extList"
                    :data="item"
                    :key="item.id"
                    :name="item.name+'_'+item.id"
                    :label="item.name"
                    :closable="item.id!=0&&btnStatus!=1"
                >
                  <el-form-item label="名称" v-if="btnStatus!=1" required style="margin-top:15px;">
                      <el-input size="small" v-model="item.title" :readonly="btnStatus==1||item.id==0"></el-input>
                  </el-form-item>
                  <el-form-item label="排序" v-if="btnStatus!=1">
                      <el-input size="small" v-model="item.listIndex" type="number" :readonly="btnStatus==1||item.id==0"></el-input>
                  </el-form-item>
                  <el-form-item label="类型" required v-if="btnStatus!=1">
                      <el-select v-model="item.type" placeholder="请选择" style="width: 100%;" size="small" :disabled="btnStatus==1||item.id==0">
                          <el-option label="内容" value=0></el-option>
                          <el-option label="附件" value=1></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="内容" v-if="btnStatus!=1&&item.type==0">
                      <el-card style="width:100%">
                        <tinymce-editor ref="editor"
                            v-model="item.introduce"
                            >
                        </tinymce-editor>
                      </el-card>
                  </el-form-item>
                  <el-form-item label="附件名称" v-if="btnStatus!=1&&item.type==1">
                      <el-input size="small" v-model="item.attName" :readonly="btnStatus==1||item.id==0"></el-input>
                  </el-form-item>
                  <el-form-item label="附件上传" v-if="btnStatus!=1&&item.type==1">
                    <el-upload
                        class="upload-demo"
                        :data="{'index':index}"
                        :headers="headers"
                        :action="uploadAction"
                        :on-remove="handleRemoveAtt"
                        :on-success="handleSuccessAtt"
                        :file-list="item.cover!=''?[{'name':item.cover,'url':item.coverInner}]:[]"
                        :limit="1">
                        <el-button size="small" type="primary" v-show="btnStatus!=1">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                  <div v-show="btnStatus==1&&item.type!=1" v-html="item.introduce" class="tab_div"></div>
                  <div v-show="btnStatus==1&&item.type==1&&item.coverInner!=''" class="tab_div">
                      附件：<a :href="item.coverInner" class="att_a">{{item.attName}}</a>
                  </div>
                </el-tab-pane>
            </el-tabs>
            <!-- <el-form-item label="扩展名称" v-if="tabStatus=='edit'&&btnStatus!=1&&form.matchId!=''" required>
                <el-input size="small" v-model="extForm.name" :readonly="btnStatus==1||extForm.id==0"></el-input>
            </el-form-item>
            <el-form-item label="扩展排序" v-if="tabStatus=='edit'&&btnStatus!=1&&form.matchId!=''">
                <el-input size="small" v-model="extForm.listIndex" type="number" :readonly="btnStatus==1||extForm.id==0"></el-input>
            </el-form-item>
            <el-form-item label="扩展内容" v-if="tabStatus=='edit'&&btnStatus!=1&&form.matchId!=''">
                <el-card style="height: 320px;width:100%">
                    <quill-editor v-model="extForm.introduce" ref="myQuillEditor" style="height: 200px;" :options="editorOption">
                    </quill-editor>
                </el-card>
            </el-form-item> -->
            <el-form-item>
                <el-button v-if="btnStatus!=1" style="" @click="save">保存</el-button>
                <el-button v-if="btnStatus!=1" style="" @click="next">保存，下一步</el-button>
                <el-button v-if="btnStatus==1" style="" @click="next1">下一步</el-button>
            </el-form-item>
            <!-- <el-form-item v-if="tabStatus=='edit'&&form.matchId!=''">
                <el-button v-if="btnStatus!=1" style="" @click="saveExt">保存扩展信息</el-button>
                <el-button v-if="btnStatus!=1" style="" @click="nextExt">保存扩展信息，下一步</el-button>
                <el-button v-if="btnStatus==1" style="" @click="next1">下一步</el-button>
            </el-form-item> -->
        </el-form>
    </div>
</template>
<script>
import { getGtMatchTypeOptions,addMatchBaseInfo,queryMatchBaseInfo,updateMatchBaseInfo,batchAddMatchExtInfo,addMatchExtInfo,getGtMatchExtList,updateMatchExtInfo,delMatchExtInfo } from '../../../api/match'
import TinymceEditor from '../../../components/tinymce-editor/tinymce-editor'
import moment from 'moment'
import {UPLOAD_ACTION} from '@/utils/const.js'
export default {
    name: 'FuncFormsEdit',
    components: {
        TinymceEditor
    },
    data(){
        return{
            //赛事类型下拉框
            MatchType:[],

            uploadAction:UPLOAD_ACTION,
            //富文本
            content: null,
            editorOption: {},

            headers:{"token": ''},
            form:{
                matchId:'',
                typeId:'',
                title:'',
                fileList:[],
                content:'',
                kind:null,
                listIndex:null,
                signUpTime:'',
                uploadTime:'',
                gameTime:'',
                signupType:'',
                address:'',
                organizer:'',
                undertaker:'',
                executionUnit:'',
                supportingUnit:'',
                webSite:'',
                smsTmpCode:'',
                introduce:''
            },

            editableTabsValue:'',
            tabStatus:'edit',
            extList: [],
            step1:'基本信息',
            step2:'赛事项设置',
            step3:'报名分组设置',
            step4:'模板设置',
            btnStatus:''
        }
    },
    created(){
        if(this.$route.query["upd"]==false || this.$route.query["upd"]=='false'){
            this.btnStatus=1;
            this.tabStatus='';
            this.step1='基本信息';
            this.step2='赛事项信息';
            this.step3='报名分组信息';
            this.step4='模板信息';
        }
    },
    async mounted(){

        this.headers.token=sessionStorage.getItem("token")
        await this.getGtMatchTypeOptions();

        console.log(this.$route.query["id"],'路由传参')
        if(this.$route.query["id"]!=undefined){
            let id=this.$route.query["id"];
            this.form.matchId=id;
            const data={
                id,
            }
            await queryMatchBaseInfo(data).then(res=>{
                console.log(res,'赛事基本信息')
                let form={
                    matchId:res.data.id,
                    typeId:res.data.typeId,
                    title:res.data.title,
                    fileList:res.data.coverInner==null?[]:res.data.coverInner==''?[]:[{url:res.data.coverInner}],
                    content:res.data.content,
                    listIndex:res.data.listIndex,
                    kind:`${res.data.kind}`,
                    signUpTime:[res.data.signupStart,res.data.signupEnd],
                    uploadTime:[res.data.uploadStart==null?'':res.data.uploadStart,res.data.uploadEnd==null?'':res.data.uploadEnd],
                    gameTime:[res.data.matchStart,res.data.matchEnd],
                    signupType:`${res.data.signupType}`,
                    address:res.data.address,
                    organizer:res.data.organizer,
                    undertaker:res.data.undertaker,
                    executionUnit:res.data.executionUnit,
                    supportingUnit:res.data.supportingUnit,
                    webSite:res.data.webSite,
                    smsTmpCode:res.data.smsTmpCode,
                    introduce:res.data.introduce
                }
                this.filepath = res.data.cover;
                this.fileurl = res.data.coverInner;
                this.form=form;
                this.getGtMatchExtList("init");
            });
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }else{
          var extFirst = {
              id:0,
              name:'详细介绍',
              title:'详细介绍',
              matchId:this.form.matchId,
              introduce:this.form.introduce,
              type:`${0}`,
              listIndex:0
          };
          this.editableTabsValue = "详细介绍_0";
          this.extList.push(extFirst);
        }

    },
    methods:{
        //获取赛事类型
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
        async getGtMatchExtList(status){
            if(this.$route.query["id"]!=undefined||this.form.matchId!=''){
                let id = this.$route.query["id"];
                if(!id){
                    id = this.form.matchId;
                }
                await getGtMatchExtList({id:id}).then(res=>{
                    console.log(res,'赛事扩展信息')
                    this.extList=res.data;
                    var extFirst = {
                        id:0,
                        name:'详细介绍',
                        title:'详细介绍',
                        matchId:this.form.matchId,
                        introduce:this.form.introduce,
                        listIndex:0,
                        type:`${0}`,
                        link:''
                    };
                    this.extList.splice(0,0,extFirst);
                    if(status=="init"){
                      this.editableTabsValue = "详细介绍_0";
                    }
                })
            }
        },

        //图片上传
        handleRemove(file, fileList) {
            this.form.fileList=[];
            this.fileurl="";
            this.filepath="";
        },
        handlePreview(file) {

        },
        handleSuccess(response, file, fileList) {
            this.fileurl=fileList[0].response.data.fileurl;
            this.filepath=fileList[0].response.data.filepath;
        },

        //图片上传
        handleRemoveAtt(file, fileList) {
          var curtab = this.editableTabsValue.split("_");
          for(var i=1;i<this.extList.length;i++){
            var ext = this.extList[i];
            console.log(i,"第几个");
            console.log(curtab,"curtab");
            console.log(ext,"ext");
            if((ext.id==curtab[1]||(ext.id==null&&curtab[1]=="null"))&&ext.name==curtab[0]){
              console.log(this.extList,"命中前");
              ext.cover = "";
              ext.coverInner = "";
              this.extList.splice(i,1,ext);
              console.log(this.extList,"命中后");
              break;
            }
          }
          console.log(this.extList,"extList remove")
        },
        handleSuccessAtt(response, file, fileList) {
          console.log(response,"response");
          console.log(file,"file");
          console.log(fileList,"fileList");

          var curtab = this.editableTabsValue.split("_");
          for(var i=1;i<this.extList.length;i++){
            var ext = this.extList[i];
            if((ext.id==curtab[1]||(ext.id==null&&curtab[1]=="null"))&&ext.name==curtab[0]){
              ext.cover = fileList[0].response.data.filepath;
              ext.coverInner = fileList[0].response.data.fileurl;
              break;
            }
          }
          console.log(this.extList,"extList success")
        },

        save(){
            if(this.form.typeId==''){
                this.$message.error('赛事类型必填');
            }else if(this.form.title==''){
                this.$message.error('赛事名称必填');
            }else if(this.form.kind==''||this.form.kind==null){
                this.$message.error('赛事分类必选');
            }else if(this.form.signUpTime==undefined){
                this.$message.error('报名时间必填');
            }else if(this.form.uploadTime==undefined&&this.form.kind==1){
                this.$message.error('上传作品时间必填');
            }else if(this.form.gameTime==undefined){
                this.$message.error('比赛时间必填');
            }else if(this.form.signupType==''&&this.form.kind==0){
                this.$message.error('报名限制必选');
            }else{
                var data={
                    typeId:this.form.typeId,
                    title:this.form.title,
                    content:this.form.content,
                    listIndex:this.form.listIndex,
                    kind:this.form.kind,
                    cover:this.filepath,
                    coverInner:this.fileurl,
                    signupStart:moment(this.form.signUpTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                    signupEnd:moment(this.form.signUpTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                    matchStart:moment(this.form.gameTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                    matchEnd:moment(this.form.gameTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                    address:this.form.address,
                    organizer:this.form.organizer,
                    undertaker:this.form.undertaker,
                    executionUnit:this.form.executionUnit,
                    supportingUnit:this.form.supportingUnit,
                    webSite:this.form.webSite,
                    introduce:this.form.introduce,
                    smsTmpCode:this.form.smsTmpCode,
                    releaseState:-2,
                    createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
                    state:1
                }
                if(this.form.kind==1){
                    data.uploadStart = moment(this.form.uploadTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    data.uploadEnd=moment(this.form.uploadTime[1]).format('YYYY-MM-DD HH:mm:ss');
                }else{
                    data.signupType=this.form.signupType;
                }
                if(this.extList.length>0&&this.extList[0].id==0){
                  data.introduce=this.extList[0].introduce;
                }
                console.log(data,"data")
                if(this.$route.query["id"]==undefined&&this.form.matchId==''){
                    addMatchBaseInfo(data).then(res=>{
                      this.form.matchId = res.data;
                      if(res.code==200){
                        if(this.extList.length>1){
                          var extData = {list:this.extList,matchId:this.form.matchId}
                          console.log(extData,"ext list");
                          batchAddMatchExtInfo(extData).then(extRes=>{
                            if(extRes.code==200){
                              this.$message.success("保存成功");
                            }
                          })
                        }else{
                          this.$message.success("保存成功");
                        }
                      }
                    })
                }else{
                    data.id=this.form.matchId;
                    console.log(this.form.fileList,"f list")
                    data.cover=this.filepath;
                    data.coverInner=this.fileurl;
                    updateMatchBaseInfo(data).then(res=>{
                        if(res.code==200){
                          if(this.extList.length>1){
                            var extData = {list:this.extList,matchId:this.form.matchId}
                            batchAddMatchExtInfo(extData).then(extRes=>{
                              if(extRes.code==200){
                                this.$message.success("保存成功");
                                this.extList = extRes.data;
                                this.editableTabsValue = "详细介绍_0";
                              }
                            })
                          }else{
                            this.$message.success("保存成功");
                          }
                        }
                    })
                }
            }

        },

        next(){
            if(this.form.typeId==''){
                this.$message.error('赛事类型必填');
            }else if(this.form.title==''){
                this.$message.error('赛事名称必填');
            }else if(this.form.kind==''||this.form.kind==null){
                this.$message.error('赛事分类必选');
            }else if(this.form.signUpTime==''){
                this.$message.error('报名时间必填');
            }else if(this.form.uploadTime==''&&this.form.kind==1){
                this.$message.error('上传作品时间必填');
            }else if(this.form.gameTime==''){
                this.$message.error('比赛时间必填');
            }else if(this.form.signupType==''&&this.form.kind==0){
                this.$message.error('报名限制必选');
            }else{
                var data={
                    typeId:this.form.typeId,
                    title:this.form.title,
                    content:this.form.content,
                    listIndex:this.form.listIndex,
                    kind:this.form.kind,
                    cover:this.filepath,
                    coverInner:this.fileurl,
                    signupStart:moment(this.form.signUpTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                    signupEnd:moment(this.form.signUpTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                    matchStart:moment(this.form.gameTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                    matchEnd:moment(this.form.gameTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                    address:this.form.address,
                    organizer:this.form.organizer,
                    undertaker:this.form.undertaker,
                    executionUnit:this.form.executionUnit,
                    supportingUnit:this.form.supportingUnit,
                    webSite:this.form.webSite,
                    introduce:this.form.introduce,
                    smsTmpCode:this.form.smsTmpCode,
                    releaseState:-2,
                    createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
                    state:1
                }
                if(this.form.kind==1){
                    data.uploadStart = moment(this.form.uploadTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    data.uploadEnd=moment(this.form.uploadTime[1]).format('YYYY-MM-DD HH:mm:ss');
                }else{
                    data.signupType=this.form.signupType;
                }
                if(this.extList.length>0&&this.extList[0].id==0){
                  data.introduce=this.extList[0].introduce;
                }
                if(this.$route.query["id"]==undefined){
                    addMatchBaseInfo(data).then(res=>{
                        this.$router.push({
                            path:'project',
                            query:{
                                id:res.data,
                                upd:true,
                            }
                        })
                    })
                }else{
                    if(this.$route.query["upd"]){
                        data.id=this.$route.query["id"];
                        updateMatchBaseInfo(data).then(res=>{
                            this.$router.push({
                                path:'project',
                                query:{
                                    id:this.$route.query["id"],
                                    upd:this.$route.query["upd"]
                                }
                            })
                        })
                    }else if(!this.$route.query["upd"]){
                        this.$router.push({
                            path:'project',
                            query:{
                                id:this.$route.query["id"],
                                upd:this.$route.query["upd"]
                            }
                        })
                    }
                }
            }

        },

        next1(){
            this.$router.push({
                path:'project',
                query:{
                    id:this.$route.query["id"],
                    upd:this.$route.query["upd"]
                }
            })
        },

        addExtInfo() {
            var newTabName = '扩展信息添加'+this.extList.length;
            this.extList.push({
                id:null,
                title: newTabName,
                name: newTabName,
                matchId:this.form.matchId,
                introduce:'',
                link:'',
                attName:'',
                cover:'',
                coverInner:'',
                type:`${0}`,
                listIndex:this.extList.length+1
            });
            this.tabStatus = "edit";
            this.editableTabsValue = newTabName+"_null";
            console.log(this.extList);
        },

        removeExtInfo(name) {
            if(this.btnStatus==1){
                return;
            }
            let targetName = name.split("_")[0];
            let delid = name.split("_")[1];
            if(delid==0){
                this.$message({
                    type: 'warning',
                    message: '【详细介绍】信息不能删除!'
                });
            }else{
                this.$confirm('此操作将永久删除【'+targetName+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let tabs = this.extList;
                    let activeName = this.editableTabsValue;
                    if (activeName === name) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name+"_"+nextTab.id;
                                }
                            }
                        });
                    }
                    if(delid!=null){
                         delMatchExtInfo({id:delid}).then(res=>{});
                    }
                    this.editableTabsValue = activeName;
                    this.extList = tabs.filter(tab => tab.name !== targetName);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        chgExtInfo(extInfo){
            console.log(extInfo.$attrs.data,"chgExtInfo");
            // let obj = extInfo.$attrs.data;
            // let eForm={
            //     id:obj.id,
            //     name:obj.name,
            //     matchId:obj.matchId,
            //     introduce:obj.introduce,
            //     listIndex:obj.listIndex
            // };
            // this.extForm=eForm;
            // this.tabStatus="edit";

        },
        saveExt(){
            let extData={
                id:this.extForm.id,
                name:this.extForm.name,
                matchId:this.form.matchId,
                introduce:this.extForm.introduce,
                listIndex:this.extForm.listIndex
            }
            if(this.extForm.name==''){
                this.$message.error('扩展名称必填');
            }else{
                if(this.extForm.id==null){
                    addMatchExtInfo(extData).then(res=>{
                        this.extForm.id = res.data;
                        if(res.code==200){
                            this.$message.success("保存成功");
                            this.getGtMatchExtList();
                        }
                    })
                }else if(this.extForm.id==0&&this.extForm.name=="详细介绍"){
                    this.form.introduce=this.extForm.introduce;
                    this.save();
                }else{
                    updateMatchExtInfo(extData).then(res=>{
                        if(res.code==200){
                            this.$message.success("保存成功");
                            this.getGtMatchExtList();
                        }
                    })
                }
            }
        },
        nextExt(){
            let extData={
                id:this.extForm.id,
                name:this.extForm.name,
                matchId:this.form.matchId,
                introduce:this.extForm.introduce,
                listIndex:this.extForm.listIndex
            }
            if(this.extForm.name==''){
                this.$message.error('扩展名称必填');
            }else{
                if(this.extForm.id==null){
                    addMatchExtInfo(extData).then(res=>{
                        if(res.code==200){
                            this.$message.success("保存成功");
                            this.tabStatus='';
                            this.$router.push({
                                path:'project',
                                query:{
                                    id:this.$route.query["id"],
                                    upd:this.$route.query["upd"]
                                }
                            });
                        }
                    })
                }else if(this.extForm.id==0&&this.extForm.name=="详细介绍"){
                    this.form.introduce=this.extForm.introduce;
                    this.next();
                }else{
                    updateMatchExtInfo(extData).then(res=>{
                        if(res.code==200){
                            this.$message.success("保存成功");
                            this.tabStatus='';
                            this.$router.push({
                                path:'project',
                                query:{
                                    id:this.$route.query["id"],
                                    upd:this.$route.query["upd"]
                                }
                            })
                        }
                    })
                }
            }
        }
    }
}
</script>
<style scoped>
.tab_div{
    border:1px solid #E4E7ED;
    border-top:0px;
    border-radius:4px;
    padding:15px;
    margin-top:-5px;
    margin-bottom:15px;
}
.att_a{
  color: #66b1ff;
}
.att_a:hover{
  text-decoration:underline;
}
</style>
<style >
.el-tabs > div.el-tabs__header.is-top{
    margin-bottom: 0px;
}
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
</style>
