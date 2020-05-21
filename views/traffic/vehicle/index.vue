<template>
  <div class="jm-main-inner p10">
    <el-container>
        <!-- 左侧 -->
        <el-aside class="jm-aside">

          <div class="jm-card">
            <div class="jm-card-header">
              <h4 class="jm-card-title">今日车辆监控</h4>
            </div>
            <div class="jm-card-center p10">
                <div class="flex">
                  <el-input  class="jm-search" size="small"  placeholder="请输入车牌号" v-model="input" >
                    <el-button @click="serach" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                  <el-checkbox class="ml10" v-model="suspiciousChecked">可疑车辆</el-checkbox>
                </div>
              
                <el-table
                  :data="tableData"
                  class="jm-table mt10"
                  row-class-name="tr-small"
                  header-row-class-name='tr-small'
                  height="200"
                  >
                  <el-table-column prop="cp"  label="车牌"> </el-table-column>
                  <el-table-column prop="ys" width="50" label="颜色"> </el-table-column>
                  <el-table-column prop="cs" width="50" label="车速"> </el-table-column>
                  <el-table-column prop="lx" width="50" label="类型"> </el-table-column>
                  <el-table-column prop="sj" width="100" label="时间"> </el-table-column>
                  <el-table-column  width="70" label="操作"> 

                    <template slot-scope="scope">
                      <el-button type="primary" @click="positi(scope.row)" size="mini" icon="el-icon-location-information"></el-button>
                    </template>

                  </el-table-column>
                </el-table>

                <el-pagination
                  class="jm-pagination mt10"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :pager-count="pagerCount"
                  :page-size="10"
                  small
                  layout="prev, pager, next, jumper"
                  :total="40">
                </el-pagination>
            </div>
          </div>
          <div class="jm-card mt10">
            <div class="jm-card-header">
              <h4 class="jm-card-title">今日车辆和异常总数监控</h4>
            </div>
            <div class="jm-card-center p10">
                  <!-- echarts图表 -->
                  <div id="chartCl"  style="height:300px;"></div>
            </div>
          </div>
        </el-aside>

        <!-- 中间 -->
        <el-container class="plr10" >
          <txMap ref="mychild" :qp="true" :isLngLat="false"></txMap>
        </el-container>

        <!-- 右侧 -->
        <el-aside class="jm-aside">
          <div class="jm-card" style="height:100%">
            <!-- <div class="jm-card-header">
              <h4 class="jm-card-title">今日车辆监控</h4>
            </div> -->
            <div class="jm-card-center p10 yauto">
               
              <el-tabs class="jm-tabs"  v-model="tabActiveName" @tab-click="handleClick">
                <!-- 车辆检查 -->
                <el-tab-pane label="车辆检查" name="a">

                  <el-date-picker
                    size="small"
                    class="jm-datetimerange"
                    v-model="dataValue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>

                  <div class="mt10 flex" >
                    <el-input size="small"  class="jm-search"  placeholder="请输入车牌号" v-model="inputSearch" >
                      <el-button @click="serach" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-checkbox class="ml10" v-model="suspiciousChecked">可疑车辆</el-checkbox>
                  </div>
                  <p class="mt10">
                    <span>车辆总数：13020 辆</span>
                    <span class="ml20">异常车辆：342 辆</span>
                  </p>
                  <el-table
                    :data="tableData"
                    class="jm-table mt10"
                    row-class-name="tr-small"
                    header-row-class-name='tr-small'
                    >
                    <el-table-column prop="lk" label="路口"> </el-table-column>
                    <el-table-column prop="cp"  label="车牌"> </el-table-column>
                    <el-table-column prop="ys" width="50" label="颜色"> </el-table-column>
                    <el-table-column prop="cs" width="50" label="车速"> </el-table-column>
                    <el-table-column prop="lx" width="50" label="类型"> </el-table-column>
                    <el-table-column prop="sj" width="100" label="时间"> </el-table-column>
                  </el-table>

                  <el-pagination
                    class="jm-pagination mt10"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :pager-count="pagerCount"
                    :page-size="10"
                    small
                    layout="prev, pager, next, jumper"
                    :total="40">
                  </el-pagination>
                </el-tab-pane>

                <!-- 白名单设置 -->
                <el-tab-pane label="白名单设置" name="b">
                  <div class="flex" >
                    <el-input size="small"  class="jm-search"  placeholder="请输入车牌号" v-model="inputSearch" >
                      <el-button @click="serach" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button type="primary" class="ml10" size="mini">添加</el-button>
                    <el-button type="primary" size="mini">导入</el-button>
                  </div>
                  <el-table
                    :data="tableData"
                    class="jm-table mt10"
                    row-class-name="tr-small"
                    header-row-class-name='tr-small'
                    >
                    <el-table-column label="序号"  type="index" width="45"></el-table-column>
                    <el-table-column prop="cp"  label="车牌"> </el-table-column>
                    <el-table-column prop="ys" width="50" label="颜色"> </el-table-column>
                    <el-table-column prop="cs" width="50" label="车速"> </el-table-column>
                    <el-table-column prop="lx" width="50" label="类型"> </el-table-column>
                    <el-table-column prop="sj" width="100" label="时间"> </el-table-column>
                    <el-table-column  label="操作" width="120">
                      <template>
                          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <el-pagination
                    class="jm-pagination mt10"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :pager-count="pagerCount"
                    :page-size="10"
                    small
                    layout="prev, pager, next, jumper"
                    :total="40">
                  </el-pagination>
                </el-tab-pane>

                <!-- 黑名单设置 -->
                <el-tab-pane label="黑名单设置" name="c">
                    黑名单设置
                </el-tab-pane>

                <!-- 围栏设置 -->
                <el-tab-pane label="围栏设置" name="d">
                    围栏设置
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-aside>
      </el-container>
  </div>
