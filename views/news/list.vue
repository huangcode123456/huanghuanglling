<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="标题">
        <el-input v-model="form.title" size='small'></el-input>
      </el-form-item>
      <el-form-item label="所属专题">
        <el-select v-model="form.project" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in speciallist" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="form.status" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="-1"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
          <el-option label="草稿" value="-2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:1%">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <div style="padding-bottom:20px;">
      <el-button type="primary" @click="addNews" icon="el-icon-plus" size="mini">新增</el-button>
      <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
    </div>

    <el-table
      :data="list"
      v-loading="loading"
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
        width="80px"
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="所属专题"
        prop="project">
          <template slot-scope="scope">
            <el-link type="primary" @click="projectSet(scope.row.id,scope.row.specials)">专题设置</el-link>
            <div><span v-for="(item,i) in scope.row.specials" :key='i'>{{item.title}}{{i==scope.row.specials.length-1?'':'，'}}</span></div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160"
        label="发布时间"
        prop="releaseTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="90"
        label="审核状态">
          <template slot-scope="scope" >
            <div>
              <span>{{scope.row.releaseState==-1?'审核中':scope.row.releaseState==-2?'草稿':scope.row.releaseState==0?'失败':'通过'}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="封面"
        prop="needNum">
          <template slot-scope="scope" >
            <div>
              <img @click="imgClick(scope.row.cover)" style="width:100px" :src="imgUrl+scope.row.cover" alt="">
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="90"
        label="资讯类型"
        prop="type">
          <template slot-scope="scope" >
            <div>
              <span>{{scope.row.type==0?'原创内容':'外部链接'}}</span>
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
        width="70"
        label="阅读量"
        prop="readCount">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="状态"
        prop="status">
          <template slot-scope="scope" >
            <div>
              <el-switch
                :active-value='1'
                :inactive-value='0'
                @change="switchChange(scope.row)"
                v-model="scope.row.state">
              </el-switch>
              <span>{{scope.row.state==1?'正常':'停用'}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        width="180"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" v-if="scope.row.releaseState!=-2" @click="toDraft(scope.row)" style="margin-left:5px">置为草稿</el-link>
              <el-link type="primary" v-if="scope.row.releaseState==-2" @click="updNews(scope.row)" style="margin-left:5px">编辑</el-link>
              <el-link type="primary" v-if="scope.row.releaseState==-2" @click="deletegtnews(scope.row.id)" style="margin-left:5px">删除</el-link>
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
      :title="dialogTitle"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="70%">
        <el-form ref="form" :model="addform" :rules="rules" status-icon size="mini" label-width="110px">
          <el-form-item label="标题" prop='title'>
            <el-input v-model="addform.title" size='small'></el-input>
          </el-form-item>
          <el-form-item label="封面图片" prop='fileList'>
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="addform.fileList"
              :limit="1"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">建议比例： 1.5比1 建议尺寸：376px x 244px 支持png\jpg\jpeg常用图片格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="排序字段升序" prop='sorting'>
            <el-input v-model="addform.sorting" size='small' type="number" min="1"></el-input>
          </el-form-item>
          <el-form-item label="资讯类型" prop='source'>
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="addform.type"
              active-color="#13ce66"
              inactive-color="#4949FF"
              active-text="外部链接"
              inactive-text="原创内容">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="this.addform.type==0" label="作者" prop='author'>
            <el-input v-model="addform.author" size='small'></el-input>
          </el-form-item>
          <el-form-item v-if="this.addform.type==0" label="来源" prop='source'>
            <el-input v-model="addform.source" size='small'></el-input>
          </el-form-item>
          <el-form-item label="外链地址" prop='link' v-show="addform.type=='1'">
            <el-input v-model="addform.link" size='small'></el-input>
          </el-form-item>
          <el-form-item label="内容" prop='content' v-show="addform.type!='1'">
            <el-card style="width:100%">
                <tinymce-editor ref="editor"
                  v-if='dialogVisible'
                  v-model="addform.content"
                 >
                </tinymce-editor>
            </el-card>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit('-2')">保存（草稿）</el-button>
            <el-button @click="onSubmit('-1')">保存并提审</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
      title="专题设置"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="projectVisible"
      :append-to-body="appendToBody"
      width="400px">
        <el-form ref="form" :model="projectform"  size="mini">
          <el-form-item label="资讯专题">
            <!-- <el-select style="width:270px" v-model="projectform.id" placeholder="请选择">
              <el-option v-for="(item,i) in speciallist" :key="i" :label="item.title" :value="item.id"></el-option>
            </el-select> -->
            <el-select
              style="width:270px"
              v-model="projectform.id"
              multiple
              filterable
              default-first-option
              placeholder="请选择">
              <!-- <el-option v-for="(item,i) in speciallist" :key="i" :label="item.title" :value="item.id"></el-option> -->
              <el-option
                v-for="item in speciallist"
                :key="item.value"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="projectOnSubmit">确定</el-button>
            <el-button @click="projectVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="800px">
        <img style="width:760px" :src="img" alt="">
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
import { newsSort,getNewsList,addgtnews,updategtnews,specialmessge,deletegtnews,insertspecial } from '../../api/news'
import moment from 'moment'
import {UPLOAD_ACTION,IMG_URL} from '@/utils/const.js'
import TinymceEditor from '../../components/tinymce-editor/tinymce-editor'

//二维码
import QRCode from 'qrcodejs2'
export default {
  name: 'FuncFormsEdit',
  components: {
    TinymceEditor
  },
  data() {
    return {
      //二维码
      ewmdialogVisible:false,

      // editMsg: '',
      editorDisabled: false,

      dialogTitle:'',

      //编辑资讯使用的id
      updNewsId:'',

      uploadAction:UPLOAD_ACTION,
      imgUrl:IMG_URL,
      loading:true,
      headers:{"token": ''},
      //富文本
      content: null,
      editorOption: {},

      disabled:true,

      dialogVisible:false,//新增赛事弹框
      projectVisible:false,//专题设置弹框
      imgVisible:false,//图片弹窗

      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      appendToBody:true,
      closeOnClickModal:false,
      form:{
        title:'',
        project:'',
        status:''
      },
      addform:{
        title:'',
        fileList:[],
        link:'',
        content:'',
        sorting:'',
        author:'',
        source:'',
        type:0,
      },
      projectform:{
        id:''
      },
      //专题列表
      speciallist:[],
      //资讯列表
      list:[],

      //专题设置 存id
      projectID:'',

			img:'',//放大图

			form:{
				fileList:[]
			},
			rules: {
				title: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				fileList: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				// link: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
				// content: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
				sorting: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				// author: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
				// source: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
			}
    }
  },
  created(){
    this.headers.token=sessionStorage.getItem("token")
  },
  mounted(){
    this.getspecialmessge()
    this.getNewsList()
  },
  methods: {
    //二维码
    showQrCode(id,releaseState,state) {
      console.log(id,releaseState,state)
      if(releaseState===1 && state===1 ){
        const url = "https://www.jctybm.com/webadmin/fileserver/weixin/miniapp?id=" + id
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
    
    //图片上传
    handleRemove(file, fileList) {
      this.addform.fileList=[];
      this.filepath=''
      this.fileurl=''
    },
    handlePreview(file) {

      // console.log(file);
    },
    handleSuccess(response, file, fileList) {
      this.addform.fileList[0]=fileList[0].response.data;
      this.filepath = fileList[0].response.data.filepath;
      this.fileurl = fileList[0].response.data.fileurl;
    },

    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getNewsList()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getNewsList()
    },

    //预览封面
    imgClick(img){
      this.imgVisible=true;
      this.img=this.imgUrl+img;
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
      newsSort(data).then(res => {
        if(res.code==200){
          this.$message.success('操作成功');
        }
        this.getNewsList()
      })
    },
    addNews(){//新增
      this.dialogTitle="新增资讯"
      let addform={
        title:'',
        fileList:[],
        link:'',
        content:'',
        sorting:'',
        author:'',
        source:'',
        type:0
      };
      this.addform=addform;
      this.dialogVisible=true;
    },
    updNews(row){//编辑资讯
      console.log(row)
      this.dialogTitle="编辑资讯"
      this.updNewsId=row.id
      let addform={
        title:row.title,
        fileList:[{url:this.imgUrl+row.cover}],
        link:row.link,
        content:row.content,
        type:row.type,
        sorting:row.listIndex,
        author:row.author,
        source:row.sourceType
      }
      this.filepath=row.cover;
      this.fileurl=row.coverInner;
      this.addform=addform;
      this.dialogVisible=true;
    },
    projectSet(id,specials){//专题设置
      let arr=[];
      if(specials){
        for(let i=0;i<specials.length;i++){
          arr.push(specials[i].id)
        }
      }
      this.projectform.id=arr
      this.projectVisible=true
      this.projectID=id
    },
		projectOnSubmit(){//专题设置确定
      const data={
        "newsId": this.projectID,
	      "specialIds": this.projectform.id.join('#')
      }
      insertspecial(data).then(res => {
        if(res.code==200){
          this.projectVisible=false;
          this.$message.success('设置成功！');
          this.getNewsList()
        }
      })
    },
    onSubmit(releaseState){//保存
      console.log(this.addform.type==0)
      if(this.addform.type==0){
        if(this.addform.author==''){
          this.$message.error('作者不能为空');
          return false
        }
        if(this.addform.source==''){
          this.$message.error('来源不能为空');
          return false
        }
      }
			this.$refs.form.validate((valid) => {
          if (valid) {
            const data={
							title:this.addform.title,
							cover:this.filepath,
							coverInner:this.fileurl,
							link:this.addform.type==1?this.addform.link:'',
							content:this.addform.type==0?this.addform.content:'',
							type:this.addform.type,
							listIndex:Number(this.addform.sorting),
							author:this.addform.type==0?this.addform.author:'',
							sourceType:this.addform.type==0?this.addform.source:'',
							releaseTime:moment().format('YYYY-MM-DD h:mm:ss'),
							state:1,
							releaseState,
						}
						if(this.dialogTitle=='新增资讯'){
							addgtnews(data).then(res => {
								if(res.code==200){
									this.addform={
										title:'',
										fileList:[],
										type:0,
										link:'',
										content:'',
										sorting:'',
										author:'',
										source:''
                  }
                  this.filepath="";
                  this.fileurl="";
                  this.dialogVisible=false;
                  this.$message.success('保存成功！');
									this.getNewsList()
								}
							})
						}else if(this.dialogTitle=='编辑资讯'){
							data.id=this.updNewsId;
							console.log(this.addform.fileList[0].url)

							updategtnews(data).then(res => {
								if(res.code==200){
									this.addform={
										title:'',
                    fileList:[],
                    type:0,
										link:'',
										content:'',
										sorting:'',
										author:'',
										source:''
                  }
                  this.filepath="";
                  this.fileurl="";
                  this.dialogVisible=false;
                  this.$message.success('保存成功！');
									this.getNewsList()
								}
							})
						}
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    //查询
    search(){
      this.getNewsList()
    },
    //清空
    clean(){
      this.form.title=''
      this.form.project=''
      this.form.status=''
      this.getNewsList()
    },
    //删除资讯
    deletegtnews(id){
      const data={
        id
      }
      this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletegtnews(data).then(res => {
          console.log(res);
          this.getNewsList()
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      })

    },
    //获取资讯列表
    getNewsList(){
      const data={
        "pageNumber": this.currentPage,
        "pageSize": this.pageSize,
        "title":this.form.title,
        "releaseState": this.form.status,
        "specialId": this.form.project,
      }
      getNewsList(data).then(res => {
        this.total=res.data.page.totalRecord
        this.list=res.data.records
        console.log(res,'资讯列表')
        this.loading=false
      })
    },
    //获取专题列表
    getspecialmessge(){
      const data={}
      specialmessge(data).then(res => {
        this.speciallist=res.data.records;
      })
    },

    //置为草稿
    toDraft(row){
      console.log(row)
      this.$confirm('此操作将该资讯置为草稿, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const data={
        //   id,
        //   releaseState:-2
        // }
        const data={
          title:row.title,
          cover:row.cover,
          coverInner:row.coverInner,
          link:row.link,
          content:row.content,
          type:row.type,
          listIndex:Number(row.listIndex),
          author:row.author,
          sourceType:row.sourceType,
          releaseTime:moment().format('YYYY-MM-DD h:mm:ss'),
          state:1,
          id:row.id,
          releaseState:-2
        }
        updategtnews(data).then(res => {
          if(res.code==200){
            this.$message.success('设置成功！');
            this.getNewsList()
          }
        })

      })
    },
    //修改状态
    switchChange(row){
      // const data={
      //   id,
      //   state,
      // }
      const data={
        title:row.title,
        cover:row.cover,
        coverInner:row.coverInner,
        link:row.link,
        content:row.content,
        type:row.type,
        listIndex:Number(row.listIndex),
        author:row.author,
        sourceType:row.source,
        releaseTime:moment().format('YYYY-MM-DD h:mm:ss'),
        state:row.state,
        id:row.id,
        releaseState:row.releaseState
      }
      updategtnews(data).then(res => {
        this.getNewsList()
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
<style >
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
.tox .tox-notifications-container .tox-notification {
  display: none;
}
.tox-tinymce-aux{
  z-index: 9999 !important;
}
</style>
