<template>
  <div class="app-container">
   <!-- <h2>赛事集锦管理</h2>
   <router-link to="details">
        <el-button type="primary" icon="el-icon-plus" size="mini">详情</el-button>
      </router-link> -->
    <el-form :inline="true" ref="query" :model="query" size="mini">
      <el-form-item label="标题">
        <el-input v-model="query.title" size='small' placeholder="请输入标题搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:2%">查询</el-button>
        <el-button type="default" @click="clean">重置</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
      <el-button type="success" icon='el-icon-sort' @click="updSort" size="mini">修改排序</el-button>
    </div>


    <el-table
      class="mt20"
      v-loading="loading"
      style="widht:100%"
      :data="list"
      border
      highlight-current-row>
      <el-table-column
				width="60"
        align="center"
        label="排序"
        prop="listIndex">
        <template slot-scope="scope" >
          <el-input
             size='small'
            v-model="scope.row.listIndex"
            :disabled="false">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
				width="160"
        align="center"
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
				width="130"
        align="center"
        label="封面"
        prop="cover">
          <template slot-scope="scope">
            <img @click="imgClick(imgUrl+scope.row.cover)" class="cover" :src="imgUrl+scope.row.cover" alt="">
          </template>
      </el-table-column>
			<el-table-column
				width="80"
        align="center"
        label="集锦类型"
        prop="liveUrl">
					<template slot-scope="scope">
						<div>{{scope.row.strtype == 1?'图片':scope.row.strtype == 2?'直播':scope.row.strtype == 3?'直播加图片':''}}</div>
          </template>
      </el-table-column>
			<el-table-column
        align="center"
        label="直播地址"
        prop="liveUrl">
					<template slot-scope="scope" v-if="scope.row.strtype !== '1'">
					<!-- <template slot-scope="scope"> -->
						<div>{{scope.row.liveUrl}}</div>
          </template>
      </el-table-column>
			<el-table-column
        align="center"
        label="直播时间"
        prop="createTime"
				width="225"
				>
					<template slot-scope="scope" v-if="scope.row.strtype !== '1'">
					<!-- <template slot-scope="scope"> -->
						<div>开始时间：{{scope.row.liveStarttime}}</div>
						<div>结束时间：{{scope.row.liveEndtime}}</div>
          </template>
      </el-table-column>
      <el-table-column
				width="70"
        align="center"
        label="状态"
        prop="status">
          <template slot-scope="scope">
            <span v-if='scope.row.state==1'>已开启</span>
            <span v-else>已关闭</span>
          </template>
      </el-table-column>
      <el-table-column
				width="100"
        fixed="right"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="upd(scope.row)">编辑</el-link>
          <el-link class="ml10" @click="del(scope.row.id)" type="primary">删除</el-link>
          <el-link @click="goDetails(scope.row.id,scope.row.title)" class="ml10" type="primary" v-if="scope.row.strtype == '1' ||scope.row.strtype == '3'">相片管理</el-link>
        </template>
      </el-table-column>
    </el-table>

		<!-- 新增&编辑 -->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="50%">
        <el-form ref="form" :model="addform" status-icon :rules="rules" size="mini" label-width="100px">
					<el-form-item label="集锦类型" v-if="dialogTitle == '新增赛事集锦'">
						<el-radio-group v-model="addform.strtype">
							<el-radio v-for="item in strtype" v-bind:key="item.value" :label="item.value">{{item.title}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="集锦类型" v-if="dialogTitle == '编辑赛事集锦'">
						{{addform.strtype == '1'?'图片':addform.strtype == '2'?'直播':addform.strtype == '3'?'直播加图片':''}}
					</el-form-item>
					<el-form-item label="直播赛事" v-if="addform.strtype == '2' || addform.strtype == '3'">
						<el-input v-model="match" size='small' placeholder="点击选择赛事" @focus="choice"></el-input>
					</el-form-item>
					<el-form-item label="直播地址" v-if="addform.strtype == '2' || addform.strtype == '3'" prop="liveUrl">
						<el-input v-model="addform.liveUrl" size='small' placeholder="http://...."></el-input>
					</el-form-item>
					<el-form-item label="直播时间" v-if="addform.strtype == '2' || addform.strtype == '3'" prop="liveTime">
						<el-date-picker
							@change="showDate"
							@blur="focus"
							id="liveTime"
							v-model="value1"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
              :default-time="['08:00:00','12:00:00']">
						</el-date-picker>
					</el-form-item>
          <el-form-item label="封面图片" prop="fileList">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :action="uploadAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              v-model="fileList"
              :limit="1"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">建议比例： 1.5比1 建议尺寸：376px x 244px 支持png\jpg\jpeg常用图片格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="addform.title" size='small'></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sorting">
            <el-input v-model="addform.sorting" size='small' type="number" :min="1"></el-input>
            <div style="fontSize:10px">值越小越排前</div>
          </el-form-item>
					<el-form-item label="状态">
						<el-switch
							:active-value="1"
							:inactive-value="0"
							v-model="addform.state">
						</el-switch>
						<span v-if='addform.state==1'>已开启</span>
						<span v-else>已关闭</span>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit" :disabled="show">保存</el-button>
            <el-button @click="dialogVisible = false" :disabled="show">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

		<!-- 展示图片 -->
		<el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="400px">
        <img style="width:360px" :src="img" alt="">
    </el-dialog>

		<!-- 选择赛事 -->
		<el-dialog
			title="选择赛事"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="matchVisible"
      :append-to-body="appendToBody"
			center
      width="60%">
        <el-form :inline="true" ref="form" :model="formD" size="mini">
					<el-form-item label="赛事名称">
						<el-input v-model="formD.title" size='small'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchD">查询</el-button>
						<el-button type="info" @click="cleanD">清空</el-button>
					</el-form-item>
				</el-form>

				<el-table
					:data="listD"
					element-loading-text="Loading"
					border
					fit
					v-loading="loading"
					highlight-current-row
					@row-click="showRow"
					>
					<el-table-column
						width="120px"
						align="center"
						label="赛事类型"
						prop="typeName">
					</el-table-column>
					<el-table-column
						align="center"
						label="赛事名称"
						prop="title">
					</el-table-column>

				</el-table>

			<el-pagination
				style="margin-top:5px"
				@size-change="handleSizeChangeD"
				@current-change="handleCurrentChangeD"
				:current-page="currentPageD"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="50"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalD">
			</el-pagination>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="hidden">确 定</el-button>
				<el-button @click="matchVisible = false">取 消</el-button>
			</span>
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
import { getGtAlbumList,addgtalbum,updateGtalbum,del,gtalbumSort,deletegtalbumItem,getGtAlbumItemList,updategtalbumItem,gtalbumItemSort } from '../../api/album'
import { importEntrants,exportEntrantsTemplate,listMatchProjectPrice,exportEntrants,gtMatchSort,getGtMatchList,getGtMatchTypeOptions,delMatchBaseInfo,gtMatchSpecialList } from '../../api/match'
import {UPLOAD_ACTION,IMG_URL} from '@/utils/const.js'
import moment from 'moment'
export default {
  data() {
    return {
      query:{
        title:"",
      },
			list:[],
			listD:[],
      //分页
      total:0,
      currentPage:1,
			pageSize:10,
			 //分页
      totalD:0,
      currentPageD:1,
			pageSizeD:5,

      formD:{
        title:'',
        project:'',
        status:'',
        type:'',
        time:null
      },

      uploadAction:UPLOAD_ACTION,
      imgUrl:IMG_URL,
      filepath:'',
      fileurl:'',
      fileList:[],

      loading:true,
      appendToBody:true,
      closeOnClickModal:false,

      dialogVisible:false,
      dialogTitle:'',
      headers:{"token": ''},
      addform:{
        title:'',
        fileList:[],
				sorting:'',
				strtype:'1',
				liveUrl:'',
				liveStarttime:'',
				liveEndtime:'',
				state:1
      },

       //编辑集锦使用的id
			updAlbumsId:'',

			form:{
				fileList:[]
			},
			rules: {
				liveUrl: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				title: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				fileList: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				// sorting: [
				// 	{ required: true, message: '此项必填', trigger: 'blur' },
				// ],
			},
			imgVisible:false,
			img:'',
			strtype:[
				{title:'图片',value:'1'},
				{title:'直播',value:'2'},
				{title:'直播加图片',value:'3'},
			],
			value1:null, // 时间
			show:false,
			// 赛事选择弹出框
			matchVisible:false,
			match:'',
			//赛事类型下拉框
			MatchType:[],
			rowData:{},
			id:''
    }
  },
  async mounted(){
    this.getGtAlbumList();
		this.headers.token=sessionStorage.getItem("token");
		await this.getGtMatchTypeOptions()
		await this.getMatchList();
  },
  methods: {
		hidden(){
			this.matchVisible = !this.matchVisible;
			this.match = this.rowData.title;
			this.id = this.rowData.id
			this.value1 = [
				this.rowData.matchStart,
				this.rowData.matchEnd,
			]
			this.addform.liveStarttime = this.rowData.matchStart,
			this.addform.liveEndtime = this.rowData.matchEnd
		},

		showRow(row){
			let rowData = {
				id:row.id,
				matchStart:row.matchStart,
				matchEnd:row.matchEnd,
				title:row.title
			}
			this.rowData = rowData;
		},

		cleanD(){
      let form={
        title:'',
        project:'',
        status:'',
        type:'',
        time:null
      }
      this.formD=form
      this.getMatchList()
    },
		// 获取赛事列表
		getMatchList(){
      const data={
        pageNumber:this.currentPageD,
        pageSize:this.pageSizeD,
				title:this.formD.title,
				special: "",
				releaseState: "",
				type: "",
				beginDate: "",
				endDate: "",
			}
      getGtMatchList(data).then(res=>{
				for(let i=0;i<this.MatchType.length;i++){
          for(let j=0;j<res.data.list.length;j++){
            if(res.data.list[j].typeId==this.MatchType[i].id){
              res.data.list[j].typeName=this.MatchType[i].title
            }
          }
        }
        this.totalD=res.data.page.totalRecord
        this.listD=res.data.list
        console.log(res,'这是列表接口')
      })
    },
		// 选择赛事
		choice(){
			this.matchVisible = !this.matchVisible;
		},
		// 时间选择器验证
		focus(){
			if(  this.value1==null || this.value1.length == 0){
				this.$message.warning('时间必填')
				this.show = true
			} else {
				this.show = false;
			}
		},
		showDate(){
			if(this.value1 == null){
			}else if(this.value1 !== null){
				this.addform.liveStarttime = moment(this.value1[0]).format('YYYY-MM-DD HH:mm:ss')
				this.addform.liveEndtime = moment(this.value1[1]).format('YYYY-MM-DD HH:mm:ss')
			}
		},
    async add(){//新增
			this.dialogTitle='新增赛事集锦'
			await this.clearData();
			this.show = false;
			this.addform.strtype = '1'
      this.addform.fileList = [];
      this.dialogVisible=true;
      this.filepath='';
      this.fileurl='';
    },
    onSubmit(){
			const that = this;
			this.$refs.form.validate((valid) => {
				if(that.addform.strtype == 2 || that.addform.strtype == 3){
					if (valid && that.value1 !== null) {
						var data={
							cover:this.filepath,
							coverInner:this.fileurl,
							title:this.addform.title,
							listIndex:Number(this.addform.sorting),
							createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
							state:this.addform.state,
							liveUrl: this.addform.liveUrl,
							liveEndtime: this.addform.liveEndtime,
							liveStarttime: this.addform.liveStarttime,
							strtype: this.addform.strtype,
							releaseState: '1'
						}
						if(this.dialogTitle=='编辑赛事集锦'){
							data.id=this.updAlbumsId;
							data.cover=this.filepath;
							data.coverInner=this.fileurl;
							// if(!this.addform.fileList[0].url){
							// 	data.cover=this.addform.fileList[0];
							// 	data.coverInner=this.addform.fileList[0];
							// }
							console.log(data)
							updateGtalbum(data).then(res=>{
                console.log(res);
                if(res.code==200){
                  this.$message.success('修改成功');
                }
								this.dialogVisible=false;
                this.addform.fileList = [];
                this.filepath = "";
                this.fileurl = "";
								this.getGtAlbumList()
							})
						} else if(this.dialogTitle=='新增赛事集锦'){
							if(this.addform.strtype  == '1'){
								var addData = {
									cover:this.filepath,
									coverInner:this.fileurl,
									title:that.addform.title,
									listIndex:Number(that.addform.sorting),
									createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
									state:this.addform.state,
									liveEndtime: this.addform.liveEndtime,
									liveStarttime: this.addform.liveStarttime,
									releaseState: '1'
								}
							} else if(this.addform.strtype  == '2' || this.addform.strtype  == '3'){
								var addData = {
									cover:this.filepath,
									coverInner:this.fileurl,
									listIndex: Number(this.addform.sorting),
									state: this.addform.state,
									title:that.addform.title,
									strtype: this.addform.strtype,
									liveEndtime: this.addform.liveEndtime,
									liveStarttime: this.addform.liveStarttime,
									liveUrl: this.addform.liveUrl,
									createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
									releaseState: '1',
									matchId: this.id
								}
							}
							console.log(addData,"addData")
							addgtalbum(addData)
							.then(res=>{
								if(res.code==200){
                  this.$message.success('新增成功');
                }
								this.dialogVisible=false;
								this.addform.fileList = []
								this.getGtAlbumList();
							})
						}
					} else {
						this.focus()
						console.log('error submit!!');
						return false;
					}
				}else if(that.addform.strtype == 1){
					if (valid) {
						const data={
							cover:this.filepath,
              coverInner:this.fileurl,
							title:that.addform.title,
							listIndex:Number(that.addform.sorting),
							createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
							state:this.addform.state,
							liveUrl: this.addform.liveUrl,
							liveEndtime: this.addform.liveEndtime,
							liveStarttime: this.addform.liveStarttime,
							strtype: this.addform.strtype,
							releaseState: '1'
						}
						if(that.dialogTitle=='编辑赛事集锦'){
							data.id=that.updAlbumsId;
							updateGtalbum(data).then(res=>{
								if(res.code==200){
                  this.$message.success('修改成功')
                }
								this.dialogVisible=false;
								this.addform.fileList = []
								this.getGtAlbumList()
							})
						} else if(this.dialogTitle=='新增赛事集锦'){
              var addData ={};
							if(this.addform.strtype  == '1'){
								addData = {
									cover:this.filepath,
                  coverInner:this.fileurl,
									listIndex: Number(this.addform.sorting),
									state: this.addform.state,
									strtype: this.addform.strtype,
									title:that.addform.title,
									createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
									releaseState: '1'
								}
							} else if(this.addform.strtype  == '2' || this.addform.strtype  == '3'){
								addData = {
									cover:this.filepath,
                  coverInner:this.fileurl,
									listIndex: Number(this.addform.sorting),
									state: this.addform.state,
									title:that.addform.title,
									strtype: this.addform.strtype,
									liveEndtime: this.addform.liveEndtime,
									liveStarttime: this.addform.liveStarttime,
									liveUrl: this.addform.liveUrl,
									createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
									releaseState: '1'
								}
							}
							console.log(addData)
							addgtalbum(addData)
							.then(res=>{
								if(res.code==200){
                  this.$message.success('新增成功');
                }
								this.dialogVisible=false;
								this.addform.fileList = []
								this.getGtAlbumList();
							})
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				}

      });

    },
    //编辑赛事集锦
    upd(row){
			let addform={
        title:row.title,
        fileList:[{url:row.coverInner}],
				sorting:row.listIndex,
        strtype:row.strtype,
        state:row.state,
				liveUrl:row.liveUrl,
      }
      this.fileList=[{url:row.coverInner}],
      this.filepath=row.cover;
      this.fileurl=row.coverInner;
			if(row.liveStarttime!==null && row.liveEndtime!==null){
				let value1 = [
					row.liveStarttime,
					row.liveEndtime
				]
				this.value1 = value1;
			}else if(row.liveStarttime==null && row.liveEndtime==null){
				let value1 = null
				this.value1 = value1;
			}

			this.addform=addform;

			this.dialogTitle='编辑赛事集锦'
			this.show = false;
      this.dialogVisible=true
      console.log(row,"edit row")
      this.updAlbumsId=row.id

    },
    //删除
    del(id){
      const data={
        id
      }

      this.$confirm('是否删除该赛事集锦', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(data).then(res=>{
          if(res.code==200){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          this.getGtAlbumList()
        })
      })

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
      this.addform.fileList[0]=fileList[0].response.data.fileurl;
      this.filepath = fileList[0].response.data.filepath;
      this.fileurl = fileList[0].response.data.fileurl;
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
    //获取赛事集锦列表
    getGtAlbumList(){
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        title:''
      }
      getGtAlbumList(data).then(res => {
        this.total=res.data.page.totalRecord
        this.list=res.data.list
        this.loading=false
      })
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
    goDetails(id,title){
      this.$router.push({
        path:'details',
        query:{
          id:id,
          title:title
        }
      })
    },
    //搜索
    search(){
      this.getGtAlbumList()
		},
		searchD(){
      this.currentPage=1,
      this.pageSize=10,
      this.getMatchList()
    },
    //清空
    clean(){
      this.query.keyword="",
      this.getGtAlbumList()
		},
		// 排序
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
      gtalbumSort(data).then(res => {
				if(res.code==200){
          this.$message.success('修改排序成功')
        }
        this.getGtAlbumList()
      })
		},
		//预览封面
    imgClick(img){
      this.imgVisible=true;
      this.img=img
		},
		clearData(){
			this.addform.fileList = []
			this.addform.title = ''
			this.addform.listIndex = ''
			this.addform.sorting = ''
			this.addform.liveUrl = ''
			this.addform.liveEndtime = ''
      this.addform.liveStarttime = ''
      this.filepath="";
      this.fileurl="";
			this.value1 = null
			this.addform.state = 1
			this.match = ''
		},
		//分页
    handleSizeChangeD(val) {
      this.pageSizeD=val;
      this.getMatchList()
    },
    handleCurrentChangeD(val) {
      this.currentPageD=val;
      this.getMatchList()
    },
  }
}
</script>

<style scoped>
  .cover{
    width: 100px;
    height: auto;
  }
</style>
<style >
.upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: 70px; width: auto;
}
</style>