</template>

<script>
import echarts from 'echarts'
import echartsStyle from '../../../assets/js/echartsStyle'
import txMap from '../../../components/txMap/txMap'
export default {
  name: "trafficVehicle",
  components:{
    txMap
  },
  data() {
    return {
      input:'',
      inputSearch:'',
      suspiciousChecked:'',
      tableData: [
        {
          lk:'S90路口',
          cp:'粤A99999',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A00000',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.626761164550942, 113.11624994743124],
        },
        {
          lk:'S90路口',
          cp:'粤A11111',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.6306342507865, 113.11857786167207],
        },
        {
          lk:'S90路口',
          cp:'粤A22222',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A33333',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A44444',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A55555',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A66666',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },
        {
          lk:'S90路口',
          cp:'粤A77777',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        },{
          lk:'S90路口',
          cp:'粤A88888',
          ys:'红',
          cs:'36',
          lx:'公交',
          sj: '2020-03-01',
          position:[22.629394680085568, 113.11062903630386],
        }
      ],
      currentPage: 1,
      pagerCount:5,

      dataValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tabActiveName:'a'
    };
  },
  methods: {
    serach(){
      console.log('搜索...')
    },
    positi(row){
      console.log(row)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // 初始化echarts
    initCl(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartCl'));
      // 指定图表的配置项和数据
      var option = {
        grid: {
            left: 40,
            right:10,
            top:10,
            bottom:30
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            axisLabel:echartsStyle.axisLabel,
            axisLine:echartsStyle.axisLine,
        },
        yAxis: {
            type: 'value',
            axisLabel:echartsStyle.axisLabel,
            axisLine:echartsStyle.axisLine,
        },
        
        series: [{
            data: [820, 932, 1000, 1100, 1290, 1300, 1350,1400, 1480, 1500, 1490, 1460, 1440, 1410,1380, 1350, 1380, 1300, 1290, 1260, 1340,1300, 1250, 1200, 1000, 800],
            type: 'line',
            smooth: true,
            itemStyle:echartsStyle.itemStyle,
            lineStyle:echartsStyle.lineStyle,
            areaStyle:echartsStyle.areaStyle,
          
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function(){
        myChart.resize();
      })
      
    },
    // 选项卡
    handleClick(tab, event) {
        console.log(tab, event);
    }
    
  },
  mounted(){
    this.initCl();
  },
  created() {
   
  },
};
</script>
<style scoped lang="less">
  .jm-aside{
    width: 25% !important;
  }
</style>



