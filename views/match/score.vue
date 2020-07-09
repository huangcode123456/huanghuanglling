<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" size="mini">
      <el-form-item label="赛事">
				<el-select v-model="form.event" placeholder="请选择" @change="gtScoreList(form.event)" size="small">
					<el-option
						v-for="item in options"
						:key="item.id"
						:label="item.title"
						:value="item.id">
					</el-option>
					<!-- <el-option label="薪火传承·中国健康跑1" value="2"></el-option>
					<el-option label="“锦绣潇湘·安宁竹谷”绿色环保自行车邀请赛" value="3"></el-option>
					<el-option label="高新发展我担当  青春建功“双过半”" value="4"></el-option> -->
				</el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item> -->
    </el-form>

    <el-table
      :data="list"
			v-loading="loading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        label="报名项目"
        prop="projectName">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="参赛编号"
        prop="code">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="组内排名"
        prop="ranking">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="成绩"
        prop="score">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="身份证号"
        prop="idCard">
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="电话号码"
        prop="phone">
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
import { gtScoreList,getGtMatchTable } from '../../api/match'
export default {
  data() {
    return {
      form:{
        event:'',
			},
			options:{},
      list:[
        // {
        //   project:'项目一',
        //   num:520,
        //   name:'张三',
        //   rank:1,
        //   score:'冠军',
        //   idCard:'43055456516511315115',
        //   phone:'152073945555'
        // }
			],
			//分页
      total:0,
      currentPage:1,
			pageSize:10,

			loading:false
    }
  },
  async mounted(){
		await this.getGtMatchTable()
		await this.gtScoreList()
  },
  methods: {
		// 获取下拉框列表
		async getGtMatchTable(){
			await getGtMatchTable()
			.then(res=>{
				console.log(res,'11111111')
				this.options = res.data
				this.form.event = res.data[0].id
				console.log(res.data[0].id,'###')
				console.log(this.form.event,'$$$')
			})
		},
		// 获取成绩列表
		gtScoreList(id){
			this.loading = !this.loading;
			var dataId = ''
			if(id == undefined){
				dataId = this.form.event;
				var data = {
					matchId: dataId,
					pageNumber: this.currentPage,
					pageSize: this.pageSize
				}
				gtScoreList(data)
				.then(res=>{
					this.total = res.data.page.totalRecord
					this.list = res.data.records;
					this.loading = !this.loading;
				})
			} else {
				dataId = id
				var data = {
					matchId: dataId,
					pageNumber: this.currentPage,
					pageSize: this.pageSize
				}
				gtScoreList(data)
				.then(res=>{
					console.log(res,"list info ")
					this.list = res.data.records;
					this.loading = !this.loading;
				})
			}

		},
		//分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.gtScoreList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.gtScoreList()
    },
  }
}
</script>

<style scoped>

</style>

