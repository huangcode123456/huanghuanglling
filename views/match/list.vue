<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="赛事名称">
        <el-input v-model="form.title" size='small'></el-input>
      </el-form-item>
      <el-form-item label="赛事专题">
        <el-select v-model="form.project" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in speciallist" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="form.status" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option label="草稿" value="-2"></el-option>
          <el-option label="审核中" value="-1"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赛事类型">
        <el-select v-model="form.type" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in MatchType" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名时间">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <div style="padding-bottom:20px;">
      <el-button type="primary" @click="addNews" icon="el-icon-plus" size="mini">新增</el-button>
      <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
    </div>

    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
			v-loading="loading"
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
        width="80px"
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="赛事类型"
        prop="typeName">
      </el-table-column>

      <el-table-column
        align="center"
        label="赛事名称"
        width="200"
        prop="title">
      </el-table-column>

      <el-table-column
        align="center"
        width="200"
        label="所属专题"
        >
        <template slot-scope="scope" >
          <el-link type="primary" @click="showSetSpecial(scope.row.id,scope.row.specialtitle)">专题设置</el-link>
          <div v-if="scope.row.specialtitle">{{scope.row.specialtitle}}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="封面图片">
          <template slot-scope="scope" >
            <div>
              <img @click="imgClick(scope.row.coverInner)" style="width:100px" :src="scope.row.coverInner" alt="">
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="赛事状态">
          <template slot-scope="scope" >
            <div>
              <span>{{scope.row.state==1?'正常':'停用'}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="内容"
        prop="content">
        <template slot-scope="scope" >
          <el-link type="primary" @click="showQrCode(scope.row.id,scope.row.releaseState,scope.row.state)">预览</el-link>
        </template>

        <!-- <el-tooltip placement="top">
          <div slot="content">
            <img style="width:150px" src="../../../public/images/news/erweima.png" alt="">
          </div>
          <el-link type="primary" @click="">预览</el-link>
        </el-tooltip> -->
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="报名人数"
        prop="baomingCount">
        <!-- <template slot-scope="scope">
          <el-link type="primary" >{{scope.row.baomingCount}}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="审核状态"
        prop="status">
        <template slot-scope="scope">
          <div>
            {{scope.row.releaseState==1?'通过':scope.row.releaseState==0?'失败':scope.row.releaseState==-1?'待审核':scope.row.releaseState==-2?'草稿':''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="false"
        align="center"
        width="100"
        label="审核内容"
        prop="releaseContent">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        width="160"
        label="设置">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.releaseState!=-2" @click="matchUpdSet(scope.row.id)">置为草稿</el-link>
          <el-link type="primary" v-if="scope.row.releaseState==-2" @click="updBase(scope.row.id)">赛事设置</el-link>
          <el-link type="primary" v-if="scope.row.releaseState==-2" @click="matchProjtSet(scope.row.id)">赛事项设置</el-link>
          <el-link type="primary" v-if="scope.row.releaseState==-2" @click="matchGroupSet(scope.row.id)">报名分组设置</el-link>
          <el-link type="primary" @click="matchModelSet(scope.row.id)">模板设置</el-link>
          <el-link type="primary" v-if="scope.row.releaseState==-2" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
          <el-link type="primary" @click="toDetails(scope.row.id)" style="margin-left:5px">详情</el-link>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="210"
        align="center"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <!-- <el-link type="primary" style="margin-left:5px">置为草稿</el-link> -->
              <!-- <el-link type="primary"  v-if="scope.row.releaseState!=1" @click="updBase(scope.row.id)" style="margin-left:5px">编辑</el-link> -->

              <el-link type="primary" @click="toqfSms(scope.row.id)" style="margin-left:5px">群发短信</el-link>
              <el-link type="primary" @click="toCertificate(scope.row.id)" style="margin-left:5px">证书生成</el-link>
              <el-link type="primary" @click="importEntrants(scope.row.id)" style="margin-left:5px">导入报名列表</el-link>
              <el-link type="primary" @click="exportEntrants(scope.row.id)" style="margin-left:5px">导出报名列表</el-link>
              <el-link type="primary" @click="importSsNo(scope.row.id)" style="margin-left:5px">导入参赛编号</el-link>
              <el-link type="primary" @click="importScore(scope.row.id)" style="margin-left:5px">导入成绩</el-link>
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

    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="400px">
        <img style="width:360px" :src="img" alt="">
    </el-dialog>


    <!-- 设置赛事专题弹窗 -->
     <el-dialog
      title="专题设置"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="specialVisible"
      :append-to-body="appendToBody"
      width="400px">
        <el-form ref="form" :model="specialform"  size="mini">
          <el-form-item label="赛事专题">
            <el-select
              style="width:270px"
              clearable
              v-model="specialform.specialIds"
              placeholder="请选择">
              <el-option
                v-for="item in speciallist"
                :key="item.value"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="specialOnSubmit">确定</el-button>
            <el-button @click="specialVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>


    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="importVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="importform" label-width="80px">
          <el-form-item label="赛事分组">
            <el-select v-model="importform.group" placeholder="请选择"  style="width:100%">
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
              <el-option v-for="item in grouplist" :key="item.value" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <span @click="exportEntrantsTemplate" class="el-upload__tip">报名列表模板下载</span>
          </el-form-item>
          <el-form-item label="导入文件">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
              <el-button style="" @click="importonSubmit" size="small">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 参赛编号导入 -->
    <el-dialog
      title="导入参赛编号"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="impSsNoVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="impssnoform" label-width="80px">
          <el-form-item label="导入文件">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-remove="handleRemoveSsno"
              :on-success="handleSuccessSsno"
              :file-list="ssnoFileList"
              v-model="ssnoFileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <span @click="expSsNoTemp" class="el-upload__tip">参赛编号导入表下载</span>
          </el-form-item>
          <el-form-item>
              <el-button @click="impSsNoSubmit" size="small">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 导入成绩 -->
    <el-dialog
      title="导入成绩"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="impScoreVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="impscoreform" label-width="80px">
          <el-form-item label="导入文件">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-remove="handleRemoveScore"
              :on-success="handleSuccessScore"
              :file-list="ssnoFileList"
              v-model="scoreFileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <span @click="expScoreTemp" class="el-upload__tip">成绩导入表下载</span>
          </el-form-item>
          <el-form-item label="导入方式">
            <el-select v-model="impscoreform.type" placeholder="请选择"  style="width:100%">
              <el-option label="覆盖" value="2"></el-option>
              <el-option label="追加" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button style="" @click="impScoreSubmit" size="small">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 二维码 -->
    <el-dialog
      title="微信扫一扫预览"
      :append-to-body="appendToBody"
      :visible.sync="ewmdialogVisible"
      width="300px">
      <div id="qrcode" style="width: 200px;margin:0 auto"></div>
    </el-dialog>
  </div>
</template>

<script>
import { expEntrantsSsnoTemp,impEntrantsSsno,expEntrantsScoreTemp,impEntrantsScore,importEntrants,exportEntrantsTemplate,listMatchProjectPrice,exportEntrants,gtMatchSort,getGtMatchList,getGtMatchTypeOptions,delMatchBaseInfo,gtMatchSpecialList, insertMatchspecial,UpdMatchSet} from '../../api/match'
import {UPLOAD_ACTION} from '@/utils/const.js'
import moment from 'moment'

//二维码
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      //二维码
      ewmdialogVisible:false,

			loading:false,
      img:'',
      //步骤条
      active: 0,

      imgVisible:false,
      addVisible:true,
      closeOnClickModal:false,
      appendToBody:true,

      uploadAction:UPLOAD_ACTION,

      //分页
      total:0,
      currentPage:1,
      pageSize:10,
      form:{
        title:'',
        project:'',
        status:'',
        type:'',
        time:null
      },
      list:[
      ],
      //专题列表
      speciallist:[],
      //赛事类型下拉框
      MatchType:[],

      importVisible:false,
      impSsNoVisible:false,
      impScoreVisible:false,
      grouplist:[],
      importform:{
        group:'',
      },

      impssnoform:{
        matchId:null,
        matchProjectId:null,
        priceId:null
      },
      impscoreform:{
        type:'',
        matchId:null,
        matchProjectId:null,
        priceId:null
      },
      //导入报名列表（赛事id）
      importMatchId:'',
      headers:{"token": ''},
      fileList:[],
      ssnoFileList:[],
      scoreFileList:[],
      // 设置赛事专题
      specialVisible:false,
      specialform:{
        matchId:'',
        specialIds:''
      },
    }
  },
  async mounted () {
    await this.getspecialmessge()
    await this.getGtMatchTypeOptions()
    await this.getMatchList()
    this.headers.token=sessionStorage.getItem("token")
  },
  methods: {
    //二维码
    showQrCode(id,releaseState,state) {
      console.log(id,releaseState,state)
      if(releaseState===1 && state===1){
        const url = "https://www.jctybm.com/webadmin/fileserver/weixin/match?id=" + id
        console.log(url)
        this.ewmdialogVisible = true;
        this.$nextTick(function () {
            document.getElementById("qrcode").innerHTML = "";
            console.log(document.getElementById("qrcode"),'----')
            new QRCode(document.getElementById("qrcode"),
              {
                text:url,
                width: 200,
                height: 200,
              }
            );
        });
      }else{
        this.$message.error('该资讯尚未通过审核或已停用，无法在小程序里预览！');
      }

    },

    // 设置专题提交
    specialOnSubmit(){
      const data=this.specialform
      insertMatchspecial(data).then(res => {
        if(res.code=='200'){
          this.specialVisible=false;
          this.$message.success("设置成功！");
          this.getMatchList()
        }
      })
    },
    // 设置专题弹窗
    showSetSpecial(id,special){
      this.specialform.matchId = id;
      if(special){
        for(let item of this.speciallist ){
          if(item.title == special){
            this.specialform.specialIds = item.id
          }
        }
      }else{
        this.specialform.specialIds = ''
      }

      this.specialVisible=true;
      console.log(this.specialform)
    },
    //导入报名
    importonSubmit(){
      console.log()
      if(this.importform.group==''){
        this.$message.error('请先选择赛事分组');
      }else if(this.fileList.length==0){
        this.$message.error('请上传导入文件');
      }else{
        const data={
          filepath:this.fileList[0].url,
          projectPriceId:this.importform.group
        }
        importEntrants(data).then(res=>{
          console.log(res)
          this.importVisible=false;
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        })
      }
    },
    //文件上传
    handleRemove(file, fileList) {
      this.fileList=[]
    },
    handlePreview(file) {

    },
    handleSuccess(response, file, fileList) {
      console.log(fileList);
      this.fileList=[{name:fileList[0].name,url:fileList[0].response.data.filepath}]
    },
    //报名列表模板下载
    exportEntrantsTemplate(){
      if(this.importform.group){
        const data=this.importform.group;
        exportEntrantsTemplate(data).then(res=>{
          console.log(res)
          var iframe = document.createElement("iframe")
          iframe.style.display = "none";
          iframe.src =res.data;
          document.body.appendChild(iframe);
        })
      }else{
        this.$message.error('请先选择赛事分组');
      }
    },
    //导入报名列表
    importEntrants(id){
      this.importMatchId=id
      const data={
        matchId:this.importMatchId,
        pageNumber:1,
        pageSize:100
      }
      listMatchProjectPrice(data).then(res=>{
        this.grouplist=res.data.records;
        this.importVisible=true
        console.log(res)
      })
    },

    //导入参赛编号
    importSsNo(id){
      this.impssnoform.matchId=id;
      this.impssnoform.matchProjectId=null;
      this.impssnoform.priceId=null;
      this.impSsNoVisible=true;
      this.ssnoFileList=[];
    },
    expSsNoTemp(){
      if(this.impssnoform.matchId){
        const data=this.impssnoform.matchId;
        // const data={
        //   matchId:this.impssnoform.matchId,
        //   matchProjectId:this.impssnoform.matchProjectId,
        //   priceId:this.impssnoform.priceId,
        // };
        expEntrantsSsnoTemp(data).then(res=>{
          var iframe = document.createElement("iframe")
          iframe.style.display = "none";
          iframe.src =res.data;
          document.body.appendChild(iframe);
        })
      }
    },
    handleRemoveSsno(file, fileList) {
      this.ssnoFileList=[];
    },
    handleSuccessSsno(response, file, fileList) {
      console.log(fileList,"ssno file");
      this.ssnoFileList=[{name:fileList[0].name,url:fileList[0].response.data.fileurl,path:fileList[0].response.data.filepath}];
    },
    impSsNoSubmit(){
      if(this.ssnoFileList.length==0){
        this.$message.error('请上传参赛编号导入文件');
      }else{
        const data={
          filepath:this.ssnoFileList[0].path,
          matchId:this.impssnoform.matchId
        }
        impEntrantsSsno(data).then(res=>{
          console.log(res,"ssno res")
          this.impSsNoVisible=false;
          if(res.code==200){
            this.$message({
              message: '导入成功',
              type: 'success'
            });
            this.impssnoform.matchId=null;
            this.impssnoform.matchProectId=null;
            this.impssnoform.priceId=null;
            this.ssnoFileList=[];
          }
        })
      }
    },
    //导入成绩
    importScore(id){
      this.impscoreform.matchId=id;
      this.impscoreform.matchProjectId=null;
      this.impscoreform.priceId=null;
      this.impScoreVisible=true;
      this.scoreFileList=[];
    },
    expScoreTemp(){
      if(this.impscoreform.matchId){
        // const data={matchId:this.impscoreform.matchId};
        const data=this.impscoreform.matchId;
        expEntrantsScoreTemp(data).then(res=>{
          var iframe = document.createElement("iframe")
          iframe.style.display = "none";
          iframe.src =res.data;
          document.body.appendChild(iframe);
        })
      }
    },
    handleRemoveScore(file, fileList) {
      this.scoreFileList=[];
    },
    handleSuccessScore(response, file, fileList) {
      console.log(fileList,"score file");
      this.scoreFileList=[{name:fileList[0].name,url:fileList[0].response.data.fileurl,path:fileList[0].response.data.filepath}];
    },
    impScoreSubmit(){
      if(this.scoreFileList.length==0){
        this.$message.error('请上传成绩导入文件');
      }else if(this.impscoreform.type==''){
        this.$message.warning('请选择导入方式');
      }else{
        const data={
          filepath:this.scoreFileList[0].path,
          matchId:this.impscoreform.matchId,
          type:this.impscoreform.type
        }
        impEntrantsScore(data).then(res=>{
          console.log(res,"score res")
          this.impScoreVisible=false;
          if(res.code==200){
            this.$message({
              message: '导入成功',
              type: 'success'
            });
            this.impscoreform.matchId=null;
            this.impscoreform.matchProjectId=null;
            this.impscoreform.priceId=null;
            this.scoreFileList=[];
          }
        })
      }
    },
    updSort(){//修改排序
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
      gtMatchSort(data).then(res => {
        if(res.code==200){
          this.$message.success('修改排序成功')
          this.getMatchList()
        }
      })
    },
    addNews(){//新增
      this.$router.push({
        path:'addMatch',
        query:{
          // id:id,
        }
      })
    },
    //预览封面
    imgClick(img){
      this.imgVisible=true;
      this.img=img
    },
    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getMatchList()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getMatchList()
    },
    //获取专题列表
    getspecialmessge(){
			this.loading = !this.loading;
      const data={
        pageNumber:1,
        pageSize:100
      }
      gtMatchSpecialList(data).then(res => {
        console.log(res.data.records)
				this.speciallist=res.data.records;
				this.loading = !this.loading;
      })
    },
    //赛事类型查询-下拉框
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
    //赛事列表
    getMatchList(){
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        title:this.form.title,
        special:this.form.project,
        releaseState:this.form.status,
        type:this.form.type,
        beginDate:this.form.time==null?'':moment(this.form.time[0]).format('YYYY-MM-DD'),
        endDate:this.form.time==null?'':moment(this.form.time[1]).format('YYYY-MM-DD'),
			}
      getGtMatchList(data).then(res=>{
        for(let i=0;i<this.MatchType.length;i++){
          for(let j=0;j<res.data.list.length;j++){
            if(res.data.list[j].typeId==this.MatchType[i].id){
              res.data.list[j].typeName=this.MatchType[i].title
            }
          }
        }
        this.total=res.data.page.totalRecord
        this.list=res.data.list
        console.log(res,'这是列表接口')
      })
    },
    search(){
      this.currentPage=1,
      this.pageSize=10,
      this.getMatchList()
    },
    //清空
    clean(){
      let form={
        title:'',
        project:'',
        status:'',
        type:'',
        time:null
      }
      this.form=form
      this.getMatchList()
    },

    //删除
    del(id){
      const data={
        id
      };

      this.$confirm('此操作将删除该赛事, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        delMatchBaseInfo(data).then(res=>{
          this.getMatchList()
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      })

    },

    //详情
    toDetails(id){
      this.$router.push({
        path:'/match/addMatch/base',
        query:{
          id,
          upd:false
        }
      })
    },
    //生成证书
    toCertificate(id){
      this.$router.push({
        path:'/match/addMatch/setting',
        query:{
            id,
            upd:false,
            zssc:true
        }
      })
    },
    //编辑
    updBase(id){
      this.$router.push({
        path:'/match/addMatch/base',
        query:{
          id,
          upd:true
        }
      })
    },
    //赛事项设置
    matchProjtSet(id){
      this.$router.push({
        path:'/match/addMatch/project',
        query:{
          id,
          upd:true
        }
      })
    },
    //报名分组设置
    matchGroupSet(id){
      this.$router.push({
        path:'/match/addMatch/group',
        query:{
          id,
          upd:true
        }
      })
    },
    //模板设置
    matchModelSet(id){
      this.$router.push({
        path:'/match/addMatch/setting',
        query:{
          id,
          upd:true
        }
      })
    },

    //群发短信
    toqfSms(id){
      this.$router.push({
        path:'/match/qfSms',
        query:{
          id,
        }
      })
    },
    //导出报名列表
    exportEntrants(id){
      const data=id;
      exportEntrants(data).then(res=>{
        console.log(res)
        var iframe = document.createElement("iframe")
        iframe.style.display = "none";
        iframe.src =res.data;
        document.body.appendChild(iframe);
      })
    },
    matchUpdSet(id){
      const data={
          id:id,
          state:1,
          releaseState:-2
      }
      UpdMatchSet(data).then(res=>{
          console.log(res)
          if(res.code==200){
            this.getMatchList()
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }
      })
    }
  }
}
</script>

<style scoped>
  .el-upload__tip{
    margin-left: 10px;
    cursor: pointer;
    color: blue;
    text-decoration:underline
  }
</style>

