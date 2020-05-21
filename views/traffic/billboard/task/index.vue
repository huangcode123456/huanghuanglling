<template>
  <div class="jm-main-inner">
    <el-container>
      <!-- 中间 -->
			<el-tabs  v-model="tabActiveName" @tab-click="handleClick" style="width:100%;margin-left:20px;">
				<el-tab-pane label="待办任务" name="a">
					<!-- 左侧 -->
					<el-aside class="jm-aside">
						<div>
							<!-- 气象点搜索功能 -->
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item label="">
									<el-input v-model="formInline.user" placeholder="输入任务名称" style="width:300px;"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onSubmit">搜索</el-button>
								</el-form-item>
							</el-form>
							<!-- 监测指标表格 -->
							<el-table
								:data="tableData"
								stripe
								border
								class="mt10 sz-table"
								height="300px"
								style="width: 100%;"
								row-class-name="sz-table-tr">
								<el-table-column
									prop="number"
									label="序号"
									width='60'
									>
								</el-table-column>
								<el-table-column
									prop="snumber"
									label="编号"
								
									>
								</el-table-column>
								<el-table-column
									prop="address"
									label="名称"
									
									>
								</el-table-column>
								<el-table-column
									prop="date"
									label="时间"
								
									>
								</el-table-column>
								<el-table-column
									prop=""
									label="操作"
									>
									<el-button
										size="mini"
										>编辑</el-button>
									<el-button
										size="mini"
										type="danger"
										>删除</el-button>
								</el-table-column>
							</el-table>

							<!-- 分页 -->
							<el-pagination
							class="mt10"
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page.sync="currentPage"
								:page-size="100"
								small
								:pager-count='pagerCount'
								layout="prev, pager, next, jumper"
								:total="1000">
							</el-pagination>

							<el-form label-position="left">
								<el-form-item label="审核意见" prop="desc">
									<el-input type="textarea"  v-model="ruleForm.desc"></el-input>
								</el-form-item>
							</el-form>

						</div>
					</el-aside>
					<!-- 中间 -->
					<el-container class="jm-main-outer">
					</el-container>
					
				</el-tab-pane>

				<!-- 白名单设置 -->
				<el-tab-pane label="历史任务" name="b">
						历史任务
				</el-tab-pane>

            
          </el-tabs>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
export default {
  name: "trafficVehicle",
  data() {
    return {
			formInline: {
          user: '',
          region: ''
        },
			ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      input:'',
      inputSearch:'',
      suspiciousChecked:'',
      tableData: [{
					number: '1',
					snumber:'231',
          date: '2016-05-02',
          address: '诱导屏监测1',
        }, {
          number: '2',
					snumber:'227',
          date: '2016-05-04',
          address: '诱导屏监测2'
        }, {
          number: '3',
					snumber:'121',
          date: '2016-05-01',
          address: '诱导屏监测3',
        },
        {
          number: '4',
					snumber:'546',
          date: '2016-05-01',
          address: '诱导屏监测4',
        },
				{
					number: '5',
					snumber:'394',
          date: '2016-05-01',
          address: '诱导屏监测5',
        }, {
					number: '6',
					snumber:'734',
          date: '2016-05-03',
          address: '水质监测点5'
				}],
      currentPage: 1,
      pagerCount:5,

      dataValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

      // 地图相关
      center: {lng: 0, lat: 0},
			zoom: 15,
      active: false,
      infoWindow: {
        show: true,
        contents: '这是天安门'
      },

      tabActiveName:'a'
    };
  },
  methods: {
		onSubmit() {
        console.log('submit!');
      },
    search(){
				alert('搜索气象点位'+this.input)
			},

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },

    // 选项卡
    handleClick(tab, event) {
        console.log(tab, event);
    }
    
  },
  mounted(){
  },
  created() {
   
  },
  components: {}
};
</script>
<style scoped lang="less">
  .jm-aside{
    width: 45% !important;
    padding: 10px;
    .jm-title{
      font-size: 14px;
    }
    
  }
  .searchBar{
    display: flex;
    align-items: center;
    
  }
  .searchBar /deep/ .el-checkbox__label{
      font-size: 12px;
      padding-left: 5px;
  }
  /deep/ .el-table .lk-table-tr td,/deep/ .el-table .lk-table-tr th{
        padding: 5px 0;
         font-size: 12px;
   }
   .bdMap{
     width: 100%;
     height: 100%;
   }

  /deep/ .jm-datetimerange.el-date-editor--datetimerange.el-input, /deep/ .jm-datetimerange.el-date-editor--datetimerange.el-input__inner{
     width: 100%;
   }
  // .jm-aside:first-child{
  //   padding-right: 20px;
  // }
  // .jm-aside:last-child{
  //   padding-left: 20px;
  // }
  
</style>



