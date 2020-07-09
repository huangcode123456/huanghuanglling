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
      <el-form-item label="赛事类型">
        <el-select v-model="form.type" placeholder="请选择" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in MatchType" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名时间" size="small">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.bmType">一键报名</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column
        width="80px"
        align="center"
        label="id"
        prop="id">
      </el-table-column>
      <!-- <el-table-column
        width="200px"
        align="center"
        label="用户名称"
        prop="userName">
      </el-table-column> -->
      <el-table-column
        align="center"
        width="150"
        label="赛事类型"
        prop="typeName">
      </el-table-column>
      <el-table-column
        align="center"
        label="赛事名称" 
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        width="90" 
        label="在线预览">
         <template slot-scope="scope" >
            <div>
              
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        label="赛事状态">
        <span>待审核</span>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        width="150"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" @click="audit(scope.row.id,'1')" style="margin-left:5px">审核通过</el-link>
              <el-link type="primary" @click="audit(scope.row.id,'0')" style="margin-left:5px">审核失败</el-link>
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
  </div>
</template>

<script>
import { insertMatchSet,getGtMatchTypeOptions,getGtMatchList,updateMatchBaseInfo,gtMatchSpecialList } from '../../api/match'
import moment from 'moment'
export default {
  data() {
    return {
      form:{
        title:'',
        project:'',
        status:'',
        type:'',
        time:null,
        bmType:''
      },
      list:[],
      //赛事类型下拉框
      MatchType:[],

      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      //专题列表
      speciallist:[],
    }
  },
  mounted(){
    this.getspecialmessge()
    this.getGtMatchTypeOptions();
    this.getMatchList()
  },
  methods: {
    //赛事类型查询-下拉框
    getGtMatchTypeOptions(){
      const data={
        releaseState:1,
        state:1
      }
      getGtMatchTypeOptions(data).then(res=>{
        this.MatchType=res.data.list
        console.log(res)
      })
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
    //赛事列表
    getMatchList(){
      console.log(this.form.bmType)
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        title:this.form.title,
        special:this.form.project,
        releaseState:-1,
        type:this.form.type,
        signupState:this.form.bmType==true?'1':'',
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
        console.log(res,'赛事待审核列表')
      })
    },
    search(){
      console.log(this.form)
      this.getMatchList()
    },
    audit(id,status){
      const data={
        id,
        releaseState:status,
      }
      var content=''
      if(status==1){
        content='是否审核通过该赛事？'
      }else{
        content='是否审核拒绝该赛事？'
      }
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        insertMatchSet(data).then(res => {
          console.log(res,'通过拒绝')
          
          this.getMatchList()
        })
      })
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
  }
}
</script>

<style scoped>
  
</style>

