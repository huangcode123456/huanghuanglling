<template>
  <div class="app-container">

    <el-page-header @back="goBack" :content="title +'的相册详情'"></el-page-header>
    <div class="mt20">
      <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增相片</el-button>
      <el-button type="success" icon='el-icon-sort' @click="gtalbumItemSort" size="mini">修改排序</el-button>
    </div>
    <el-table
      class="mt20"
      style="widht:100%"
      :data="list"
      border
			v-loading="loading"
      highlight-current-row>
      <el-table-column
        align="center"
        width="80px"
        label="排序"
        prop="listIndex">
        <template slot-scope="scope" >
          <el-input
            size='small'
            v-model="scope.row.listIndex"
						@change='pushRecodes(scope.row)'
            :disabled="false">
          </el-input>
        </template>
      </el-table-column>
			<el-table-column
        align="center"
        width="100px"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        align="center"
        width="170px"
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="240px"
        label="相片"
        prop="cover">
          <template slot-scope="scope">
            <img class="cover" @click="imgClick(imgUrl+scope.row.cover)" :src="imgUrl+scope.row.cover" alt="">
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              :active-value='1'
							:inactive-value='0'
							@change="state(scope.row)"
							>
            </el-switch>
            <span v-if='scope.row.state==1'>已开启</span>
            <span v-else>已关闭</span>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150px"
        label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
          <el-link class="ml10" type="primary" @click="del(scope.row)">删除</el-link>
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
      :title="text"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="70%">
        <el-form ref="form" :model="addform" :rules="rules" size="mini" label-width="100px">
          <el-form-item label="相片">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :limit="5"
              v-model="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">建议比例： 1.5比1 建议尺寸：376px x 244px 支持png\jpg\jpeg常用图片格式</div>
            </el-upload>
          </el-form-item>
					<el-form-item label="相片预览">
						<img :src="fileurl" style="width:500px;height:auto;">
					</el-form-item>
					<el-form-item align='center'>
						<el-button type="primary" size="medium" @click="onSubmit">确定</el-button>
					</el-form-item>
        </el-form>
    </el-dialog>

		<el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="400px">
        <img style="width:360px" :src="img" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { getGtAlbumList,addgtalbum,updateGtalbum,del,gtalbumSort,deletegtalbumItem,getGtAlbumItemList,updategtalbumItem,gtalbumItemSort,addgtalbumItem } from '../../api/album'
