<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="标题">
        <el-input v-model="form.title" size='small'></el-input>
      </el-form-item>
      <!-- <el-form-item label="所属专题">
        <el-select v-model="form.project" placeholder="请选择">
          <el-option label="正常-2019“薪火传承·中国健康跑”" value="1"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="审核状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="草稿" value="1"></el-option>
          <el-option label="审核中" value="2"></el-option>
          <el-option label="审核通过" value="3"></el-option>
          <el-option label="审核失败" value="4"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:4%">查询</el-button>
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
        align="center"
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="封面"
        prop="needNum">
          <template slot-scope="scope" >
            <div>
              <img @click="imgClick(scope.row.cover)" style="width:100px;height:66px" :src="imgUrl+scope.row.cover" alt="">
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="70"
        label="文章数"
        prop="newsCount">
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="内容"
        prop="content">
        <!-- <el-link type="primary" @click="">预览</el-link> -->
        <template slot-scope="scope" >
          <el-link type="primary" @click="showQrCode(scope.row.id,scope.row.state)">预览</el-link>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="状态"
        prop="state">
          <template slot-scope="scope" >
            <div>
              <el-switch
                :active-value='1'
                :inactive-value='0'
                @change="switchChange(scope.row.id,scope.row.state)"
                v-model="scope.row.state">
              </el-switch>
              <span>{{scope.row.state==1?'正常':'停用'}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        width="150"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" @click="editorClick(scope.row)" style="margin-left:5px">编辑</el-link>
              <el-link type="primary" @click="deletespecial(scope.row.id)" style="margin-left:5px">删除</el-link>
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
      :total="list.length">
    </el-pagination>

    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="70%">
        <el-form ref="form" :model="addform" status-icon :rules="rules" size="mini" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="addform.title" size='small'></el-input>
          </el-form-item>
          <el-form-item label="封面图片" prop="fileList">
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
              <div slot="tip" class="el-upload__tip">推荐尺寸: 686 * 300</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" rows="5" v-model="addform.content" size='small'></el-input>
          </el-form-item>
          <el-form-item label="排序字段" prop="sorting">
            <el-input v-model="addform.sorting" size='small' type="number" :min="1"></el-input>
            <span class="el-upload__tip">输入数字，越小越前面</span>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="640px">
        <img style="width:600px" :src="img" alt="">
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
import { speciallist,addspecial,deletespecial,updatespecial,specialSort } from '../../api/news'
import {UPLOAD_ACTION,IMG_URL} from '@/utils/const.js'
//二维码
import QRCode from 'qrcodejs2'

export default {
  name: 'FuncFormsEdit',
  
  data() {
    return {
      //二维码
      ewmdialogVisible:false,

      loading:true,
      headers:{"token": ''},
      dialogVisible:false,//新增赛事弹框
      imgVisible:false,//图片弹窗
      img:'',//图片路径保存


      uploadAction:UPLOAD_ACTION,
      imgUrl:IMG_URL,

      filepath:'',
      fileurl:'',
      dialogTitle:'',//新增还是编辑

      currentPage:1,

      appendToBody:true,
      closeOnClickModal:false,
      form:{
        title:'',
        // project:'',
        status:''
      },
      addform:{
        title:'',
        fileList:[],
        content:'',
        sorting:'',
      },
      list:[],

      //专题id保存，编辑用
			editorId:'',

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
				link: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				content: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				// sorting: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
				author: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				source: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
			}
    }
  },
  mounted(){
    this.headers.token=sessionStorage.getItem("token")
    this.getspeciallist();
  },
  methods: {
    //二维码
    showQrCode(id,state) {
      console.log(id,state)
      if(state===1){
        const url = "https://www.jctybm.com/webadmin/fileserver/weixin/newsSpecial?id=" + id
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
        this.$message.error('该资讯专题已停用，无法在小程序里预览！');
      }
    },

    //图片上传
    handleRemove(file, fileList) {
      this.addform.fileList=[];
      this.filepath = "";
      this.fileurl = "";
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      this.addform.fileList[0]=fileList[0].response.data;
      this.filepath = fileList[0].response.data.filepath;
      this.fileurl = fileList[0].response.data.fileurl;
    },

    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getspeciallist();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getspeciallist();
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
      specialSort(data).then(res => {
        if(res.code==200){
          this.$message.success("操作成功！");
          this.getspeciallist();
        }
      })
    },
    addNews(){//新增
      this.dialogVisible=true;
      this.dialogTitle='新增专题'
      this.filepath = "";
      this.fileurl = "";
      this.addform.title='';
      this.addform.fileList=[];
      this.addform.content='';
      this.addform.sorting='';
    },
		onSubmit(){//保存

			this.$refs.form.validate((valid) => {
          if (valid) {
            const data={
							title:this.addform.title,
              cover:this.filepath,
              coverInner:this.fileurl,
							content:this.addform.content,
							listIndex:Number(this.addform.sorting),
              state:1,
              releaseState:1
						}
						if(this.dialogTitle=='新增专题'){
							addspecial(data).then(res => {
								this.dialogVisible=false;
                if(res.code==200){
                  this.$message.success("操作成功！");
                  this.getspeciallist();
                }
							})
						}else if(this.dialogTitle=='编辑专题'){
							data.id=this.editorId;
							updatespecial(data).then(res => {
                this.dialogVisible=false;
                if(res.code==200){
                  this.$message.success("操作成功！");
                  this.getspeciallist();
                }
							})
						}
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    editorClick(row){//编辑
      console.log(row,'编辑')
      this.dialogTitle='编辑专题'
      this.dialogVisible=true;
      this.addform.title=row.title;
      this.addform.fileList=[{url:this.imgUrl+row.cover}];
      this.addform.content=row.content;
      this.addform.sorting=row.listIndex;
      this.filepath = row.cover;;
      this.fileurl = row.coverInner;
      this.editorId=row.id;
    },
    //专题列表
    getspeciallist(){
      const data={
        "pageNumber": 1,
        "pageSize": 10,
        "title": this.form.title
      }
      speciallist(data).then(res => {
        this.loading=false
        if(res.data.records!=null){
          this.list=res.data.records;
        }else{
          this.list=[]
        }
      })
    },
    //删除专题
    deletespecial(id){
      const data={
        id
      }
      this.$confirm('此操作将删除该专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletespecial(data).then(res => {
          if(res.code==200){
            this.$message.success("操作成功！");
            this.getspeciallist();
          }
        })
      })
    },
    //查询
    search(){
      this.getspeciallist()
    },
    //状态切换
    switchChange(id,state){
      const data={
        id,
        state,
      }
      updatespecial(data).then(res => {
        this.getspeciallist()
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
</style>
