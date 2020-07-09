<template>
    <div class="app-container">
        <el-form :inline="true" ref="form" :model="form" size="mini">
            <el-form-item label="赛事类型名称">
                <el-input v-model="form.title" size='small'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="info" @click="clean">清空</el-button>
            </el-form-item>
        </el-form>

        <div style="padding-bottom:20px;">
            <el-button type="primary" @click="add" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
        </div>

        <el-table
						v-loading='loading'
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column
                align="center"
                width="80"
                label="排序字段"
                >
                <template slot-scope="scope" >
                <el-input
                     size='small'
                    v-model="scope.row.listIndex"
                    :disabled="false">
                </el-input>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="赛事类型名称"
                prop="title">
            </el-table-column>
            <el-table-column
                width="200"
                align="center"
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                fixed="right"
                width="150"
                align="center"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                    <!-- <el-link type="primary" style="margin-left:5px">置为草稿</el-link> -->
                    <el-link type="primary" @click="updBase(scope.row)" style="margin-left:5px">编辑</el-link>
                    <el-link type="primary" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
                    <!-- <el-link type="primary" @click="toDetails(scope.row.id)" style="margin-left:5px">详情</el-link> -->
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

        <el-dialog
        :title="dialogTitle"
        :close-on-click-modal="closeOnClickModal"
        :visible.sync="dialogVisible"
        :append-to-body="appendToBody"
        width="40%">
            <el-form ref="form" :model="addform" status-icon :rules="rules" size="mini">
                <el-form-item label="赛事类型名称" prop="title">
                    <el-input v-model="addform.title" size='small'></el-input>
                </el-form-item>
                <el-form-item label="排序字段升序" prop="sorting">
                    <el-input v-model="addform.sorting" size='small'></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getGtMatchTypeList,addMatchTypeInfo,delMatchTypeInfo,updateMatchTypeInfo } from '../../api/match'
import moment from 'moment'
export default {
    data(){
	return{
			loading:false,
			form:{
					title:'',
			},
			list:[],
			//分页
			total:0,
			currentPage:1,
			pageSize:10,

			dialogTitle:'',
			appendToBody:true,
			closeOnClickModal:false,
			dialogVisible:false,

			addform:{
					title:'',
					sorting:''
			},

			updId:'',//编辑用


			form:{
				fileList:[]
			},
			rules: {
				title: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
				sorting: [
					{ required: true, message: '此项必填', trigger: 'blur' },
				],
			}
        }
    },
    mounted(){
        this.getGtMatchTypeList()
    },
    methods:{
        getGtMatchTypeList(){
						this.loading = !this.loading
            const data={
                pageNumber:this.currentPage,
                pageSize:this.pageSize,
                title:this.form.title
            }
            getGtMatchTypeList(data).then(res=>{
                console.log(res)
                this.total=res.data.page.totalRecord
                this.list=res.data.list;
								this.loading = !this.loading
            })
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.getGtMatchTypeList()
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getGtMatchTypeList()
        },
        search(){
            this.getGtMatchTypeList()
        },
        clean(){
            this.currentPage=1;
            this.pageSize=10;
            this.form.title=''
            this.getGtMatchTypeList()
        },
        add(){
            this.dialogTitle='新增赛事类型'
            this.dialogVisible=true
        },
        updSort(){

        },
        updBase(row){
            console.log(row)
            this.updId=row.id;
            this.addform.title=row.title;
            this.addform.sorting=row.listIndex;
            this.dialogTitle='编辑赛事类型'
            this.dialogVisible=true
        },
        del(id){
            const data={
                id
            }
            this.$confirm('是否删除该赛事类型', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delMatchTypeInfo(data).then(res=>{
                    console.log(res);
                    this.getGtMatchTypeList()
                })
            })
        },
        onSubmit(){
					this.$refs.form.validate((valid) => {
						if (valid) {
							const data={
                title:this.addform.title,
                listIndex:this.addform.sorting,
                createTime:moment().format('YYYY-MM-DD HH:mm:ss'),
                releaseState:1,
                state:1
							}
							if(this.dialogTitle=='新增赛事类型'){
									addMatchTypeInfo(data).then(res=>{
											console.log(res);
											this.getGtMatchTypeList()
											this.dialogVisible=false;
											this.addform={
													title:'',
													sorting:''
											}
									})
							}else if(this.dialogTitle=='编辑赛事类型'){
									data.id=this.updId;
									updateMatchTypeInfo(data).then(res=>{
											console.log(res);
											this.dialogVisible=false;
											this.getGtMatchTypeList()
									})
							}
						} else {
							console.log('error submit!!');
							return false;
						}
					});
        },
    },
}
</script>

<style lang="less" scoped>

</style>
