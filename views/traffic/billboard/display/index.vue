<template>
  <div class="jm-main-inner p10">

				<!-- 中间 -->
				<el-container class="bgcolor jm-card">
							<div class="jm-card-header">
                  <div class="jm-card-center-form">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
											<el-form-item label="">
												<el-date-picker
												v-model="date"
												type="monthrange"
												range-separator="——"
												start-placeholder="开始月份"
												
												end-placeholder="结束月份">
											</el-date-picker>
											</el-form-item>
											<el-form-item label="">
													<el-input style="width:300px;" class="search" placeholder="输入诱导屏名称"  v-model="input" >
													</el-input>
											</el-form-item>
											<el-form-item  label="">
												<el-button  type="primary" @click="onSubmit" >查询</el-button>
											</el-form-item>
										</el-form>
                </div>
							</div>
							<!-- <div class="flex-end">
								<el-button class="btn" type="primary" size="medium">添加</el-button>
							</div> -->
							<div class="jm-card-center " style="postion:relative">
								<!-- 表格 -->
								<el-table
									:data="tableData"
									stripe
									border
									class="mt10 sz-table"
									height="600px"
									style="width: 100%;"
									:cell-style="cellStyle"
									row-class-name="sz-table-tr">
									<el-table-column
										prop="number"
										label="序号"
										width='150'
										>
									</el-table-column>
									<el-table-column
										prop="snumber"
										label="显示页面名称"
										>
									</el-table-column>
									<el-table-column
										prop="address"
										label="显示页面类型"
										width='150'
										>
									</el-table-column>
									<el-table-column
										prop="pm"
										label="屏类型"
										width='150'
										>
									</el-table-column>
									<el-table-column
										prop="date"
										label="创建时间"
										width='150'
										>
									</el-table-column>
									<el-table-column
										prop=""
										label="操作"
										width="200"
										>
										<template>
											<el-button
												size="mini"
												@click="dialogVisible = true">编辑</el-button>
											<el-button
												size="mini"
												type="danger"
												@click="del">删除</el-button>
										</template>
										<!-- <a href="javascript:;" @click="dialogVisible = true">编辑</a>
										<a style="margin-left:50px;" href="javascript:;">删除</a> -->
									</el-table-column>
								</el-table>

								<div class="flex-bw">
									<div class="page mt10">当前显示1-10</div>
									<!-- 分页 -->
									<el-pagination
									class="mt10"
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:current-page.sync="currentPage"
										:page-size="100"
										:pager-count='pagerCount'
										layout="prev, pager, next, jumper"
										:total="1000">
									</el-pagination>
								</div>
							</div>

							
						
				</el-container>


			<!-- 弹出层 -->
      <el-dialog
        title="显示页编辑"
        :visible.sync="dialogVisible"
        :append-to-body='true'
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="显示页名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="显示页类型">
						<el-radio-group v-model="form.resource">
							<el-radio label="通用"></el-radio>
							<el-radio label="非通用"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="屏幕显示内容">
					</el-form-item>
					<!-- 富文本编辑器 -->
						<el-card style="height: 310px;margin-bottom:20px;">
							<quill-editor v-model="content" ref="myQuillEditor" style="height: 230px;" :options="editorOption">
								<!-- 自定义toolar -->
								<div id="toolbar" slot="toolbar">
									<!-- Add a bold button -->
									<button class="ql-bold" title="加粗">Bold</button>
									<button class="ql-italic" title="斜体">Italic</button>
									<button class="ql-underline" title="下划线">underline</button>
									<button class="ql-strike" title="删除线">strike</button>
									<button class="ql-blockquote" title="引用"></button>
									<button class="ql-code-block" title="代码"></button>
									<button class="ql-header" value="1" title="标题1"></button>
									<button class="ql-header" value="2" title="标题2"></button>
									<!--Add list -->
									<button class="ql-list" value="ordered" title="有序列表"></button>
									<button class="ql-list" value="bullet" title="无序列表"></button>
									<!-- Add font size dropdown -->
									<select class="ql-header" title="段落格式">
										<option selected>段落</option>
										<option value="1">标题1</option>
										<option value="2">标题2</option>
										<option value="3">标题3</option>
										<option value="4">标题4</option>
										<option value="5">标题5</option>
										<option value="6">标题6</option>
									</select>
									<select class="ql-size" title="字体大小">
										<option value="10px">10px</option>
										<option value="12px">12px</option>
										<option value="14px">14px</option>
										<option value="16px" selected>16px</option>
										<option value="18px">18px</option>
										<option value="20px">20px</option>
									</select>
									<select class="ql-font" title="字体">
										<option value="SimSun">宋体</option>
										<option value="SimHei">黑体</option>
										<option value="Microsoft-YaHei">微软雅黑</option>
										<option value="KaiTi">楷体</option>
										<option value="FangSong">仿宋</option>
										<option value="Arial">Arial</option>
									</select>
									<!-- Add subscript and superscript buttons -->
									<select class="ql-color" value="color" title="字体颜色"></select>
									<select class="ql-background" value="background" title="背景颜色"></select>
									<select class="ql-align" value="align" title="对齐"></select>
									<button class="ql-clean" title="还原"></button>
									<!-- You can also add your own -->
								</div>
							</quill-editor>
						</el-card>
					<el-form-item label="屏幕类型">
						<el-select v-model="value" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="onSubmit(),dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import {
		Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	//引入font.css 
	import '../../../../assets/css/font.css'
	// 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)
