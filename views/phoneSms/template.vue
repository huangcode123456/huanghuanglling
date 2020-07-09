<template>
  <div class="app-container">
    <el-form :inline="true" ref="query" :model="query" size="mini">
      <el-form-item label="赛事">
        <el-select v-model="query.id" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,i) in MatchList" :key="i" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="success" icon='el-icon-plus' @click="add" size="mini">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="mt20"
      style="widht:100%"
      :data="list"
      v-loading="loading"
      border
      highlight-current-row>
      <el-table-column
        label="模板名称"
        align="center"
        prop="name">
      </el-table-column>
       <el-table-column
       align="center"
        label="模板CODE"
        prop="tmpCode">
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="赛事"
        prop="matchName">
          <template slot-scope="scope">
            <el-link type="primary" @click="matchSet(scope.row.id,scope.row.matchId)">关联赛事</el-link>
            <div>{{scope.row.matchName}}</div>
          </template>
      </el-table-column>
      <el-table-column
        label="短信内容"
        align="center"
        width="200px"
        prop="content">
      </el-table-column>
      <el-table-column
        label="审核状态"
        align="center"
        width="100px"
        prop="templateStatus">
        <template slot-scope="scope" >
          <div>
            <span>{{scope.row.templateStatus==0?'审核中':scope.row.templateStatus==1?'审核通过':'审核不通过'}}</span>
          </div>
        </template>
      </el-table-column>
     <el-table-column
        label="审核说明"
        align="center"
        width="100px"
        prop="reason">
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="160px"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.templateStatus==0" @click="synSmsTemplate(scope.row)">同步审核状态</el-link>
          <el-link type="primary" v-if="scope.row.templateStatus==2" @click="delSmsTemplate(scope.row)">删除</el-link>
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
      title="新增短信模板"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="addform" status-icon :rules="rules" size="mini">
          <el-form-item label="赛事" prop="matchId">
            <!-- <el-input v-model="addform.match" size='small'></el-input> -->
            <el-select style="width:100%" v-model="addform.matchId" placeholder="请选择">
              <el-option v-for="(item,i) in MatchList" :key="i" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="addform.title" size='small'></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="addform.content"></el-input>
            <div class="template-desc">
              <div>系统预置比变量： 赛事标题 ${smt} | 赛事项标题 ${smpt} | 赛事项分组标题 ${smgt} | 报名单价 ${sop} | 订单总价 ${sosp} | 联系人 ${sc} | 参赛编号 ${ssNo}</div>
              <div>示例：您正在申请手机注册，验证码为：${code}，5分钟内有效！</div>
              <div>验证码模板只支持验证码作为变量；变量替换值<=6位数字或字母</div>
              <div>不能发送营销/贷款/借款/中奖/抽奖类短信,不支持金融理财&房产通知类短信(验证码除外)</div>
              <div>签名/模版申请规范 https://help.aliyun.com/document_detail/55324.html</div>
            </div>
          </el-form-item>

          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit">保存</el-button></el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog
      title="关联赛事"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="matchVisible"
      :append-to-body="appendToBody"
      width="600px">
        <el-form ref="form" :model="matchform"  size="mini" label-width="70px">
          <el-form-item label="赛事">
            <el-select
              style="width:480px"
              v-model="matchform.matchId"
              clearable
              placeholder="请选择">
              <el-option
                v-for="item in MatchList"
                :key="item.value"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="matchOnSubmit">确定</el-button>
            <el-button @click="matchVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTemplateList,SaveGtSmsTemp,SynSmsTemplate,delSmsTemplate,updateSmsTmpMatch } from '../../api/sms'
import { getGtMatchTable } from '../../api/match'
export default {
  data() {
    return {
      query:{
        id:'',
      },
      list:[],
      //分页
      total:0,
      currentPage:1,
      pageSize:10,

      loading:true,
      appendToBody:true,
      closeOnClickModal:false,
      matchVisible:false,
      dialogVisible:false,

      addform:{
        id:'',
        title:'',
        content:''
      },

			MatchList:[],

			form:{
				fileList:[]
      },
      matchform:{
        id:null,
        matchId:null
      },
			rules: {
				title: [
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
  mounted(){
    this.getTemplateList()
    this.getGtMatchTable()
  },
  methods: {
    add(){
      this.dialogVisible=true;
    },
    onSubmit(){
			this.$refs.form.validate((valid) => {
          if (valid) {
						const data={
							content:this.addform.content,
							name:this.addform.title,
							matchId:this.addform.matchId
            }
            console.log(data)
						SaveGtSmsTemp(data).then(res=>{
              this.getTemplateList();
              this.dialogVisible=false;
							console.log(res);
						})
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    search(){
      this.getTemplateList()
    },
    //获取赛事--下拉框
    getGtMatchTable(){
      const data={}
      getGtMatchTable(data).then(res=>{
        console.log(res,'赛事下拉框')
        this.MatchList=res.data
      })
    },
    getTemplateList(){
      const data={
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
        matchId:this.query.id
      }
      getTemplateList(data).then(res => {
        console.log(res,'短信模板列表')
        this.total=res.data.page.totalRecord;
        this.list=res.data.smsTmpsList

        this.loading=false
      })
    },
    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getTemplateList()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getTemplateList()
    },
    synSmsTemplate(row){
      const data={
        id:row.id,
        templateCode:row.tmpCode
      }
      SynSmsTemplate(data).then(res => {
        console.log(res,'同步短信状态')
        this.getTemplateList();
      })
    },
    delSmsTemplate(row){
      const data={
        id:row.id
      }
      delSmsTemplate(data).then(res => {
        console.log(res,'删除短信模板')
        this.getTemplateList();
      })
    },
    matchSet(id,matchId){//赛事设置
      this.matchform.id=id;
      this.matchform.matchId=matchId;
      this.matchVisible=true;
    },
    matchOnSubmit(){//专题设置确定
      const data={
        "id": this.matchform.id,
	      "matchId": this.matchform.matchId
      }
      updateSmsTmpMatch(data).then(res => {
        console.log(res)
        if(res.code=='200'){
          this.$message.success("保存成功！");
          this.matchVisible=false;
          this.getTemplateList()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .cover{
    width: 100px;
    height: 70px;
  }
  .template-desc{
    font-size: 12px;
    line-height: 1.4;
    div{
      margin-top: 10px;
    }
  }
</style>

