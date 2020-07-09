<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="赛事">
        <el-select v-model="form.event" placeholder="请选择">
          <!-- <el-option label="全部" value=""></el-option> -->
          <el-option v-for="(item,i) in MatchList" :key="i" :label="item.title" :value="item.id"></el-option>
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
      <el-form-item label="订单状态">
        <el-select v-model="form.status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="支付成功" value="1"></el-option>
          <el-option label="支付中" value="2"></el-option>
          <el-option label="支付失败" value="3"></el-option>
          <el-option label="下单失败" value="4"></el-option>
          <el-option label="完成作废" value="5"></el-option>
          <el-option label="富有超时关闭" value="6"></el-option>
          <el-option label="参赛完成" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
			v-loading='loading'
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column
        width="150px"
        align="center"
        label="组别"
        prop="groupTitle">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="参赛编号"
        prop="ssNo">
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="团队编号"
        prop="teamNo">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="团队名称"
        prop="teamName2">
      </el-table-column>
      <el-table-column
        width="220px"
        align="center"
        label="订单编号"
        prop="orderNo">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="状态"
        prop="state">
          <template slot-scope="scope">
            <span>{{scope.row.state=='1'?'正常':'草稿'}}</span>
          </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column
        width="170px"
        align="center"
        label="身份证号码"
        prop="cardNo">
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="性别"
        prop="gender">
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="年龄"
        prop="age">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="衣服尺码"
        prop="clothingSize">
      </el-table-column>
      
      <el-table-column
        fixed="right"
        align="center"
        width="150"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <!-- <el-link type="primary" style="margin-left:5px">置为草稿</el-link>
              <el-link type="primary" style="margin-left:5px">删除</el-link> -->
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
import { gtentrantsList } from '../../api/signUp'
import { getGtMatchTable } from '../../api/match'
import moment from 'moment'
export default {
  data() {
    return {
			loading:false,
      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      form:{
        event:'',
        time:null,
        status:''
      },
      list:[],
      //获取赛事下拉框
      MatchList:[],
    }
  },
  mounted(){
    // this.getGtentrantsList()
    this.getGtMatchTable()
  },
  methods: {
    //获取赛事--下拉框
    getGtMatchTable(){
			this.loading = !this.loading;
      const data={}
      getGtMatchTable(data).then(res=>{
        console.log(res,'赛事下拉框')
				this.MatchList=res.data
				this.loading = !this.loading;
      })
    },
    getGtentrantsList(){
      console.log(this.form.time)
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        matchId:this.form.event,
        startTime:this.form.time==null?'':moment(this.form.time[0]).format('YYYY-MM-DD h:mm:ss'),
        endTime:this.form.time==null?'':moment(this.form.time[1]).format('YYYY-MM-DD h:mm:ss'),
        state:this.form.status
      }
      gtentrantsList(data).then(res=>{
        this.total=res.data.page.totalRecord
        this.list=res.data.records;
        console.log(res)
      })
    },
    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getGtentrantsList()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getGtentrantsList()
    },

    search(){
      console.log(this.form.matchId)
      if(this.form.event==''){
        this.$message.error('请选择需要查询的赛事');
        return false
      }
      this.currentPage=1,
      this.pageSize=10,
      this.getGtentrantsList()
    },
    //清空
    clean(){
      this.form.event=''
      this.form.time=null
      this.form.status=''
      this.getGtentrantsList()
    },
  }
}
</script>

<style scoped>

</style>

