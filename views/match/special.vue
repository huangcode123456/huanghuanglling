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
      <!-- <el-form-item label="赛事类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="正常-跑步" value="1"></el-option>
          <el-option label="正常-自行车" value="2"></el-option>
          <el-option label="正常-铁人三项" value="3"></el-option>
          <el-option label="正常-其他" value="4"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="创建时间" size="small">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item>
        <el-checkbox v-model="form.bmType">一键报名</el-checkbox>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" style="margin-top:4%">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="padding-bottom:20px;">
      <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
      <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
    </div>

    <el-table
      :data="list"
			v-loading="loading"
      element-loading-text="Loading"
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
        prop="cover">
          <template slot-scope="scope" >
            <div>
              <img @click="imgClick(scope.row.coverInner)" style="width:100px" :src="scope.row.coverInner" alt="">
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
        <!-- <el-link type="primary" @click="">预览</el-link> -->
        <!-- <el-tooltip placement="top">
          <div slot="content">
            <img style="width:150px" src="../../../public/images/news/erweima.png" alt="">
          </div>
          <el-link type="primary">预览</el-link>
        </el-tooltip> -->
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
								@change='state(scope.row)'
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
              <el-link type="primary" @click="editor(scope.row)" style="margin-left:5px">编辑</el-link>
              <el-link type="primary" @click="deleteMatchSpecial(scope.row.id)" style="margin-left:5px">删除</el-link>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="800px">
        <img style="width:760px" :src="cover" alt="">
    </el-dialog>

    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="70%">
        <el-form ref="form" :model="addform" status-icon :rules="rules" size="mini">
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
          <el-form-item label="内容" prop='content'>
            <el-card style="width:100%">
              <tinymce-editor ref="editor"
                v-if='dialogVisible'
                v-model="addform.content"
               >
              </tinymce-editor>
             </el-card>
            
           
          </el-form-item>
          <el-form-item label="排序字段升序" prop='sorting'>
            <el-input v-model="addform.sorting" size='small' type="number" :min="1"></el-input>
            <span class="el-upload__tip">输入数字，越小越排前</span>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
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

  </div>
</template>

<script>
  import TinymceEditor from '../../components/tinymce-editor/tinymce-editor'
  import {UPLOAD_ACTION} from '@/utils/const.js'
  import { gtScoreList,gtMatchSpecialList,gtMatchSpecialSort,insertMatchSpecial,updateMatchSpecial,deleteMatchSpecial } from '../../api/match'
    
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

      dialogTitle:'',
      //富文本
      content: null,
      editorOption: {},

      uploadAction:UPLOAD_ACTION,
			loading:false,
      appendToBody:true,
      closeOnClickModal:false,
      imgVisible:false,//图片预览
      dialogVisible:false,//新增咨询
      form:{
        title:'',
        // project:'',
        status:'',
        // type:'',
        time:'',
        // bmType:''
      },
      addform:{
        title:'',
        fileList:[],
        link:'',
        content:'',
        sorting:'',
        author:'',
        source:''
      },
      list:[
        // {
        //   title:'专题一',
        //   createTime:'2019-12-15 20:33:39',
        //   status:'正常',
        //   sorting:1,
        // }
			],
				//分页
      total:0,
      currentPage:1,
			pageSize:10,

			active:'',
			headers:{"token": ''},
			cover:'',

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
				content: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				sorting: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
			}
    }
  },
  mounted () {
		this.gtMatchSpecialList();
		this.headers.token=sessionStorage.getItem("token")
		console.log(sessionStorage.getItem('token'))
  },
  methods: {
    //二维码
    showQrCode(id,releaseState,state) {
      console.log(id,releaseState,state)
      if(releaseState===1 && state===1){
        const url = "https://www.jctybm.com/webadmin/fileserver/weixin/matchSpecial?id=" + id
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
    // tiny
     // 鼠标单击的事件
    // onClickEditor (e, editor) {
    //   console.log('Element clicked')
    //   console.log(e)
    //   console.log(editor)
    // },
   
		// 删除赛事
		deleteMatchSpecial(val){
			this.$confirm('是否删除该项', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
						"id":val
					}
					deleteMatchSpecial(data)
					.then(res=>{
						this.$message.success('删除成功');
						this.gtMatchSpecialList();
					})
        }).catch(() => {
        });
		},
		// 修改状态
		state(val){
			const data ={
				"id":val.id,
				"content": val.content,
        "cover": val.cover,
        "coverInner": val.coverInner,
        "listIndex": val.listIndex,
        "title": val.title,
				"releaseState":1,
				"state":val.state
			}
			updateMatchSpecial(data)
			.then(res=>{
				console.log(res)
				this.$message.success('修改状态成功')
			})
		},
		// 修改排序
    updSort(){
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
      gtMatchSpecialSort(data).then(res => {
        if(res.code==200){
          this.$message.success('修改排序成功')
          this.gtMatchSpecialList()
        }
      })
    },
		// 赛事专题列表
		gtMatchSpecialList(){
			this.loading = !this.loading;
			const data = {
				pageNumber: this.currentPage,
				pageSize: this.pageSize
			}
			gtMatchSpecialList(data)
			.then(res=>{
				this.total = res.data.page.totalRecord;
				this.list = res.data.records;
				this.loading = !this.loading;
			})
		},
    //预览封面
    imgClick(val){
			this.cover = val
      this.imgVisible=true
    },
    //保存
    onSubmit(){
			this.$refs.form.validate((valid) => {
          if (valid) {
            const data ={
							"content": this.addform.content,
							"cover": this.filepath,
							"coverInner": this.fileurl,
							"listIndex": this.addform.sorting,
							"title": this.addform.title,
							"releaseState":1,
							"state":1
            }
						if(this.active==1){
							data.id = this.addform.id;
							updateMatchSpecial(data)
							.then(res=>{
								this.$message.success('修改成功')
								this.dialogVisible = !this.dialogVisible
								this.gtMatchSpecialList()
								this.clear()
							})
						}else if(this.active==0){
							insertMatchSpecial(data)
							.then(res=>{
								this.$message.success('新增成功')
								this.dialogVisible = !this.dialogVisible
								this.gtMatchSpecialList()
								this.clear()
							})
						}
          } else {
            console.log('error submit!!');
            return false;
          }
      });

    },
    //编辑
    editor(val){
			this.addform.title = val.title;
			this.addform.fileList = [{url:val.coverInner}]
			this.addform.content = val.content;
			this.addform.sorting = val.listIndex
      this.addform.id = val.id;
      this.filepath = val.cover;
      this.fileurl = val.coverInner;
      this.dialogVisible=true
			this.dialogTitle='编辑赛事专题'
			this.active = 1;
		},
		add(){
			this.dialogVisible=true
			this.dialogTitle='新增赛事专题'
			this.active = 0;
			this.clear()
		},
		//分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getGtAlbumList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getGtAlbumList()
		},
		//图片上传
    handleRemove(file, fileList) {
      this.addform.fileList=[];
      this.filepath = "";
      this.fileurl = "";
    },
    handlePreview(file) {

    },
    handleSuccess(response, file, fileList) {
      this.addform.fileList[0]=fileList[0].response.data;
      this.filepath = fileList[0].response.data.filepath;
      this.fileurl = fileList[0].response.data.fileurl;
		},
		// 清除
		clear(){
			this.addform.content = ''
			this.addform.fileList = []
			this.addform.sorting = ''
			this.addform.title = ''
      this.addform.id  = ''
      this.filepath = "";
      this.fileurl = "";
		},
  }
}
</script>

<style scoped>

</style>
<style >
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
</style>

