<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="优惠券名称">
        <el-input v-model="form.name" size='small'></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="抵扣金额卷" value="1"></el-option>
          <el-option label="免费卷" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赛事">
        <el-select v-model="form.matchId" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in MatchList" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" style="margin-top:2%">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>

    <div style="padding-bottom:20px;">
      <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
    </div>

    <el-table
      :data="list"
      v-loading="loading"
      border
      fit
      highlight-current-row>
      <el-table-column
        width="150px"
        align="center"
        label="优惠券名称"
        prop="name">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="赛事"
        prop="matchName">
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.type==1?'抵扣金额券':scope.row.type==2?'免费券':''}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="优惠券数量"
        prop="amount">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="金额">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.discount | discountFilter}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="220px"
        align="center"
        label="创建时间"
        prop="createTime">
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        width="200"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <el-link type="primary" @click="toDetails(scope.row.id)">使用详情</el-link>
              <el-link type="primary" @click="exportCouponCodes(scope.row.id)">导出优惠码</el-link>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增优惠券"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="addform" label-width="100px" status-icon :rules="rules" size="mini">
          <el-form-item label="赛事" prop="event">
            <el-select v-model="addform.event" placeholder="请选择">
              <el-option v-for="(item,i) in MatchList" :key="i" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券名称" prop="title">
            <el-input v-model="addform.title" size='small'></el-input>
          </el-form-item>
          <el-form-item label="优惠券数量">
            <el-input-number v-model="addform.num" @change="handleChangeNum" :min="1" :max="9999"></el-input-number>
          </el-form-item>
          <el-form-item label="优惠券类型">
            <el-radio v-model="addform.state" label="1">抵扣金额券</el-radio>
            <el-radio v-model="addform.state" label="2">免费券</el-radio>
          </el-form-item>
          <el-form-item label="抵扣金额(元)" v-if="addform.state==1">
            <el-input-number v-model="addform.price"  @change="handleChangePrice" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addform.desc"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="addCoupon">保存</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
      title="优惠券使用详情"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="DetailsVisible"
      :append-to-body="appendToBody"
      width="80%">
        <el-form :inline="true" ref="form" :model="detailsForm" size="mini">
          <el-form-item label="使用人姓名">
            <el-input v-model="detailsForm.name" size='small'></el-input>
          </el-form-item>
          <el-form-item label="优惠码">
            <el-input v-model="detailsForm.couponCode" size='small'></el-input>
          </el-form-item>
          <el-form-item label="优惠券使用状态">
            <el-select v-model="detailsForm.state" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="未使用" value="0"></el-option>
              <el-option label="已使用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchDetails">查询</el-button>
            <el-button type="info" @click="cleanDetails">清空</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="DeatilsList"
          v-loading="detailsLoading"
          border
          fit
          highlight-current-row>
          <el-table-column
            align="center"
            label="优惠券券码"
            prop="couponCode">
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="状态">
            <template slot-scope="scope">
              <div>
                <span>{{scope.row.state==1?'已使用':scope.row.state==0?'未使用':''}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="使用时间"
            prop="useTime">
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="使用人"
            prop="useName">
          </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:5px"
        @size-change="handleSizeChangeDetails"
        @current-change="handleCurrentChangeDetails"
        :current-page="currentPageDetails"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDetails">
      </el-pagination>
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
import { couponSearch,couponItemSearch,couponAdd,exportCouponCodes } from '../../api/coupon'
import {EXP_COUPON} from '@/utils/const.js'
import axios from 'axios'
import { getGtMatchTable } from '../../api/match'
export default {
  data() {
    return {
      loading:true,
      detailsLoading:true,
      list:[],
      expCoupon:EXP_COUPON,
      form:{
        name:'',
        type:'',
        matchId:''
      },
      detailsForm:{
        name:'',
        state:''
      },
      detailsId:'',
      addform:{
        event:'',
        title:'',
        num:1,
        state:'1',
        price:'',
        desc:''
      },

      appendToBody:true,
      closeOnClickModal:false,
      dialogVisible:false,
      DetailsVisible:false,

      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      totalDetails:0,
      currentPageDetails:1,
      pageSizeDetails:10,

      DeatilsList:[
        {
          title:'adsfsdkjvksjvshfgjhsgfhjgs',
          status:'已使用',
          time:'2020-05-20 13:14:52',
          name:'lx'
        }
      ],
      token:'',

      //获取赛事下拉框
			MatchList:[],

			form:{
				fileList:[]
			},
			rules: {
				event: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				title: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				state: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				sorting: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
			}
    }
  },
  mounted(){
    this.token=sessionStorage.getItem("token")
    this.getcouponSearch();
    this.getGtMatchTable()
  },
  filters: {
    discountFilter: function (value) {
      if (!value) return ''
      value=value/100+'元'
      return value
    }
  },
  methods: {
    //获取赛事--下拉框
    getGtMatchTable(){
      const data={}
      getGtMatchTable(data).then(res=>{
        console.log(res,'赛事下拉框')
        this.MatchList=res.data
      })
    },
    //查询
    search(){
      this.getcouponSearch()
    },
    searchDetails(){
      this.getcouponItemSearch()
    },
    //清空
    clean(){
      this.form.name='';
      this.form.type=null;
      this.form.matchId=null;
      this.getcouponSearch();
    },
    cleanDetails(){
      this.detailsForm.name='';
      this.detailsForm.state=''
      this.detailsForm.couponCode=''
      this.getcouponItemSearch()
    },
    //获取优惠券
    getcouponItemSearch(id){
      const data={
        pageNumber:this.currentPageDetails,
        pageSize:this.pageSizeDetails,
        useName:this.detailsForm.name,
        state:this.detailsForm.state,
        couponCode:this.detailsForm.couponCode,
        couponId:this.detailsId
      }
      couponItemSearch(data).then(res=>{
        this.totalDetails=res.data.totalRecord
        this.DeatilsList=res.data.records;
        this.detailsLoading=false;
        console.log(res,"优惠卷使用情况列表")
      })
    },
    //获取优惠券模板列表
    getcouponSearch(){
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        name:this.form.name,
        type:this.form.type==""?null:this.form.type,
        matchId:this.form.matchId==""?null:this.form.matchId
      }
      couponSearch(data).then(res=>{
        this.total=res.data.totalRecord
        this.list=res.data.records;
        this.loading=false;
        console.log(res,"优惠卷列表")
      })
    },
    add(){
      this.dialogVisible=true
    },
    toDetails(id){
      this.DetailsVisible=true;
      this.detailsForm.state=''
      this.detailsId=id
      this.getcouponItemSearch()
    },

    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getcouponSearch()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getcouponSearch()
    },
    handleSizeChangeDetails(val) {
      this.pageSizeDetails=val;
      this.getcouponItemSearch()
    },
    handleCurrentChangeDetails(val) {
      this.currentPageDetails=val;
      this.getcouponItemSearch()
    },

    //计数器
    handleChangeNum(value) {
      console.log(value)
      // this.addform.num=value
    },
    handleChangePrice(value){
      this.addform.price=value
    },

    //新增优惠券
    addCoupon(){
			this.$refs.form.validate((valid) => {
          if (valid) {
            const data={
							matchId:this.addform.event,
							name:this.addform.title,
							type:this.addform.state,
							discount:this.addform.state==1?this.addform.price * 100:'',
							remark:this.addform.desc,
							amount:this.addform.num
						}
						couponAdd(data).then(res=>{
							this.dialogVisible=false;
							this.getcouponSearch()

							let addform={
								event:'',
								title:'',
								num:1,
								state:'1',
								price:'',
								desc:''
							}
							this.addform=addform
						})
          } else {
            return false;
          }
			});

    },

    //导出
    exportCouponCodes(id){
      axios.defaults.headers.common["token"] = this.token
      // axios.defaults.headers.post["Content-type"] = "application/json"
      axios({
        methods:'get',
        url:this.expCoupon+`${id}`,
        responseType: "blob"
      })
      .then(res => {
        // let disposition=res.headers['content-disposition'];
        // console.log(disposition)
        // let fileName = disposition.split("=")[1];
        // console.log(fileName)

        // const _res=res.data
        // let blob=new Blob([_res]);
        // let href = window.URL.createObjectURL(blob);
        // console.log(href)
        const fileName = res.headers["content-disposition"].split("=")[1];
        const _res = res.data;
        let blob = new Blob([_res]);
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = fileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      })
      .catch((e) => {

      });
    }
  }
}
</script>

<style scoped>

</style>

