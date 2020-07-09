<template>
    <div class="app-container">
        <div style="padding-bottom:20px;">
            <el-button type="primary" @click="addBanner" icon="el-icon-plus" size="mini">新增</el-button>
            <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
        </div>
        
            <!-- v-loading="loading" -->
        <el-table
            :data="list"
            border
            fit
            v-loading="loading"
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
                width="100px"
                align="center"
                label="类型"
                prop="id">
                <template slot-scope="scope" >
                    <span>{{scope.row.type=='1'?'赛事':scope.row.type=='2'?'赛事专题':scope.row.type=='3'?'资讯':'资讯专题'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="目标id"
                prop="targetId">
            </el-table-column>
            <el-table-column
                align="center"
                label="标题"
                width="300"
                prop="title">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="创建时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                width="200px"
                align="center"
                label="状态"
                prop="targetDesc">
            </el-table-column>
            <el-table-column
                width="120px"
                align="center"
                label="轮播图"
                prop="id">
                <template slot-scope="scope" >
                    <img style="width:100px" :src="imgUrl+scope.row.cover" alt="">
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                width="180"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                        <el-link type="primary" @click="upd(scope.row)" style="margin-left:5px">编辑</el-link>
                        <el-link type="primary" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :before-close="handleClose"
            :title="title"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="Visible"
            :append-to-body="appendToBody"
            width="550px"
            center>
            <el-form ref="form" :model="addForm"  label-width="100px" size="mini">
                <el-form-item label="类型">
                    <el-radio-group v-model="addForm.radio" @change="changeType">
                        <el-radio :label="1">赛事</el-radio>
                        <el-radio :label="2">赛事专题</el-radio>
                        <el-radio :label="3">资讯</el-radio>
                        <el-radio :label="4">资讯专题</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="id" prop='id'>
                    <el-input style="width:350px" v-model="addForm.id" size='small'></el-input>
                </el-form-item>
                <el-form-item label="排序字段" prop='id'>
                    <el-input style="width:350px" v-model="addForm.listIndex" size='small' type="number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
                <el-button size="mini" @click="Visible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addBanner,searchAll,delBanner,sort,update } from '../../api/banner'
import {IMG_URL} from '@/utils/const.js'
export default {
    data() {
        return {
            list:[],
            loading:true,
            Visible:false,
            appendToBody:true,
            closeOnClickModal:false,
            imgUrl:IMG_URL,
            title:'新增轮播图',

            list:[],
            id:'赛事id',
            addForm:{
                radio:1,
                id:'',
                listIndex:''
            },
            updId:'',//编辑用
        };
    },
    mounted() {
        this.getBannerList()
    },  
    methods: {
        getBannerList(){
            searchAll().then(res=>{
                console.log(res)
                this.list=res.data.records
                this.loading=false
            })
        },
        addBanner(){
            this.title='新增轮播图'
            this.Visible=true
        },
        updSort(){
            let records=[]
            for(let i=0;i<this.list.length;i++){
                records.push(
                {
                    'id':this.list[i].id,
                    'listIndex':Number(this.list[i].listIndex)
                }
                )
            }
            const data={
                "params":records
            }
            sort(data).then(res=>{
                console.log(res)
                this.getBannerList()
            })
        },
        del(id){
            this.$confirm('此操作将删除该轮播图, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delBanner(id).then(res=>{
                    console.log(res)
                    this.getBannerList()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            })
        },
        upd(row){
            console.log(row)
            this.Visible=true
            this.title="编辑轮播图"
            this.updId=row.id
            this.addForm={
                radio:row.type,
                id:row.targetId,
                listIndex:row.listIndex
            }
        },
        handleClose(){
            console.log('关闭')
            this.addForm={
                radio:1,
                id:'',
                listIndex:''
            }
            this.Visible=false;
        },
        onSubmit(){
            if(this.addForm.id==''){
                this.$message.error(this.id+'不能为空');
                return false;
            }
            if(this.addForm.listIndex==''){
                this.$message.error('排序字段不能为空');
                return false;
            }
            let data={
                type:this.addForm.radio,
                targetId:this.addForm.id,
                state:1,
                listIndex:Number(this.addForm.listIndex)
            }
            if(this.title=="新增轮播图"){
                addBanner(data).then(res=>{
                    console.log(res)
                    this.Visible=false;
                    this.getBannerList()
                    this.addForm={
                        radio:1,
                        id:'',
                        listIndex:''
                    }
                })
            }else{
                data.id=this.updId
                update(data).then(res=>{
                    console.log(res)
                    this.Visible=false;
                    this.getBannerList()
                    this.addForm={
                        radio:1,
                        id:'',
                        listIndex:''
                    }
                })
            }
        },
        changeType(){
            console.log(this.addForm.radio)
            let radio=this.addForm.radio
            if(radio=='1'){
                this.id='赛事id'
            }else if(radio=='2'){
                this.id='赛事专题id'
            }else if(radio=='3'){
                this.id='资讯id'
            }else if(radio=='4'){
                this.id='资讯专题id'
            }
        },
    },
}
</script>
<style lang='scss' scoped>

</style>