export default {
  name: "trafficBillboardInformation",
  data() {
    return {
				formInline: {
          user: '',
          region: ''
        },
				date: "",
				value: "",
				content: null, // 富文本编辑器
        editorOption: { // 富文本编辑器
          placeholder: "请输入",
          theme: "snow", // or 'bubble' 
          modules: {
            toolbar: {
              container: '#toolbar'
            }
          }
        },
				dialogVisible: false, //显示与隐藏
				options: [{
          value: '选项1',
          label: '650*50'
        }, {
          value: '选项2',
          label: '800*100'
        }, {
          value: '选项3',
          label: '1000*300'
        }, {
          value: '选项4',
          label: '1080*720'
        }, {
          value: '选项5',
          label: 'HDMI'
        }],
			form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
			},
			tableData: [{
					number: '1',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-02',
					address: '通用',
					pm: '602*50'
        }, {
          number: '2',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-04',
					address: '非通用',
					pm: '602*50'
        }, {
          number: '3',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '通用',
					pm: '602*50'
        },
        {
          number: '4',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '非通用',
					pm: '602*50'
				},
				{
          number: '4',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '通用',
					pm: '602*50'
				},
				{
          number: '4',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '非通用',
					pm: '602*50'
				},
				{
          number: '4',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '通用',
					pm: '602*50'
				},
				{
          number: '4',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '非通用',
					pm: '602*50'
        },
				{
					number: '5',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-01',
					address: '通用',
					pm: '602*50'
        }, {
					number: '6',
					snumber:'这是超级长的诱导屏信息这是超级长的诱导屏信息',
          date: '2016-05-03',
					address: '非通用',
					pm: '602*50'
				}],

				tabActiveName:'first',
				pagerCount:5,
				currentPage:2,
				checkList:[],
				input:'',
    };
	},
	components: {
      quillEditor
    },
  methods: {
		
			// 删除
			del(){
				alert('点击删除')
			},
			// 提交表单
			onSubmit() {
        console.log('submit!');
      },
			// 单元格居中
			cellStyle({row,column,rowIndex,columnIndex}){
				return "text-align:center"
			},
			// 分页
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
			},
			// 搜索事件
			search(){
				alert('搜索气象点位'+this.input)
			},
			handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    
  },
  created() {
   
  },
};
</script>
<style scoped lang="less">
.search{
	width: 40%;
}
.bgcolor{
	padding:20px;
}
.flex-bw{
	display: flex;
	justify-content: space-between;
}
.flex-end{
	display: flex;
	justify-content: flex-end;
}
.page{
	font-weight: 400;
}
.btn{
	width: 180px;
}
/deep/ .el-table th div{
	text-align: center;
}
</style>

