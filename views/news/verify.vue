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
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:2%;">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      v-loading="loading"
      border
      fit
      highlight-current-row>
      <el-table-column
        width="80px"
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="所属专题"
        prop="specialTitle">
          <template slot-scope="scope">
            <span v-for="(item,i) in scope.row.specials" :key='i'>{{item.title}}{{i==scope.row.specials.length-1?'':'，'}}</span>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160"
        label="发布时间"
        prop="createTime">
      </el-table-column>
      <!-- <el-table-column
        align="center"
        width="90"
        label="审核状态"
        prop="auditStatus">
      </el-table-column> -->
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
        width="60"
        label="内容"
        prop="content">
        <!-- <el-link type="primary" @click="">预览</el-link> -->
        <el-tooltip placement="top">
          <div slot="content">
            <img style="width:150px" src="../../../public/images/news/erweima.png" alt="">
          </div>
          <el-link type="primary">预览</el-link>
        </el-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        width="70"
        label="阅读量"
        prop="readCount">
      </el-table-column>
      <el-table-column
        align="center"
        width="60"
        label="状态"
        prop="state">
          <template slot-scope="scope" >
            <div>
              <!-- <el-switch
                :active-value='1'
                :inactive-value='0'
                v-model="scope.row.state">
              </el-switch> -->
              <span>{{scope.row.state==1?'正常':'停用'}}</span>
            </div>
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" @click="audit(scope.row,'1')" style="margin-left:5px">审核通过</el-link>
              <el-link type="primary" @click="audit(scope.row,'0')" style="margin-left:5px">审核拒绝</el-link>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="imgVisible"
      :append-to-body="appendToBody"
      width="800px">
        <img style="width:760px" :src="img" alt="">
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
import { getNewsList,specialmessge,updategtnews } from '../../api/news'
import {IMG_URL} from '@/utils/const.js'
import moment from 'moment'
export default {
  data() {
    return {
      loading:true,
      imgVisible:false,
      closeOnClickModal:true,
      appendToBody:true,
      imgUrl:IMG_URL,
      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      //专题列表
      speciallist:[],

      form:{
        title:'',
        project:'',
        status:''
      },
      list:[],
      img:''
    }
  },
  mounted(){
    this.getspecialmessge();
    this.getNewsList()
  },
  methods: {
    imgClick(img){
      this.img=this.imgUrl+img
      this.imgVisible=true;

    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    //获取专题列表
    getspecialmessge(){
      const data={}
      specialmessge(data).then(res => {
        console.log(res.data.records)
        this.speciallist=res.data.records;
      })
    },
    //获取资讯列表
    getNewsList(){
      const data={
        "pageNumber": this.currentPage,
        "pageSize": this.pageSize,
        "title":this.form.title,
        "releaseState": -1,
        "specialId": this.form.project,
      }
      getNewsList(data).then(res => {
        this.total=res.data.page.totalRecord
        this.list=res.data.records
        this.loading=false
        console.log(res,'资讯审核列表')
      })
    },
    //搜索
    search(){
      this.getNewsList()
    },
    //清空
    clean(){
      this.form.title=''
      this.form.project=''
      this.getNewsList()
    },
    //审核
    audit(row,status){
      const data={
        id:row.id,
        title:row.title,
        cover:row.cover,
        coverInner:row.coverInner,
        link:row.link,
        content:row.content,
        author:row.author,
        sourceType:row.sourceType,
        releaseTime:moment().format('YYYY-MM-DD h:mm:ss'),
        state:1,
        releaseState:status,
      }
      var content=''
      if(status==1){
        content='是否审核通过该资讯？'
      }else{
        content='是否审核拒绝该资讯？'
      }
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updategtnews(data).then(res => {
          if(res.code==200){
            this.$message.success("审核完成！");
            this.getNewsList();
          }
        })
      })

    }
  }
}
</script>

<style scoped>

</style>