import moment from 'moment'
import {UPLOAD_ACTION,IMG_URL} from '@/utils/const.js'
export default {
  data() {
    return {
      title:'',
      list:[],
			total:0,
      currentPage:1,
      pageSize:10,

      loading:false,

      uploadAction:UPLOAD_ACTION,
      imgUrl:IMG_URL,
      filepath:'',
      fileurl:'',
      fileList:[],
      rules: {
				fileList: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				]
      },

      appendToBody:true,
      closeOnClickModal:false,

      dialogVisible:false,

      headers:{"token": ''},

      addform:{
        fileList:[],
			},
			records:[],
			text:'',
			id:'',
			coverInner:'',
			imgVisible:false,
			img:''
    }
  },
  created () {
		this.headers.token=sessionStorage.getItem("token")
		this.title = this.$route.query.title
		this.getGtAlbumItemList();
  },
  methods: {
		//预览封面
    imgClick(img){
      this.imgVisible=true;
      this.img=img
    },
		// 更改状态
		state(val){
			const data = {
				id:val.id,
				state:val.state
			}
			updategtalbumItem(data)
			.then(res=>{
				if(res.code==200){
          this.$message.success('修改状态成功');
        }
				this.getGtAlbumItemList();
			})
		},
		// 提交
		onSubmit(){
      if(this.filepath==""){
        this.$message.warning("请先提交相片");
        return;
      }
      this.$refs.form.validate((valid) => {
        if(this.text == '新增照片'){
          this.addgtalbumItem();
        } else if( this.text == '编辑照片'){
          this.updategtalbumItem();
        }
      });
		},
		// 照片上传
		addgtalbumItem(){
			const data = {
				"albumId": this.$route.query.id,
				"content": "",
				"cover": this.filepath,
				"coverInner": this.fileurl,
				"listIndex": 0,
				"releaseState": 1,
				"state": 1,
				"title": this.title
			}
			addgtalbumItem(data)
			.then(res=>{
        this.dialogVisible = false;
        if(res.code==200){
          this.$message.success('新增成功！')
          this.addform.fileList = [];
          this.fileList=[];
          this.filepath="";
          this.fileurl="";
        }
				this.getGtAlbumItemList()
			})
		},
		// 编辑照片
		updategtalbumItem(){
			const data = {
				id : this.id,
				cover: this.filepath,
				coverInner: this.fileurl
			}
			updategtalbumItem(data)
			.then(res=>{
        this.dialogVisible = false;
        if(res.code==200){
          this.$message.success('编辑成功！')
          this.addform.fileList = [];
          this.fileList=[];
          this.filepath="";
          this.fileurl="";
        }
				this.getGtAlbumItemList();
			}
		)
		},
		// 照片管理修改排序
		async pushRecodes(val){
			await this.records.map(Item=>{
				if(Item.id == val.id){
					Item.listIndex = String(val.listIndex)
				}
			})
			await console.log(this.records)
		},
		gtalbumItemSort(){
			const data = {
				records:this.records
			}
			gtalbumItemSort(data)
			.then(res=>{
				if(res.code==200){
          this.$message.success('修改排序成功')
        }
				this.getGtAlbumItemList()
			})
		},
		// 获取照片管理列表
		getGtAlbumItemList(){
			this.loading = !this.loading
			const that = this;
			const data = {
					"albumId": this.$route.query.id,
					"pageNumber": this.currentPage,
					"pageSize": this.pageSize,
			}
			getGtAlbumItemList(data)
			.then(res=>{
				console.log(res,"相片列表")
				that.list = res.data.list
				that.total = res.data.page.totalRecord
				res.data.list.map(Item=>{
					that.records.push({
						id:Item.id,
						listIndex:Item.listIndex
					})
				})
				this.loading = !this.loading
			})
		},
    goBack() {
      this.$router.go(-1)
		},
		// 分页
		handleSizeChange(val) {
      this.pageSize=val;
      this.getGtAlbumItemList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getGtAlbumItemList()
    },
    //图片上传
    handleRemove(file, fileList) {
      this.addform.fileList=[];
      this.fileList=[];
      this.filepath="";
      this.fileurl="";
    },
    handlePreview(file) {

      // console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList)
      this.addform.fileList[0]=fileList[0].response.data.fileurl;
      this.fileList[0]=fileList[0].response.data.fileurl;
      this.filepath=fileList[0].response.data.filepath;
      this.fileurl=fileList[0].response.data.fileurl;
    },
		// 新增照片
    add(){
			this.text = '新增照片'
			this.dialogVisible=!this.dialogVisible
			this.active = 1;
      this.addform.fileList = [];
      this.fileList=[];
      this.filepath="";
      this.fileurl="";
		},
		// 编辑
		edit(val){
			this.text = '编辑照片';
			this.dialogVisible = !this.dialogVisibl;
			this.active = 0;
			this.id = val.id;
			this.addform.fileList=[{url:val.coverInner}];
			this.fileList=[{url:val.coverInner}];
      this.filepath=val.cover;
      this.fileurl=val.coverInner;
		},
		del(val){
			this.$confirm('是否删除该文件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
						id:val.id
					}
					deletegtalbumItem(data)
					.then(res=>{
            if(res.code==200){
              this.$message.success('删除成功！')
            }
						this.getGtAlbumItemList();
					})
        }).catch(() => {
        });
		}
  }
}
</script>

<style scoped>
  .cover{
    width: 200px;
    height: auto;
  }
</style>
<style >
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
</style>

