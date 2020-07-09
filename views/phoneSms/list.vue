<template>
  <div class="app-container">
    <el-form :inline="true" ref="query" :model="query" size="mini">
      <el-form-item label="手机号">
        <el-input v-model="query.phone" size='small'></el-input>
      </el-form-item>
      <el-form-item label="短信内容">
        <el-input v-model="query.content" size='small'></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-select v-model="query.type" placeholder="请选择">
          <el-option label="所有" value="1"></el-option>
          <el-option label="报名成功" value="2"></el-option>
          <el-option label="验证码" value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="发送状态">
        <el-select v-model="query.status" placeholder="请选择" size='small'>
          <el-option label="所有" value=""></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:4%">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="mt20"
      style="widht:100%"
      v-loading="loading"
      :data="list"
      border
      highlight-current-row>
      <el-table-column
        width="120"
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column
      width="120"
        align="center"
        label="类型"
        prop="smsType">
        <template slot-scope="scope" >
          <div>
            <span>{{scope.row.smsType==2?'登录验证码':scope.row.smsType==3?'赛事提醒':(scope.row.smsType==4||scope.row.smsType==5)?'报名成功通知':scope.row.smsType==6?'认证审核通知':'验证码'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="content">
      </el-table-column>
      <el-table-column
        width="160"
        label="发送时间"
        prop="createTime">
      </el-table-column>
     <el-table-column
        width="80"
        label="发送状态"
        prop="sendState">
        <template slot-scope="scope" >
          <div>
            <span>{{scope.row.sendState==1?'成功':scope.row.sendState==0?'失败':'发送中'}}</span>
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
import { getGtSmsTempList } from '../../api/sms'
export default {
  data() {
    return {
      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      loading:true,

      query:{
        phone:'',
        // type:'1',
        status:'',
        content:''
      },
      list:[]
    }
  },
  mounted(){
    this.getGtSmsTempList()
  },
  methods: {
   getGtSmsTempList(){
     const data={
       pageNumber:this.currentPage,
       pageSize:this.pageSize,
       phone:this.query.phone,
       sendState:this.query.status,
       content:this.query.content
     }
     console.log(data,"search data")
    getGtSmsTempList(data).then(res => {
      this.total=res.data.page.totalRecord;
      this.list=res.data.phoneSmsList
      this.loading=false
      console.log(res,'已发送短信管理列表')
    })
   },
   //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getGtSmsTempList()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getGtSmsTempList()
    },

    //查询
    search(){
      this.getGtSmsTempList()
    },
  }
}
</script>

<style scoped>
  .cover{
    width: 100px;
    height: 70px;
  }
</style>

